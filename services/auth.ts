import { ENDPOINT } from "@/constants";
import { client } from "@/lib";
import { LoginPayload, LoginResponse } from "@/types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await client.post<LoginResponse>(ENDPOINT.AUTH.LOGIN, payload);
  return response.data;
}
