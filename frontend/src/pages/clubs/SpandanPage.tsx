import { Link } from "react-router";
import { Droplet } from "lucide-react";

export default function SpandanPage() {
  return (
    <div className="mx-auto w-[96%] py-10 md:py-14">
      <div className="mb-10 text-center md:mb-14">
        <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-notice-red/10">
          <Droplet className="h-8 w-8 text-notice-red" fill="currentColor" />
        </span>

        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          স্পন্দন
        </h1>

        <p className="mx-auto mt-2 max-w-2xl font-body-md text-body-md text-on-surface-variant">
          The college's voluntary blood donation platform — connecting donors,
          saving lives.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-container-low p-8 text-center">
        <p className="text-sm text-on-surface-variant">
          Content for স্পন্দন coming soon.
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
