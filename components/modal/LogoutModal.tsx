"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import PopupModal from "@/components/ui/PopupModal";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  open: boolean;
  close: () => void;
}

export default function LogoutModal({ open, close }: LogoutModalProps) {
  const router = useRouter();

  return (
    <PopupModal
      size="lg"
      radius="2xl"
      isOpen={open}
      onClose={close}
      placement="center"
      title="Logout Confirmation"
      icon={<ArrowRightOnRectangleIcon className="size-5" />}
      className="max-h-screen rounded-2xl"
    >
      <div className="space-y-8 p-5">
        <div className="space-y-3 text-center">
          <h2 className="text-lg font-medium text-gray-800">
            Logout Confirmation
          </h2>
          <p className="text-sm text-gray-600">
            Are you sure you want to log out? You will need to sign in again to
            access the admin dashboard.
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            onPress={close}
            fullWidth
            variant="bordered"
            radius="md"
            className="border-1 border-deep-purple text-xs text-deep-purple"
          >
            Stay signed in
          </Button>
          <Button
            fullWidth
            radius="md"
            className="bg-red-500 text-xs text-white"
            color="danger"
            onPress={() => {
              close();
              router.push("/");
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </PopupModal>
  );
}
