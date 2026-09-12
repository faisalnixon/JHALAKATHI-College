import {
  GraduationCap,
  BookOpen,
  FileText,
  ClipboardList,
} from "lucide-react";
import HashtagPhotoTable from "../components/HashtagPhotoTable";

interface AdmissionInfoSection {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  points: string[];
}

const admissionInfoSections: AdmissionInfoSection[] = [
  {
    key: "hsc",
    title: "HSC Admission",
    subtitle: "Higher Secondary (Intermediate) — Education Board",
    icon: GraduationCap,
    points: [
      "Admission is conducted centrally through the Board's online admission portal after SSC/equivalent results are published.",
      "Applicants must meet the minimum GPA and subject-group requirements set by the concerned Education Board for each academic year.",
      "Candidates apply with their SSC roll, registration number, and board information, choosing preferred colleges and groups (Science, Business Studies, Humanities).",
      "Seat allocation is merit-based across multiple admission phases (migration/waiting list rounds may follow).",
      "Selected candidates must complete admission confirmation and document submission within the notified deadline to retain their seat.",
    ],
  },
  {
    key: "degree",
    title: "Degree (Pass Course) Admission",
    subtitle: "National University",
    icon: BookOpen,
    points: [
      "Admission to Degree (Pass) courses is administered by the National University through its online admission system (NU Admission Portal).",
      "Eligibility generally requires passing HSC/equivalent examination with the minimum GPA prescribed for the relevant academic year.",
      "Applicants select their preferred college and subject combination based on available seats and merit position.",
      "Admission is typically completed in one or more merit lists, followed by online payment and physical/online form submission at the college.",
      "Original academic documents (SSC and HSC certificates, mark sheets, testimonials) must be submitted to the college as per the admission notice.",
    ],
  },
  {
    key: "honours-masters",
    title: "Honours & Masters Admission",
    subtitle: "National University",
    icon: FileText,
    points: [
      "Honours admission is centrally regulated by the National University, based on HSC/equivalent GPA and merit or waiting list positions.",
      "Applicants apply online through the National University's admission portal, selecting subject preferences and paying the applicable fee.",
      "Masters (Preliminary/Final) admission is generally open to eligible Degree/Honours graduates, subject to National University notices for that session.",
      "Subject allocation depends on academic background, availability of seats, and University-prescribed eligibility criteria.",
      "Admitted students must complete registration, form fill-up, and document verification within the timeframe specified in official notices.",
    ],
  },
];

function AdmissionPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* <HashtagPhotoTable hashtag="#admission" title="Admission" /> */}
      <HashtagPhotoTable
        hashtag="#admission"
        title="Admission"
      />

      {/* ===================================================
          GENERAL ADMISSION INFORMATION
          Common, board/university-level information for
          HSC, Degree, and Honours & Masters admission.
          =================================================== */}
      <section className="mt-14 md:mt-20">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            General Admission Information
          </h2>

          <p className="mx-auto mt-2 max-w-2xl font-body-md text-body-md text-on-surface-variant">
            Common guidelines for HSC, Degree, and Honours &amp; Masters
            admission as per the Bangladesh Education Board and National
            University procedures. Please refer to official notices for
            exact dates and requirements.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {admissionInfoSections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.key}
                className="w-[93%] rounded-3xl border border-border-neutral bg-formBg p-6 md:p-8"
              >
                <div className="mb-5 flex items-center gap-4 border-b border-border-neutral pb-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </span>

                  <div>
                    <h3 className="font-headline-lg text-xl font-bold text-on-surface md:text-2xl">
                      {section.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {section.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 font-body-md text-body-md text-on-surface"
                    >
                      <ClipboardList className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-on-surface-variant">
          The information above is general guidance only. Always verify
          current eligibility, GPA requirements, fees, and deadlines from
          the official Education Board or National University notices, and
          the specific notices published above.
        </p>
      </section>
    </main>
  );
}

export default AdmissionPage;


// import HashtagPhotoTable from "../components/HashtagPhotoTable";

// function AdmissionPage() {
//   return (
//     <main className="container mx-auto px-4 py-8">
//       <HashtagPhotoTable
//         hashtag="#admission"
//         title="Admission"
//       />
//     </main>
//   );
// }

// export default AdmissionPage;