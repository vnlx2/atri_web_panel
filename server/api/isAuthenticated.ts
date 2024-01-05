import { jwtVerify } from "jose";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const cookies = parseCookies(event);
  const token = cookies.token;
  const key = new TextEncoder().encode(runtimeConfig.apiSecret);
  try {
    const result = await jwtVerify(token, key);
    if (!result) {
      return { isAuthenticated: false, payloadData: null }; 
    };
    return { isAuthenticated: true, payloadData: result.payload };
  } catch (err) {
    return { isAuthenticated: false, payloadData: null };
  }
});