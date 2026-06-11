import axios from "axios";

const baseURL =
  process.env.TEST_API_BASE_URL ?? "https://api.dfoldlab.co.uk/api/v1";

let cachedHeaders: Record<string, string> | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name} in .env.test — copy .env.test.example and fill in test credentials.`
    );
  }
  return value;
}

export async function getAuthHeaders(): Promise<Record<string, string>> {
  if (cachedHeaders) {
    return cachedHeaders;
  }

  const email = requireEnv("TEST_ADMIN_EMAIL");
  const password = requireEnv("TEST_ADMIN_PASSWORD");

  const response = await axios.post(
    `${baseURL}/admin/auth/login`,
    { email, password },
    { validateStatus: () => true }
  );

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `Admin login failed (${response.status}): ${JSON.stringify(response.data)}`
    );
  }

  const token = response.data?.data?.token;
  if (!token) {
    throw new Error("Login response did not include data.token");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  const businessId = process.env.TEST_BUSINESS_ID;
  if (businessId) {
    headers["x-business-id"] = businessId;
  }

  cachedHeaders = headers;
  return headers;
}
