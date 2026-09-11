import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";

import type {
  Gender,
  ProfessorDesignation,
  ProfessorFormData,
} from "../../types/admin";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ProfessorFormProps = {
  mode: "add" | "edit";
  initialData: ProfessorFormData;
  onClose: () => void;
  onCreate: (data: ProfessorFormData) => void;
  onUpdate: (data: ProfessorFormData) => void;
  saving?: boolean;
  error?: string;
};

const designationOptions: ProfessorDesignation[] = [
  "Professor",
  "Assistant Professor",
  "Lecturer",
  "Exhibitor",
];

const genderOptions: Gender[] = ["Male", "Female", "Other"];

export default function ProfessorForm({
  mode,
  initialData,
  onClose,
  onCreate,
  onUpdate,
  saving = false,
  error,
}: ProfessorFormProps) {
  const [formData, setFormData] = useState<ProfessorFormData>(initialData);
  const [validationError, setValidationError] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setFormData(initialData);
    setValidationError("");
    setImageError(false);
  }, [initialData]);

  function updateField<K extends keyof ProfessorFormData>(
    field: K,
    value: ProfessorFormData[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (field === "imageUrl") {
      setImageError(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phoneNo = formData.phoneNo.trim();
    const imageUrl = formData.imageUrl.trim();

    if (!name) {
      setValidationError("Professor name is required.");
      return;
    }

    if (!designationOptions.includes(formData.designation)) {
      setValidationError("Please select a valid professor designation.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    const data: ProfessorFormData = {
      name,
      designation: formData.designation,
      imageUrl,
      phoneNo,
      email,
      gender: formData.gender,
    };

    setValidationError("");

    if (mode === "add") {
      onCreate(data);
    } else {
      onUpdate(data);
    }
  }

  const imageUrl = formData.imageUrl.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        border-2 border-secondary/40
        bg-primary-container/[0.99]
        p-5
        shadow-sm
        sm:p-6
      "
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {/* NAME */}
        <div className="space-y-2">
          <Label
            htmlFor={`${mode}-professor-name`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Name
          </Label>

          <Input
            id={`${mode}-professor-name`}
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Enter professor name"
            required
            disabled={saving}
            className="
              h-12 rounded-xl
              border-2 border-secondary/35
              bg-formBg
              pl-4 pr-4
              shadow-sm
              transition-all duration-200
              hover:border-secondary/60
              focus:border-primary
              focus:ring-4 focus:ring-primary/15
            "
          />
        </div>

        {/* DESIGNATION */}
        <div className="space-y-2">
          <Label
            htmlFor={`${mode}-professor-designation`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Designation
          </Label>

          <Select
            value={formData.designation}
            onValueChange={(value) =>
              updateField("designation", value as ProfessorDesignation)
            }
            disabled={saving}
          >
            <SelectTrigger
              id={`${mode}-professor-designation`}
              className="
                h-12 w-full
                rounded-xl
                border-2 border-secondary/35
                bg-formBg
                px-4
                font-body-md text-body-md
                text-on-surface
                shadow-sm
                transition-all duration-200
                hover:border-secondary/60
                focus:border-primary
                focus:ring-4
                focus:ring-primary/15
              "
            >
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>

            <SelectContent
              sideOffset={4}
              className="
                rounded-xl
                border-2 border-secondary/35
                bg-formBg
                p-1.5
                shadow-xl
                animate-in
                fade-in-0
                zoom-in-95
                duration-200
              "
            >
              {designationOptions.map((designation) => (
                <SelectItem
                  key={designation}
                  value={designation}
                  className="
                    my-0.5
                    rounded-lg
                    px-3
                    py-2.5
                    font-body-md
                    text-on-surface
                    outline-none
                    transition-all duration-150
                    focus:bg-primary/10
                    focus:text-primary
                    data-[state=checked]:bg-primary/10
                    data-[state=checked]:font-semibold
                    data-[state=checked]:text-primary
                  "
                >
                  {designation}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <Label
            htmlFor={`${mode}-professor-email`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Email
          </Label>

          <Input
            id={`${mode}-professor-email`}
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="professor@example.com"
            disabled={saving}
            className="
              h-12 rounded-xl
              border-2 border-secondary/35
              bg-formBg
              pl-4 pr-4
              shadow-sm
              transition-all duration-200
              hover:border-secondary/60
              focus:border-primary
              focus:ring-4 focus:ring-primary/15
            "
          />
        </div>

        {/* PHONE */}
        <div className="space-y-2">
          <Label
            htmlFor={`${mode}-professor-phone`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Phone Number
          </Label>

          <Input
            id={`${mode}-professor-phone`}
            value={formData.phoneNo}
            onChange={(event) => updateField("phoneNo", event.target.value)}
            placeholder="Enter phone number"
            disabled={saving}
            className="
              h-12 rounded-xl
              border-2 border-secondary/35
              bg-formBg
              pl-4 pr-4
              shadow-sm
              transition-all duration-200
              hover:border-secondary/60
              focus:border-primary
              focus:ring-4
              focus:ring-primary/15
            "
          />
        </div>

        {/* IMAGE URL + PREVIEW */}
        <div className="space-y-2 sm:col-span-2">
          <Label
            htmlFor={`${mode}-professor-image`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Image URL
          </Label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* IMAGE INPUT */}
            <div className="min-w-0 flex-1">
              <Input
                id={`${mode}-professor-image`}
                type="url"
                value={formData.imageUrl}
                onChange={(event) =>
                  updateField("imageUrl", event.target.value)
                }
                placeholder="https://example.com/image.jpg"
                disabled={saving}
                className="
                  h-12 w-full
                  rounded-xl
                  border-2 border-secondary/35
                  bg-formBg
                  px-4
                  shadow-sm
                  transition-all duration-200
                  hover:border-secondary/60
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/15
                "
              />
            </div>

            {/* IMAGE PREVIEW */}
            <div
              className="
                relative
                flex h-40 w-40 shrink-0
                items-center justify-center
                overflow-hidden
                rounded-2xl
                border-2 border-secondary/40
                bg-formBg
                shadow-sm
                transition-all duration-300
              "
            >
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt="Professor preview"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-all duration-300
                  "
                  onLoad={() => setImageError(false)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 text-secondary/70">
                  <ImageIcon className="h-7 w-7" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    Preview
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GENDER */}
        <div className="space-y-2">
          <Label
            htmlFor={`${mode}-professor-gender`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Gender
          </Label>

          <Select
            value={formData.gender}
            onValueChange={(value) => updateField("gender", value as Gender)}
            disabled={saving}
          >
            <SelectTrigger
              id={`${mode}-professor-gender`}
              className="
                h-12 w-full
                rounded-xl
                border-2 border-secondary/35
                bg-formBg
                px-4
                font-body-md text-body-md
                text-on-surface
                shadow-sm
                transition-all duration-200
                hover:border-secondary/60
                focus:border-primary
                focus:ring-4
                focus:ring-primary/15
              "
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>

            <SelectContent
              sideOffset={4}
              className="
                rounded-xl
                border-2 border-secondary/35
                bg-formBg
                p-1.5
                shadow-xl
                animate-in
                fade-in-0
                zoom-in-95
                duration-200
              "
            >
              {genderOptions.map((gender) => (
                <SelectItem
                  key={gender}
                  value={gender}
                  className="
                    my-0.5
                    rounded-lg
                    px-3
                    py-2.5
                    font-body-md
                    text-on-surface
                    outline-none
                    transition-all duration-150
                    focus:bg-primary/10
                    focus:text-primary
                    data-[state=checked]:bg-primary/10
                    data-[state=checked]:font-semibold
                    data-[state=checked]:text-primary
                  "
                >
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(validationError || error) && (
        <p className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-3 font-body-md text-body-md text-destructive">
          {validationError || error}
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-secondary/30 pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={saving}
          className="rounded-xl border-2 border-secondary/40"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary font-bold text-white hover:bg-primary/90"
        >
          {saving
            ? "Saving..."
            : mode === "add"
              ? "Add Professor"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}