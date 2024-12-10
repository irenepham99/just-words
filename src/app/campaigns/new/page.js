"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormField,
  FormDescription,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Input } from "../../../components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  emailTemplate: z.string().min(1, "Email Template is required"),
});

export default function CampaignForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      emailTemplate: "",
    },
  });

  const onSubmit = (data) => {
    const createCampaign = async (formData) => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/campaigns", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        router.push(`/campaigns/${responseData.campaign_id}/preview`);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createCampaign(data);
  };

  return (
    <div className="grid grid-cols-1 gap-3 p-6 w-full">
      <h1 className="text-2xl mt-4">New Campaign</h1>
      <div className="text-l mb-6">54 Recipients Selected</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-white p-6 border border-color-gray-100 rounded space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Template</FormLabel>
                  <FormDescription>
                    {`Use double carrots << >> for text that you'd like AI to personalize.`}
                    <br />
                    {`Use double curly braces {{ }} for values that should be replaced
                  with specific data.`}
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      className="h-32"
                      placeholder={`Hello {{first_name}}, \n\n <<Connect with friends who are interested in crafts today>> \n\n Your Friends and Just Friends`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="bg-brandBlue" disabled={loading}>
            {loading ? "Loading..." : "Generate Emails"}
          </Button>
          <div className="text-red-600">
            {error && `Error. Try again later ` + error}
          </div>
        </form>
      </Form>
    </div>
  );
}
