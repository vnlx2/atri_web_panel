import { jwtVerify } from "jose";

export async function login(username: string, password: string) {
  try {
    const runtimeConfig = useRuntimeConfig();
    const response = await fetch(`${runtimeConfig.public.apiBase}/v1/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const runtimeConfig = useRuntimeConfig();
    const response = await fetch(`${runtimeConfig.public.apiBase}/v1/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export const isAuthenticated = async (token: string) => {
  if (token === '') return false;
  const runtimeConfig = useRuntimeConfig();
  const key = new TextEncoder().encode(runtimeConfig.apiSecret);
  try {
    const result = await jwtVerify(token, key);
    if (!result) return false;
    return true;
  } catch (err) {
    return false;
  }
}