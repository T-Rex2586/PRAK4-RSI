const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface RegisterPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  whatsapp_number: string;
  password: string;
}

interface LoginPayload {
  identifier: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  account_id: number;
  user_id: number;
  role: string;
}

export const registerUser = async (userData: RegisterPayload) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.detail || "Registrasi Gagal");
  }

  return result;
};

export const LoginUser = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Login failed");
  }

  if (typeof window !== "undefined" && result.access_token) {
    localStorage.setItem("access_token", result.access_token);
  }

  return result as LoginResponse;
};

export const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};