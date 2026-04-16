import { LoginView } from "@/views";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <LoginView />
    </Suspense>
  );
}
