"use client";

import { Button } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, PasswordInput, createInputLabel } from "@/components/ui";
import { Logo } from "@/components/reusable";
import { useToast } from "@/hooks";
import { login } from "@/services";
import { loginSchema } from "@/schema/auth.schema";
import { AUTH_TOKEN_KEY, LoginPayload } from "@/types";
import { getErrorMessage, setCookie } from "@/utils";
import { useAppDispatch } from "@/store/hooks";
import { fetchProfile } from "@/store/slice";

const LoginView = () => {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      const token = response.data?.token;
      if (!token) {
        showError("Invalid login credentials.");
        return;
      }

      setCookie(AUTH_TOKEN_KEY, token);
      dispatch(fetchProfile());

      showSuccess(response.message || "Login successful, welcome back!");
      router.push(callbackUrl);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-violet-50 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md bg-white border border-violet-100 rounded-2xl shadow-xl shadow-violet-200/30 p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col items-center justify-center mb-6">
            <Logo textColor="text-neutral-800" size="md" />
            <p className="text-lg font-bold mt-4 text-neutral-800">Welcome Back</p>
          </div>

          <div className="space-y-4">
            <Input
              label={createInputLabel({ name: "Email", required: true })}
              placeholder="Enter your email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <PasswordInput
              label={createInputLabel({ name: "Password", required: true })}
              placeholder="Enter your Password"
              {...register("password")}
              error={errors.password?.message}
              formGroupClass="mb-0"
            />
          </div>

          <Button type="submit" radius="lg" className="bg-primary text-white w-full mt-6
            text-xs h-12"
            isLoading={isSubmitting}>
            Sign In
          </Button>

        </form>

      </section>
    </main>
  );
};

export default LoginView;
