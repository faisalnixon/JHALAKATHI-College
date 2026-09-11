import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "../lib/api";

import type { Notice, NoticesResponse, NoticeFormData } from "../types/admin";

export function useNotices() {
  const queryClient = useQueryClient();

  const noticesQuery = useQuery({
    queryKey: ["notices"],
    queryFn: () => apiFetch<NoticesResponse>("/api/notices"),
  });

  const createNoticeMutation = useMutation({
    mutationFn: (data: NoticeFormData) =>
      apiFetch<{ notice: Notice }>("/api/notices", {
        method: "POST",
        body: JSON.stringify({
          content: data.content.trim(),
        }),
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
    },
  });

  const updateNoticeMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: NoticeFormData }) =>
      apiFetch<{ notice: Notice }>(`/api/notices/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          content: data.content.trim(),
        }),
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
    },
  });

  const deleteNoticeMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/api/notices/${id}`, {
        method: "DELETE",
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
    },
  });

  return {
    noticesQuery,
    createNoticeMutation,
    updateNoticeMutation,
    deleteNoticeMutation,
  };
}
