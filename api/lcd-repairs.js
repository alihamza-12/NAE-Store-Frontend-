import { makeRequest } from "./makeRequest";

export async function lcdRepair() {
  return await makeRequest("/lcd-repairs");
}

export async function createRepair(data) {
  return await makeRequest("/lcd-repairs", {
    method: "POST",
    data,
  });
}

export async function updateLcdRepair(id, data) {
  return await makeRequest(`/lcd-repairs/${id}`, {
    method: "PATCH",
    data,
  });
}

export async function adminProfile() {
  return await makeRequest("/admin/profile");
}

export async function searchLcdRepairs(query) {
  return await makeRequest(
    `/lcd-repairs/search?query=${encodeURIComponent(query)}`,
  );
}
