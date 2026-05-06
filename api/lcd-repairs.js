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
