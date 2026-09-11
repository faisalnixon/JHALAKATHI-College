import { useState } from "react";
import { LoaderCircle, Plus, UserRound } from "lucide-react";

import { useEmployees } from "../../hooks/useEmployees";
import { useUiStore } from "../../store/useUiStore";

import type { Employee, EmployeeFormData } from "../../types/admin";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import EmployeeCard from "./EmployeeCard";
import EmployeeFormOverlay from "./EmployeeFormOverlay";
import DeleteConfirmOverlay from "./DeleteConfirmOverlay";

const emptyEmployee: EmployeeFormData = {
  name: "",
  designation: "",
  imageUrl: "",
  phoneNo: "",
  email: "",
  gender: "Female",
};

export default function EmployeeManagement() {
  const {
    employeeFormOpen,
    employeeFormMode,
    openEmployeeAddForm,
    openEmployeeEditForm,
    closeEmployeeForm,
  } = useUiStore();

  const {
    employeesQuery,
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation,
  } = useEmployees();

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
    null,
  );
  /* ---------------------------------------------------------------------- */
  /* OPEN ADD                                                               */
  /* ---------------------------------------------------------------------- */

  function handleAddEmployee() {
    setEditingEmployee(null);
    openEmployeeAddForm();
  }

  /* ---------------------------------------------------------------------- */
  /* OPEN EDIT                                                              */
  /* ---------------------------------------------------------------------- */

  function handleEditEmployee(employee: Employee) {
    setEditingEmployee(employee);
    openEmployeeEditForm();
  }

  /* ---------------------------------------------------------------------- */
  /* CLOSE FORM                                                             */
  /* ---------------------------------------------------------------------- */

  function handleCloseForm() {
    setEditingEmployee(null);
    closeEmployeeForm();
  }

  /* ---------------------------------------------------------------------- */
  /* DELETE                                                                 */
  /* ---------------------------------------------------------------------- */

  function handleDeleteEmployee(employee: Employee) {
    setDeletingEmployee(employee);
  }

  function handleConfirmDeleteEmployee() {
    if (!deletingEmployee) {
      return;
    }

    deleteEmployeeMutation.mutate(deletingEmployee.id, {
      onSuccess: () => {
        setDeletingEmployee(null);
      },
    });
  }

  function handleCancelDeleteEmployee() {
    if (deleteEmployeeMutation.isPending) {
      return;
    }

    setDeletingEmployee(null);
  }

  /* ---------------------------------------------------------------------- */
  /* FORM DATA                                                              */
  /* ---------------------------------------------------------------------- */

  const editingFormData: EmployeeFormData = editingEmployee
    ? {
        name: editingEmployee.name,
        designation: editingEmployee.designation ?? "",
        imageUrl: editingEmployee.imageUrl ?? "",
        phoneNo: editingEmployee.phoneNo ?? "",
        email: editingEmployee.email,
        gender: editingEmployee.gender,
      }
    : emptyEmployee;

  const employees = employeesQuery.data?.employees ?? [];

  const deletingId = deleteEmployeeMutation.isPending
    ? deleteEmployeeMutation.variables
    : null;

  const saving =
    createEmployeeMutation.isPending || updateEmployeeMutation.isPending;

  const mutationError =
    createEmployeeMutation.error ?? updateEmployeeMutation.error;

  /* ---------------------------------------------------------------------- */
  /* LOADING                                                                */
  /* ---------------------------------------------------------------------- */

  if (employeesQuery.isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* ERROR                                                                  */
  /* ---------------------------------------------------------------------- */

  if (employeesQuery.isError) {
    return (
      <section className="space-y-6">
        <Card className="border-destructive/30">
          <CardContent className="p-6">
            <p className="text-sm text-destructive">
              {employeesQuery.error instanceof Error
                ? employeesQuery.error.message
                : "Failed to load employees."}
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
              Employee Management
            </h2>

            <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
              Add, edit, and manage college employees.
            </p>
          </div>

          {/* This button is ALWAYS rendered */}
          <Button
            onClick={handleAddEmployee}
            className="w-full rounded-lg border border-primary bg-[#749974] px-6 py-2 font-bold text-primary shadow-none transition-all hover:bg-[#354935]  hover:text-white sm:w-auto"
          >
            <Plus />
            Add Employee
          </Button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* EMPTY                                                            */}
        {/* ---------------------------------------------------------------- */}

        {employees.length === 0 && (
          <Card className="rounded-2xl border-2 border-secondary bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <UserRound className="h-8 w-8 text-primary" />
              </div>

              <h3 className="font-headline-lg text-xl font-semibold text-on-surface">
                No employees yet
              </h3>

              <p className="mt-2 max-w-md font-body-md text-sm text-on-surface-variant">
                Add the first employee to start building the employee list.
              </p>

              <Button
                className="mt-5 rounded-lg bg-primary px-6 font-bold text-white hover:bg-primary/90"
                onClick={handleAddEmployee}
              >
                <Plus />
                Add Employee
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* EMPLOYEE CARDS                                                   */}
        {/* ---------------------------------------------------------------- */}

        {employees.length > 0 && (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
                deleting={deletingId === employee.id}
              />
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* EMPLOYEE FORM OVERLAY                                              */}
      {/* ------------------------------------------------------------------ */}

      {employeeFormOpen && employeeFormMode && (
        <EmployeeFormOverlay
          mode={employeeFormMode}
          initialData={editingFormData}
          onClose={handleCloseForm}
          onCreate={(data) => {
            createEmployeeMutation.mutate(data, {
              onSuccess: handleCloseForm,
            });
          }}
          onUpdate={(data) => {
            if (!editingEmployee) {
              return;
            }

            updateEmployeeMutation.mutate(
              {
                id: editingEmployee.id,
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
        open={Boolean(deletingEmployee)}
        title="Delete Employee?"
        message={
          deletingEmployee
            ? `Are you sure you want to delete ${deletingEmployee.name}?`
            : ""
        }
        deleting={deleteEmployeeMutation.isPending}
        onCancel={handleCancelDeleteEmployee}
        onConfirm={handleConfirmDeleteEmployee}
      />
    </>
  );
}
