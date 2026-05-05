import { makeRequest } from "./makeRequest";

export async function lcdRepair() {
    return await makeRequest('/lcd-repairs')
}