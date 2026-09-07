import { LoaderCircle } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <LoaderCircle
        className="h-10 w-10 animate-spin text-primary"
        strokeWidth={2}
      />
    </div>
  );
}

export default PageLoader;