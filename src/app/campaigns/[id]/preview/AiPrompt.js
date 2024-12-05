"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormItem,
  FormControl,
  FormMessage,
  Form,
  FormField,
} from "../../../../components/ui/form";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

const formSchema = z.object({
  prompt: z
    .string()
    .min(1, "Please enter instructions for AI to fix the email"),
});

export default function AiPrompt({ regenerate }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(regenerate)}
        className="flex items-center space-x-2"
      >
        <FormField
          className="align-self-center"
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Fix with AI"
                  className="border-2 border-blue-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-blue-400"
          disabled={!form.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
