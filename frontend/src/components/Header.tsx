import { Menu, X } from "lucide-react";
import { Link } from "react-router";

import collegeLogo from "../assets/Untitled design (1).png";
import collegeMark from "../assets/Untitled design (2).png";

import { useUiStore } from "../store/useUiStore";
import AcademicDrawer from "./AcademicDrawer";

const navItems = [
  { label: "একাডেমিক", href: "#academic" },
  { label: "ভর্তি", href: "#admission" },
  { label: "বিজ্ঞপ্তি", href: "#notices" },
  { label: "যোগাযোগ", href: "#contact" },
];

const sidebarItems = ["অধ্যাপকমণ্ডলী", "গ্যালারি", "ভিডিও"];

function Header() {
  const menuOpen = useUiStore((state) => state.menuOpen);
  const setMenuOpen = useUiStore((state) => state.setMenuOpen);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border-neutral bg-surface/95 px-4 py-3 backdrop-blur-sm md:px-8 lg:px-16">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <Link to="/" className="h-12 w-12 shrink-0 md:h-16 md:w-16">
            <img
              src={collegeLogo}
              alt="Jhalakathi Govt Women's College logo"
              className="h-full w-full object-contain"
            />
          </Link>

          <h1 className="hidden truncate font-headline-md font-bold text-primary-container md:block md:text-[19px] lg:text-[25px]">
            ঝালকাঠি সরকারি মহিলা কলেজ
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-label-md text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
            >
              {item.label}
            </a>
          ))}

          {/* Menu button + college mark kept together with their own
              dedicated gap, independent of the gap-8 spacing between the
              nav links — this pair sits at the far right of the header
              on every breakpoint. */}
          <div className="flex items-center gap-4">
            <Link to="/" className="h-16 w-16">
              <img
                src={collegeMark}
                alt="College mark"
                className="h-full w-full object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="menu-button flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 font-label-md text-label-md font-bold "
            >
              <Menu className="menu-icon h-5 w-5" />
              <span>মেনু</span>
            </button>
          </div>
        </nav>

        {/* Mobile / Tablet */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link to="/" className="h-12 w-12 md:h-16 md:w-16">
            <img
              src={collegeMark}
              alt="College mark"
              className="h-full w-full object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="menu-button flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-label-md text-label-md font-bold"
          >
            <Menu className="menu-icon h-5 w-5" />
            <span>মেনু</span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <>
        <button
          aria-label="Close menu overlay"
          className={`fixed inset-0 z-[55] bg-black/20 transition-opacity duration-300
              ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        <aside
          className={`fixed top-0 right-0 z-[60] w-72 max-h-screen overflow-y-auto
            rounded-l-2xl border-l border-black/10 bg-white/70 p-6
            shadow-2xl backdrop-blur-md
            transition-transform duration-300 ease-in-out
            ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="mb-4 flex items-center justify-between border-b border-[#354D30]/20 pb-4">
            <span className="text-lg font-bold text-[#354D30]">মেনু</span>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg p-1 text-[#354D30]/80 transition-colors hover:bg-black/5 hover:text-[#354D30]"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 font-medium text-[#354D30]">
            {/* Mobile / Tablet main links */}
            <div className="flex flex-col gap-2 border-b border-[#354D30]/20 pb-3 lg:hidden">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="sidebar-link"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Sidebar links */}
            {sidebarItems.map((item) => (
              <a key={item} href="#" className="sidebar-link">
                {item}
              </a>
            ))}

            {/* Login */}
            <Link
              to="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="sidebar-link mt-2 border-2 border-[#354D30] text-center font-bold"
            >
              Log in
            </Link>
          </nav>
        </aside>
      </>


      <AcademicDrawer />
    </>
  );
}

export default Header;
