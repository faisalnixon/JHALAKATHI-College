import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

      <p className="mt-2 text-muted-foreground">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to Home
      </Link>
    </main>
  );
}
