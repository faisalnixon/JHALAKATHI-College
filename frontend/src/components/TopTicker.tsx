



import { Megaphone } from "lucide-react";
import { useNotices } from "../hooks/useNotices";

function TopTicker() {
  const { noticesQuery } = useNotices();

  const notices = noticesQuery.data?.notices ?? [];

  const tickerContent =
    notices.length > 0
      ? notices.map((notice) => notice.content).join(" • ")
      : noticesQuery.isLoading
        ? "সর্বশেষ তথ্য লোড হচ্ছে..."
        : "বর্তমানে কোনো নতুন তথ্য নেই।";

  return (
    <section className="relative z-20 flex min-h-11 w-full items-center overflow-hidden bg-[#4d6453] text-white shadow-sm">
      {/* Fixed label */}
      <div className="relative z-10 flex h-11 shrink-0 items-center gap-2 bg-[#4d6453] px-3 md:px-4">
        <Megaphone className="h-5 w-5 shrink-0" />

        <span className="whitespace-nowrap text-[13px] sm:text-[15px] md:text-[18px] font-bold ">
          সর্বশেষ আপডেট:
        </span>
      </div>

      {/* Divider */}
      <div className="h-6 w-px shrink-0 bg-white/25" />

      {/* Scrolling area */}
      <div className="ticker-container flex h-11 min-w-0 flex-1 items-center">
        <div className="ticker-track">
          <span className="ticker-text">{tickerContent}</span>

          <span className="ticker-text" aria-hidden="true">
            {tickerContent}
          </span>
        </div>
      </div>
    </section>
  );
}

export default TopTicker;
