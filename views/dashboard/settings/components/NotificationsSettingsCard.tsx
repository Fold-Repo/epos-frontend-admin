"use client";

import { DashboardCard } from "@/components";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Switch } from "@heroui/react";
import { useState } from "react";

export default function NotificationsSettingsCard() {
  const [alertPayouts, setAlertPayouts] = useState(true);
  const [alertVerification, setAlertVerification] = useState(true);
  const [alertSecurity, setAlertSecurity] = useState(false);

  return (
    <DashboardCard
      title="Notifications"
      icon={<EnvelopeIcon className="size-5 text-epos-text-secondary" />}
      bodyClassName="space-y-4 pt-2"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[#EAECF0] py-3 first:pt-0">
        <div>
          <p className="text-sm font-medium text-epos-text-primary">Payout &amp; settlement</p>
          <p className="text-[11px] text-epos-text-secondary">Holds, disputes, and large refunds</p>
        </div>
        <Switch size="sm" isSelected={alertPayouts} onValueChange={setAlertPayouts} />
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-[#EAECF0] py-3">
        <div>
          <p className="text-sm font-medium text-epos-text-primary">Verification</p>
          <p className="text-[11px] text-epos-text-secondary">Persona and Stripe onboarding queue</p>
        </div>
        <Switch size="sm" isSelected={alertVerification} onValueChange={setAlertVerification} />
      </div>

      <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
        <div>
          <p className="text-sm font-medium text-epos-text-primary">Security</p>
          <p className="text-[11px] text-epos-text-secondary">New admin logins and role changes</p>
        </div>
        <Switch size="sm" isSelected={alertSecurity} onValueChange={setAlertSecurity} />
      </div>

      <Button
        size="sm"
        variant="flat"
        className="text-xs text-epos-text-secondary"
        onPress={() => window.alert("Notification prefs saved (mock).")}
      >
        Save preferences
      </Button>
    </DashboardCard>
  );
}
