import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/signin" replace />;
}
