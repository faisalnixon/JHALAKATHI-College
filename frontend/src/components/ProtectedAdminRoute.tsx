import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router";

import { apiFetch } from "../lib/api";
import PageLoader from "./PageLoader";

type AdminMeResponse = {
  admin: {
    id: string;
    email: string;
  };
};

export default function ProtectedAdminRoute() {
  const location = useLocation();

  const { isLoading, isError } = useQuery({
    queryKey: ["admin", "me"],
    queryFn: () => apiFetch<AdminMeResponse>("/api/admin/me"),
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}