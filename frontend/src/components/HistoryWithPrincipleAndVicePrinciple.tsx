import { useState } from "react";

import principleImage from "../assets/principle.png";
import vicePrincipleImage from "../assets/vice-principle.png";

function HistoryWithPrincipleAndVicePrinciple() {
  const [principalExpanded, setPrincipalExpanded] =
    useState(false);

  const [vicePrincipalExpanded, setVicePrincipalExpanded] =
    useState(false);

  const principalMessage = `ঝালকাঠি সরকারি মহিলা কলেজের সম্মানিত শিক্ষকবৃন্দ, প্রিয় শিক্ষার্থীবৃন্দ, অভিভাবকমণ্ডলী এবং সংশ্লিষ্ট সকলকে জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন।

রূপসী বাংলার কবি জীবনানন্দ দাশ, শেরে বাংলা এ.কে. ফজলুল হকের জন্মভূমি; বাংলাদেশের দক্ষিণের জেলা ঝালকাঠি। এই জেলার নারী শিক্ষার বাতিঘর হিসেবে ১৯৮১ সাল থেকে ঝালকাঠি মহিলা কলেজ যাত্রা শুরু করে। যাত্রার পরবর্তীতে ১৯৯৭ সালে কলেজটি জাতীয়করণ করা হয়। শুরু থেকে এখনও পর্যন্ত কলেজটি অত্যন্ত সুনামের সাথে নারী শিক্ষার আলোকবর্তিকা হিসেবে কাজ করে যাচ্ছে।

শিক্ষা মানুষের সামগ্রিক বিকাশের অন্যতম প্রধান মাধ্যম। একটি জাতির অগ্রগতি নির্ভর করে তার শিক্ষার মান ও বিস্তারের ওপর। এই বিশ্বাসকে ধারণ করে ঝালকাঠি সরকারি মহিলা কলেজ দীর্ঘ দিন ধরে নারী শিক্ষার প্রসার, জ্ঞানচর্চা এবং নৈতিক মূল্যবোধ গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।

আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকভিত্তিক শিক্ষা প্রদান নয়, বরং সৃজনশীলতা, মানবিকতা এবং নেতৃত্বগুণে সমৃদ্ধ একজন দায়িত্বশীল নাগরিক হিসেবে শিক্ষার্থীদের গড়ে তোলা।

বর্তমান যুগ তথ্যপ্রযুক্তির যুগ। বিশ্ব দ্রুত পরিবর্তিত হচ্ছে, আর সেই পরিবর্তনের সঙ্গে তাল মিলিয়ে আমাদের শিক্ষা ব্যবস্থাকেও আধুনিকায়ন করতে হচ্ছে। কৃত্রিম বুদ্ধিমত্তার এই যুগে একজন শিক্ষার্থী শুধু প্রতিষ্ঠান কিংবা দেশের শিক্ষার্থী নয় বরং সে হয়ে ওঠে বিশ্ব শিক্ষার্থী। ঝালকাঠি সরকারি মহিলা কলেজের শিক্ষার্থীদের সেই লক্ষ্যে গড়ে তোলার প্রয়াস নিয়ে নিরলস প্রচেষ্টা করে যাচ্ছে প্রতিষ্ঠানটি।

আমি দৃঢ়ভাবে বিশ্বাস করি, আমাদের সম্মিলিত প্রচেষ্টায় এই প্রতিষ্ঠান ভবিষ্যতে আরও সাফল্য অর্জন করবে এবং দেশের উন্নয়নে যোগ্য ও দক্ষ নারী গড়ে তুলতে অগ্রণী ভূমিকা পালন করবে।

সকলের সুস্বাস্থ্য, সফলতা ও মঙ্গল কামনা করছি।`;

  const vicePrincipalMessage = `সম্মানিত অতিথি, শিক্ষক, অভিভাবক এবং আমার সহকর্মী শিক্ষার্থীরা। এটি প্রতিফলন, কৃতজ্ঞতা এবং প্রত্যাশার একটি মুহূর্ত যখন আমরা আমাদের প্রতিষ্ঠানের কৃতিত্বগুলি উদযাপন করতে এবং আমাদের সামনে থাকা উত্তেজনাপূর্ণ সম্ভাবনাগুলির দিকে তাকাতে একত্রিত হই।

প্রথমত এবং সর্বাগ্রে, আমি আমাদের নিবেদিতপ্রাণ শিক্ষক এবং কর্মীদের প্রতি আমার আন্তরিক কৃতজ্ঞতা জানাতে চাই। আমাদের শিক্ষার্থীদের সর্বোত্তম শিক্ষা এবং নির্দেশিকা প্রদানের জন্য আপনার অটল প্রতিশ্রুতি আমাদের প্রতিষ্ঠানের সাফল্যের ভিত্তি। আপনার আবেগ, উত্সর্গ, এবং অক্লান্ত প্রচেষ্টা সত্যিই প্রশংসনীয়, এবং আমরা আপনার কঠোর পরিশ্রমের জন্য আমাদের অর্জনের জন্য ঋণী।

আমার সহপাঠীদের কাছে, আপনারা এই প্রতিষ্ঠান এর হৃদয় এবং আত্মা। আপনারা প্রত্যেকে আমাদের সম্প্রদায়ের জন্য প্রতিভা, ধারণা এবং আকাঙ্ক্ষার একটি অনন্য সেট নিয়ে আসেন। এটি আমাদের বৈচিত্র্য যা আমাদের শক্তিশালী করে, এবং এটি আমাদের ভাগ করে নেওয়া জ্ঞানের সাধনা যা আমাদের একত্রিত করে। আমরা যখন এই প্রতিষ্ঠানের হলগুলিতে নেভিগেট করি, আমরা কেবল ছাত্র নই; আমরা ভবিষ্যত নেতা, উদ্ভাবক এবং পরিবর্তনকারী।

অভিভাবকগণ, আপনাদের অটল সমর্থন ও উৎসাহ আমাদের ভবিষ্যৎ গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করেছে। আপনি আমাদের শক্তির স্তম্ভ হয়েছিলেন, এবং আমাদের সম্ভাবনার উপর আপনার বিশ্বাস আমাদের শ্রেষ্ঠত্বের সংকল্পকে উত্সাহিত করেছে। এই প্রতিষ্ঠানে আমাদের অর্পণ করার জন্য এবং এই শিক্ষামূলক যাত্রায় আমাদের অংশীদার হওয়ার জন্য আপনাকে ধন্যবাদ।

আমরা ভবিষ্যতের দিকে তাকিয়ে থাকার সময়, আমাদের মনে রাখা উচিত যে শিক্ষা একটি শ্রেণীকক্ষের চার দেওয়ালে সীমাবদ্ধ নয়। এটি এর বাইরেও বিস্তৃত। এটি কৌতূহল, সৃজনশীলতা এবং অজানা অন্বেষণ করার সাহস সম্পর্কে। এটি স্থিতিস্থাপকতা, অভিযোজনযোগ্যতা এবং পরিবর্তনকে আলিঙ্গন করার ইচ্ছা সম্পর্কে। আমাদের প্রতিষ্ঠান আমাদেরকে একটি মজবুত ভিত্তি প্রদান করেছে, কিন্তু এর উপর ভিত্তি করে গড়ে তোলা আমাদের ব্যাপার।

আসন্ন বছরগুলিতে, আসুন আমরা কেবল শিক্ষায় নয় বরং আমাদের জীবনের প্রতিটি ক্ষেত্রে শ্রেষ্ঠত্বের জন্য প্রচেষ্টা চালিয়ে যাই। আসুন আমরা চ্যালেঞ্জগুলিকে বৃদ্ধি এবং শেখার সুযোগ হিসাবে গ্রহণ করি। আসুন আমরা সহানুভূতি এবং সহানুভূতি গড়ে তুলি, কারণ তারা একটি সৌহার্দ্যপূর্ণ সমাজের ভিত্তি। আসুন আমরা বড় স্বপ্ন দেখি এবং সেই স্বপ্নগুলিকে বাস্তবে পরিণত করার জন্য অক্লান্ত পরিশ্রম করি।

প্রতিষ্ঠান-এর চেয়ারম্যান হিসেবে, আমি আপনাদের প্রত্যেকের সম্ভাবনার প্রতি অগাধ বিশ্বাস রাখি। একসাথে, আমরা মহানতা অর্জন করতে পারি, শুধুমাত্র নিজেদের জন্য নয়, আমাদের সম্প্রদায়, আমাদের জাতি এবং আমাদের বিশ্বের জন্য। আসুন আমরা সততা, সম্মান এবং অন্তর্ভুক্তির মূল্যবোধ বজায় রাখি যা আমাদের স্কুলের নীতিকে সংজ্ঞায়িত করে।

সমাপ্তিতে, আমি আবারও প্রত্যেকের প্রতি আমার কৃতজ্ঞতা প্রকাশ করতে চাই যারা এই প্রতিষ্ঠানকে আজকে একটি উল্লেখযোগ্য প্রতিষ্ঠান তৈরিতে অবদান রেখেছে। আমি নিশ্চিত যে আমাদের সামনের যাত্রা সাফল্য, বৃদ্ধি এবং পরিপূর্ণতায় পূর্ণ হবে।

আপনাকে ধন্যবাদ, এবং আসুন আমরা একসাথে এই উত্তেজনাপূর্ণ যাত্রা শুরু করি।`;

  return (
    <section className="w-full space-y-5 lg:space-y-6">
      {/* =========================================================
          HISTORY
      ========================================================= */}
      <div
        className="w-full rounded-2xl border border-border-neutral
          bg-surface p-6 shadow-sm lg:p-8"
      >
        <span
          className="mb-3 inline-block w-fit rounded-full
            bg-secondary-container px-3 py-1
            font-label-md text-label-md
            text-on-secondary-container"
        >
          প্রাতিষ্ঠানিক ইতিহাস
        </span>

        <p
          className="font-body-md text-body-sm leading-relaxed
            text-on-surface-variant sm:text-body-md
            md:text-body-lg"
        >
          ঝালকাঠি জেলায় নারী শিক্ষার প্রসারে ঝালকাঠি সরকারি মহিলা কলেজ
          একটি অত্যন্ত গুরুত্বপূর্ণ ও ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান, যা ১৯৮১
          সালের ১৫ জানুয়ারি প্রথম উচ্চ মাধ্যমিক কলেজ হিসেবে প্রতিষ্ঠিত হয়।
          প্রতিষ্ঠার পর নারী শিক্ষার চাহিদা বিবেচনায় ১৯৮৪ সালে কলেজটিতে
          বি.এ (পাস) বা ডিগ্রি কোর্স চালুর মাধ্যমে শিক্ষার পরিধি বিস্তৃত করা
          হয় এবং পর্যায়ক্রমে ১৯৮৫ সালের ১ জুলাই কলেজটি এমপিওভুক্ত লাভ করার
          পাশাপাশি ১৯৮৭ সালে এর স্নাতক শ্রেণি আরও সম্প্রসারিত হয়। দীর্ঘ সময়
          সফলভাবে বেসরকারি প্রতিষ্ঠান হিসেবে পরিচালিত হওয়ার পর ১৯৯৭ সালের
          ৭ এপ্রিল কলেজটিকে সরকারীকরণ বা জাতীয়করণ করা হয়। বর্তমানে এটি
          জাতীয় বিশ্ববিদ্যালয়ের অধিভুক্ত একটি সরকারি শিক্ষাপ্রতিষ্ঠান,
          যেখানে উচ্চ মাধ্যমিক (বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা), ডিগ্রি
          (পাস) কোর্স এবং একাধিক বিষয়ে স্নাতক (সম্মান) বা অনার্স শ্রেণিতে
          বিপুল সংখ্যক ছাত্রী পড়াশোনা করছে।
        </p>
      </div>

      {/* =========================================================
          PRINCIPAL
      ========================================================= */}
      <div
        className="w-full overflow-hidden rounded-2xl
          border-3 border-[#7E9876]
          bg-surface-container-highest p-3 shadow-sm"
      >
        <div
          className="grid grid-cols-1 gap-4
            lg:grid-cols-[28%_1fr] lg:gap-6"
        >
          {/* Principal Image */}
          <div className="shrink-0">
            <img
              src={principleImage}
              alt="Principal"
              className="mx-auto w-full max-w-sm aspect-[0.79]
                rounded-2xl object-cover lg:max-w-none"
            />

            {/*
              Width is pinned to the exact same classes as the image
              above (mx-auto w-full max-w-sm ... lg:max-w-none) so the
              badge is never wider than the photo on any breakpoint —
              previously it had no width cap at all, so on mobile it
              stretched to the full column width while the image was
              capped at max-w-sm, making the badge visibly wider than
              the photo it belongs to.
            */}
            <div
              className="mx-auto mt-2 w-full max-w-sm rounded-2xl
                bg-primary p-3 text-on-primary
                lg:max-w-none lg:p-4"
            >
              <h4
                className="font-headline-md text-xs
                  leading-tight lg:text-headline-md"
              >
                প্রফেসর মো. ইলিয়াস বেপারি
              </h4>

              <p
                className="font-label-md text-[10px]
                  opacity-90 lg:text-label-md"
              >
                অধ্যক্ষ
              </p>
            </div>
          </div>

          {/* Principal Message */}
          <div
            className="flex flex-col justify-center
              rounded-2xl bg-surface p-4 sm:p-5 lg:p-6"
          >
            <span
              className="mb-3 inline-block w-fit rounded-full
                bg-primary-container px-3 py-1
                font-label-md text-label-md
                text-on-primary-container"
            >
              অধ্যক্ষের বাণী
            </span>

            <p
              className={`font-body-md text-body-sm
                leading-relaxed text-on-surface-variant
                sm:text-body-md md:text-body-lg
                lg:line-clamp-none ${
                  principalExpanded
                    ? "line-clamp-none"
                    : "line-clamp-8"
                }`}
            >
              {principalMessage}
            </p>

            {/* Read Full / Read Less - Mobile + Tablet only */}
            <button
              type="button"
              onClick={() =>
                setPrincipalExpanded(
                  (previous) => !previous,
                )
              }
              className="mt-4 w-fit text-sm font-medium
                text-primary underline underline-offset-4
                hover:opacity-80 lg:hidden"
            >
              {principalExpanded
                ? "Read Less"
                : "Read Full"}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          VICE PRINCIPAL
      ========================================================= */}
      <div
        className="w-full overflow-hidden rounded-2xl
          border-3 border-[#7E9876]
          bg-surface-container-highest p-3 shadow-sm"
      >
        <div
          className="grid grid-cols-1 gap-4
            lg:grid-cols-[28%_1fr] lg:gap-6"
        >
          {/* Vice Principal Image */}
          <div className="shrink-0">
            <img
              src={vicePrincipleImage}
              alt="Vice Principal"
              className="mx-auto w-full max-w-sm aspect-[0.79]
                rounded-2xl object-cover lg:max-w-none"
            />

            {/*
              Same width-matching fix as the principal badge above.
              Background uses primary-container instead of a flat
              gray — a lighter, "less green" tone than the principal's
              bg-primary, while still staying on-brand and readable
              with its paired on-primary-container text color.
            */}
            <div
              className="mx-auto mt-2 w-full max-w-sm rounded-2xl
                bg-primary-container p-3 text-on-primary-container
                lg:max-w-none lg:p-4"
            >
              <h4
                className="font-headline-md text-xs
                  leading-tight lg:text-headline-md"
              >
                প্রফেসর সহিদুল ইসলাম
              </h4>

              <p
                className="font-label-md text-[10px]
                  opacity-90 lg:text-label-md"
              >
                উপাধ্যক্ষ
              </p>
            </div>
          </div>

          {/* Vice Principal Message */}
          <div
            className="flex flex-col justify-center
              rounded-2xl bg-surface p-4 sm:p-5 lg:p-6"
          >
            <span
              className="mb-3 inline-block w-fit rounded-full
                bg-secondary-container px-3 py-1
                font-label-md text-label-md
                text-on-secondary-container"
            >
              উপাধ্যক্ষের বাণী
            </span>

            <p
              className={`font-body-md text-body-sm
                leading-relaxed text-on-surface-variant
                sm:text-body-md md:text-body-lg
                lg:line-clamp-none ${
                  vicePrincipalExpanded
                    ? "line-clamp-none"
                    : "line-clamp-4"
                }`}
            >
              {vicePrincipalMessage}
            </p>

            {/* Read Full / Read Less - Mobile + Tablet only */}
            <button
              type="button"
              onClick={() =>
                setVicePrincipalExpanded(
                  (previous) => !previous,
                )
              }
              className="mt-4 w-fit text-sm font-medium
                text-primary underline underline-offset-4
                hover:opacity-80 lg:hidden"
            >
              {vicePrincipalExpanded
                ? "Read Less"
                : "Read Full"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HistoryWithPrincipleAndVicePrinciple;








// // import principleImage from "../assets/principle.png";
// // import vicePrincipleImage from "../assets/vice-principle.png";

// // function HistoryWithPrincipleAndVicePrinciple() {
// //   return (
// //     <section
// //       className="grid gap-4 lg:gap-6 w-full items-center justify-center
// //             grid-cols-1
// //             [grid-template-areas:'history'_'principal'_'vice']
// //             md:grid-cols-[48%_48%]
// //             md:justify-center
// //             md:[grid-template-areas:'history_history'_'principal_vice']
// //             lg:grid-cols-[23%_50%_23%]
// //             lg:justify-center
// //             lg:[grid-template-areas:'principal_history_vice']"
// //     >
// //       {/* history */}
// //       <div
// //         className="[grid-area:history] w-[98%] md:w-[95%] lg:w-full mx-auto
// //             bg-surface rounded-2xl p-6 lg:p-8 border border-border-neutral shadow-sm
// //             flex flex-col justify-center"
// //       >
// //         <span className="inline-block w-fit px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md mb-3">
// //           প্রাতিষ্ঠানিক ইতিহাস
// //         </span>

// //         <p className="font-body-md text-body-sm sm:text-body-md md:text-body-lg text-on-surface-variant mb-4 leading-relaxed">
// //           {/* ঝালকাঠি অঞ্চলে নারী শিক্ষার প্রসার ও উচ্চশিক্ষার সুযোগ সৃষ্টির লক্ষ্য
// //           নিয়ে ঝালকাঠি সরকারি মহিলা কলেজ প্রতিষ্ঠিত হয়। প্রতিষ্ঠার পর থেকেই
// //           প্রতিষ্ঠানটি এই অঞ্চলের নারীদের শিক্ষা, সংস্কৃতি ও সার্বিক ক্ষমতায়নে
// //           এক আলোকবর্তিকা হিসেবে কাজ করে আসছে। দক্ষ ও অনুরাগী শিক্ষকবৃন্দের
// //           নিবিড় তত্ত্বাবধানে শিক্ষার্থীরা প্রতিবছর উচ্চমাধ্যমিক ও স্নাতক
// //           পর্যায়ে ঈর্ষণীয় সাফল্য অর্জন করছে। আধুনিক শ্রেণিকক্ষ, সমৃদ্ধ পাঠাগার
// //           এবং বিজ্ঞানাগারের সুবিধার মাধ্যমে শিক্ষার্থীদের মননশীল ও যুগোপযোগী করে
// //           গড়ে তোলা হয়। কেবল একাডেমিক পড়াশোনাই নয়, সহপাঠ্যক্রমিক কার্যক্রম
// //           যেমন বিতর্ক, সাহিত্য ও ক্রীড়ায় কলেজের ছাত্রীরা নিয়মিত নিজেদের
// //           শ্রেষ্ঠত্ব প্রমাণ করছে। নীতি ও নৈতিকতার শিক্ষায় উজ্জ্বল হয়ে এখানকার
// //           ছাত্রীরা পরবর্তীতে দেশ-বিদেশের বিভিন্ন গুরুত্বপূর্ণ ক্ষেত্রে যোগ্যতার
// //           স্বাক্ষর রাখছে। শত প্রতিকূলতা পেরিয়ে কলেজটি দক্ষিণবঙ্গের নারী শিক্ষার
// //           অন্যতম প্রধান বিদ্যাপীঠ হিসেবে সুপ্রতিষ্ঠিত। ভবিষ্যতেও এই কলেজের
// //           লক্ষ্য অর্জনের ধারা অব্যাহত রেখে একটি সুশিক্ষিত ও আত্মনির্ভরশীল নারী
// //           সমাজ বিনির্মাণ করা। */}
// //           ঝালকাঠি জেলায় নারী শিক্ষার প্রসারে ঝালকাঠি সরকারি মহিলা কলেজ একটি অত্যন্ত গুরুত্বপূর্ণ ও ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান, যা ১৯৮১ সালের ১৫ জানুয়ারি প্রথম উচ্চ মাধ্যমিক কলেজ হিসেবে প্রতিষ্ঠিত হয়। প্রতিষ্ঠার পর নারী শিক্ষার চাহিদা বিবেচনায় ১৯৮৪ সালে কলেজটিতে বি.এ (পাস) বা ডিগ্রি কোর্স চালুর মাধ্যমে শিক্ষার পরিধি বিস্তৃত করা হয় এবং পর্যায়ক্রমে ১৯৮৫ সালের ১ জুলাই কলেজটি এমপিওভুক্ত লাভ করার পাশাপাশি ১৯৮৭ সালে এর স্নাতক শ্রেণি আরও সম্প্রসারিত হয়। দীর্ঘ সময় সফলভাবে বেসরকারি প্রতিষ্ঠান হিসেবে পরিচালিত হওয়ার পর ১৯৯৭ সালের ৭ এপ্রিল কলেজটিকে সরকারীকরণ বা জাতীয়করণ করা হয়। বর্তমানে এটি জাতীয় বিশ্ববিদ্যালয়ের অধিভুক্ত একটি সরকারি শিক্ষাপ্রতিষ্ঠান, যেখানে উচ্চ মাধ্যমিক (বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা), ডিগ্রি (পাস) কোর্স এবং একাধিক বিষয়ে স্নাতক (সম্মান) বা অনার্স শ্রেণিতে বিপুল সংখ্যক ছাত্রী পড়াশোনা করছে।
// //         </p>
// //       </div>

// //       {/* Principal */}
// //       <div
// //         className="[grid-area:principal] w-[92%] md:w-full mx-auto
// //             bg-surface-container-highest rounded-xl overflow-hidden shadow-sm
// //             flex flex-col shrink-0 border-3 border-[#7E9876] p-3"
// //       >
// //         <img
// //           alt="Principal"
// //           className="w-full aspect-[0.79] object-cover rounded-2xl"
// //           src={principleImage}
// //         />
// //         <div className="mt-1 p-3 lg:p-4 bg-primary text-on-primary flex-1 rounded-2xl">
// //           <h4 className="font-headline-md text-xs lg:text-headline-md leading-tight">
// //             প্রফেসর মো. ইলিয়াস বেপারি
// //           </h4>
// //           <p className="font-label-md text-[10px] lg:text-label-md opacity-90">
// //             অধ্যক্ষ
// //           </p>
// //         </div>
// //       </div>

// //       {/* Vice Principal */}
// //       <div
// //         className="[grid-area:vice] w-[92%] md:w-full mx-auto
// //             bg-surface-container-highest overflow-hidden shadow-sm
// //             flex flex-col shrink-0 border-3 border-[#7E9876] rounded-2xl p-3"
// //       >
// //         <img
// //           alt="Vice Principal"
// //           className="w-full aspect-[0.79] object-cover rounded-2xl"
// //           src={vicePrincipleImage}
// //         />
// //         <div className="mt-1 p-3 lg:p-4 bg-gray-500 text-on-primary flex-1 rounded-2xl">
// //           <h4 className="font-headline-md text-xs lg:text-headline-md leading-tight">
// //             প্রফেসর সহিদুল ইসলাম
// //           </h4>
// //           <p className="font-label-md text-[10px] lg:text-label-md opacity-90">
// //             উপাধ্যক্ষ
// //           </p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // export default HistoryWithPrincipleAndVicePrinciple;










// import { useState } from "react";

// import principleImage from "../assets/principle.png";
// import vicePrincipleImage from "../assets/vice-principle.png";

// function HistoryWithPrincipleAndVicePrinciple() {
//   const [principalExpanded, setPrincipalExpanded] =
//     useState(false);

//   const [vicePrincipalExpanded, setVicePrincipalExpanded] =
//     useState(false);

//   const principalMessage = `ঝালকাঠি সরকারি মহিলা কলেজের সম্মানিত শিক্ষকবৃন্দ, প্রিয় শিক্ষার্থীবৃন্দ, অভিভাবকমণ্ডলী এবং সংশ্লিষ্ট সকলকে জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন।

// রূপসী বাংলার কবি জীবনানন্দ দাশ, শেরে বাংলা এ.কে. ফজলুল হকের জন্মভূমি; বাংলাদেশের দক্ষিণের জেলা ঝালকাঠি। এই জেলার নারী শিক্ষার বাতিঘর হিসেবে ১৯৮১ সাল থেকে ঝালকাঠি মহিলা কলেজ যাত্রা শুরু করে। যাত্রার পরবর্তীতে ১৯৯৭ সালে কলেজটি জাতীয়করণ করা হয়। শুরু থেকে এখনও পর্যন্ত কলেজটি অত্যন্ত সুনামের সাথে নারী শিক্ষার আলোকবর্তিকা হিসেবে কাজ করে যাচ্ছে।

// শিক্ষা মানুষের সামগ্রিক বিকাশের অন্যতম প্রধান মাধ্যম। একটি জাতির অগ্রগতি নির্ভর করে তার শিক্ষার মান ও বিস্তারের ওপর। এই বিশ্বাসকে ধারণ করে ঝালকাঠি সরকারি মহিলা কলেজ দীর্ঘ দিন ধরে নারী শিক্ষার প্রসার, জ্ঞানচর্চা এবং নৈতিক মূল্যবোধ গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।

// আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকভিত্তিক শিক্ষা প্রদান নয়, বরং সৃজনশীলতা, মানবিকতা এবং নেতৃত্বগুণে সমৃদ্ধ একজন দায়িত্বশীল নাগরিক হিসেবে শিক্ষার্থীদের গড়ে তোলা।

// বর্তমান যুগ তথ্যপ্রযুক্তির যুগ। বিশ্ব দ্রুত পরিবর্তিত হচ্ছে, আর সেই পরিবর্তনের সঙ্গে তাল মিলিয়ে আমাদের শিক্ষা ব্যবস্থাকেও আধুনিকায়ন করতে হচ্ছে। কৃত্রিম বুদ্ধিমত্তার এই যুগে একজন শিক্ষার্থী শুধু প্রতিষ্ঠান কিংবা দেশের শিক্ষার্থী নয় বরং সে হয়ে ওঠে বিশ্ব শিক্ষার্থী। ঝালকাঠি সরকারি মহিলা কলেজের শিক্ষার্থীদের সেই লক্ষ্যে গড়ে তোলার প্রয়াস নিয়ে নিরলস প্রচেষ্টা করে যাচ্ছে প্রতিষ্ঠানটি।

// আমি দৃঢ়ভাবে বিশ্বাস করি, আমাদের সম্মিলিত প্রচেষ্টায় এই প্রতিষ্ঠান ভবিষ্যতে আরও সাফল্য অর্জন করবে এবং দেশের উন্নয়নে যোগ্য ও দক্ষ নারী গড়ে তুলতে অগ্রণী ভূমিকা পালন করবে।

// সকলের সুস্বাস্থ্য, সফলতা ও মঙ্গল কামনা করছি।`;

//   const vicePrincipalMessage = `সম্মানিত অতিথি, শিক্ষক, অভিভাবক এবং আমার সহকর্মী শিক্ষার্থীরা। এটি প্রতিফলন, কৃতজ্ঞতা এবং প্রত্যাশার একটি মুহূর্ত যখন আমরা আমাদের প্রতিষ্ঠানের কৃতিত্বগুলি উদযাপন করতে এবং আমাদের সামনে থাকা উত্তেজনাপূর্ণ সম্ভাবনাগুলির দিকে তাকাতে একত্রিত হই।

// প্রথমত এবং সর্বাগ্রে, আমি আমাদের নিবেদিতপ্রাণ শিক্ষক এবং কর্মীদের প্রতি আমার আন্তরিক কৃতজ্ঞতা জানাতে চাই। আমাদের শিক্ষার্থীদের সর্বোত্তম শিক্ষা এবং নির্দেশিকা প্রদানের জন্য আপনার অটল প্রতিশ্রুতি আমাদের প্রতিষ্ঠানের সাফল্যের ভিত্তি। আপনার আবেগ, উত্সর্গ, এবং অক্লান্ত প্রচেষ্টা সত্যিই প্রশংসনীয়, এবং আমরা আপনার কঠোর পরিশ্রমের জন্য আমাদের অর্জনের জন্য ঋণী।

// আমার সহপাঠীদের কাছে, আপনারা এই প্রতিষ্ঠান এর হৃদয় এবং আত্মা। আপনারা প্রত্যেকে আমাদের সম্প্রদায়ের জন্য প্রতিভা, ধারণা এবং আকাঙ্ক্ষার একটি অনন্য সেট নিয়ে আসেন। এটি আমাদের বৈচিত্র্য যা আমাদের শক্তিশালী করে, এবং এটি আমাদের ভাগ করে নেওয়া জ্ঞানের সাধনা যা আমাদের একত্রিত করে। আমরা যখন এই প্রতিষ্ঠানের হলগুলিতে নেভিগেট করি, আমরা কেবল ছাত্র নই; আমরা ভবিষ্যত নেতা, উদ্ভাবক এবং পরিবর্তনকারী।

// অভিভাবকগণ, আপনাদের অটল সমর্থন ও উৎসাহ আমাদের ভবিষ্যৎ গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করেছে। আপনি আমাদের শক্তির স্তম্ভ হয়েছিলেন, এবং আমাদের সম্ভাবনার উপর আপনার বিশ্বাস আমাদের শ্রেষ্ঠত্বের সংকল্পকে উত্সাহিত করেছে। এই প্রতিষ্ঠানে আমাদের অর্পণ করার জন্য এবং এই শিক্ষামূলক যাত্রায় আমাদের অংশীদার হওয়ার জন্য আপনাকে ধন্যবাদ।

// আমরা ভবিষ্যতের দিকে তাকিয়ে থাকার সময়, আমাদের মনে রাখা উচিত যে শিক্ষা একটি শ্রেণীকক্ষের চার দেওয়ালে সীমাবদ্ধ নয়। এটি এর বাইরেও বিস্তৃত। এটি কৌতূহল, সৃজনশীলতা এবং অজানা অন্বেষণ করার সাহস সম্পর্কে। এটি স্থিতিস্থাপকতা, অভিযোজনযোগ্যতা এবং পরিবর্তনকে আলিঙ্গন করার ইচ্ছা সম্পর্কে। আমাদের প্রতিষ্ঠান আমাদেরকে একটি মজবুত ভিত্তি প্রদান করেছে, কিন্তু এর উপর ভিত্তি করে গড়ে তোলা আমাদের ব্যাপার।

// আসন্ন বছরগুলিতে, আসুন আমরা কেবল শিক্ষায় নয় বরং আমাদের জীবনের প্রতিটি ক্ষেত্রে শ্রেষ্ঠত্বের জন্য প্রচেষ্টা চালিয়ে যাই। আসুন আমরা চ্যালেঞ্জগুলিকে বৃদ্ধি এবং শেখার সুযোগ হিসাবে গ্রহণ করি। আসুন আমরা সহানুভূতি এবং সহানুভূতি গড়ে তুলি, কারণ তারা একটি সৌহার্দ্যপূর্ণ সমাজের ভিত্তি। আসুন আমরা বড় স্বপ্ন দেখি এবং সেই স্বপ্নগুলিকে বাস্তবে পরিণত করার জন্য অক্লান্ত পরিশ্রম করি।

// প্রতিষ্ঠান-এর চেয়ারম্যান হিসেবে, আমি আপনাদের প্রত্যেকের সম্ভাবনার প্রতি অগাধ বিশ্বাস রাখি। একসাথে, আমরা মহানতা অর্জন করতে পারি, শুধুমাত্র নিজেদের জন্য নয়, আমাদের সম্প্রদায়, আমাদের জাতি এবং আমাদের বিশ্বের জন্য। আসুন আমরা সততা, সম্মান এবং অন্তর্ভুক্তির মূল্যবোধ বজায় রাখি যা আমাদের স্কুলের নীতিকে সংজ্ঞায়িত করে।

// সমাপ্তিতে, আমি আবারও প্রত্যেকের প্রতি আমার কৃতজ্ঞতা প্রকাশ করতে চাই যারা এই প্রতিষ্ঠানকে আজকে একটি উল্লেখযোগ্য প্রতিষ্ঠান তৈরিতে অবদান রেখেছে। আমি নিশ্চিত যে আমাদের সামনের যাত্রা সাফল্য, বৃদ্ধি এবং পরিপূর্ণতায় পূর্ণ হবে।

// আপনাকে ধন্যবাদ, এবং আসুন আমরা একসাথে এই উত্তেজনাপূর্ণ যাত্রা শুরু করি।`;

//   return (
//     <section className="w-full space-y-5 lg:space-y-6">
//       {/* =========================================================
//           HISTORY
//       ========================================================= */}
//       <div
//         className="w-full rounded-2xl border border-border-neutral
//           bg-surface p-6 shadow-sm lg:p-8"
//       >
//         <span
//           className="mb-3 inline-block w-fit rounded-full
//             bg-secondary-container px-3 py-1
//             font-label-md text-label-md
//             text-on-secondary-container"
//         >
//           প্রাতিষ্ঠানিক ইতিহাস
//         </span>

//         <p
//           className="font-body-md text-body-sm leading-relaxed
//             text-on-surface-variant sm:text-body-md
//             md:text-body-lg"
//         >
//           ঝালকাঠি জেলায় নারী শিক্ষার প্রসারে ঝালকাঠি সরকারি মহিলা কলেজ
//           একটি অত্যন্ত গুরুত্বপূর্ণ ও ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান, যা ১৯৮১
//           সালের ১৫ জানুয়ারি প্রথম উচ্চ মাধ্যমিক কলেজ হিসেবে প্রতিষ্ঠিত হয়।
//           প্রতিষ্ঠার পর নারী শিক্ষার চাহিদা বিবেচনায় ১৯৮৪ সালে কলেজটিতে
//           বি.এ (পাস) বা ডিগ্রি কোর্স চালুর মাধ্যমে শিক্ষার পরিধি বিস্তৃত করা
//           হয় এবং পর্যায়ক্রমে ১৯৮৫ সালের ১ জুলাই কলেজটি এমপিওভুক্ত লাভ করার
//           পাশাপাশি ১৯৮৭ সালে এর স্নাতক শ্রেণি আরও সম্প্রসারিত হয়। দীর্ঘ সময়
//           সফলভাবে বেসরকারি প্রতিষ্ঠান হিসেবে পরিচালিত হওয়ার পর ১৯৯৭ সালের
//           ৭ এপ্রিল কলেজটিকে সরকারীকরণ বা জাতীয়করণ করা হয়। বর্তমানে এটি
//           জাতীয় বিশ্ববিদ্যালয়ের অধিভুক্ত একটি সরকারি শিক্ষাপ্রতিষ্ঠান,
//           যেখানে উচ্চ মাধ্যমিক (বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা), ডিগ্রি
//           (পাস) কোর্স এবং একাধিক বিষয়ে স্নাতক (সম্মান) বা অনার্স শ্রেণিতে
//           বিপুল সংখ্যক ছাত্রী পড়াশোনা করছে।
//         </p>
//       </div>

//       {/* =========================================================
//           PRINCIPAL
//       ========================================================= */}
//       <div
//         className="w-full overflow-hidden rounded-2xl
//           border-3 border-[#7E9876]
//           bg-surface-container-highest p-3 shadow-sm"
//       >
//         <div
//           className="grid grid-cols-1 gap-4
//             lg:grid-cols-[28%_1fr] lg:gap-6"
//         >
//           {/* Principal Image */}
//           <div className="shrink-0">
//             <img
//               src={principleImage}
//               alt="Principal"
//               className="mx-auto w-full max-w-sm aspect-[0.79]
//                 rounded-2xl object-cover lg:max-w-none"
//             />

//             <div
//               className="mt-2 rounded-2xl bg-primary
//                 p-3 text-on-primary lg:p-4"
//             >
//               <h4
//                 className="font-headline-md text-xs
//                   leading-tight lg:text-headline-md"
//               >
//                 প্রফেসর মো. ইলিয়াস বেপারি
//               </h4>

//               <p
//                 className="font-label-md text-[10px]
//                   opacity-90 lg:text-label-md"
//               >
//                 অধ্যক্ষ
//               </p>
//             </div>
//           </div>

//           {/* Principal Message */}
//           <div
//             className="flex flex-col justify-center
//               rounded-2xl bg-surface p-4 sm:p-5 lg:p-6"
//           >
//             <span
//               className="mb-3 inline-block w-fit rounded-full
//                 bg-primary-container px-3 py-1
//                 font-label-md text-label-md
//                 text-on-primary-container"
//             >
//               অধ্যক্ষের বাণী
//             </span>

//             <p
//               className={`font-body-md text-body-sm
//                 leading-relaxed text-on-surface-variant
//                 sm:text-body-md md:text-body-lg
//                 lg:line-clamp-none ${
//                   principalExpanded
//                     ? "line-clamp-none"
//                     : "line-clamp-8"
//                 }`}
//             >
//               {principalMessage}
//             </p>

//             {/* Read Full / Read Less - Mobile + Tablet only */}
//             <button
//               type="button"
//               onClick={() =>
//                 setPrincipalExpanded(
//                   (previous) => !previous,
//                 )
//               }
//               className="mt-4 w-fit text-sm font-medium
//                 text-primary underline underline-offset-4
//                 hover:opacity-80 lg:hidden"
//             >
//               {principalExpanded
//                 ? "Read Less"
//                 : "Read Full"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           VICE PRINCIPAL
//       ========================================================= */}
//       <div
//         className="w-full overflow-hidden rounded-2xl
//           border-3 border-[#7E9876]
//           bg-surface-container-highest p-3 shadow-sm"
//       >
//         <div
//           className="grid grid-cols-1 gap-4
//             lg:grid-cols-[28%_1fr] lg:gap-6"
//         >
//           {/* Vice Principal Image */}
//           <div className="shrink-0">
//             <img
//               src={vicePrincipleImage}
//               alt="Vice Principal"
//               className="mx-auto w-full max-w-sm aspect-[0.79]
//                 rounded-2xl object-cover lg:max-w-none"
//             />

//             <div
//               className="mt-2 rounded-2xl bg-gray-500
//                 p-3 text-on-primary lg:p-4"
//             >
//               <h4
//                 className="font-headline-md text-xs
//                   leading-tight lg:text-headline-md"
//               >
//                 প্রফেসর সহিদুল ইসলাম
//               </h4>

//               <p
//                 className="font-label-md text-[10px]
//                   opacity-90 lg:text-label-md"
//               >
//                 উপাধ্যক্ষ
//               </p>
//             </div>
//           </div>

//           {/* Vice Principal Message */}
//           <div
//             className="flex flex-col justify-center
//               rounded-2xl bg-surface p-4 sm:p-5 lg:p-6"
//           >
//             <span
//               className="mb-3 inline-block w-fit rounded-full
//                 bg-secondary-container px-3 py-1
//                 font-label-md text-label-md
//                 text-on-secondary-container"
//             >
//               উপাধ্যক্ষের বাণী
//             </span>

//             <p
//               className={`font-body-md text-body-sm
//                 leading-relaxed text-on-surface-variant
//                 sm:text-body-md md:text-body-lg
//                 lg:line-clamp-none ${
//                   vicePrincipalExpanded
//                     ? "line-clamp-none"
//                     : "line-clamp-4"
//                 }`}
//             >
//               {vicePrincipalMessage}
//             </p>

//             {/* Read Full / Read Less - Mobile + Tablet only */}
//             <button
//               type="button"
//               onClick={() =>
//                 setVicePrincipalExpanded(
//                   (previous) => !previous,
//                 )
//               }
//               className="mt-4 w-fit text-sm font-medium
//                 text-primary underline underline-offset-4
//                 hover:opacity-80 lg:hidden"
//             >
//               {vicePrincipalExpanded
//                 ? "Read Less"
//                 : "Read Full"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HistoryWithPrincipleAndVicePrinciple;