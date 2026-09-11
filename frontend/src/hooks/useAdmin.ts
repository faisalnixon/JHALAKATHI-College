import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { apiFetch } from "../lib/api";
import type { AdminMeResponse } from "../types/admin";

export function useAdmin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adminQuery = useQuery({
    queryKey: ["admin", "me"],
    queryFn: () => apiFetch<AdminMeResponse>("/api/admin/me"),
  });

  const logoutMutation = useMutation({
    mutationFn: () =>
      apiFetch("/api/admin/logout", {
        method: "POST",
      }),

    onSettled: () => {
      queryClient.removeQueries({
        queryKey: ["admin", "me"],
      });

      navigate("/admin/login", { replace: true, });
    },
  });

  const credentialsMutation = useMutation({
    mutationFn: ( data:{ currentPassword: string; newEmail: string; newPassword: string; }) =>
      apiFetch("/api/admin/credentials", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["admin", "me"],
      });
    },
  });

  return {
    adminQuery,
    logoutMutation,
    credentialsMutation,
  };
}
