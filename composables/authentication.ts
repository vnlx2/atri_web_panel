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
  try {
    const { data } = await useFetch('/api/isAuthenticated');
    if (data.value === null) {
      return false;
    }
    if (data.value?.payloadData === null) {
      return false;
    }
    const userController = useUser();
    userController.storeCurrentUser(
      data.value.payloadData.sub,
      data.value.payloadData.role
    );
    return data.value.isAuthenticated;
  } catch (error) {
    return false;
  }
}