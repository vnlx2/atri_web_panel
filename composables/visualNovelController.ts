export async function getDashboardStats() {
  try {
    const runtimeConfig = useRuntimeConfig();
    const token = useCookie('token');
    const response = await fetch(`${runtimeConfig.public.apiBase}/v1/visualnovels/dashboard`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    });
    const responseJson = await response.json();
    return [
      responseJson.data.vndb,
      responseJson.data.all,
      responseJson.data.withDownloadUrl
    ];
  } catch (error) {
    throw error;
  }
}