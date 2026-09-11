import { Mail, Pencil, Phone, Trash2, UserRound } from "lucide-react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
} from "../ui/card";

import type { Professor } from "../../types/admin";

type ProfessorCardProps = {
  professor: Professor;
  onEdit: (professor: Professor) => void;
  onDelete: (professor: Professor) => void;
  deleting: boolean;
};

export default function ProfessorCard({
  professor,
  onEdit,
  onDelete,
  deleting,
}: ProfessorCardProps) {
  return (
    <Card className="group overflow-hidden border-2 border-[#e9e9e9d1] bg-[#fdfdfd] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* ------------------------------------------------------------------ */}
      {/* PHOTO                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative h-56 overflow-hidden bg-muted ">
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

        {/* Designation */}
        {professor.designation && (
          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
            {professor.designation}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* INFORMATION                                                        */}
      {/* ------------------------------------------------------------------ */}

      <CardContent className="p-5">
        <h3 className="font-heading text-xl font-bold">
          {professor.name}
        </h3>

        {professor.designation && (
          <p className="mt-1 text-sm font-medium text-primary">
            {professor.designation}
          </p>
        )}

        <div className="mt-4 space-y-2">
          {/* Email */}
          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{professor.email}</span>
          </div>

          {/* Phone */}
          {professor.phoneNo && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="truncate">{professor.phoneNo}</span>
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* ACTIONS                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-5 flex gap-2 border-t pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(professor)}
          >
            <Pencil />
            Edit
          </Button>

          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(professor)}
            disabled={deleting}
          >
            {deleting ? (
              <span className="text-xs">Deleting...</span>
            ) : (
              <Trash2 />
            )}

            <span className="sr-only">
              Delete {professor.name}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}