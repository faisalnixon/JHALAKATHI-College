import { Mail, Phone, UserRound } from "lucide-react";

import { Card, CardContent } from "./ui/card";

type FacultyCardProps = {
  name: string;
  designation?: string | null;
  imageUrl?: string | null;
  email?: string | null;
  phoneNo?: string | null;
};

export default function FacultyCard({
  name,
  designation,
  imageUrl,
  email,
  phoneNo,
}: FacultyCardProps) {
  return (
    <Card className="group overflow-hidden border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
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

        {designation && (
          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
            {designation}
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="font-heading text-xl font-bold text-on-surface">
          {name}
        </h3>

        {designation && (
          <p className="mt-1 text-sm font-medium text-primary">{designation}</p>
        )}

        <div className="mt-4 space-y-2">
          {email && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          )}

          {phoneNo && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="truncate">{phoneNo}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
