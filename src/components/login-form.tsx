/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, useRef } from "react";

import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleDefaultLogin = (type: "user" | "doctor" | "admin") => {
    const presets = {
      user: { email: "user1@gmail.com", password: "123456" },
      doctor: { email: "doctor1@mail.com", password: "123456" },
      admin: { email: "admin1@mail.com", password: "123456" },
    };

    const selected = presets[type];

    if (emailRef.current) emailRef.current.value = selected.email;
    if (passwordRef.current) passwordRef.current.value = selected.password;
  };
  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* === Role Buttons === */}
          <div className="mb-6 grid grid-cols-3 gap-2">
            <Button
              type="button"
              onClick={() => handleDefaultLogin("user")}
              className="bg-blue-400 hover:bg-blue-700 text-white"
            >
              User
            </Button>
            <Button
              type="button"
              onClick={() => handleDefaultLogin("doctor")}
              className="bg-blue-500 hover:bg-blue-800 text-white"
            >
              Doctor
            </Button>
            <Button
              type="button"
              onClick={() => handleDefaultLogin("admin")}
              className="bg-blue-800 hover:bg-blue-950 text-white"
            >
              Admin
            </Button>
          </div>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              //   required
            />

            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              //   required
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button
              type="submit"
              className="bg-blue-800 hover:bg-blue-950 text-white"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <a
                href="forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
