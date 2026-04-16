import { ENDPOINT } from "@/constants";
import { client } from "@/lib";
import { ProfileResponseData, ProfileResponse } from "@/types";

export async function getProfile(): Promise<ProfileResponseData> {
  const response = await client.get<ProfileResponse>(ENDPOINT.USERS.PROFILE);

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch profile");
  }

  return response.data.data;
}
