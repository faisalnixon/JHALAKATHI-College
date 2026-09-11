import { useEffect } from "react";

import type { NoticeFormData } from "../../types/admin";

import NoticeForm from "./NoticeForm";

type NoticeFormOverlayProps = {
  mode: "add" | "edit";
  initialData: NoticeFormData;
  onClose: () => void;
  onCreate: (data: NoticeFormData) => void;
  onUpdate: (data: NoticeFormData) => void;
  saving?: boolean;
  error?: string;
};

function NoticeFormOverlay({
  mode,
  initialData,
  onClose,
  onCreate,
  onUpdate,
  saving = false,
  error,
}: NoticeFormOverlayProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, saving]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !saving) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex bg-formBg backdrop-blur-[2px] animate-in fade-in duration-300"
      onMouseDown={handleBackdropClick}
    >
      <div
        className={
          mode === "edit"
            ? "absolute right-0 top-0 h-full w-[85vw] max-w-2xl rounded-l-3xl border-l-[3px] border-primary bg-background shadow-2xl animate-in slide-in-from-right duration-500 ease-out"
            : "absolute bottom-0 left-0 h-[85vh] w-full rounded-t-3xl border-t-[3px] border-primary bg-background shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out"
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[calc(1.5rem-3px)] bg-primary-container px-5 py-5 md:px-7">
          <div>
            <h2 className="font-heading text-2xl font-bold text-on-primary-container">
              {mode === "edit" ? "Edit Notice" : "Add Notice"}
            </h2>

            <p className="mt-1 text-sm text-on-primary-container/80">
              {mode === "edit"
                ? "Update the website notice."
                : "Create a new website notice."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-semibold text-on-primary-container transition-all duration-300 hover:rotate-90 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="h-[calc(100%-96px)] overflow-y-auto p-5 md:p-7">
          <NoticeForm
            mode={mode}
            initialData={initialData}
            onClose={onClose}
            onCreate={onCreate}
            onUpdate={onUpdate}
            saving={saving}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default NoticeFormOverlay;
