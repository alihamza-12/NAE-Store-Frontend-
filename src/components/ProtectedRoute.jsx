import { Navigate } from "react-router-dom";
import { getAdmin } from "../utils/auth";

function ProtectedRoute({ children }) {
  const admin = getAdmin();

  if (!admin) {
    return <Navigate to="/" replace />;
    console.log("done protected");
  }

  return children;
}

export default ProtectedRoute;
