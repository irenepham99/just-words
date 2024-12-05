"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import Card from "./Card";
import GeneratedText from "./GeneratedText";
import AiPrompt from "./AiPrompt";
import { useRouter } from "next/navigation";
import { Spinner } from "../../../../components/ui/spinner";

export default function CampaignPreview({ params }) {
  const { id } = React.use(params);
  const [campaign, setCampaign] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedGender, setSelectedGender] = useState("female");
  const router = useRouter();
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  const [loadingRegenerate, setLoadingRegenerate] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignResults = async () => {
      try {
        setLoadingCampaign(true);
        const response = await fetch(
          `http://localhost:3000/api/campaigns/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        setCampaign(responseData);
        setSelectedRecipient(responseData.emails[0]);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoadingCampaign(false);
      }
    };

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
        setLoadingRegenerate(true);
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
        const data = await response.json();
        setCampaign(data);
        setSelectedRecipient(
          data.emails.find((recipient) => recipient.id == selectedRecipient.id)
        );
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoadingRegenerate(false);
      }
    };

    callRegenerate();
  };

  if (error) {
    return (
      <div className="text-xl text-red-500 w-full h-full flex items-center justify-center">
        Error. Try again later. {error}
      </div>
    );
  }

  if (loadingCampaign) {
    return (
      <div className="text-3xl w-full h-full flex items-center justify-center">
        <Spinner size="lg" className="bg-black dark:bg-white" />
        <div className="px-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="flex items-center h-fit justify-between px-4 mt-10 mb-4">
        <div className="text-2xl">{campaign ? campaign.name : ""}</div>
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

        <div className="w-full grid grid-cols-1 w-2/3">
          <div className="border p-4">
            {selectedRecipient &&
              selectedRecipient.email.map((section, index) => {
                return section.generated ? (
                  <GeneratedText
                    regenerateSection={regenerateSection}
                    key={index}
                    section={section}
                    loading={loadingRegenerate}
                  />
                ) : (
                  <div key={index} className="p-2 m-2">
                    {section.string}
                  </div>
                );
              })}
          </div>
          <div className="w-full p-2 place-items-center">
            <AiPrompt loading={loadingRegenerate} regenerate={regenerateAll} />
          </div>
        </div>
      </div>
    </div>
  );
}
