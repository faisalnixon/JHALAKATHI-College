import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";

import type { EmployeeFormData, Gender } from "../../types/admin";

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

type EmployeeFormProps = {
  mode: "add" | "edit";
  initialData: EmployeeFormData;
  onClose: () => void;
  onCreate: (data: EmployeeFormData) => void;
  onUpdate: (data: EmployeeFormData) => void;
  saving?: boolean;
  error?: string;
};

const genderOptions: Gender[] = ["Male", "Female", "Other"];

export default function EmployeeForm({
  mode,
  initialData,
  onClose,
  onCreate,
  onUpdate,
  saving = false,
  error,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(initialData);
  const [validationError, setValidationError] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setFormData(initialData);
    setValidationError("");
    setImageError(false);
  }, [initialData]);

  function updateField<K extends keyof EmployeeFormData>(
    field: K,
    value: EmployeeFormData[K],
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
    const designation = formData.designation.trim();
    const bcsBatch = formData.bcsBatch.trim();
    const email = formData.email.trim();
    const phoneNo = formData.phoneNo.trim();
    const imageUrl = formData.imageUrl.trim();

    if (!name) {
      setValidationError("Employee name is required.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    const data: EmployeeFormData = {
      name,
      designation,
      bcsBatch,
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
            htmlFor={`${mode}-employee-name`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Name
          </Label>

          <Input
            id={`${mode}-employee-name`}
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Enter employee name"
            required
            disabled={saving}
            className="
              h-12 rounded-xl
              border-2 border-secondary/35
              bg-formBg
              px-4
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
            htmlFor={`${mode}-employee-designation`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Designation
          </Label>

          <Input
            id={`${mode}-employee-designation`}
            value={formData.designation}
            onChange={(event) => updateField("designation", event.target.value)}
            placeholder="Enter employee designation (optional)"
            disabled={saving}
            className="..."
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <Label
            htmlFor={`${mode}-employee-email`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Email
          </Label>

          <Input
            id={`${mode}-employee-email`}
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="employee@example.com (optional)"
            disabled={saving}
            className="..."
          />
        </div>

        {/* PHONE */}
        <div className="space-y-2">
          <Label
            htmlFor={`${mode}-employee-phone`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Phone Number
          </Label>

          <Input
            id={`${mode}-employee-phone`}
            value={formData.phoneNo}
            onChange={(event) => updateField("phoneNo", event.target.value)}
            placeholder="Enter phone number"
            disabled={saving}
            className="
              h-12 rounded-xl
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

        {/* BCS BATCH */}
        <div className="space-y-2">
          <Label
            htmlFor={`${mode}-employee-bcs-batch`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            BCS Batch
          </Label>

          <Input
            id={`${mode}-employee-bcs-batch`}
            value={formData.bcsBatch}
            onChange={(event) => updateField("bcsBatch", event.target.value)}
            placeholder="e.g. 30th BCS (optional)"
            disabled={saving}
            className="
              h-12 rounded-xl
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

        {/* IMAGE URL + PREVIEW */}
        <div className="space-y-2 sm:col-span-2">
          <Label
            htmlFor={`${mode}-employee-image`}
            className="font-label-md text-label-md font-semibold text-on-surface"
          >
            Image URL
          </Label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* IMAGE INPUT */}
            <div className="min-w-0 flex-1">
              <Input
                id={`${mode}-employee-image`}
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
                  alt="Employee preview"
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
            htmlFor={`${mode}-employee-gender`}
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
              id={`${mode}-employee-gender`}
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
              ? "Add Employee"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

// import { useEffect, useState } from "react";
// import { ImageIcon } from "lucide-react";

// import type { EmployeeFormData, Gender } from "../../types/admin";

// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

// type EmployeeFormProps = {
//   mode: "add" | "edit";
//   initialData: EmployeeFormData;
//   onClose: () => void;
//   onCreate: (data: EmployeeFormData) => void;
//   onUpdate: (data: EmployeeFormData) => void;
//   saving?: boolean;
//   error?: string;
// };

// const genderOptions: Gender[] = ["Male", "Female", "Other"];

// export default function EmployeeForm({
//   mode,
//   initialData,
//   onClose,
//   onCreate,
//   onUpdate,
//   saving = false,
//   error,
// }: EmployeeFormProps) {
//   const [formData, setFormData] = useState<EmployeeFormData>(initialData);
//   const [validationError, setValidationError] = useState("");
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     setFormData(initialData);
//     setValidationError("");
//     setImageError(false);
//   }, [initialData]);

//   function updateField<K extends keyof EmployeeFormData>(
//     field: K,
//     value: EmployeeFormData[K],
//   ) {
//     setFormData((current) => ({
//       ...current,
//       [field]: value,
//     }));

//     if (field === "imageUrl") {
//       setImageError(false);
//     }
//   }

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const name = formData.name.trim();
//     const designation = formData.designation.trim();
//     const email = formData.email.trim();
//     const phoneNo = formData.phoneNo.trim();
//     const imageUrl = formData.imageUrl.trim();

//     if (!name) {
//       setValidationError("Employee name is required.");
//       return;
//     }

//     if (!designation) {
//       setValidationError("Employee designation is required.");
//       return;
//     }

//     if (!email) {
//       setValidationError("Employee email is required.");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setValidationError("Please enter a valid email address.");
//       return;
//     }

//     const data: EmployeeFormData = {
//       name,
//       designation,
//       imageUrl,
//       phoneNo,
//       email,
//       gender: formData.gender,
//     };

//     setValidationError("");

//     if (mode === "add") {
//       onCreate(data);
//     } else {
//       onUpdate(data);
//     }
//   }

//   const imageUrl = formData.imageUrl.trim();

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="
//         rounded-2xl
//         border-2 border-secondary/40
//         bg-primary-container/[0.99]
//         p-5
//         shadow-sm
//         sm:p-6
//       "
//     >
//       <div className="grid gap-6 sm:grid-cols-2">
//         {/* NAME */}
//         <div className="space-y-2">
//           <Label
//             htmlFor={`${mode}-employee-name`}
//             className="font-label-md text-label-md font-semibold text-on-surface"
//           >
//             Name
//           </Label>

//           <Input
//             id={`${mode}-employee-name`}
//             value={formData.name}
//             onChange={(event) => updateField("name", event.target.value)}
//             placeholder="Enter employee name"
//             required
//             disabled={saving}
//             className="
//               h-12 rounded-xl
//               border-2 border-secondary/35
//               bg-formBg
//               px-4
//               shadow-sm
//               transition-all duration-200
//               hover:border-secondary/60
//               focus:border-primary
//               focus:ring-4 focus:ring-primary/15
//             "
//           />
//         </div>

//         {/* DESIGNATION */}
//         <div className="space-y-2">
//           <Label
//             htmlFor={`${mode}-employee-designation`}
//             className="font-label-md text-label-md font-semibold text-on-surface"
//           >
//             Designation
//           </Label>

//           <Input
//             id={`${mode}-employee-designation`}
//             value={formData.designation}
//             onChange={(event) => updateField("designation", event.target.value)}
//             placeholder="Enter employee designation"
//             required
//             disabled={saving}
//             className="
//               h-12 rounded-xl
//               border-2 border-secondary/35
//               bg-formBg
//               px-4
//               shadow-sm
//               transition-all duration-200
//               hover:border-secondary/60
//               focus:border-primary
//               focus:ring-4 focus:ring-primary/15
//             "
//           />
//         </div>

//         {/* EMAIL */}
//         <div className="space-y-2">
//           <Label
//             htmlFor={`${mode}-employee-email`}
//             className="font-label-md text-label-md font-semibold text-on-surface"
//           >
//             Email
//           </Label>

//           <Input
//             id={`${mode}-employee-email`}
//             type="email"
//             value={formData.email}
//             onChange={(event) => updateField("email", event.target.value)}
//             placeholder="employee@example.com"
//             required
//             disabled={saving}
//             className="
//               h-12 rounded-xl
//               border-2 border-secondary/35
//               bg-formBg
//               px-4
//               shadow-sm
//               transition-all duration-200
//               hover:border-secondary/60
//               focus:border-primary
//               focus:ring-4 focus:ring-primary/15
//             "
//           />
//         </div>

//         {/* PHONE */}
//         <div className="space-y-2">
//           <Label
//             htmlFor={`${mode}-employee-phone`}
//             className="font-label-md text-label-md font-semibold text-on-surface"
//           >
//             Phone Number
//           </Label>

//           <Input
//             id={`${mode}-employee-phone`}
//             value={formData.phoneNo}
//             onChange={(event) => updateField("phoneNo", event.target.value)}
//             placeholder="Enter phone number"
//             disabled={saving}
//             className="
//               h-12 rounded-xl
//               border-2 border-secondary/35
//               bg-formBg
//               px-4
//               shadow-sm
//               transition-all duration-200
//               hover:border-secondary/60
//               focus:border-primary
//               focus:ring-4
//               focus:ring-primary/15
//             "
//           />
//         </div>

//         {/* IMAGE URL + PREVIEW */}
//         <div className="space-y-2 sm:col-span-2">
//           <Label
//             htmlFor={`${mode}-employee-image`}
//             className="font-label-md text-label-md font-semibold text-on-surface"
//           >
//             Image URL
//           </Label>

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//             {/* IMAGE INPUT */}
//             <div className="min-w-0 flex-1">
//               <Input
//                 id={`${mode}-employee-image`}
//                 type="url"
//                 value={formData.imageUrl}
//                 onChange={(event) =>
//                   updateField("imageUrl", event.target.value)
//                 }
//                 placeholder="https://example.com/image.jpg"
//                 disabled={saving}
//                 className="
//                   h-12 w-full
//                   rounded-xl
//                   border-2 border-secondary/35
//                   bg-formBg
//                   px-4
//                   shadow-sm
//                   transition-all duration-200
//                   hover:border-secondary/60
//                   focus:border-primary
//                   focus:ring-4
//                   focus:ring-primary/15
//                 "
//               />
//             </div>

//             {/* IMAGE PREVIEW */}
//             <div
//               className="
//                 relative
//                 flex h-40 w-40 shrink-0
//                 items-center justify-center
//                 overflow-hidden
//                 rounded-2xl
//                 border-2 border-secondary/40
//                 bg-formBg
//                 shadow-sm
//                 transition-all duration-300
//               "
//             >
//               {imageUrl && !imageError ? (
//                 <img
//                   src={imageUrl}
//                   alt="Employee preview"
//                   className="
//                     h-full
//                     w-full
//                     object-cover
//                     transition-all duration-300
//                   "
//                   onLoad={() => setImageError(false)}
//                   onError={() => setImageError(true)}
//                 />
//               ) : (
//                 <div className="flex flex-col items-center justify-center gap-1 text-secondary/70">
//                   <ImageIcon className="h-7 w-7" />
//                   <span className="text-[10px] font-semibold uppercase tracking-wide">
//                     Preview
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* GENDER */}
//         <div className="space-y-2">
//           <Label
//             htmlFor={`${mode}-employee-gender`}
//             className="font-label-md text-label-md font-semibold text-on-surface"
//           >
//             Gender
//           </Label>

//           <Select
//             value={formData.gender}
//             onValueChange={(value) => updateField("gender", value as Gender)}
//             disabled={saving}
//           >
//             <SelectTrigger
//               id={`${mode}-employee-gender`}
//               className="
//                 h-12 w-full
//                 rounded-xl
//                 border-2 border-secondary/35
//                 bg-formBg
//                 px-4
//                 font-body-md text-body-md
//                 text-on-surface
//                 shadow-sm
//                 transition-all duration-200
//                 hover:border-secondary/60
//                 focus:border-primary
//                 focus:ring-4
//                 focus:ring-primary/15
//               "
//             >
//               <SelectValue placeholder="Select gender" />
//             </SelectTrigger>

//             <SelectContent
//               sideOffset={4}
//               className="
//                 rounded-xl
//                 border-2 border-secondary/35
//                 bg-formBg
//                 p-1.5
//                 shadow-xl
//                 animate-in
//                 fade-in-0
//                 zoom-in-95
//                 duration-200
//               "
//             >
//               {genderOptions.map((gender) => (
//                 <SelectItem
//                   key={gender}
//                   value={gender}
//                   className="
//                     my-0.5
//                     rounded-lg
//                     px-3
//                     py-2.5
//                     font-body-md
//                     text-on-surface
//                     outline-none
//                     transition-all duration-150
//                     focus:bg-primary/10
//                     focus:text-primary
//                     data-[state=checked]:bg-primary/10
//                     data-[state=checked]:font-semibold
//                     data-[state=checked]:text-primary
//                   "
//                 >
//                   {gender}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {(validationError || error) && (
//         <p className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-3 font-body-md text-body-md text-destructive">
//           {validationError || error}
//         </p>
//       )}

//       <div className="mt-6 flex flex-col-reverse gap-3 border-t border-secondary/30 pt-6 sm:flex-row sm:justify-end">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onClose}
//           disabled={saving}
//           className="rounded-xl border-2 border-secondary/40"
//         >
//           Cancel
//         </Button>

//         <Button
//           type="submit"
//           disabled={saving}
//           className="rounded-xl bg-primary font-bold text-white hover:bg-primary/90"
//         >
//           {saving
//             ? "Saving..."
//             : mode === "add"
//               ? "Add Employee"
//               : "Save Changes"}
//         </Button>
//       </div>
//     </form>
//   );
// }
