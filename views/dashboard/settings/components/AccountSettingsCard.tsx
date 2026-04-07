"use client";

import { DashboardCard } from "@/components";
import { Input } from "@/components/ui";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const accountSchema = yup.object({
  displayName: yup
    .string()
    .trim()
    .required("Display name is required.")
    .min(2, "Display name must be at least 2 characters."),
});

type AccountFormValues = yup.InferType<typeof accountSchema>;

const defaultValues: AccountFormValues = {
  displayName: "Admin User",
};

export default function AccountSettingsCard() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormValues>({
    resolver: yupResolver(accountSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data: AccountFormValues) => {
    window.alert(`Profile saved for ${data.displayName} (mock).`);
  };

  return (
    <DashboardCard
      title="Account"
      icon={<UserCircleIcon className="size-5 text-epos-text-secondary" />}
      bodyClassName="space-y-4 pt-2"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={control}
          name="displayName"
          render={({ field }) => (
            <Input
              label="Display name"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.displayName?.message}
              fullWidth
              inputSize="md"
            />
          )}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value="admin@epos.example.com"
          disabled
          fullWidth
          inputSize="md"
        />

        <p className="text-[11px] leading-relaxed text-epos-text-secondary">
          Email sign-in is managed by your identity provider. Contact support to change the login
          email.
        </p>

        <Button color="primary" size="sm" className="text-xs" type="submit" isLoading={isSubmitting}>
          Save profile
        </Button>
      </form>
    </DashboardCard>
  );
}
