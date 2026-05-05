const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function makeRequest(url, options) {
  const token = localStorage.getItem("token");

  return await fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: options?.data ? JSON.stringify(options?.data) : undefined
  })
    .then((response) => response.json())
    .catch((error) => Promise.reject(error));
}
