export function getErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    !("response" in error)
  ) {
    return (error as Error).message;
  }

  if (error && typeof error === "object" && "response" in error) {
    const response = (
      error as { response?: { data?: { fields?: Record<string, string>; message?: string; error?: string } } }
    ).response?.data;

    if (response?.fields && typeof response.fields === "object") {
      const messages = Object.values(response.fields);
      return messages.length > 0 ? String(messages[0]) : response.error || "An unknown error occurred";
    }

    return response?.message || response?.error || "An unknown error occurred";
  }

  return "An unknown error occurred";
}
