import { Link } from "react-router";

import FacultyCard from "../../components/FacultyCard";
import PageLoader from "../../components/PageLoader";
import { useEmployees } from "../../hooks/useEmployees";

export default function EmployeesPage() {
  const { employeesQuery } = useEmployees();

  const employees = employeesQuery.data?.employees ?? [];

  return (
    <div className="mx-auto w-[96%] py-10 md:py-14">
      {/* Page heading */}
      <div className="mb-10 text-center md:mb-14">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          Employee Directory
        </h1>

        <p className="mx-auto mt-2 max-w-2xl font-body-md text-body-md text-on-surface-variant">
          Meet the dedicated staff members supporting Jhalakathi Government
          Women's College.
        </p>
      </div>

      {/* Employee section */}
      <section>
        <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface md:text-3xl">
            Employees
          </h2>

          {!employeesQuery.isLoading && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {employees.length}
            </span>
          )}
        </div>

        {employeesQuery.isLoading ? (
          <PageLoader />
        ) : employeesQuery.isError ? (
          <div className="rounded-2xl bg-surface-container-low p-8 text-center">
            <p className="font-medium text-destructive">
              Unable to load employee information.
            </p>

            <button
              type="button"
              onClick={() => employeesQuery.refetch()}
              className="mt-4 rounded-lg bg-primary px-5 py-2 font-bold text-white transition-colors hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        ) : employees.length === 0 ? (
          <div className="rounded-2xl bg-surface-container-low p-8 text-center">
            <p className="text-sm text-on-surface-variant">
              No employees found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {employees.map((employee) => (
              <FacultyCard
                key={employee.id}
                name={employee.name}
                designation={employee.designation}
                imageUrl={employee.imageUrl}
                email={employee.email}
                phoneNo={employee.phoneNo}
              />
            ))}
          </div>
        )}
      </section>

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
