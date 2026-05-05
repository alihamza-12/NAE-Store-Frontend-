import { makeRequest } from "./makeRequest";

export async function logout() {
  return await makeRequest("/admin/logout", { method:'POST' }).then((data) => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    return data;
  });
}


export async function login(data) {
  return await makeRequest('/admin/login', { method: 'POST', data })
}