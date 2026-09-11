import { useState } from "react";
import {
  Bell,
  GraduationCap,
  ClipboardList,
  Info,
  Rocket,
  HeartHandshake,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

interface LinkItem {
  label: string;
  href: string;
}

interface ComplianceSection {
  id: string;
  title: string;
  icon: LucideIcon;
  links: LinkItem[];
}

const sections: ComplianceSection[] = [
  {
    id: "integrity",
    title: "জাতীয় শুদ্ধাচার কৌশল",
    icon: Bell,
    links: [
      {
        label: "উত্তম চর্চা কর্মপরিকল্পনা সফটওয়্যার লিংক",
        href: "https://jgwcollege.edu.bd/#",
      },
      {
        label: "নৈতিক কমিটি ও ফোকাল পয়েন্ট",
        href: "https://ictd.gov.bd/pages/static-pages/69414b2535ce18e1c059ae02",
      },
      {
        label: "পরিবীক্ষণ/মূল্যায়ন প্রতিবেদন",
        href: "https://ictd.gov.bd/pages/reports?filters=%7B%22reports_type%22%3A%20%2269414a4d35ce18e1c059a841%22%7D",
      },
      {
        label:
          "আইন/বিধি/ নীতিমালা/ নির্দেশিকা/পরিপত্র/ প্রজ্ঞাপন ও কর্মপরিকল্পনা",
        href: "https://ictd.gov.bd/pages/reports?filters=%7B%22reports_type%22%3A%20%2269414a4d35ce18e1c059a864%22%7D",
      },
    ],
  },
  {
    id: "policy",
    title: "নীতিমালা ও প্রকাশনা",
    icon: GraduationCap,
    links: [
      { label: "নীতিমালা", href: "https://ictd.gov.bd/pages/policies" },
      {
        label: "আইন ও বিধি/নির্দেশিকা ও কৌশলপত্র",
        href: "https://ictd.gov.bd/pages/static-pages",
      },
      {
        label: "বার্ষিক প্রতিবেদন",
        href: "https://ictd.gov.bd/pages/annual-reports",
      },
      {
        label: "প্রকাশনাসমূহ",
        href: "https://ictd.gov.bd/pages/publications",
      },
    ],
  },
  {
    id: "grievance",
    title: "অভিযোগ প্রতিকার ব্যবস্থাপনা",
    icon: ClipboardList,
    links: [
      {
        label:
          "আইন/বিধি/ নীতিমালা/ নির্দেশিকা/পরিপত্র/ প্রজ্ঞাপন ও কর্মপরিকল্পনা",
        href: "https://jgwcollege.edu.bd/#",
      },
      {
        label: "কর্মপরিকল্পনা, পরিবীক্ষণ ও মূল্যায়ন প্রতিবেদন",
        href: "https://jgwcollege.edu.bd/#",
      },
      {
        label: "অভিযোগ দাখিল (অনলাইন)",
        href: "https://www.grs.gov.bd/",
      },
      {
        label: "অনিক ও আপিল কর্মকর্তা",
        href: "https://ictd.gov.bd/pages/static-pages/69414b2535ce18e1c059ae45",
      },
    ],
  },
  {
    id: "eservices",
    title: "নাগরিক ই-সেবাসমূহ",
    icon: Info,
    links: [
      {
        label: "উদ্ভাবনীমূলক কাজে অনুদান",
        href: "https://ims.ictd.gov.bd/",
      },
      { label: "ফেলোশিপ ও বৃত্তি", href: "https://ims.ictd.gov.bd/" },
      {
        label: "অন্যান্য ই-সেবা",
        href: "https://www.nagoriksheba.gov.bd/",
      },
      {
        label: "হাইটেক পার্ক ও ওয়ান স্টপ সার্ভিস",
        href: "https://ossbhtpa.gov.bd/",
      },
    ],
  },
  {
    id: "charter",
    title: "সেবা প্রদান প্রতিশ্রুতি",
    icon: Rocket,
    links: [
      {
        label: "সেবা প্রদান প্রতিশ্রুতি",
        href: "https://ictd.gov.bd/pages/office-citizen-charters/69414b0435ce18e1c059a909",
      },
      {
        label: "ফোকাল পয়েন্ট/পরিবীক্ষণ কমিটি",
        href: "https://ictd.gov.bd/pages/static-pages/69414b2535ce18e1c059ae87",
      },
      {
        label: "কর্মপরিকল্পনা, পরিবীক্ষণ ও মূল্যায়ন প্রতিবেদন",
        href: "https://ictd.gov.bd/pages/reports?filters=%7B%22reports_type%22%3A%20%2269414a4d35ce18e1c059a874%22%7D",
      },
      {
        label:
          "আইন/বিধি/ নীতিমালা/ নির্দেশিকা/পরিপত্র/ প্রজ্ঞাপন ও কর্মপরিকল্পনা",
        href: "https://ictd.gov.bd/pages/reports?filters=%7B%22reports_type%22%3A%20%2269414a4d35ce18e1c059a874%22%7D",
      },
    ],
  },
  {
    id: "rti",
    title: "তথ্য অধিকার",
    icon: HeartHandshake,
    links: [
      {
        label: "দায়িত্বপ্রাপ্ত কর্মকর্তা ও আপীল কর্তৃপক্ষ",
        href: "https://ictd.gov.bd/views/info-officers",
      },
      {
        label: "আবেদন ও আপিল ফরম",
        href: "https://ictd.gov.bd/pages/static-pages/69414b2535ce18e1c059ae7b",
      },
      {
        label:
          "বাস্তবায়ন অগ্রগতি প্রতিবেদন/স্বপ্রণোদিত তথ্য প্রকাশ নির্দেশিকা",
        href: "https://ictd.gov.bd/pages/static-pages/69414b2435ce18e1c059adc1",
      },
      {
        label:
          "আইন/বিধি/ নীতিমালা/ নির্দেশিকা/পরিপত্র/ প্রজ্ঞাপন ও কর্মপরিকল্পনা",
        href: "https://ictd.gov.bd/pages/reports?filters=%7B%22reports_type%22%3A%20%2269414a4d35ce18e1c059a877%22%7D",
      },
    ],
  },
];

function ComplianceCard({ section }: { section: ComplianceSection }) {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-neutral bg-primary shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 bg-primary px-5 py-4 text-left"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-on-primary/15">
            <Icon className="h-5 w-5 text-on-primary" />
          </span>
          <span className="truncate font-headline-md text-[17px] font-bold text-on-primary">
            {section.title}
          </span>
        </span>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-on-primary transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 bg-surface-container-lowest p-4">
            {section.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 rounded-lg px-3 py-2 text-sm leading-snug text-on-surface-variant transition-colors hover:bg-primary-container/25 hover:text-primary"
                >
                  <span className="mt-0.5 text-primary">›</span>
                  <span className="group-hover:underline">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function GovtComplianceLinks() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-start">
      {sections.map((section) => (
        <ComplianceCard key={section.id} section={section} />
      ))}
    </div>
  );
}

export default GovtComplianceLinks;
