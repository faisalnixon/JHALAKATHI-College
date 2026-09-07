import collegeImage from "../assets/cover pic 2.png";
import HistoryWithPrincipleAndVicePrinciple from "../components/HistoryWithPrincipleAndVicePrinciple";


function HomePage() {
  return (
    <div className="space-y-12">
      <main className="mx-auto w-full max-w-350 space-y-12 px-4 py-6">
        {/* <!-- 1. HERO + FAST FACTS SECTION */}

        <section className="flex flex-col lg:flex-row-reverse gap-14 w-full items-stretch">
          {/* <!-- Hero / Welcome Section (58% width on PC) --> */}
          <div className="w-full lg:w-[62%] shrink-0 relative h-120 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                data-alt="A grand cinematic wide shot..."
                style={{
                  backgroundImage: `url(${collegeImage})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-r from-on-surface/80 via-on-surface/40 to-transparent"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-2xl text-on-primary">
              <h2 className="font-display-lg text-display-sm sm:text-display-lg   mb-4">
                Empowering Women through Excellence in Education
              </h2>
              <p className="font-body-lg text-body-sm sm:text-body-lg mb-8 leading-relaxed opacity-90">
                ঝালকাঠি সরকারি মহিলা কলেজের অফিসিয়াল ওয়েবসাইটে আপনাকে আন্তরিক
                স্বাগতম। আমরা বিশ্বাস করি শিক্ষা জাতির অগ্রগতির প্রধান
                চালিকাশক্তি।
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:brightness-110 transition-all">
                  Admission info
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Fast Facts Stats Grid (32% width on PC with bold #657E5E border) --> */}
          <div className="w-full lg:w-[19%] flex-1 border-12  border-[#7E9876] rounded-2xl p-3 bg-surface-container-lowest">
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-3 h-full">
              <div className="w-full lg:w-auto bg-primary p-4 lg:p-6 rounded-xl text-on-primary flex flex-col justify-center items-center text-center">
                <span className="font-display-lg text-2xl md:text-display-lg">
                  50+
                </span>
                <span className="font-label-md text-[10px] md:text-label-md uppercase tracking-widest opacity-80">
                  Teachers
                </span>
              </div>
              <div className="w-full lg:w-auto bg-secondary p-4 lg:p-6 rounded-xl text-on-secondary flex flex-col justify-center items-center text-center">
                <span className="font-display-lg text-2xl md:text-display-lg">
                  500+
                </span>
                <span className="font-label-md text-[10px] md:text-label-md uppercase tracking-widest opacity-80">
                  Students
                </span>
              </div>
              <div className="w-full lg:w-auto bg-surface-container-high p-4 lg:p-6 rounded-xl text-primary flex flex-col justify-center items-center text-center border border-border-neutral">
                <span className="font-display-lg text-2xl md:text-display-lg">
                  20+
                </span>
                <span className="font-label-md text-[10px] md:text-label-md uppercase tracking-widest text-on-surface-variant">
                  Class Rooms
                </span>
              </div>
              <div className="w-full lg:w-auto bg-surface-container-low p-4 lg:p-6 rounded-xl text-secondary flex flex-col justify-center items-center text-center border border-border-neutral">
                <span className="font-display-lg text-2xl md:text-display-lg">
                  90%
                </span>
                <span className="font-label-md text-[10px] md:text-label-md uppercase tracking-widest text-on-surface-variant">
                  Pass Rate
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- 2.  HISTORY & Principle and vice principle SECTION */}
        <HistoryWithPrincipleAndVicePrinciple/>

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
            <button className="rounded-lg border-2 border-primary px-6 py-2 font-bold text-primary transition-all hover:bg-primary hover:text-white">
              View Faculty Directory
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {[
              ["jaki m.png", "মোঃ জাকির মাহমুদ", "Assoc. Professor"],
              ["robin.png", "মোঃ ইমরান হোসেন রবিন", "Asst. Professor"],
              ["suma.png", "সুমা খানম", "Lecturer"],
              ["wazi.png", "ওয়াজিউল্লাহ", "Lecturer"],
              ["subroto.png", "সুব্রত কুমার কর্মকার", "Lecturer"],
            ].map(([image, name, role]) => (
              <div
                key={name}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <img
                  src={`/assets/${image}`}
                  alt={name}
                  className="aspect-[0.79] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <div className="p-4">
                  <h5 className="font-label-md text-label-md font-bold text-primary">
                    {name}
                  </h5>
                  <p className="text-[12px] uppercase tracking-tighter text-on-surface-variant">
                    {role}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
          <div className="space-y-2">
            {[
              [
                "২০ জুলাই ২০২৬",
                "একাদশ শ্রেণির বার্ষিক পরীক্ষা-২০২৬ এর ফলাফল প্রকাশ",
                "border-primary",
              ]
            ].map(([date, title, border]) => (
              <a
                key={title}
                href="#"
                className={`group flex items-center justify-between rounded-lg border-l-4 ${border} bg-white p-4 transition-colors hover:bg-primary-container/20`}
              >
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-primary">
                    {date}
                  </span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">
                    {title}
                  </span>
                </div>
                <span className="ml-4 shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-1">
                  ↓
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
