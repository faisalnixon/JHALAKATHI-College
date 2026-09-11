import { useState } from "react";
import { LoaderCircle, Plus, UserRound } from "lucide-react";

import { useProfessors } from "../../hooks/useProfessors";
import { useUiStore } from "../../store/useUiStore";

import type { Professor, ProfessorFormData } from "../../types/admin";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import ProfessorCard from "./ProfessorCard";
import ProfessorFormOverlay from "./ProfessorFormOverlay";
import DeleteConfirmOverlay from "./DeleteConfirmOverlay";

const emptyProfessor: ProfessorFormData = {
  name: "",
  designation: "Professor",
  imageUrl: "",
  phoneNo: "",
  email: "",
  gender: "Female",
};

export default function ProfessorManagement() {
  const {
    professorFormOpen,
    professorFormMode,
    openProfessorAddForm,
    openProfessorEditForm,
    closeProfessorForm,
  } = useUiStore();

  const {
    professorsQuery,
    createProfessorMutation,
    updateProfessorMutation,
    deleteProfessorMutation,
  } = useProfessors();

  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(
    null,
  );
  const [deletingProfessor, setDeletingProfessor] = useState<Professor | null>(
    null,
  );

  /* ---------------------------------------------------------------------- */
  /* OPEN ADD                                                               */
  /* ---------------------------------------------------------------------- */

  function handleAddProfessor() {
    setEditingProfessor(null);
    openProfessorAddForm();
  }

  /* ---------------------------------------------------------------------- */
  /* OPEN EDIT                                                              */
  /* ---------------------------------------------------------------------- */

  function handleEditProfessor(professor: Professor) {
    setEditingProfessor(professor);
    openProfessorEditForm();
  }

  /* ---------------------------------------------------------------------- */
  /* CLOSE FORM                                                             */
  /* ---------------------------------------------------------------------- */

  function handleCloseForm() {
    setEditingProfessor(null);
    closeProfessorForm();
  }

  /* ---------------------------------------------------------------------- */
  /* DELETE                                                                 */
  /* ---------------------------------------------------------------------- */

  function handleDeleteProfessor(professor: Professor) {
    setDeletingProfessor(professor);
  }

  function handleConfirmDeleteProfessor() {
    if (!deletingProfessor) {
      return;
    }

    deleteProfessorMutation.mutate(deletingProfessor.id, {
      onSuccess: () => {
        setDeletingProfessor(null);
      },
    });
  }

  function handleCancelDeleteProfessor() {
    if (deleteProfessorMutation.isPending) {
      return;
    }

    setDeletingProfessor(null);
  }
  /* ---------------------------------------------------------------------- */
  /* FORM DATA                                                              */
  /* ---------------------------------------------------------------------- */

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

  const professors = professorsQuery.data?.professors ?? [];

  const deletingId = deleteProfessorMutation.isPending
    ? deleteProfessorMutation.variables
    : null;

  const saving =
    createProfessorMutation.isPending || updateProfessorMutation.isPending;

  const mutationError =
    createProfessorMutation.error ?? updateProfessorMutation.error;

  /* ---------------------------------------------------------------------- */
  /* LOADING                                                                */
  /* ---------------------------------------------------------------------- */

  if (professorsQuery.isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* ERROR                                                                  */
  /* ---------------------------------------------------------------------- */

  if (professorsQuery.isError) {
    return (
      <section className="space-y-6">
        <Card className="border-destructive/30">
          <CardContent className="p-6">
            <p className="text-sm text-destructive">
              {professorsQuery.error instanceof Error
                ? professorsQuery.error.message
                : "Failed to load professors."}
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <>
      <section className="mx-auto w-[96%] rounded-3xl bg-surface-container-low p-6 md:p-10">
        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Professor Management
            </h2>

            <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
              Add, edit, and manage college professors.
            </p>
          </div>

          <Button
            onClick={handleAddProfessor}
            className="w-full rounded-lg border border-primary bg-[#749974] px-6 py-2 font-bold text-primary shadow-none transition-all hover:bg-[#354935]  hover:text-white sm:w-auto"
          >
            <Plus />
            Add Professor
          </Button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* EMPTY                                                            */}
        {/* ---------------------------------------------------------------- */}

        {professors.length === 0 && (
          <Card className="rounded-2xl border-2 border-secondary bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <UserRound className="h-8 w-8 text-primary" />
              </div>

              <h3 className="font-headline-lg text-xl font-semibold text-on-surface">
                No professors yet
              </h3>

              <p className="mt-2 max-w-md font-body-md text-sm text-on-surface-variant">
                Add the first professor to start building the professors list.
              </p>

              <Button
                className="mt-5 rounded-lg bg-primary px-6 font-bold text-white hover:bg-primary/90"
                onClick={handleAddProfessor}
              >
                <Plus />
                Add Professor
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* PROFESSOR CARDS                                                  */}
        {/* ---------------------------------------------------------------- */}

        {professors.length > 0 && (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {professors.map((professor) => (
              <ProfessorCard
                key={professor.id}
                professor={professor}
                onEdit={handleEditProfessor}
                onDelete={handleDeleteProfessor}
                deleting={deletingId === professor.id}
              />
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PROFESSOR FORM OVERLAY                                             */}
      {/* ------------------------------------------------------------------ */}

      {professorFormOpen && professorFormMode && (
        <ProfessorFormOverlay
          mode={professorFormMode}
          initialData={editingFormData}
          onClose={handleCloseForm}
          onCreate={(data) => {
            createProfessorMutation.mutate(data, {
              onSuccess: handleCloseForm,
            });
          }}
          onUpdate={(data) => {
            if (!editingProfessor) {
              return;
            }

            updateProfessorMutation.mutate(
              {
                id: editingProfessor.id,
                data,
              },
              {
                onSuccess: handleCloseForm,
              },
            );
          }}
          saving={saving}
          error={
            mutationError instanceof Error ? mutationError.message : undefined
          }
        />
      )}
      <DeleteConfirmOverlay
        open={Boolean(deletingProfessor)}
        title="Delete Professor?"
        message={
          deletingProfessor
            ? `Are you sure you want to delete ${deletingProfessor.name}?`
            : ""
        }
        deleting={deleteProfessorMutation.isPending}
        onCancel={handleCancelDeleteProfessor}
        onConfirm={handleConfirmDeleteProfessor}
      />
    </>
  );
}
