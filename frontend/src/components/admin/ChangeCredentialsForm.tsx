


import { type FormEvent, useEffect, useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "../../lib/api";
import { useUiStore } from "../../store/useUiStore";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type ChangeCredentialsFormProps = {
  currentEmail: string;
};

export default function ChangeCredentialsForm({
  currentEmail,
}: ChangeCredentialsFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { credentialsFormOpen, closeCredentialsForm } = useUiStore();

  const [newEmail, setNewEmail] = useState(currentEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!credentialsFormOpen) {
      return;
    }

    setNewEmail(currentEmail);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
    setMessage("");
  }, [credentialsFormOpen, currentEmail]);

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
      setMessage(
        "Email and password changed successfully. Please login again.",
      );

      queryClient.removeQueries({
        queryKey: ["admin", "me"],
      });

      window.setTimeout(() => {
        navigate("/admin/login", {
          replace: true,
        });
      }, 1200);
    },

    onError: (error) => {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to change credentials.",
      );
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!newEmail.trim()) {
      setError("Email is required.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirmation password do not match.");
      return;
    }

    credentialsMutation.mutate({
      currentPassword,
      newEmail: newEmail.trim().toLowerCase(),
      newPassword,
    });
  }

  if (!credentialsFormOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            closeCredentialsForm();
          }
        }}
      />

      {/* Top panel */}
      <section className="fixed inset-x-0 top-0 z-50 flex h-[85vh] w-full flex-col overflow-hidden rounded-b-3xl border-b-[3px] border-secondary bg-primary-container/[0.99] shadow-2xl animate-in slide-in-from-top duration-500 ease-out">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-secondary/30 bg-primary-container/[0.99] px-6 py-5 md:px-8">
          <div>
            <p className="font-label-md text-xs font-bold uppercase tracking-wider text-primary">
              Admin Account
            </p>

            <h2 className="mt-1 font-headline-lg text-headline-lg text-on-surface">
              Change Email & Password
            </h2>

            <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
              Update the administrator login credentials.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={closeCredentialsForm}
            className="rounded-full text-primary transition-colors hover:bg-primary/10"
            disabled={credentialsMutation.isPending}
          >
            <X />

            <span className="sr-only">Close credentials form</span>
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8 bg-formBg">
          {/* Messages */}
          {message && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-primary/30 bg-primary/10 p-3 font-body-md text-body-md text-primary"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 font-body-md text-body-md text-destructive"
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border-2 border-secondary/40 bg-primary-container/[0.99] p-5 shadow-sm sm:p-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Current Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="current-admin-email"
                  className="font-label-md text-label-md font-semibold text-on-surface"
                >
                  Current Email
                </Label>

                <Input
                  id="current-admin-email"
                  value={currentEmail}
                  readOnly
                  className="h-11 rounded-xl border-secondary/30 bg-surface/[0.99]"
                />
              </div>

              {/* New Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="new-admin-email"
                  className="font-label-md text-label-md font-semibold text-on-surface"
                >
                  New Email
                </Label>

                <Input
                  id="new-admin-email"
                  type="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="h-11 rounded-xl border-secondary/40 bg-surface/[0.99]"
                />
              </div>

              {/* Current Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="current-admin-password"
                  className="font-label-md text-label-md font-semibold text-on-surface"
                >
                  Current Password
                </Label>

                <Input
                  id="current-admin-password"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="h-11 rounded-xl border-secondary/40 bg-surface/[0.99]"
                />
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="new-admin-password"
                  className="font-label-md text-label-md font-semibold text-on-surface"
                >
                  New Password
                </Label>

                <Input
                  id="new-admin-password"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-11 rounded-xl border-secondary/40 bg-surface/[0.99]"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="confirm-admin-password"
                  className="font-label-md text-label-md font-semibold text-on-surface"
                >
                  Confirm New Password
                </Label>

                <Input
                  id="confirm-admin-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-11 rounded-xl border-secondary/40 bg-surface/[0.99]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-secondary/30 pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={closeCredentialsForm}
                disabled={credentialsMutation.isPending}
                className="rounded-lg border-2 border-primary bg-transparent px-6 font-bold text-primary transition-all hover:bg-primary hover:text-white"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={credentialsMutation.isPending}
                className="rounded-lg bg-primary px-6 font-bold text-white shadow-none transition-all hover:bg-primary/90"
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
        </div>
      </section>
    </>
  );

}
