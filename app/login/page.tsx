import { Metadata } from "next";
import { LoginForm } from "@/components/authentication/login-form";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Private portfolio administration login.",
  robots: { index: false, follow: false },
};



export default function AuthenticationPage() {
    return (
        <div className="container mx-auto max-w-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <div className="p-6  rounded">
            <LoginForm />
          </div>
        </div>
    );
  }
