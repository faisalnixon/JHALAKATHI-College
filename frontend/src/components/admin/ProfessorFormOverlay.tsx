import { useEffect } from "react";
import { X } from "lucide-react";

import type { ProfessorFormData } from "../../types/admin";

import { Button } from "../ui/button";

import ProfessorForm from "./ProfessorForm";

type ProfessorFormOverlayProps = {
  mode: "add" | "edit";
  initialData: ProfessorFormData;
  onClose: () => void;
  onCreate: (data: ProfessorFormData) => void;
  onUpdate: (data: ProfessorFormData) => void;
  saving?: boolean;
  error?: string;
};

export default function ProfessorFormOverlay({
  mode,
  initialData,
  onClose,
  onCreate,
  onUpdate,
  saving = false,
  error,
}: ProfessorFormOverlayProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !saving) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, saving]);

  const isEdit = mode === "edit";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="professor-form-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div
        className={`
          absolute
          flex
          flex-col
          overflow-hidden
          border-secondary
            bg-formBg
          shadow-2xl
          ${
            isEdit
              ? "right-0 top-0 h-full w-[85vw] rounded-l-3xl border-l-[3px] animate-in slide-in-from-right duration-500 ease-out"
              : "bottom-0 left-0 h-[85vh] w-full rounded-t-3xl border-t-[3px] animate-in slide-in-from-bottom duration-500 ease-out"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-secondary/30 bg-primary-container/[0.99] px-6 py-5 md:px-8">
          <div>
            <p className="font-label-md text-xs font-bold uppercase tracking-wider text-primary">
              Professor Management
            </p>

            <h2
              id="professor-form-title"
              className="mt-1 font-headline-lg text-headline-lg text-on-surface"
            >
              {isEdit ? "Edit Professor" : "Add Professor"}
            </h2>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={saving}
            aria-label="Close"
            className="rounded-full text-primary transition-colors hover:bg-primary/10"
          >
            <X />
          </Button>
        </div>

        {/* FORM */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
          <ProfessorForm
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
