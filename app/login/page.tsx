import Link from "next/link";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginForm } from "@/components/login-form";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Login",
};

export default function AuthenticationPage() {
    return (
      
        <div className="container mx-auto max-w-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <div className="bg-white p-6 shadow rounded">
            <LoginForm />
          </div>
        </div>
    );
  }