import { Link } from "react-router";
import { Trophy } from "lucide-react";

export default function SportsClubPage() {
  return (
    <div className="mx-auto w-[96%] py-10 md:py-14">
      <div className="mb-10 text-center md:mb-14">
        <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
          <Trophy className="h-8 w-8 text-blue-600" fill="currentColor" />
        </span>

        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          Sports Club
        </h1>

        <p className="mx-auto mt-2 max-w-2xl font-body-md text-body-md text-on-surface-variant">
          Sports and athletics activities at Jhalakathi Government Women's
          College.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-container-low p-8 text-center">
        <p className="text-sm text-on-surface-variant">
          Content for Sports Club coming soon.
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-flex rounded-lg border-2 border-primary px-6 py-2 font-bold text-primary transition-all hover:bg-primary hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
