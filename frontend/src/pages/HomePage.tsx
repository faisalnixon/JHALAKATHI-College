import { useEffect, useState } from "react";
import { UserRound, Droplet, Users, Trophy } from "lucide-react";

import RippleImageSlider from "../components/Rippleimageslider";
import HistoryWithPrincipleAndVicePrinciple from "../components/HistoryWithPrincipleAndVicePrinciple";
import AnimatedStat from "../components/AnimatedStat";
import { Link } from "react-router";
import { useProfessors } from "../hooks/useProfessors";
import PageLoader from "../components/PageLoader";
import TopTicker from "../components/TopTicker";
import { HeroPhotos } from "../lib/HeroPhotos";

interface LatestNotice {
  id: string;
  description: string;
  createdTime: string;
}

function formatNoticeDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("bn-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function HomePage() {
  const [notices, setNotices] = useState<LatestNotice[]>([]);
  const [noticesLoading, setNoticesLoading] = useState(true);
  const [noticesError, setNoticesError] = useState("");

  const { professorsQuery } = useProfessors();

  const spotlightProfessors =
    professorsQuery.data?.professors
      .filter((professor) => professor.designation === "Professor")
      .slice(0, 10) ?? [];

  useEffect(() => {
    let cancelled = false;

    async function loadLatestNotices() {
      try {
        setNoticesLoading(true);
        setNoticesError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/gallery/notices/latest?limit=5`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load notices.");
        }

        if (!cancelled) {
          setNotices(Array.isArray(data?.posts) ? data.posts : []);
        }
      } catch (error) {
        if (!cancelled) {
          setNoticesError(
            error instanceof Error ? error.message : "Failed to load notices.",
          );
        }
      } finally {
        if (!cancelled) {
          setNoticesLoading(false);
        }
      }
    }

    void loadLatestNotices();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-12">
      <main className="mx-auto w-full max-w-350 space-y-12 px-4 py-6">
        <TopTicker />
        {/* <!-- 1. HERO + FAST FACTS SECTION */}
        {/* =========================================================
          HERO + FAST FACTS
          Mobile / Tablet:
            Stats = one horizontal row
            Hero = underneath

          Desktop:
            Stats = 2x2 block on the left
            Hero = larger section on the right
          ========================================================= */}
        <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.8fr)] lg:gap-8">
          {/* =======================================================
      FAST FACTS
      ======================================================= */}
          <div
            className="
              order-1 min-w-0
              rounded-2xl
              border-[10px] border-[#7E9876]
              bg-surface-container-lowest
              p-3
            "
          >
            <div
              className="
                grid h-full
                grid-cols-4 gap-2
                sm:gap-3
                lg:grid-cols-2 lg:gap-3
              "
            >
              <AnimatedStat
                value={50}
                suffix="+"
                label="Teachers"
                className="min-w-0 bg-on-primary-container text-on-primary"
              />

              <AnimatedStat
                value={500}
                suffix="+"
                label="Students"
                className="min-w-0 bg-primary-container text-on-secondary"
              />

              <AnimatedStat
                value={20}
                suffix="+"
                label="Class Rooms"
                className="min-w-0 bg-surface-container-high text-primary border border-border-neutral"
              />

              <AnimatedStat
                value={90}
                suffix="%"
                label="Pass Rate"
                className="min-w-0 bg-surface-container-low text-secondary border border-border-neutral"
              />
            </div>
          </div>

          {/* =======================================================
      HERO
      ======================================================= */}
          <div className="group relative order-2 min-w-0 overflow-hidden border-4 border-primary/60  rounded-2xl">
            <div className="relative h-105 w-full sm:h-120 lg:h-full lg:min-h-120">
              <div className="absolute inset-0 z-0">
                <RippleImageSlider
                  images={HeroPhotos}
                  fullscreen={false}
                  autoPlay
                  autoPlayDelay={5000}
                  showControls={false}
                  className="transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-r from-on-surface/80 via-on-surface/40 to-transparent" />
              </div>

              <div
                className="
    relative z-10
    flex h-full
    max-w-2xl
    flex-col justify-center
    px-6
    text-on-primary
    sm:px-8
    md:px-12
  "
              >
                <h2 className="mb-4 font-display-lg text-display-sm sm:text-display-lg font-extrabold font-mono bg-black/30 rounded-4xl p-4">
                  Empowering Women through Excellence in Education
                </h2>

                <p className="mb-8 font-bold font-mon font-body-lg text-body-sm leading-relaxed opacity-90 sm:text-body-lg bg-black/30 rounded-4xl p-4">
                  ঝালকাঠি সরকারি মহিলা কলেজের অফিসিয়াল ওয়েবসাইটে আপনাকে
                  আন্তরিক স্বাগতম। আমরা বিশ্বাস করি শিক্ষা জাতির অগ্রগতির প্রধান
                  চালিকাশক্তি।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- 2.  HISTORY & Principle and vice principle SECTION */}
        <HistoryWithPrincipleAndVicePrinciple />

        <section className="mx-auto w-[96%] rounded-3xl bg-surface-container-low p-6 md:p-10">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                Faculty Spotlight
              </h3>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Meet our dedicated educators shaping the future.
              </p>
            </div>

            <Link
              to="/professors"
              className="rounded-lg border-2 border-primary px-6 py-2 font-bold text-primary transition-all hover:bg-primary hover:text-white"
            >
              View Faculty Directory
            </Link>
          </div>

          {professorsQuery.isLoading ? (
            <PageLoader />
          ) : professorsQuery.isError ? (
            <div className="rounded-2xl bg-background p-8 text-center">
              <p className="font-medium text-destructive">
                Unable to load faculty information.
              </p>
            </div>
          ) : spotlightProfessors.length === 0 ? (
            <div className="rounded-2xl bg-background p-8 text-center">
              <p className="text-sm text-on-surface-variant">
                No professors found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {spotlightProfessors.map((professor) => (
                <div
                  key={professor.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative overflow-hidden">
                    {professor.imageUrl ? (
                      <img
                        src={professor.imageUrl}
                        alt={professor.name}
                        className="aspect-[0.79] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex aspect-[0.79] w-full items-center justify-center bg-muted">
                        <UserRound className="h-16 w-16 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h5 className="font-label-md text-label-md font-bold text-primary">
                      {professor.name}
                    </h5>

                    <p className="text-[12px] uppercase tracking-tighter text-on-surface-variant">
                      {professor.designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section
          id="notices"
          className="mx-auto w-[95%] overflow-hidden rounded-xl border border-border-neutral bg-surface p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl text-notice-red">📢</span>
              <h3 className="font-headline-lg text-headline-lg">
                Notice Board
              </h3>
            </div>
            <a href="#" className="font-bold text-primary hover:underline">
              View All →
            </a>
          </div>

          {/* Latest 5 notices across every category (HSC, Degree, Honours
              & Masters, Officials, Admission, Exam Notice, General) mixed
              together and sorted newest-first — which category each one
              came from doesn't matter here, only recency does. */}

          {noticesLoading && (
            <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
              Loading notices...
            </div>
          )}

          {noticesError && !noticesLoading && (
            <div className="rounded-lg border border-destructive/30 p-8 text-center text-sm text-destructive">
              {noticesError}
            </div>
          )}

          {!noticesLoading && !noticesError && notices.length === 0 && (
            <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
              No notices available right now.
            </div>
          )}

          {!noticesLoading && !noticesError && notices.length > 0 && (
            <div className="space-y-2">
              {notices.map((notice, index) => (
                <a
                  key={notice.id}
                  href="#"
                  className={`group flex items-center justify-between rounded-lg border-l-4 bg-white p-4 transition-colors hover:bg-primary-container/20 ${
                    index % 2 === 0 ? "border-primary" : "border-alert-amber"
                  }`}
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="font-label-md text-label-md text-primary">
                      {formatNoticeDate(notice.createdTime)}
                    </span>
                    <span className="font-body-md text-body-md line-clamp-2 break-words font-semibold text-on-surface">
                      {notice.description}
                    </span>
                  </div>
                  <span className="ml-4 shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-1">
                    ↓
                  </span>
                </a>
              ))}
            </div>
          )}
        </section>


        {/* <!-- CLUBS & ORGANIZATIONS SECTION */}
        <section
          id="notices"
          className="mx-auto w-[95%] overflow-hidden rounded-xl border border-border-neutral bg-surface p-6 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="font-headline-lg text-headline-lg text-on-surface">
              Clubs & Organizations
            </h3>

            <p className="font-body-md text-body-md text-on-surface-variant">
              Student-led clubs building community, service, and skill.
            </p>
          </div>

          <div className="rounded-3xl border-5 border-formBg bg-primary p-3 md:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Link
                to="/স্পন্দন"
                className="group flex items-center gap-3 rounded-2xl bg-surface-container-lowest px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-notice-red/10">
                  <Droplet className="h-6 w-6 text-notice-red" fill="currentColor" />
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  স্পন্দন
                </span>
              </Link>

              <Link
                to="/BNCC"
                className="group flex items-center gap-3 rounded-2xl bg-surface-container-lowest px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" fill="currentColor" />
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  BNCC
                </span>
              </Link>

              <Link
                to="/Sports Club"
                className="group flex items-center gap-3 rounded-2xl bg-surface-container-lowest px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                  <Trophy className="h-6 w-6 text-blue-600" fill="currentColor" />
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  Sports Club
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;

// import { useEffect, useState } from "react";

// import collegeImage from "../assets/cover pic 2.png";
// import HistoryWithPrincipleAndVicePrinciple from "../components/HistoryWithPrincipleAndVicePrinciple";
// import AnimatedStat from "../components/AnimatedStat";
// import { Link } from "react-router";
// import { useProfessors } from "../hooks/useProfessors";
// import { UserRound } from "lucide-react";
// import PageLoader from "../components/PageLoader";
// import TopTicker from "../components/TopTicker";

// interface LatestNotice {
//   id: string;
//   description: string;
//   createdTime: string;
// }

// function formatNoticeDate(dateString: string) {
//   const date = new Date(dateString);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   return new Intl.DateTimeFormat("bn-BD", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   }).format(date);
// }

// function HomePage() {
//   const [notices, setNotices] = useState<LatestNotice[]>([]);
//   const [noticesLoading, setNoticesLoading] = useState(true);
//   const [noticesError, setNoticesError] = useState("");

//   const { professorsQuery } = useProfessors();

//   const spotlightProfessors =
//     professorsQuery.data?.professors
//       .filter((professor) => professor.designation === "Professor")
//       .slice(0, 10) ?? [];

//   useEffect(() => {
//     let cancelled = false;

//     async function loadLatestNotices() {
//       try {
//         setNoticesLoading(true);
//         setNoticesError("");

//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/api/gallery/notices/latest?limit=5`,
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data?.error || "Failed to load notices.");
//         }

//         if (!cancelled) {
//           setNotices(Array.isArray(data?.posts) ? data.posts : []);
//         }
//       } catch (error) {
//         if (!cancelled) {
//           setNoticesError(
//             error instanceof Error ? error.message : "Failed to load notices.",
//           );
//         }
//       } finally {
//         if (!cancelled) {
//           setNoticesLoading(false);
//         }
//       }
//     }

//     void loadLatestNotices();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return (
//     <div className="space-y-12">
//       <main className="mx-auto w-full max-w-350 space-y-12 px-4 py-6">
//         <TopTicker />
//         {/* <!-- 1. HERO + FAST FACTS SECTION */}
//         {/* =========================================================
//           HERO + FAST FACTS
//           Mobile / Tablet:
//             Stats = one horizontal row
//             Hero = underneath

//           Desktop:
//             Stats = 2x2 block on the left
//             Hero = larger section on the right
//           ========================================================= */}
//         <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.8fr)] lg:gap-8">
//           {/* =======================================================
//       FAST FACTS
//       ======================================================= */}
//           <div
//             className="
//               order-1 min-w-0
//               rounded-2xl
//               border-[10px] border-[#7E9876]
//               bg-surface-container-lowest
//               p-3
//             "
//           >
//             <div
//               className="
//                 grid h-full
//                 grid-cols-4 gap-2
//                 sm:gap-3
//                 lg:grid-cols-2 lg:gap-3
//               "
//             >
//               <AnimatedStat
//                 value={50}
//                 suffix="+"
//                 label="Teachers"
//                 className="min-w-0 bg-on-primary-container text-on-primary"
//               />

//               <AnimatedStat
//                 value={500}
//                 suffix="+"
//                 label="Students"
//                 className="min-w-0 bg-primary-container text-on-secondary"
//               />

//               <AnimatedStat
//                 value={20}
//                 suffix="+"
//                 label="Class Rooms"
//                 className="min-w-0 bg-surface-container-high text-primary border border-border-neutral"
//               />

//               <AnimatedStat
//                 value={90}
//                 suffix="%"
//                 label="Pass Rate"
//                 className="min-w-0 bg-surface-container-low text-secondary border border-border-neutral"
//               />
//             </div>
//           </div>

//           {/* =======================================================
//       HERO
//       ======================================================= */}
//           <div
//             className="group relative order-2 min-w-0 overflow-hidden rounded-2xl"
//           >
//             <div className="relative h-105 w-full sm:h-120 lg:h-full lg:min-h-120">
//               <div className="absolute inset-0 z-0">
//                 <div
//                   className="
//                     h-full w-full
//                     bg-cover bg-center
//                     transition-transform duration-700
//                     group-hover:scale-105
//                   "
//                   style={{
//                     backgroundImage: `url(${collegeImage})`,
//                   }}
//                 />

//                 <div className="absolute inset-0 bg-linear-to-r from-on-surface/80 via-on-surface/40 to-transparent" />
//               </div>

//               <div
//                 className="
//                   relative z-10
//                   flex h-full
//                   max-w-2xl
//                   flex-col justify-center
//                   px-6
//                   text-on-primary
//                   sm:px-8
//                   md:px-12
//                 "
//               >
//                 <h2 className="mb-4 font-display-lg text-display-sm sm:text-display-lg">
//                   Empowering Women through Excellence in Education
//                 </h2>

//                 <p className="mb-8 font-body-lg text-body-sm leading-relaxed opacity-90 sm:text-body-lg">
//                   ঝালকাঠি সরকারি মহিলা কলেজের অফিসিয়াল ওয়েবসাইটে আপনাকে
//                   আন্তরিক স্বাগতম। আমরা বিশ্বাস করি শিক্ষা জাতির অগ্রগতির প্রধান
//                   চালিকাশক্তি।
//                 </p>

//               </div>
//             </div>
//           </div>
//         </section>

//         {/* <!-- 2.  HISTORY & Principle and vice principle SECTION */}
//         <HistoryWithPrincipleAndVicePrinciple />

//         <section className="mx-auto w-[96%] rounded-3xl bg-surface-container-low p-6 md:p-10">
//           <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//             <div>
//               <h3 className="font-headline-lg text-headline-lg text-on-surface">
//                 Faculty Spotlight
//               </h3>

//               <p className="font-body-md text-body-md text-on-surface-variant">
//                 Meet our dedicated educators shaping the future.
//               </p>
//             </div>

//             <Link
//               to="/professors"
//               className="rounded-lg border-2 border-primary px-6 py-2 font-bold text-primary transition-all hover:bg-primary hover:text-white"
//             >
//               View Faculty Directory
//             </Link>
//           </div>

//           {professorsQuery.isLoading ? (
//             <PageLoader />
//           ) : professorsQuery.isError ? (
//             <div className="rounded-2xl bg-background p-8 text-center">
//               <p className="font-medium text-destructive">
//                 Unable to load faculty information.
//               </p>
//             </div>
//           ) : spotlightProfessors.length === 0 ? (
//             <div className="rounded-2xl bg-background p-8 text-center">
//               <p className="text-sm text-on-surface-variant">
//                 No professors found.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
//               {spotlightProfessors.map((professor) => (
//                 <div
//                   key={professor.id}
//                   className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
//                 >
//                   <div className="relative overflow-hidden">
//                     {professor.imageUrl ? (
//                       <img
//                         src={professor.imageUrl}
//                         alt={professor.name}
//                         className="aspect-[0.79] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
//                         onError={(event) => {
//                           event.currentTarget.style.display = "none";
//                         }}
//                       />
//                     ) : (
//                       <div className="flex aspect-[0.79] w-full items-center justify-center bg-muted">
//                         <UserRound className="h-16 w-16 text-muted-foreground/50" />
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-4">
//                     <h5 className="font-label-md text-label-md font-bold text-primary">
//                       {professor.name}
//                     </h5>

//                     <p className="text-[12px] uppercase tracking-tighter text-on-surface-variant">
//                       {professor.designation}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         <section
//           id="notices"
//           className="mx-auto w-[95%] overflow-hidden rounded-xl border border-border-neutral bg-surface p-6 shadow-sm"
//         >
//           <div className="mb-6 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <span className="text-xl text-notice-red">📢</span>
//               <h3 className="font-headline-lg text-headline-lg">
//                 Notice Board
//               </h3>
//             </div>
//             <a href="#" className="font-bold text-primary hover:underline">
//               View All →
//             </a>
//           </div>

//           {/* Latest 5 notices across every category (HSC, Degree, Honours
//               & Masters, Officials, Admission, Exam Notice, General) mixed
//               together and sorted newest-first — which category each one
//               came from doesn't matter here, only recency does. */}

//           {noticesLoading && (
//             <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
//               Loading notices...
//             </div>
//           )}

//           {noticesError && !noticesLoading && (
//             <div className="rounded-lg border border-destructive/30 p-8 text-center text-sm text-destructive">
//               {noticesError}
//             </div>
//           )}

//           {!noticesLoading && !noticesError && notices.length === 0 && (
//             <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
//               No notices available right now.
//             </div>
//           )}

//           {!noticesLoading && !noticesError && notices.length > 0 && (
//             <div className="space-y-2">
//               {notices.map((notice, index) => (
//                 <a
//                   key={notice.id}
//                   href="#"
//                   className={`group flex items-center justify-between rounded-lg border-l-4 bg-white p-4 transition-colors hover:bg-primary-container/20 ${
//                     index % 2 === 0 ? "border-primary" : "border-alert-amber"
//                   }`}
//                 >
//                   <div className="flex min-w-0 flex-col">
//                     <span className="font-label-md text-label-md text-primary">
//                       {formatNoticeDate(notice.createdTime)}
//                     </span>
//                     <span className="font-body-md text-body-md line-clamp-2 break-words font-semibold text-on-surface">
//                       {notice.description}
//                     </span>
//                   </div>
//                   <span className="ml-4 shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-1">
//                     ↓
//                   </span>
//                 </a>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// export default HomePage;
