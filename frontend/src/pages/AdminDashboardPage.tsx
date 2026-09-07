import { type FormEvent, useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Navigate, useNavigate } from "react-router";

import {
  LoaderCircle,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  UserRound,
  X,
  Mail,
  Phone,
} from "lucide-react";

import { apiFetch } from "../lib/api";
import PageLoader from "../components/PageLoader";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

type Professor = {
  id: string;
  name: string;
  designation: "Professor" | "Assistant Professor" | "Lecturer";
  imageUrl: string | null;
  phoneNo: string | null;
  email: string | null;
  gender: "Male" | "Female" | "Other";
  createdAt: string;
  updatedAt: string;
};

type ProfessorsResponse = {
  professors: Professor[];
};

type AdminMeResponse = {
  admin: {
    id: string;
    email: string;
  };
};

type ProfessorFormData = {
  name: string;
  designation: "Professor" | "Assistant Professor" | "Lecturer";
  imageUrl: string;
  phoneNo: string;
  email: string;
  gender: "Male" | "Female" | "Other";
};

type FormMode = "add" | "edit" | null;

/* -------------------------------------------------------------------------- */
/*                              EMPTY FORM                                    */
/* -------------------------------------------------------------------------- */

const emptyProfessor: ProfessorFormData = {
  name: "",
  designation: "Professor",
  imageUrl: "",
  phoneNo: "",
  email: "",
  gender: "Female",
};

/* -------------------------------------------------------------------------- */
/*                         PROFESSOR FORM                                     */
/* -------------------------------------------------------------------------- */

type ProfessorFormProps = {
  mode: "add" | "edit";
  professorId?: string;
  initialData: ProfessorFormData;
  onClose: () => void;
};

function ProfessorForm({
  mode,
  professorId,
  initialData,
  onClose,
}: ProfessorFormProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<ProfessorFormData>(initialData);

  const [error, setError] = useState("");

  useEffect(() => {
    setForm(initialData);
    setError("");
  }, [initialData]);

  /* ------------------------------------------------------------------------ */
  /*                              CREATE                                      */
  /* ------------------------------------------------------------------------ */

  const createMutation = useMutation({
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

      onClose();
    },

    onError: (error) => {
      setError(
        error instanceof Error ? error.message : "Failed to create professor.",
      );
    },
  });

  /* ------------------------------------------------------------------------ */
  /*                              UPDATE                                      */
  /* ------------------------------------------------------------------------ */

  const updateMutation = useMutation({
    mutationFn: (data: ProfessorFormData) =>
      apiFetch<{ professor: Professor }>(`/api/professors/${professorId}`, {
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

      onClose();
    },

    onError: (error) => {
      setError(
        error instanceof Error ? error.message : "Failed to update professor.",
      );
    },
  });

  const saving = createMutation.isPending || updateMutation.isPending;

  function updateField<K extends keyof ProfessorFormData>(
    field: K,
    value: ProfessorFormData[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Professor name is required.");
      return;
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.imageUrl.trim() && !/^https?:\/\/.+/i.test(form.imageUrl.trim())) {
      setError("Image URL must start with http:// or https://");
      return;
    }

    if (mode === "add") {
      createMutation.mutate(form);
    } else {
      updateMutation.mutate(form);
    }
  }

  const previewImage = form.imageUrl.trim();

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      {/* Form body */}
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        {/* Image preview */}
        <div className="flex flex-col items-center gap-4 rounded-2xl border bg-muted/30 p-5">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Professor preview"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UserRound className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Enter an image URL below to preview the professor's photo.
          </p>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor={`${mode}-name`}>Full Name</Label>

          <Input
            id={`${mode}-name`}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Professor's full name"
            required
          />
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label htmlFor={`${mode}-designation`}>Designation</Label>

          <select
            id={`${mode}-designation`}
            value={form.designation}
            onChange={(event) =>
              updateField(
                "designation",
                event.target.value as ProfessorFormData["designation"],
              )
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          >
            <option value="Professor">Professor</option>

            <option value="Assistant Professor">Assistant Professor</option>

            <option value="Lecturer">Lecturer</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Label htmlFor={`${mode}-imageUrl`}>Image URL</Label>

          <Input
            id={`${mode}-imageUrl`}
            type="url"
            value={form.imageUrl}
            onChange={(event) => updateField("imageUrl", event.target.value)}
            placeholder="https://example.com/photo.jpg"
          />

          <p className="text-xs text-muted-foreground">
            Optional. Use a publicly accessible image URL.
          </p>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor={`${mode}-phoneNo`}>Phone Number</Label>

          <Input
            id={`${mode}-phoneNo`}
            type="tel"
            value={form.phoneNo}
            onChange={(event) => updateField("phoneNo", event.target.value)}
            placeholder="01XXXXXXXXX"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor={`${mode}-email`}>Email Address</Label>

          <Input
            id={`${mode}-email`}
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="professor@example.com"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor={`${mode}-gender`}>Gender</Label>

          <select
            id={`${mode}-gender`}
            value={form.gender}
            onChange={(event) =>
              updateField(
                "gender",
                event.target.value as ProfessorFormData["gender"],
              )
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          >
            <option value="Female">Female</option>

            <option value="Male">Male</option>

            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Form actions */}
      <div className="border-t bg-background px-6 py-4">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={saving}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button type="submit" disabled={saving} className="flex-1">
            {saving && <LoaderCircle className="animate-spin" />}

            {saving
              ? "Saving..."
              : mode === "add"
                ? "Save Professor"
                : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*                            MAIN DASHBOARD                                  */
/* -------------------------------------------------------------------------- */

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formMode, setFormMode] = useState<FormMode>(null);

  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(
    null,
  );

  const [currentPassword, setCurrentPassword] = useState("");

  const [newEmail, setNewEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [accountError, setAccountError] = useState("");

  const [accountMessage, setAccountMessage] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                           ADMIN                                          */
  /* ------------------------------------------------------------------------ */

  const adminQuery = useQuery({
    queryKey: ["admin", "me"],
    queryFn: () => apiFetch<AdminMeResponse>("/api/admin/me"),
  });

  /* ------------------------------------------------------------------------ */
  /*                         PROFESSORS                                       */
  /* ------------------------------------------------------------------------ */

  const professorsQuery = useQuery({
    queryKey: ["professors"],
    queryFn: () => apiFetch<ProfessorsResponse>("/api/professors"),
    // Only fetch professors once we know the admin session is valid —
    // avoids an extra request that would otherwise fire before the
    // redirect below has a chance to happen.
    enabled: !!adminQuery.data,
  });

  /* ------------------------------------------------------------------------ */
  /*                            DELETE                                        */
  /* ------------------------------------------------------------------------ */

  const deleteMutation = useMutation({
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

  /* ------------------------------------------------------------------------ */
  /*                           LOGOUT                                         */
  /* ------------------------------------------------------------------------ */

  const logoutMutation = useMutation({
    mutationFn: () =>
      apiFetch("/api/admin/logout", {
        method: "POST",
      }),

    onSettled: () => {
      queryClient.removeQueries({
        queryKey: ["admin", "me"],
      });

      navigate("/admin/login", {
        replace: true,
      });
    },
  });

  /* ------------------------------------------------------------------------ */
  /*                     CHANGE CREDENTIALS                                   */
  /* ------------------------------------------------------------------------ */

  const credentialsMutation = useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newEmail: string;
      newPassword: string;
    }) =>
      apiFetch("/api/admin/credentials", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      setAccountMessage(
        "Email and password changed successfully. Please login again.",
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      queryClient.removeQueries({
        queryKey: ["admin", "me"],
      });
    },

    onError: (error) => {
      setAccountError(
        error instanceof Error
          ? error.message
          : "Failed to change credentials.",
      );
    },
  });

  // Navigate to login 1.2s after a successful credentials change, with
  // proper cleanup so we never call navigate() on an unmounted component.
  useEffect(() => {
    if (!credentialsMutation.isSuccess) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      navigate("/admin/login", {
        replace: true,
      });
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [credentialsMutation.isSuccess, navigate]);

  /* ------------------------------------------------------------------------ */
  /*                         LOADING / AUTH                                   */
  /* ------------------------------------------------------------------------ */

  if (adminQuery.isLoading) {
    return <PageLoader />;
  }

  // Render a redirect element instead of calling navigate() during render.
  // Calling navigate() here would trigger a router state update while this
  // component is still rendering, which React (and StrictMode's double
  // invocation) flags as an unsafe cross-component update.
  if (adminQuery.isError || !adminQuery.data) {
    return <Navigate to="/admin/login" replace />;
  }

  const adminEmail = adminQuery.data.admin.email;

  /* ------------------------------------------------------------------------ */
  /*                         HANDLERS                                         */
  /* ------------------------------------------------------------------------ */

  function handleLogout() {
    logoutMutation.mutate();
  }

  function openAddProfessor() {
    setEditingProfessor(null);
    setFormMode("add");
  }

  function openEditProfessor(professor: Professor) {
    setEditingProfessor(professor);
    setFormMode("edit");
  }

  function closeProfessorForm() {
    setFormMode(null);
    setEditingProfessor(null);
  }

  function handleDeleteProfessor(professor: Professor) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${professor.name}?`,
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(professor.id);
  }

  function handleCredentialsChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAccountError("");
    setAccountMessage("");

    if (newPassword !== confirmNewPassword) {
      setAccountError("New password and confirmation password do not match.");

      return;
    }

    if (newPassword.length < 8) {
      setAccountError("New password must contain at least 8 characters.");

      return;
    }

    if (!newEmail.trim()) {
      setAccountError("Email is required.");

      return;
    }

    credentialsMutation.mutate({
      currentPassword,
      newEmail: newEmail.trim().toLowerCase(),
      newPassword,
    });
  }

  const professors = professorsQuery.data?.professors ?? [];

  const deletingId = deleteMutation.isPending ? deleteMutation.variables : null;

  /* ------------------------------------------------------------------------ */
  /*                           FORM DATA                                      */
  /* ------------------------------------------------------------------------ */

  const editingFormData: ProfessorFormData = editingProfessor
    ? {
        name: editingProfessor.name,
        designation: editingProfessor.designation,
        imageUrl: editingProfessor.imageUrl ?? "",
        phoneNo: editingProfessor.phoneNo ?? "",
        email: editingProfessor.email ?? "",
        gender: editingProfessor.gender,
      }
    : emptyProfessor;

  return (
    <>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
              Signed in as{" "}
              <strong className="text-foreground">{adminEmail}</strong>
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <LogOut />
            )}
            Logout
          </Button>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* PROFESSOR MANAGEMENT                                             */}
        {/* ---------------------------------------------------------------- */}

        <section className="mb-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                Professor Management
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Add, edit and remove professors displayed on the college
                website.
              </p>
            </div>

            <Button onClick={openAddProfessor} className="shadow-sm">
              <Plus />
              Add New Professor
            </Button>
          </div>

          {/* Error */}
          {professorsQuery.isError && (
            <Card className="border-destructive/30">
              <CardContent className="py-8 text-center">
                <p className="text-sm text-destructive">
                  Failed to load professors.
                </p>

                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => professorsQuery.refetch()}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Loading */}
          {professorsQuery.isLoading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="h-48 animate-pulse bg-muted" />

                  <CardContent className="space-y-3 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                    <div className="h-9 w-full animate-pulse rounded bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty */}
          {!professorsQuery.isLoading &&
            !professorsQuery.isError &&
            professors.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <UserRound className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="font-heading text-xl font-semibold">
                    No professors yet
                  </h3>

                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Add the first professor to start building your faculty list.
                  </p>

                  <Button className="mt-5" onClick={openAddProfessor}>
                    <Plus />
                    Add Professor
                  </Button>
                </CardContent>
              </Card>
            )}

          {/* Professor cards */}
          {!professorsQuery.isLoading && professors.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {professors.map((professor) => (
                <Card
                  key={professor.id}
                  className="group overflow-hidden border-border/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Photo */}
                  <div className="relative h-56 overflow-hidden bg-muted">
                    {professor.imageUrl ? (
                      <img
                        src={professor.imageUrl}
                        alt={professor.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <UserRound className="h-20 w-20 text-muted-foreground/50" />
                      </div>
                    )}

                    {/* Designation badge */}
                    <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
                      {professor.designation}
                    </div>
                  </div>

                  {/* Information */}
                  <CardContent className="p-5">
                    <h3 className="font-heading text-xl font-bold">
                      {professor.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-primary">
                      {professor.designation}
                    </p>

                    <div className="mt-4 space-y-2">
                      {professor.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 shrink-0" />

                          <span className="truncate">{professor.email}</span>
                        </div>
                      )}

                      {professor.phoneNo && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 shrink-0" />

                          <span>{professor.phoneNo}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-2 border-t pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => openEditProfessor(professor)}
                      >
                        <Pencil />
                        Edit
                      </Button>

                      <Button
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDeleteProfessor(professor)}
                        disabled={deletingId === professor.id}
                      >
                        {deletingId === professor.id ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          <Trash2 />
                        )}

                        <span className="sr-only">Delete {professor.name}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* ACCOUNT SETTINGS                                                 */}
        {/* ---------------------------------------------------------------- */}

        <Card>
          <CardHeader>
            <CardTitle>Admin Account</CardTitle>

            <CardDescription>
              Change the administrator email and password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {accountMessage && (
              <div
                role="status"
                className="mb-5 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-700"
              >
                {accountMessage}
              </div>
            )}

            {accountError && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
              >
                {accountError}
              </div>
            )}

            <form
              onSubmit={handleCredentialsChange}
              className="grid gap-5 md:grid-cols-2"
            >
              <div className="space-y-2">
                <Label>Current Email</Label>

                <Input value={adminEmail} readOnly className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newEmail">New Email</Label>

                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>

                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>

                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>

                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={credentialsMutation.isPending}
                  className="w-full sm:w-auto"
                >
                  {credentialsMutation.isPending && (
                    <LoaderCircle className="animate-spin" />
                  )}

                  {credentialsMutation.isPending
                    ? "Saving..."
                    : "Change Email & Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* ================================================================== */}
      {/* ADD PROFESSOR — CENTERED MODAL                                    */}
      {/* ================================================================== */}

      {formMode === "add" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProfessorForm();
            }
          }}
        >
          <div className="flex max-h-[90vh] w-full max-w-lg animate-in flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="font-heading text-2xl font-bold">
                  Add New Professor
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Add a professor to the faculty list.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={closeProfessorForm}
                aria-label="Close"
              >
                <X />
              </Button>
            </div>

            <ProfessorForm
              mode="add"
              initialData={emptyProfessor}
              onClose={closeProfessorForm}
            />
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* EDIT PROFESSOR — RIGHT DRAWER                                    */}
      {/* ================================================================== */}

      {formMode === "edit" && editingProfessor && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            onClick={closeProfessorForm}
          />

          {/* Drawer */}
          <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl animate-in slide-in-from-right flex-col border-l bg-background shadow-2xl duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Edit Professor
                </p>

                <h2 className="mt-1 truncate font-heading text-2xl font-bold">
                  {editingProfessor.name}
                </h2>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={closeProfessorForm}
                aria-label="Close"
              >
                <X />
              </Button>
            </div>

            <ProfessorForm
              mode="edit"
              professorId={editingProfessor.id}
              initialData={editingFormData}
              onClose={closeProfessorForm}
            />
          </aside>
        </>
      )}
    </>
  );
}
