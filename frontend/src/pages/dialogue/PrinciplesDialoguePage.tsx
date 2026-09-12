import principleImage from "../../assets/principle.png";

const principalMessage = `ঝালকাঠি সরকারি মহিলা কলেজের সম্মানিত শিক্ষকবৃন্দ, প্রিয় শিক্ষার্থীবৃন্দ, অভিভাবকমণ্ডলী এবং সংশ্লিষ্ট সকলকে জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন।

রূপসী বাংলার কবি জীবনানন্দ দাশ, শেরে বাংলা এ.কে. ফজলুল হকের জন্মভূমি; বাংলাদেশের দক্ষিণের জেলা ঝালকাঠি। এই জেলার নারী শিক্ষার বাতিঘর হিসেবে ১৯৮১ সাল থেকে ঝালকাঠি মহিলা কলেজ যাত্রা শুরু করে। যাত্রার পরবর্তীতে ১৯৯৭ সালে কলেজটি জাতীয়করণ করা হয়। শুরু থেকে এখনও পর্যন্ত কলেজটি অত্যন্ত সুনামের সাথে নারী শিক্ষার আলোকবর্তিকা হিসেবে কাজ করে যাচ্ছে।

শিক্ষা মানুষের সামগ্রিক বিকাশের অন্যতম প্রধান মাধ্যম। একটি জাতির অগ্রগতি নির্ভর করে তার শিক্ষার মান ও বিস্তারের ওপর। এই বিশ্বাসকে ধারণ করে ঝালকাঠি সরকারি মহিলা কলেজ দীর্ঘ দিন ধরে নারী শিক্ষার প্রসার, জ্ঞানচর্চা এবং নৈতিক মূল্যবোধ গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।

আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকভিত্তিক শিক্ষা প্রদান নয়, বরং সৃজনশীলতা, মানবিকতা এবং নেতৃত্বগুণে সমৃদ্ধ একজন দায়িত্বশীল নাগরিক হিসেবে শিক্ষার্থীদের গড়ে তোলা।

বর্তমান যুগ তথ্যপ্রযুক্তির যুগ। বিশ্ব দ্রুত পরিবর্তিত হচ্ছে, আর সেই পরিবর্তনের সঙ্গে তাল মিলিয়ে আমাদের শিক্ষা ব্যবস্থাকেও আধুনিকায়ন করতে হচ্ছে। কৃত্রিম বুদ্ধিমত্তার এই যুগে একজন শিক্ষার্থী শুধু প্রতিষ্ঠান কিংবা দেশের শিক্ষার্থী নয় বরং সে হয়ে ওঠে বিশ্ব শিক্ষার্থী। ঝালকাঠি সরকারি মহিলা কলেজের শিক্ষার্থীদের সেই লক্ষ্যে গড়ে তোলার প্রয়াস নিয়ে নিরলস প্রচেষ্টা করে যাচ্ছে প্রতিষ্ঠানটি।

আমি দৃঢ়ভাবে বিশ্বাস করি, আমাদের সম্মিলিত প্রচেষ্টায় এই প্রতিষ্ঠান ভবিষ্যতে আরও সাফল্য অর্জন করবে এবং দেশের উন্নয়নে যোগ্য ও দক্ষ নারী গড়ে তুলতে অগ্রণী ভূমিকা পালন করবে। সকলের সুস্বাস্থ্য, সফলতা ও মঙ্গল কামনা করছি।`;

function PrinciplesDialoguePage() {
  return (
    <section className="w-full flex my-2.5 items-center justify-center  space-y-5 lg:space-y-6">
      <div
        className="w-[95%] overflow-hidden rounded-2xl
          border-3 border-[#7E9876]
          bg-surface-container-highest p-4 shadow-sm lg:p-6"
      >
        <span
          className="mb-4 inline-block w-fit rounded-full
            bg-primary-container px-3 py-1
            font-label-md text-label-md
            text-on-primary-container"
        >
          অধ্যক্ষের বাণী
        </span>

        {/*
          overflow-hidden clears the floated photo block (below the
          370px breakpoint there's no float, so this is a no-op there,
          but still needed above it).
        */}
        <div className="overflow-hidden">
          {/*
            Below 370px: no float, full-width block -> photo renders
            first, then text stacks below it in normal document flow.
            At 370px and up: float-left kicks in, so text wraps
            around the photo on the right instead of stacking.
          */}
          <div
            className="mb-4 w-full shrink-0
              min-[370px]:float-left min-[370px]:mr-5 min-[370px]:w-36
              sm:min-[370px]:w-48 sm:min-[370px]:mr-6
              lg:min-[370px]:w-64"
          >
            <img
              src={principleImage}
              alt="Principal"
              className="mx-auto w-full max-w-xs
                min-[370px]:max-w-none
                aspect-[0.79] rounded-2xl object-cover"
            />

            <div
              className="mx-auto mt-2 w-full max-w-xs
                min-[370px]:max-w-none
                rounded-2xl bg-primary p-3 text-on-primary"
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

          <p
            className="whitespace-pre-line font-body-md text-body-sm
              leading-relaxed text-on-surface-variant
              sm:text-body-md md:text-body-lg"
          >
            {principalMessage}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PrinciplesDialoguePage;







// import principleImage from "../assets/principle.png";

// const principalMessage = `ঝালকাঠি সরকারি মহিলা কলেজের সম্মানিত শিক্ষকবৃন্দ, প্রিয় শিক্ষার্থীবৃন্দ, অভিভাবকমণ্ডলী এবং সংশ্লিষ্ট সকলকে জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন।
// রূপসী বাংলার কবি জীবনানন্দ দাশ, শেরে বাংলা এ.কে. ফজলুল হকের জন্মভূমি; বাংলাদেশের দক্ষিণের জেলা ঝালকাঠি। এই জেলার নারী শিক্ষার বাতিঘর হিসেবে ১৯৮১ সাল থেকে ঝালকাঠি মহিলা কলেজ যাত্রা শুরু করে। যাত্রার পরবর্তীতে ১৯৯৭ সালে কলেজটি জাতীয়করণ করা হয়। শুরু থেকে এখনও পর্যন্ত কলেজটি অত্যন্ত সুনামের সাথে নারী শিক্ষার আলোকবর্তিকা হিসেবে কাজ করে যাচ্ছে।
// শিক্ষা মানুষের সামগ্রিক বিকাশের অন্যতম প্রধান মাধ্যম। একটি জাতির অগ্রগতি নির্ভর করে তার শিক্ষার মান ও বিস্তারের ওপর। এই বিশ্বাসকে ধারণ করে ঝালকাঠি সরকারি মহিলা কলেজ দীর্ঘ দিন ধরে নারী শিক্ষার প্রসার, জ্ঞানচর্চা এবং নৈতিক মূল্যবোধ গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।
// আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকভিত্তিক শিক্ষা প্রদান নয়, বরং সৃজনশীলতা, মানবিকতা এবং নেতৃত্বগুণে সমৃদ্ধ একজন দায়িত্বশীল নাগরিক হিসেবে শিক্ষার্থীদের গড়ে তোলা।
// বর্তমান যুগ তথ্যপ্রযুক্তির যুগ। বিশ্ব দ্রুত পরিবর্তিত হচ্ছে, আর সেই পরিবর্তনের সঙ্গে তাল মিলিয়ে আমাদের শিক্ষা ব্যবস্থাকেও আধুনিকায়ন করতে হচ্ছে। কৃত্রিম বুদ্ধিমত্তার এই যুগে একজন শিক্ষার্থী শুধু প্রতিষ্ঠান কিংবা দেশের শিক্ষার্থী নয় বরং সে হয়ে ওঠে বিশ্ব শিক্ষার্থী। ঝালকাঠি সরকারি মহিলা কলেজের শিক্ষার্থীদের সেই লক্ষ্যে গড়ে তোলার প্রয়াস নিয়ে নিরলস প্রচেষ্টা করে যাচ্ছে প্রতিষ্ঠানটি।
// আমি দৃঢ়ভাবে বিশ্বাস করি, আমাদের সম্মিলিত প্রচেষ্টায় এই প্রতিষ্ঠান ভবিষ্যতে আরও সাফল্য অর্জন করবে এবং দেশের উন্নয়নে যোগ্য ও দক্ষ নারী গড়ে তুলতে অগ্রণী ভূমিকা পালন করবে। সকলের সুস্বাস্থ্য, সফলতা ও মঙ্গল কামনা করছি।`;

// function PrinciplesDialoguePage() {
//   return (
//     <section className="w-full p-4 lg:p-8">
//       <div
//         className="w-full overflow-hidden rounded-2xl
//           border-3 border-[#7E9876]
//           bg-surface-container-highest p-4 shadow-sm lg:p-6"
//       >
//         <span
//           className="mb-4 inline-block w-fit rounded-full
//             bg-primary-container px-3 py-1
//             font-label-md text-label-md
//             text-on-primary-container"
//         >
//           অধ্যক্ষের বাণী
//         </span>

//         {/*
//           overflow-hidden here establishes a new block-formatting
//           context, which "clears" the floated photo block below so
//           the card's height always accounts for the tallest of the
//           two (photo vs. text) — the classic clearfix trick, no
//           extra empty <div className="clear-both" /> needed.
//         */}
//         <div className="overflow-hidden">
//           {/* Photo + name badge float left; paragraph text wraps
//               around this block, then continues full width once it
//               runs past the block's height. */}
//           <div
//             className="float-left mb-4 mr-5 w-36 shrink-0
//               sm:w-48 sm:mr-6 lg:w-64"
//           >
//             <img
//               src={principleImage}
//               alt="Principal"
//               className="w-full aspect-[0.79] rounded-2xl object-cover"
//             />

//             <div
//               className="mt-2 w-full rounded-2xl
//                 bg-primary p-3 text-on-primary"
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

//           <p
//             className="whitespace-pre-line font-body-md text-body-sm
//               leading-relaxed text-balance text-on-surface-variant
//               sm:text-body-md md:text-body-lg"
//           >
//             {principalMessage}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default PrinciplesDialoguePage;


