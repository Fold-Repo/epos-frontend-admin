import type {
  AdminBusinessAccountStatus,
  AdminPersonaSummary,
  AdminStripeSummary,
} from "@/types/admin-business";

export function normalizePersonaStatus(status?: string | null): AdminPersonaSummary {
  const value = status?.toLowerCase().trim();
  if (value === "completed") return "completed";
  if (value === "started") return "started";
  if (value === "failed") return "failed";
  return "pending";
}

export function normalizeStripeStatus(status?: string | null): AdminStripeSummary {
  const value = status?.toLowerCase().trim();
  if (value === "live") return "live";
  if (value === "onboarding" || value === "pending") return "onboarding";
  return "not_connected";
}

export function normalizeAccountStatus(status?: string | null): AdminBusinessAccountStatus {
  return status?.toLowerCase().trim() === "suspended" ? "suspended" : "active";
}

export function getStripeStatusMeta(status: AdminStripeSummary) {
  switch (status) {
    case "live":
      return { label: "Live", className: "bg-emerald-50 text-emerald-800" };
    case "onboarding":
      return { label: "Onboarding", className: "bg-amber-50 text-amber-900" };
    default:
      return { label: "Not connected", className: "bg-neutral-100 text-neutral-600" };
  }
}

export function getPersonaStatusMeta(status: AdminPersonaSummary) {
  switch (status) {
    case "completed":
      return { label: "Completed", className: "bg-emerald-50 text-emerald-800" };
    case "started":
      return { label: "Started", className: "bg-sky-50 text-sky-950" };
    case "failed":
      return { label: "Failed", className: "bg-red-50 text-red-800" };
    default:
      return { label: "Pending", className: "bg-amber-50 text-amber-900" };
  }
}
