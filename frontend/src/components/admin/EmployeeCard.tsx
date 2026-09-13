import { Mail, Pencil, Phone, Trash2, UserRound } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import type { Employee } from "../../types/admin";

type EmployeeCardProps = {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  deleting: boolean;
};

export default function EmployeeCard({
  employee,
  onEdit,
  onDelete,
  deleting,
}: EmployeeCardProps) {
  return (
    <Card className="group overflow-hidden border-[3px] border-secondary bg-[#fdfdfd] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* ------------------------------------------------------------------ */}
      {/* PHOTO                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative h-56 overflow-hidden bg-muted">
        {employee.imageUrl ? (
          <img
            src={employee.imageUrl}
            alt={employee.name}
            className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UserRound className="h-20 w-20 text-muted-foreground/50" />
          </div>
        )}

        {/* Designation */}
        {employee.designation && (
          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
            {employee.designation}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* INFORMATION                                                        */}
      {/* ------------------------------------------------------------------ */}

      <CardContent className="p-5">
        <h3 className="font-heading text-xl font-bold">{employee.name}</h3>

        {employee.designation && (
          <p className="mt-1 text-sm font-medium text-primary">
            {employee.designation}
          </p>
        )}

        <div className="mt-4 space-y-2">
          {employee.email && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{employee.email}</span>
            </div>
          )}

          {employee.phoneNo && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="truncate">{employee.phoneNo}</span>
            </div>
          )}

          {employee.bcsBatch && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">BCS Batch:</span>{" "}
              {employee.bcsBatch}
            </p>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* ACTIONS                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-5 flex gap-2 border-t pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(employee)}
          >
            <Pencil />
            Edit
          </Button>

          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(employee)}
            disabled={deleting}
          >
            {deleting ? (
              <span className="text-xs">Deleting...</span>
            ) : (
              <Trash2 />
            )}

            <span className="sr-only">Delete {employee.name}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
