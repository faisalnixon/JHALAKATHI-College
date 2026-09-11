import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "../lib/api";
import type {Employee,EmployeesResponse,EmployeeFormData,} from "../types/admin";

export function useEmployees() {
  const queryClient = useQueryClient();

  /* employee list */
  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: () => apiFetch<EmployeesResponse>("/api/employees"),
  });

  /* create employee */
  const createEmployeeMutation = useMutation({
    mutationFn: (data: EmployeeFormData) =>
      apiFetch<{ employee: Employee }>("/api/employees", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          designation: data.designation.trim() || null,
          imageUrl: data.imageUrl.trim() || null,
          phoneNo: data.phoneNo.trim() || null,
          email: data.email.trim().toLowerCase(),
        }),
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });

  /* update employee */
  const updateEmployeeMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EmployeeFormData }) =>
      apiFetch<{ employee: Employee }>(`/api/employees/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...data,

          designation: data.designation.trim() || null,
          imageUrl: data.imageUrl.trim() || null,
          phoneNo: data.phoneNo.trim() || null,
          email: data.email.trim().toLowerCase(),
        }),
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });

  /* delete employee */
  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/api/employees/${id}`, {
        method: "DELETE",
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });

  return {
    employeesQuery,
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation,
  };
}
