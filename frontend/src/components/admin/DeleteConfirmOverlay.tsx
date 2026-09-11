import { AlertTriangle, X } from "lucide-react";

import { Button } from "../ui/button";

type DeleteConfirmOverlayProps = {
  open: boolean;
  title: string;
  message: string;
  deleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmOverlay({
  open,
  title,
  message,
  deleting = false,
  onCancel,
  onConfirm,
}: DeleteConfirmOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px] animate-in fade-in duration-200"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-confirm-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl border-[3px] border-secondary bg-primary-container/[0.99] shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-secondary/30 px-6 py-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>

            <div>
              <h2
                id="delete-confirm-title"
                className="font-headline-lg text-xl font-bold text-on-surface"
              >
                {title}
              </h2>

              <p className="mt-1 font-body-md text-sm text-on-surface-variant">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-full text-primary hover:bg-primary/10"
            aria-label="Close"
          >
            <X />
          </Button>
        </div>

        {/* Message */}
        <div className="px-6 py-6">
          <p className="font-body-md text-body-md text-on-surface">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-secondary/30 px-6 py-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-lg border-2 border-primary bg-transparent px-6 font-bold text-primary transition-all hover:bg-primary hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-lg bg-destructive px-6 font-bold text-white hover:bg-destructive/90"
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}