import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router";

import collegeLogo from "../assets/Untitled design (1).png";
import collegeMark from "../assets/Untitled design (2).png";

import { useUiStore } from "../store/useUiStore";
import AcademicDrawer from "./AcademicDrawer";

/* =============================================================
   NAV CONFIG
   "link" items navigate with react-router Link.
   "drawer" items open the AcademicDrawer instead of navigating.
   ============================================================= */

type NavItem =
  | { label: string; type: "link"; to: string }
  | { label: string; type: "drawer" };

const navItems: NavItem[] = [
  { label: "হোম", type: "link", to: "/" },   // NEW - added at the start
  { label: "ভর্তি", type: "link", to: "/admission" },
  { label: "যোগাযোগ", type: "drawer" },
];

type SidebarLink = { label: string; to: string };

const clubItems: SidebarLink[] = [
  { label: "স্পন্দন", to: "/স্পন্দন" },
  { label: "BNCC", to: "/BNCC" },
  { label: "Sports Club", to: "/Sports Club" },
];

const dialogueItems: SidebarLink[] = [
  { label: "প্রিন্সিপালের বাণী", to: "/principlesDialogue" },
  { label: "ভাইস প্রিন্সিপালের বাণী", to: "/vicePrinciplesDialogue" },
];

const facultyItems: SidebarLink[] = [
  { label: "অধ্যাপক", to: "/professors" },
  { label: "সহকারী অধ্যাপক", to: "/assistant-professors" },
  { label: "প্রভাষক", to: "/lecturers" },
  { label: "প্রদর্শক", to: "/exhibitors" },
];

const noticeItems: SidebarLink[] = [
  { label: "ডিগ্রী কর্নার", to: "/notice/degree" },
  { label: "এইচএসসি কর্নার", to: "/notice/hsc" },
  { label: "অনার্স ও মাস্টার্স কর্নার", to: "/notice/honours&masters" },
  { label: "দাপ্তরিক", to: "/notice/officials" },
  { label: "সাধারণ", to: "/notice/general" },
];

const plainSidebarLinks: SidebarLink[] = [
  { label: "গ্যালারি", to: "/gallery" },
];

/* =============================================================
   SIDEBAR ACCORDION
   Collapsible group used for ক্লাব / বাণী / ফ্যাকাল্টি / নোটিশ.
   ============================================================= */

interface SidebarAccordionProps {
  title: string;
  items: SidebarLink[];
  onNavigate: () => void;
}

function SidebarAccordion({ title, items, onNavigate }: SidebarAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#354D30]/10 pb-1">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left font-label-md text-label-md font-bold text-[#354D30] transition-colors hover:bg-[#354D30]/5"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 py-1 pl-4">
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onNavigate}
                className="sidebar-link !py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const menuOpen = useUiStore((state) => state.menuOpen);
  const setMenuOpen = useUiStore((state) => state.setMenuOpen);
  const setAcademicDrawerOpen = useUiStore(
    (state) => state.setAcademicDrawerOpen,
  );

  const closeSidebar = () => setMenuOpen(false);

  const handleNavItemClick = (item: NavItem) => {
    if (item.type === "drawer") {
      setAcademicDrawerOpen(true);
    }
    closeSidebar();
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border-neutral bg-surface/95 px-4 py-3 backdrop-blur-sm md:px-8 lg:px-16">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <Link to="/" className="h-10 w-10 shrink-0 md:h-16 md:w-16">
            <img
              src={collegeLogo}
              alt="Jhalakathi Govt Women's College logo"
              className="h-full w-full object-contain"
            />
          </Link>

          <h1 className="min-w-0 truncate font-headline-md font-bold text-primary-container text-[12px] md:block md:text-[19px] lg:text-[24px] max-[360px]:text-[5px]">
            {/* Shown at ≥440px: single line, still truncates on overflow */}
            <span className="max-[440px]:hidden">
              ঝালকাঠি সরকারি মহিলা কলেজ
            </span>

            {/* Shown below 440px: forced two-line break */}
            <span className="hidden max-[440px]:block max-[440px]:text-center max-[440px]:leading-tight">
              ঝালকাঠি সরকারি
              <br />
              মহিলা কলেজ
            </span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.label}
                to={item.to}
                className="font-label-md text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => setAcademicDrawerOpen(true)}
                className="font-label-md text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </button>
            ),
          )}

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
          <Link to="/" className="h-10 w-10 md:h-16 md:w-16">
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
          onClick={closeSidebar}
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
              onClick={closeSidebar}
              className="rounded-lg p-1 text-[#354D30]/80 transition-colors hover:bg-black/5 hover:text-[#354D30]"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 font-medium text-[#354D30]">
            {/* Mobile / Tablet main links */}
            <div className="flex flex-col gap-2 border-b border-[#354D30]/20 pb-3 lg:hidden">
              {navItems.map((item) =>
                item.type === "link" ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={closeSidebar}
                    className="sidebar-link"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavItemClick(item)}
                    className="sidebar-link text-left"
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>

            {/* Dropdown sections */}
            <SidebarAccordion
              title="ক্লাব"
              items={clubItems}
              onNavigate={closeSidebar}
            />

            <SidebarAccordion
              title="বাণী"
              items={dialogueItems}
              onNavigate={closeSidebar}
            />

            <SidebarAccordion
              title="ফ্যাকাল্টি"
              items={facultyItems}
              onNavigate={closeSidebar}
            />

            <SidebarAccordion
              title="নোটিশ"
              items={noticeItems}
              onNavigate={closeSidebar}
            />

            {/* Plain sidebar links */}
            {plainSidebarLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeSidebar}
                className="sidebar-link"
              >
                {item.label}
              </Link>
            ))}

            {/* Login */}
            <Link
              to="/admin/login"
              onClick={closeSidebar}
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

// import { Menu, X } from "lucide-react";
// import { Link } from "react-router";

// import collegeLogo from "../assets/Untitled design (1).png";
// import collegeMark from "../assets/Untitled design (2).png";

// import { useUiStore } from "../store/useUiStore";
// import AcademicDrawer from "./AcademicDrawer";

// const navItems = [
//   { label: "একাডেমিক", href: "#academic" },
//   { label: "ভর্তি", href: "#admission" },
//   { label: "বিজ্ঞপ্তি", href: "#notices" },
//   { label: "যোগাযোগ", href: "#contact" },
// ];

// const sidebarItems = ["অধ্যাপকমণ্ডলী", "গ্যালারি", "ভিডিও"];

// function Header() {
//   const menuOpen = useUiStore((state) => state.menuOpen);
//   const setMenuOpen = useUiStore((state) => state.setMenuOpen);

//   return (
//     <>
//       {/* Header */}
//       <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border-neutral bg-surface/95 px-4 py-3 backdrop-blur-sm md:px-8 lg:px-16">
//         <div className="flex min-w-0 items-center gap-3 md:gap-4">
//           <Link to="/" className="h-12 w-12 shrink-0 md:h-16 md:w-16">
//             <img
//               src={collegeLogo}
//               alt="Jhalakathi Govt Women's College logo"
//               className="h-full w-full object-contain"
//             />
//           </Link>

//           <h1 className="text-[10px] truncate font-headline-md font-bold text-primary-container md:block md:text-[19px] lg:text-[24px]">
//             ঝালকাঠি সরকারি মহিলা কলেজ
//           </h1>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden items-center gap-8 lg:flex">
//           {navItems.map((item) => (
//             <a
//               key={item.label}
//               href={item.href}
//               className="font-label-md text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
//             >
//               {item.label}
//             </a>
//           ))}

//           {/* Menu button + college mark kept together with their own
//               dedicated gap, independent of the gap-8 spacing between the
//               nav links — this pair sits at the far right of the header
//               on every breakpoint. */}
//           <div className="flex items-center gap-4">
//             <Link to="/" className="h-16 w-16">
//               <img
//                 src={collegeMark}
//                 alt="College mark"
//                 className="h-full w-full object-contain"
//               />
//             </Link>

//             <button
//               type="button"
//               onClick={() => setMenuOpen(true)}
//               className="menu-button flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 font-label-md text-label-md font-bold "
//             >
//               <Menu className="menu-icon h-5 w-5" />
//               <span>মেনু</span>
//             </button>
//           </div>
//         </nav>

//         {/* Mobile / Tablet */}
//         <div className="flex items-center gap-4 lg:hidden">
//           <Link to="/" className="h-12 w-12 md:h-16 md:w-16">
//             <img
//               src={collegeMark}
//               alt="College mark"
//               className="h-full w-full object-contain"
//             />
//           </Link>

//           <button
//             type="button"
//             onClick={() => setMenuOpen(true)}
//             className="menu-button flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-label-md text-label-md font-bold"
//           >
//             <Menu className="menu-icon h-5 w-5" />
//             <span>মেনু</span>
//           </button>
//         </div>
//       </header>

//       {/* Sidebar */}
//       <>
//         <button
//           aria-label="Close menu overlay"
//           className={`fixed inset-0 z-[55] bg-black/20 transition-opacity duration-300
//               ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
//           onClick={() => setMenuOpen(false)}
//         />

//         <aside
//           className={`fixed top-0 right-0 z-[60] w-72 max-h-screen overflow-y-auto
//             rounded-l-2xl border-l border-black/10 bg-white/70 p-6
//             shadow-2xl backdrop-blur-md
//             transition-transform duration-300 ease-in-out
//             ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
//         >
//           <div className="mb-4 flex items-center justify-between border-b border-[#354D30]/20 pb-4">
//             <span className="text-lg font-bold text-[#354D30]">মেনু</span>

//             <button
//               type="button"
//               onClick={() => setMenuOpen(false)}
//               className="rounded-lg p-1 text-[#354D30]/80 transition-colors hover:bg-black/5 hover:text-[#354D30]"
//               aria-label="Close menu"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <nav className="flex flex-col gap-2 font-medium text-[#354D30]">
//             {/* Mobile / Tablet main links */}
//             <div className="flex flex-col gap-2 border-b border-[#354D30]/20 pb-3 lg:hidden">
//               {navItems.map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   onClick={() => setMenuOpen(false)}
//                   className="sidebar-link"
//                 >
//                   {item.label}
//                 </a>
//               ))}
//             </div>

//             {/* Sidebar links */}
//             {sidebarItems.map((item) => (
//               <a key={item} href="#" className="sidebar-link">
//                 {item}
//               </a>
//             ))}

//             {/* Login */}
//             <Link
//               to="/admin/login"
//               onClick={() => setMenuOpen(false)}
//               className="sidebar-link mt-2 border-2 border-[#354D30] text-center font-bold"
//             >
//               Log in
//             </Link>
//           </nav>
//         </aside>
//       </>

//       <AcademicDrawer />
//     </>
//   );
// }

// export default Header;
