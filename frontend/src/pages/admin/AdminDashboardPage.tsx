import { LogOut, Settings } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "../../lib/api";
import { useUiStore } from "../../store/useUiStore";

import type { AdminMeResponse } from "../../types/admin";

import PageLoader from "../../components/PageLoader";

import { Button } from "../../components/ui/button";

import ProfessorManagement from "../../components/admin/ProfessorManagement";
import EmployeeManagement from "../../components/admin/EmployeeManagement";
import ChangeCredentialsForm from "../../components/admin/ChangeCredentialsForm";

import NoticeManagement from "../../components/admin/NoticeManagement";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { openCredentialsForm } = useUiStore();

  /* ---------------------------------------------------------------------- */
  /* ADMIN SESSION                                                          */
  /* ---------------------------------------------------------------------- */

  const adminQuery = useQuery({
    queryKey: ["admin", "me"],
    queryFn: () => apiFetch<AdminMeResponse>("/api/admin/me"),
  });

  /* ---------------------------------------------------------------------- */
  /* LOGOUT                                                                 */
  /* ---------------------------------------------------------------------- */

  async function handleLogout() {
    try {
      await apiFetch("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      queryClient.removeQueries({
        queryKey: ["admin", "me"],
      });

      navigate("/admin/login", {
        replace: true,
      });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* LOADING                                                                */
  /* ---------------------------------------------------------------------- */

  if (adminQuery.isLoading) {
    return <PageLoader />;
  }

  /* ---------------------------------------------------------------------- */
  /* AUTH CHECK                                                             */
  /* ---------------------------------------------------------------------- */

  if (adminQuery.isError || !adminQuery.data) {
    return <Navigate to="/admin/login" replace />;
  }

  const adminEmail = adminQuery.data.admin.email;

  return (
    <>
      <main className="mx-auto w-full px-4 py-8 md:px-6 md:py-10">
        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <header className="mb-10 flex flex-col justify-between gap-5 border-b-2 border-primary/20 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Administration
            </p>

            <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Signed in as{" "}
              <span className="font-medium text-foreground">{adminEmail}</span>
            </p>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* ACCOUNT ACTIONS                                                */}
          {/* -------------------------------------------------------------- */}

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={openCredentialsForm}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Settings />
              Change Email & Password
            </Button>

            <Button type="button" variant="outline" onClick={handleLogout}>
              <LogOut />
              Logout
            </Button>
          </div>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* NOTICE MANAGEMENT                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-12  border-primary/10 pt-10">
          <NoticeManagement />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* PROFESSOR MANAGEMENT                                             */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-12 border-t-2 border-primary/10 pt-10">
          <ProfessorManagement />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* EMPLOYEE MANAGEMENT                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-12 border-t-2 border-primary/10 pt-10">
          <EmployeeManagement />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CHANGE EMAIL & PASSWORD                                            */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-12 border-t-2 border-primary/10 pt-10">
          <ChangeCredentialsForm currentEmail={adminEmail} />
        </div>
      </main>
    </>
  );
}
