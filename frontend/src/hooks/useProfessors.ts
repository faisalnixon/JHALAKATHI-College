import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "../lib/api";
import type {Professor,ProfessorsResponse,ProfessorFormData,} from "../types/admin";

export function useProfessors() {
  const queryClient = useQueryClient();

  /* professor list*/
  const professorsQuery = useQuery({
    queryKey: ["professors"],
    queryFn: () => apiFetch<ProfessorsResponse>("/api/professors"),
  });

  /* create professor */
  const createProfessorMutation = useMutation({
    mutationFn: (data: ProfessorFormData) =>
      apiFetch<{ professor: Professor }>("/api/professors", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          imageUrl: data.imageUrl.trim() || null,
          phoneNo: data.phoneNo.trim() || null,
          email: data.email.trim() || null,
        }),
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["professors"],
      });
    },
  });

  /* update professor */
  const updateProfessorMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProfessorFormData }) =>
      apiFetch<{ professor: Professor }>(`/api/professors/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...data,
          imageUrl: data.imageUrl.trim() || null,
          phoneNo: data.phoneNo.trim() || null,
          email: data.email.trim() || null,
        }),
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["professors"],
      });
    },
  });

  /* delete professor */
  const deleteProfessorMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/api/professors/${id}`, {
        method: "DELETE",
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["professors"],
      });
    },
  });

  return {
    professorsQuery,
    createProfessorMutation,
    updateProfessorMutation,
    deleteProfessorMutation,
  };
}
