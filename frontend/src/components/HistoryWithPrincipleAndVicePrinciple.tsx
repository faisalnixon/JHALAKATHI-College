import principleImage from "../assets/principle.png";
import vicePrincipleImage from "../assets/vice-principle.png";

function HistoryWithPrincipleAndVicePrinciple() {

  return (
    <section className="w-full">
      <div
        className="flex flex-wrap items-stretch justify-center
          gap-5 lg:flex-nowrap lg:gap-6"
      >
        {/* =========================================================
            HISTORY  (mobile: 95% | tab: 90% | lg: 50%, middle)
        ========================================================= */}
        <div
          className="order-1 w-[95%] rounded-2xl border
            border-border-neutral bg-surface p-6 shadow-sm
            md:w-[90%] lg:order-2 lg:w-1/2 lg:p-8"
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
            PRINCIPAL  (mobile: 95% | tab: 43% | lg: 23%, left)
        ========================================================= */}
        <div
          className="order-2 w-[95%] shrink-0 overflow-hidden
            rounded-2xl border-3 border-[#7E9876]
            bg-surface-container-highest p-3 shadow-sm
            md:w-[43%] lg:order-1 lg:w-[23%]"
        >
          <img
            src={principleImage}
            alt="Principal"
            className="mx-auto w-full aspect-[0.79]
              rounded-2xl object-cover"
          />

          <div
            className="mx-auto mt-2 w-full rounded-2xl
              bg-primary p-3 text-on-primary lg:p-4"
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

        {/* =========================================================
            VICE PRINCIPAL (mobile: 93% | tab: 43% | lg: 23%, right)
            image/card kept ~5% smaller than principal's via w-[95%]
        ========================================================= */}
        <div
          className="order-3 w-[93%] shrink-0 overflow-hidden
            rounded-2xl border-3 border-[#7E9876]
            bg-surface-container-highest p-3 shadow-sm
            md:w-[43%] lg:w-[23%]"
        >
          <img
            src={vicePrincipleImage}
            alt="Vice Principal"
            className="mx-auto w-[95%] aspect-[0.79]
              rounded-2xl object-cover"
          />

          <div
            className="mx-auto mt-2 w-[95%] rounded-2xl
              bg-primary-container p-3 text-on-primary-container lg:p-4"
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
      </div>
    </section>
  );
}

export default HistoryWithPrincipleAndVicePrinciple;








// import principleImage from "../assets/principle.png";
// import vicePrincipleImage from "../assets/vice-principle.png";

// function HistoryWithPrincipleAndVicePrinciple() {

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
//               className="mx-auto mt-2 w-full max-w-sm rounded-2xl
//                 bg-primary p-3 text-on-primary
//                 lg:max-w-none lg:p-4"
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
//               className="mx-auto mt-2 w-full max-w-sm rounded-2xl
//                 bg-primary-container p-3 text-on-primary-container
//                 lg:max-w-none lg:p-4"
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

          
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HistoryWithPrincipleAndVicePrinciple;



