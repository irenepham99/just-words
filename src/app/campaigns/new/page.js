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
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Input } from "../../../components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  emailTemplate: z.string().min(1, "Email Template is required"),
});

export default function CampaignForm() {
  const router = useRouter();
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
        console.log(responseData, "DATA RECIEVED");

        router.push(`/campaigns/${responseData.campaign_id}/preview`);
      } catch (err) {
        console.log(err);
      }
    };

    createCampaign(data);
  };

  return (
    <div className="grid grid-cols-1 gap-3 p-6 w-full">
      <h1 className="text-2xl my-6">New Campaign</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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
                  <Textarea placeholder="Add a description" {...field} />
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
                <FormControl>
                  <Textarea
                    placeholder="Enter your email template"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Generate Emails</Button>
        </form>
      </Form>
    </div>
  );
}
