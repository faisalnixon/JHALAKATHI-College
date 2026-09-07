import { useEffect } from "react";
import {
  ChevronRight,
  X,
  Headset 
} from "lucide-react";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaWhatsapp,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

import { useUiStore } from "../store/useUiStore";

const items = [
  {
    label: "Facebook",
    icon: FaFacebookF,
  },
  {
    label: "Messenger",
    icon: FaFacebookMessenger,
  },
  {
    label: "Whatsapp",
    icon: FaWhatsapp,
  },
  {
    label: "Youtube",
    icon: FaYoutube,
  },
  {
    label: "Telegram",
    icon: FaTelegramPlane,
  },
];

function AcademicDrawer() {
  const open = useUiStore(
    (state) => state.academicDrawerOpen,
  );

  const setOpen = useUiStore(
    (state) => state.setAcademicDrawerOpen,
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-70 flex-col justify-between border-r border-amber-900/10 bg-[#FFEEDB]/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 sm:w-[320px] ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
        aria-label="একাডেমিক নেভিগেশন ড্রয়ার"
      >
        <div>
          <div className="mb-4 flex items-center justify-between rounded-xl border-b border-amber-900/10 bg-amber-500/20 px-3 py-2.5">
            <div className="flex items-center gap-3">
              <Headset  className="h-6 w-6 text-primary" />

              <h3 className="font-semibold text-[#442C00]">
                Contact us
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close drawer"
              className="rounded-lg p-1 text-amber-950 hover:bg-amber-500/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href="#"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-amber-900/80 transition-colors hover:bg-amber-500/10"
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="ড্রয়ার নেভিগেশন টগল করুন"
          className="absolute right-0 top-1/2 flex h-14 w-9 translate-x-full -translate-y-1/2 items-center justify-center rounded-r-2xl border border-l-0 border-amber-900/10 bg-[#FFEEDB]/95 text-amber-950 shadow-xl"
        >
          <ChevronRight
            className={`h-5 w-5 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>
    </>
  );
}

export default AcademicDrawer;