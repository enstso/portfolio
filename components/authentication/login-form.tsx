"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PasswordInput } from "@/components/authentication/password-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginFormSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long.").max(30),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  verif: z.string().min(4, "Verification is incorrect."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "", verif: "" },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setSubmissionError(null);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setSubmissionError("Authentication failed. Check your credentials and try again.");
        return;
      }
      form.reset();
      router.push("/admin");
      router.refresh();
    } catch {
      setSubmissionError("Authentication is temporarily unavailable.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="username" render={({ field, fieldState }) => (
          <FormItem>
            <FormControl><Input {...field} autoComplete="username" placeholder="Username" /></FormControl>
            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field, fieldState }) => (
          <FormItem>
            <FormControl><PasswordInput {...field} autoComplete="current-password" placeholder="Password" /></FormControl>
            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          </FormItem>
        )} />
        <FormField control={form.control} name="verif" render={({ field, fieldState }) => (
          <FormItem>
            <FormControl><PasswordInput {...field} autoComplete="off" placeholder="Verification code" /></FormControl>
            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          </FormItem>
        )} />

        {submissionError && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{submissionError}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Signing in…</> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
