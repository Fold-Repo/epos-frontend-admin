"use client";

import { DashboardCard } from "@/components";
import { PasswordInput } from "@/components/ui";
import { KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required."),
  newPassword: yup
    .string()
    .required("New password is required.")
    .min(8, "New password must be at least 8 characters."),
  confirmPassword: yup
    .string()
    .required("Confirm your new password.")
    .oneOf([yup.ref("newPassword")], "New password and confirmation do not match."),
});

type PasswordFormValues = yup.InferType<typeof passwordSchema>;

const defaultValues: PasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function PasswordSettingsCard() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: yupResolver(passwordSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = () => {
    window.alert("Password updated (mock). Wire this to your admin auth API.");
    reset(defaultValues);
  };

  return (
    <DashboardCard
      title="Change password"
      icon={<KeyIcon className="size-5 text-epos-text-secondary" />}
      bodyClassName="space-y-4 pt-2"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={control}
          name="currentPassword"
          render={({ field }) => (
            <PasswordInput
              label="Current password"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.currentPassword?.message}
              fullWidth
              inputSize="md"
              autoComplete="current-password"
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <PasswordInput
              label="New password"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.newPassword?.message}
              fullWidth
              inputSize="md"
              autoComplete="new-password"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <PasswordInput
              label="Confirm new password"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.confirmPassword?.message}
              fullWidth
              inputSize="md"
              autoComplete="new-password"
            />
          )}
        />

        <Button color="primary" size="sm" className="text-xs" type="submit" isLoading={isSubmitting}>
          Update password
        </Button>
      </form>
    </DashboardCard>
  );
}
