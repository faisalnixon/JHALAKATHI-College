import { useEffect, useState } from "react";

import type { NoticeFormData } from "../../types/admin";

import { Button } from "../ui/button";
import { Label } from "../ui/label";

type NoticeFormProps = {
  mode: "add" | "edit";
  initialData: NoticeFormData;
  onClose: () => void;
  onCreate: (data: NoticeFormData) => void;
  onUpdate: (data: NoticeFormData) => void;
  saving?: boolean;
  error?: string;
};

function NoticeForm({
  mode,
  initialData,
  onClose,
  onCreate,
  onUpdate,
  saving = false,
  error,
}: NoticeFormProps) {
  const [content, setContent] = useState(initialData.content);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setContent(initialData.content);
    setValidationError("");
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setValidationError("Notice content is required.");
      return;
    }

    if (trimmedContent.length > 1000) {
      setValidationError("Notice cannot exceed 1000 characters.");
      return;
    }

    setValidationError("");

    const data: NoticeFormData = {
      content: trimmedContent,
    };

    if (mode === "add") {
      onCreate(data);
    } else {
      onUpdate(data);
    }
  };

  const currentLength = content.length;
  const hasError = Boolean(validationError || error);

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border-2 border-secondary/40 bg-primary-container/[0.99] p-5 shadow-sm transition-all duration-300 hover:shadow-md md:p-6"
    >
      {/* Notice field */}
      <div className="space-y-2">
        <Label
          htmlFor="notice-content"
          className="font-semibold text-on-primary-container"
        >
          Notice Content
        </Label>

        <textarea
          id="notice-content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            setValidationError("");
          }}
          disabled={saving}
          maxLength={1000}
          placeholder="Write the notice here..."
          className="min-h-40 w-full resize-y rounded-xl border-2 border-secondary/35 bg-formBg px-4 py-3 text-base text-on-surface outline-none transition-all duration-300 placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="flex justify-end text-xs font-medium text-on-primary-container/70">
          {currentLength}/1000
        </div>
      </div>

      {/* Error */}
      {hasError && (
        <div className="mt-4 rounded-xl border-2 border-error/20 bg-error-container/50 px-4 py-3 text-sm font-medium text-error animate-in fade-in slide-in-from-top-1 duration-200">
          {validationError || error}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-on-primary-container/10 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={saving}
          className="h-11 rounded-xl border-2 border-secondary/30 px-5 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/10 hover:shadow-sm"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={saving}
          className="h-11 rounded-xl bg-primary px-6 font-semibold text-on-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md disabled:opacity-60"
        >
          {saving
            ? mode === "add"
              ? "Adding..."
              : "Saving..."
            : mode === "add"
              ? "Add Notice"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default NoticeForm;
