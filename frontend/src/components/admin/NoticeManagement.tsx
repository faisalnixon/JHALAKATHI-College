import { LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { useNotices } from "../../hooks/useNotices";
import type { Notice, NoticeFormData } from "../../types/admin";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import NoticeFormOverlay from "./NoticeFormOverlay";
import DeleteConfirmOverlay from "./DeleteConfirmOverlay";

const emptyNotice: NoticeFormData = {
  content: "",
};

function NoticeManagement() {
  const {
    noticesQuery,
    createNoticeMutation,
    updateNoticeMutation,
    deleteNoticeMutation,
  } = useNotices();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [deletingNoticeId, setDeletingNoticeId] = useState<string | null>(null);
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);

  const notices = noticesQuery.data?.notices ?? [];

  const saving =
    createNoticeMutation.isPending || updateNoticeMutation.isPending;

  const handleAdd = () => {
    setFormMode("add");
    setEditingNotice(null);
    setFormOpen(true);
  };

  const handleEdit = (notice: Notice) => {
    setFormMode("edit");
    setEditingNotice(notice);
    setFormOpen(true);
  };

  const handleClose = () => {
    if (saving) return;

    setFormOpen(false);
    setEditingNotice(null);
  };

  const handleCreate = (data: NoticeFormData) => {
    createNoticeMutation.mutate(data, {
      onSuccess: () => {
        setFormOpen(false);
        setEditingNotice(null);
      },
    });
  };

  const handleUpdate = (data: NoticeFormData) => {
    if (!editingNotice) return;

    updateNoticeMutation.mutate(
      {
        id: editingNotice.id,
        data,
      },
      {
        onSuccess: () => {
          setFormOpen(false);
          setEditingNotice(null);
        },
      },
    );
  };

  const handleDelete = (notice: Notice) => {
    setNoticeToDelete(notice);
  };

  const handleConfirmDelete = () => {
    if (!noticeToDelete) return;

    setDeletingNoticeId(noticeToDelete.id);

    deleteNoticeMutation.mutate(noticeToDelete.id, {
      onSuccess: () => {
        setNoticeToDelete(null);
      },
      onSettled: () => {
        setDeletingNoticeId(null);
      },
    });
  };

  const handleCancelDelete = () => {
    if (deletingNoticeId) return;

    setNoticeToDelete(null);
  };

  const formInitialData: NoticeFormData = editingNotice
    ? {
        content: editingNotice.content,
      }
    : emptyNotice;

  const formError =
    createNoticeMutation.error instanceof Error
      ? createNoticeMutation.error.message
      : updateNoticeMutation.error instanceof Error
        ? updateNoticeMutation.error.message
        : undefined;

  return (
    <>
      <section className="mx-auto w-[96%] rounded-3xl bg-surface-container-low p-6 md:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>

            <p className="mt-1 text-sm font-medium text-on-surface-variant md:text-base">
              Notice & Information
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
              Manage the notices displayed in the latest updates ticker.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleAdd}
            className="h-11 shrink-0 rounded-xl bg-primary px-5 font-semibold text-cyan-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Notice
          </Button>
        </div>

        {/* Loading */}
        {noticesQuery.isLoading && (
          <div className="flex min-h-32 items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-surface-container-lowest">
            <LoaderCircle className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {/* Error */}
        {noticesQuery.isError && (
          <div className="rounded-2xl border-2 border-error/20 bg-error-container/40 p-5 text-sm font-medium text-error">
            {noticesQuery.error instanceof Error
              ? noticesQuery.error.message
              : "Failed to load notices."}
          </div>
        )}

        {/* Empty */}
        {!noticesQuery.isLoading &&
          !noticesQuery.isError &&
          notices.length === 0 && (
            <div className="flex min-h-32 items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-surface-container-lowest text-sm font-medium text-on-surface-variant">
              No notices available.
            </div>
          )}

        {/* Notice list */}
        {!noticesQuery.isLoading &&
          !noticesQuery.isError &&
          notices.length > 0 && (
            <div className="grid gap-4">
              {notices.map((notice, index) => (
                <Card
                  key={notice.id}
                  className="group overflow-hidden border-2 border-[#e9e9e9d1] bg-[#fdfdfd] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:p-6">
                      {/* Number */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-container font-bold text-on-primary-container transition-transform duration-300 group-hover:scale-105">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p className="break-words text-base font-semibold leading-7 text-on-surface">
                          {notice.content}
                        </p>

                        <p className="mt-1 text-xs font-medium text-on-surface-variant">
                          {new Date(notice.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-2 border-t border-border-neutral pt-4 md:border-t-0 md:border-l md:pl-5 md:pt-0">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleEdit(notice)}
                          className="h-10 rounded-xl border-2 border-primary/25 px-4 font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-sm"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          disabled={deletingNoticeId === notice.id}
                          onClick={() => handleDelete(notice)}
                          className="h-10 rounded-xl border-2 border-error/20 px-4 font-semibold text-error transition-all duration-300 hover:-translate-y-0.5 hover:bg-error/10 hover:shadow-sm disabled:opacity-60"
                        >
                          {deletingNoticeId === notice.id ? (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
      </section>

      {/* Add / Edit overlay */}
      {formOpen && (
        <NoticeFormOverlay
          mode={formMode}
          initialData={formInitialData}
          onClose={handleClose}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          saving={saving}
          error={formError}
        />
      )}

      <DeleteConfirmOverlay
        open={noticeToDelete !== null}
        title="Delete Notice?"
        message={
          noticeToDelete
            ? `Are you sure you want to delete this notice? "${noticeToDelete.content}"`
            : ""
        }
        deleting={deletingNoticeId !== null}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default NoticeManagement;
