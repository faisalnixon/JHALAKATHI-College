import { useEffect } from "react";
import { ChevronRight, X, Headset, MapPin } from "lucide-react";

import {
  FaFacebookF,
  FaFacebookMessenger,
  FaWhatsapp,
  FaTelegramPlane,
  FaMailBulk
} from "react-icons/fa";

import { useUiStore } from "../store/useUiStore";

const COLLEGE_MAP_EMBED_SRC =
  "https://www.google.com/maps?q=22.6399729,90.2004378&z=16&output=embed";

const COLLEGE_MAP_URL =
  "https://www.google.com/maps/place/Jhalokathi+Government+Women's+College/@22.6399729,90.2004378,710m/data=!3m2!1e3!4b1!4m6!3m5!1s0x37554cc3d1b3da51:0x6404391a33fbea61!8m2!3d22.6399729!4d90.2004378!16s%2Fg%2F1hc3bqj3s?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D";

const items = [
  
  {
    label: "Email",
    icon: FaMailBulk,
  },
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
    label: "Telegram",
    icon: FaTelegramPlane,
  },
];

function AcademicDrawer() {
  const open = useUiStore((state) => state.academicDrawerOpen);

  const setOpen = useUiStore((state) => state.setAcademicDrawerOpen);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
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
        className={`fixed left-0 top-0 z-50 flex h-full w-[85%] flex-col justify-between border-r border-amber-900/10 bg-[#FFEEDB]/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="একাডেমিক নেভিগেশন ড্রয়ার"
      >
        <div>
          <div className="mb-4 flex items-center justify-between rounded-xl border-b border-amber-900/10 bg-amber-500/20 px-3 ">
            <div className="flex items-center gap-3">
              <Headset className="h-[clamp(1.1rem,3.5vh,1.5rem)] w-[clamp(1.1rem,3.5vh,1.5rem)] text-primary" />

              <h3 className="font-semibold text-[clamp(0.8rem,2.2vh,1rem)] text-[#442C00]">
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

          <nav className="flex flex-row gap-1.5">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href="#"
                  className="flex items-center justify-center gap-3 rounded-4xl bg-formBg px-3 py-2.5 shadow-md transition-colors hover:bg-amber-500/10 max-[360px]:gap-1.5 max-[360px]:px-2 max-[360px]:py-2 lg:justify-start"
                >
                  <Icon className="h-[clamp(1rem,3vh,1.375rem)] w-[clamp(1rem,3vh,1.375rem)] shrink-0 max-[360px]:h-[clamp(0.7rem,1.5vh,0.6875rem)] max-[360px]:w-[clamp(0.7rem,1.5vh,0.6875rem)]" />

                  <span className="hidden text-[clamp(0.7rem,2vh,0.9rem)] font-medium text-amber-900/80 lg:inline">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="mt-2 flex flex-col gap-3 lg:flex-row">
            <div className="flex-1 rounded-xl border border-amber-900/10 bg-formBg p-3 sm:p-4">
              <p className="mb-1 font-bold text-amber-900/70 sm:text-sm ">
                ঠিকানা ও যোগাযোগ
              </p>

              <div className="flex flex-col gap-.75 text-sm md:text-[17px] text-[#442C00]  ">
                <p>ঝালকাঠি, বরিশাল বিভাগ, বাংলাদেশ</p>
                <p>০১৩০০০০০০০০</p>
                <p>jgwcollege@yahoo.com</p>
              </div>
            </div>

            <div className="flex-1 rounded-xl border border-amber-900/10 bg-formBg p-3 sm:p-4">
              <p className="mb-1 font-bold text-amber-900/70 sm:text-sm">
                অফিস সময়সূচী
              </p>

              <p className="text-sm text-[#442C00]  md:text-[17px]">
                রবি - বৃহস্পতি: সকাল ৯:০০ - বিকাল ৪:০০
              </p>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div className="mb-3 flex items-center gap-3 rounded-xl border-b border-amber-900/10 bg-amber-500/20 px-3 py-2.5">
            <MapPin className="h-6 w-6 text-primary" />

            <h3 className="font-semibold text-[#442C00]">অবস্থান</h3>
          </div>

          <div className="overflow-hidden rounded-xl border border-amber-900/10">
            <iframe
              title="Jhalokathi Government Women's College — Map"
              src={COLLEGE_MAP_EMBED_SRC}
              className="h-36 w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={COLLEGE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-amber-900/10 px-3 py-2 text-sm font-medium text-amber-900/80 transition-colors hover:bg-amber-500/10"
          >
            <MapPin className="h-4 w-4" />
            <span>গুগল ম্যাপে দেখুন</span>
          </a>
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
