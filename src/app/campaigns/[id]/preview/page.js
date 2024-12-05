"use client";
import { useEffect, useState } from "react";
import React from "react";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Button } from "../../../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import Card from "./Card";
import GeneratedText from "./GeneratedText";
import AiPrompt from "./AiPrompt";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CampaignPreview({ params }) {
  const { id } = React.use(params);
  const [campaign, setCampaign] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedGender, setSelectedGender] = useState("female");
  const router = useRouter();

  const fetchCampaignResults = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/campaigns/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setCampaign(responseData);
      setSelectedRecipient(responseData.emails[0]);
      console.log(responseData, "CAMPAIGN FETCHED");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCampaignResults();
  }, []);

  const regenerateAll = () => {
    regenerateSection(
      selectedRecipient.email
        .filter((section) => section.generated == true)
        .map((section) => section.section_id)
    );
  };

  const regenerateSection = (section_ids) => {
    const callRegenerate = async () => {
      try {
        const payload = {
          section_ids: section_ids,
          recipient_id: selectedRecipient.id,
        };
        const response = await fetch(
          `http://localhost:3000/api/campaigns/${campaign.campaign_id}/regenerate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData, "REGENERATED");
        fetchCampaignResults();
      } catch (err) {
        console.log(err);
      }
    };

    callRegenerate();
  };

  return (
    <div className="grid grid-cols-1 ">
      <div className="flex items-center justify-between px-4 mt-10 mb-4">
        <div className="text-2xl">Campaign Name</div>
        <Button
          onClick={() => router.push(`/campaigns/${id}/success`)}
          className="w-fit"
        >
          Send Emails
        </Button>
      </div>
      <div className="flex">
        <div className="h-screen w-1/3 overflow-y-auto border p-2">
          <Tabs defaultValue="female" className="w-full m-2">
            <TabsList>
              <TabsTrigger
                onClick={() => setSelectedGender("female")}
                value="female"
              >
                Female
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedGender("male")}
                value="male"
              >
                Male
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {campaign &&
            campaign.emails
              .filter((recipient) => recipient.gender == selectedGender)
              .map((recipient) => (
                <Card
                  selected={selectedRecipient.id == recipient.id}
                  key={recipient.id}
                  recipient={recipient}
                  setSelectedRecipient={setSelectedRecipient}
                />
              ))}
        </div>

        <div className="w-full grid grid-cols-1 gap-2 w-2/3">
          <div className="border p-4">
            {selectedRecipient &&
              selectedRecipient.email.map((section, index) => {
                return section.generated ? (
                  <GeneratedText
                    regenerateSection={regenerateSection}
                    key={index}
                    section={section}
                  />
                ) : (
                  <div key={index} className="p-2 m-2">
                    {section.string}
                  </div>
                );
              })}
          </div>
          <div className="w-full p-2 place-items-center">
            <AiPrompt regenerate={regenerateAll} />
          </div>
        </div>
      </div>
    </div>
  );
}
