import { jwtVerify } from "jose";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const cookies = parseCookies(event);
  const token = cookies.token;
  const key = new TextEncoder().encode(runtimeConfig.apiSecret);
  try {
    const result = await jwtVerify(token, key);
    if (!result) {
      return { isAuthenticated: false }
    };
    return { isAuthenticated: true };
  } catch (err) {
    return { isAuthenticated: false };
  }
});