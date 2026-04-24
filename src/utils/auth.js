// utils/auth.js
export function getAdmin() {
  try {
    const data = localStorage.getItem("admin");
    const admin = data ? JSON.parse(data) : null;

    if (!admin || !admin.email) return null;

    return admin;
  } catch {
    return null;
  }
}
