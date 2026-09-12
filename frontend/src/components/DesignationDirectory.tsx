import { Link } from "react-router";
import FacultyCard from "./FacultyCard";
import PageLoader from "./PageLoader";
import { useProfessors } from "../hooks/useProfessors";

type Designation = "Professor" | "Assistant Professor" | "Lecturer" | "Exhibitor";

interface DesignationDirectoryProps {
  title: string;
  designation: Designation;
}

export default function DesignationDirectory({
  title,
  designation,
}: DesignationDirectoryProps) {
  const { professorsQuery } = useProfessors();

  const professors = professorsQuery.data?.professors ?? [];
  const filtered = professors.filter((p) => p.designation === designation);

  return (
    <div className="mx-auto w-[96%] py-10 md:py-14">
      <div className="mb-10 text-center md:mb-14">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          {title}
        </h1>

        <p className="mx-auto mt-2 max-w-2xl font-body-md text-body-md text-on-surface-variant">
          Meet the dedicated {title.toLowerCase()}s of Jhalakathi Government
          Women's College.
        </p>
      </div>

      {professorsQuery.isError ? (
        <div className="rounded-2xl bg-surface-container-low p-8 text-center">
          <p className="font-medium text-destructive">
            Unable to load faculty information.
          </p>

          <button
            type="button"
            onClick={() => professorsQuery.refetch()}
            className="mt-4 rounded-lg bg-primary px-5 py-2 font-bold text-white transition-colors hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      ) : (
        <section>
          <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
            <h2 className="font-headline-lg text-2xl font-bold text-on-surface md:text-3xl">
              {title}
            </h2>

            {!professorsQuery.isLoading && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {filtered.length}
              </span>
            )}
          </div>

          {professorsQuery.isLoading ? (
            <PageLoader />
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl bg-surface-container-low p-8 text-center">
              <p className="text-sm text-on-surface-variant">
                No faculty members found in this section.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((professor) => (
                <FacultyCard
                  key={professor.id}
                  name={professor.name}
                  designation={professor.designation}
                  imageUrl={professor.imageUrl}
                  email={professor.email}
                  phoneNo={professor.phoneNo}
                />
              ))}
            </div>
          )}
        </section>
      )}

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