import { Megaphone } from "lucide-react";

function TopTicker() {
  return (
    <div className="flex w-full items-center overflow-hidden bg-secondary py-2 text-secondary-foreground">
      <div className="z-10 ml-2 flex shrink-0 items-center gap-2 border-r border-secondary-foreground/20 bg-secondary pr-4">
        <Megaphone className="h-5 w-5 shrink-0" />

        <span className="whitespace-nowrap font-bold">
          সর্বশেষ আপডেট:
        </span>
      </div>

      <div className="ticker-container grow">
        <div className="ticker-text whitespace-nowrap px-4 font-medium">
          অনার্স ১ম বর্ষ -২০২৫-২০২৬ ভর্তি ১ম রিলিজ স্লিপ ২২-০৭-২০২৬ থেকে ০১-০৮-২০২৬ পর্যন্ত । • অনার্স ২য় বর্ষ ২০২৫ ফরম পূরণ ০৫-০৭-২০২৬ থেকে ২৮-০৭-২০২৬ পর্যন্ত ।
        </div>
      </div>
    </div>
  );
}

export default TopTicker;