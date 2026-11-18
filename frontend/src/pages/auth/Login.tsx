
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

interface LoginProps {
  role: "student" | "admin";
}

export default function Login({ role }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const isAdmin = role === "admin";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Login interface ready. Backend authentication will be connected next.");
  }

  return (
    <AuthLayout
      portalName={isAdmin ? "Administration Portal" : "Student Portal"}
      portalType={role}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          label={isAdmin ? "Administrator Email" : "University Email / ID"}
          type="text"
          placeholder={
            isAdmin
              ? "Enter administrator email"
              : "Enter your university ID or email"
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={19} />}
          autoComplete="username"
          required
        />

        <div>
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<LockKeyhole size={19} />}
            autoComplete="current-password"
            required
          />

          <div className="mt-3 text-right">
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-brand-700 hover:text-brand-900"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" fullWidth>
          Sign In <ArrowRight size={18} />
        </Button>

        {message && (
          <p
            role="status"
            className="rounded-lg bg-brand-50 p-3 text-center text-sm text-brand-800"
          >
            {message}
          </p>
        )}
      </form>
    </AuthLayout>
  );
}
