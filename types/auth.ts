export const AUTH_TOKEN_KEY = "authToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message?: string;
  data?: {
    token?: string;
    refreshToken?: string;
    user?: unknown;
  };
}

export interface ProfileUser {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  altphone: string | null;
  position: string;
  isVerify: boolean;
  is_business_owner: boolean;
  created_at: string;
  persona_inquiry_id: string | null;
  persona_verification_status: string | null;
  persona_verified_at: string | null;
  persona_verified: boolean;
}

export interface ProfileRole {
  role_id: number;
  name: string;
  description: string;
}

export interface ProfileResponseData {
  user: ProfileUser;
  role: ProfileRole;
  business: unknown | null;
  stores: unknown[];
  address: unknown | null;
  isFoodOutlet: boolean | null;
}

export interface ProfileResponse {
  status: number;
  message: string;
  data: ProfileResponseData;
}
