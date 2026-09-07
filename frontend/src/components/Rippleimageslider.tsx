import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface RippleSliderPhoto {
  id: string;
  url: string;
  alt: string;
}

interface RippleImageSliderProps {
  images: RippleSliderPhoto[];
  // Which photo to open on. Defaults to the first photo. Out-of-range
  // values are clamped so a stale index never crashes the slider.
  initialIndex?: number;
  onClose: () => void;
}

// Number of concentric rings fanning out from each edge — matches the
// 9-circle groups (circle1..9 / circle10..18) in the original markup.
const CIRCLES_PER_SIDE = 9;

/**
 * Fullscreen "ripple wipe" image slider.
 *
 * This is a React/Tailwind port of the CodePen-style ripple slider: instead
 * of a hard-coded 681x384 stage with 4 fixed slides, the stage fills the
 * whole viewport and the ripple geometry (circle radii, edge positions) is
 * recalculated from the container's real size, so it scales cleanly across
 * mobile, tablet and desktop.
 */
function RippleImageSlider({
  images,
  initialIndex = 0,
  onClose,
}: RippleImageSliderProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const clampedInitialIndex = Math.min(
    Math.max(initialIndex, 0),
    Math.max(images.length - 1, 0),
  );

  const [current, setCurrent] = useState(clampedInitialIndex);
  const [canClick, setCanClick] = useState(true);
  const [activeSide, setActiveSide] = useState<"left" | "right" | null>(null);
  const [streaking, setStreaking] = useState(false);
  const [scaling, setScaling] = useState(false);

  const timeouts = useRef<number[]>([]);

  // Keep the ripple geometry in sync with the actual stage size so the
  // circles always start exactly at the edges and fully cover the screen,
  // on any device / orientation.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("orientationchange", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Lock background scroll while the slider is open.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const goTo = useCallback(
    (direction: "next" | "prev") => {
      if (!canClick || images.length < 2) return;

      setCanClick(false);
      setScaling(true);

      // "next" ripples in from the right edge, "prev" from the left —
      // same mapping as rightSlide()/leftSlide() in the original script.
      const side = direction === "next" ? "right" : "left";
      setActiveSide(side);

      const nextIndex =
        direction === "next"
          ? (current + 1) % images.length
          : (current - 1 + images.length) % images.length;

      // Timings mirror the original: move() fires 200ms after click, the
      // slide swap happens 600ms into move(), the rings retract 850ms
      // into move(), the zoom class drops at 1400ms, and clicking is
      // re-enabled 1700ms into move().
      const t1 = window.setTimeout(() => setStreaking(true), 200);
      const t2 = window.setTimeout(() => setCurrent(nextIndex), 200 + 600);
      const t3 = window.setTimeout(() => setStreaking(false), 200 + 850);
      const t4 = window.setTimeout(() => setScaling(false), 1400);
      const t5 = window.setTimeout(() => setCanClick(true), 200 + 1700);

      timeouts.current.push(t1, t2, t3, t4, t5);
    },
    [canClick, current, images.length],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") goTo("next");
      else if (event.key === "ArrowLeft") goTo("prev");
      else if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goTo, onClose]);

  const { width, height } = size;
  const diagonal = Math.hypot(width, height) || 1;
  const step = diagonal / CIRCLES_PER_SIDE;
  const strokeWidth = step * 1.2; // slight overlap so rings tile with no gaps

  const leftCx = width * 0.05;
  const rightCx = width * 0.95;
  const cy = height / 2;

  function renderCircles(side: "left" | "right") {
    const cx = side === "left" ? leftCx : rightCx;
    const isActive = activeSide === side && streaking;

    return (
      <svg
        className="pointer-events-none absolute inset-0 z-40 h-full w-full"
        viewBox={`0 0 ${width || 1} ${height || 1}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {Array.from({ length: CIRCLES_PER_SIDE }).map((_, i) => (
          <circle
            key={`${side}-circle-${i}`}
            cx={cx}
            cy={cy}
            r={step * (i + 1)}
            fill="none"
            stroke="#fff"
            style={{
              strokeWidth: isActive ? strokeWidth : 0,
              transition: "stroke-width 0.3s linear",
              transitionDelay: `${(i + 1) * 0.05}s`,
            }}
          />
        ))}
      </svg>
    );
  }

  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image slider"
        className="
          fixed
          right-3
          top-3
          z-110
          flex
          size-10
          items-center
          justify-center
          rounded-full
          bg-white/90
          text-black
          shadow-lg
          transition-colors
          hover:bg-white
          active:scale-95
          sm:right-5
          sm:top-5
          sm:size-11
        "
      >
        <X className="size-5 sm:size-6" strokeWidth={2.5} />
      </button>

      {/* Stage — fills the whole viewport on every breakpoint */}
      <div
        ref={stageRef}
        className="relative h-dvh w-screen overflow-hidden bg-black"
      >
        {images.map((photo, index) => (
          <img
            key={photo.id}
            src={photo.url}
            alt={photo.alt}
            className={`
              absolute inset-0 h-full w-full object-contain
              transition-transform duration-1400 ease-out
              ${index === current ? "z-20 opacity-100" : "z-10 opacity-0"}
              ${scaling ? "scale-110" : "scale-100"}
            `}
          />
        ))}

        {width > 0 && height > 0 && (
          <>
            {renderCircles("left")}
            {renderCircles("right")}
          </>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo("prev")}
              aria-label="Previous image"
              className="
                absolute
                left-2
                top-1/2
                z-50
                flex
                size-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-white/10
                text-white
                backdrop-blur-sm
                transition-colors
                hover:bg-white/90
                hover:text-black
                active:scale-95
                sm:left-4
                sm:size-12
                md:left-6
                md:size-14
              "
            >
              <ChevronLeft className="size-5 sm:size-6 md:size-7" />
            </button>

            <button
              type="button"
              onClick={() => goTo("next")}
              aria-label="Next image"
              className="
                absolute
                right-2
                top-1/2
                z-50
                flex
                size-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-white/10
                text-white
                backdrop-blur-sm
                transition-colors
                hover:bg-white/90
                hover:text-black
                active:scale-95
                sm:right-4
                sm:size-12
                md:right-6
                md:size-14
              "
            >
              <ChevronRight className="size-5 sm:size-6 md:size-7" />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-3
              left-1/2
              z-50
              -translate-x-1/2
              rounded-full
              bg-black/50
              px-3
              py-1
              text-xs
              text-white
              sm:bottom-5
              sm:text-sm
            "
          >
            {current + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default RippleImageSlider;













// import { useCallback, useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";

// interface RippleSliderPhoto {
//   id: string;
//   url: string;
//   alt: string;
// }

// interface RippleImageSliderProps {
//   images: RippleSliderPhoto[];
//   onClose: () => void;
// }

// // Number of concentric rings fanning out from each edge — matches the
// // 9-circle groups (circle1..9 / circle10..18) in the original markup.
// const CIRCLES_PER_SIDE = 9;

// /**
//  * Fullscreen "ripple wipe" image slider.
//  *
//  * This is a React/Tailwind port of the CodePen-style ripple slider: instead
//  * of a hard-coded 681x384 stage with 4 fixed slides, the stage fills the
//  * whole viewport and the ripple geometry (circle radii, edge positions) is
//  * recalculated from the container's real size, so it scales cleanly across
//  * mobile, tablet and desktop.
//  */
// function RippleImageSlider({ images, onClose }: RippleImageSliderProps) {
//   const stageRef = useRef<HTMLDivElement>(null);
//   const [size, setSize] = useState({ width: 0, height: 0 });

//   const [current, setCurrent] = useState(0);
//   const [canClick, setCanClick] = useState(true);
//   const [activeSide, setActiveSide] = useState<"left" | "right" | null>(null);
//   const [streaking, setStreaking] = useState(false);
//   const [scaling, setScaling] = useState(false);

//   const timeouts = useRef<number[]>([]);

//   // Keep the ripple geometry in sync with the actual stage size so the
//   // circles always start exactly at the edges and fully cover the screen,
//   // on any device / orientation.
//   useEffect(() => {
//     const el = stageRef.current;
//     if (!el) return;

//     const update = () => {
//       const rect = el.getBoundingClientRect();
//       setSize({ width: rect.width, height: rect.height });
//     };

//     update();

//     const observer = new ResizeObserver(update);
//     observer.observe(el);
//     window.addEventListener("orientationchange", update);

//     return () => {
//       observer.disconnect();
//       window.removeEventListener("orientationchange", update);
//     };
//   }, []);

//   useEffect(() => {
//     return () => {
//       timeouts.current.forEach((id) => window.clearTimeout(id));
//     };
//   }, []);

//   // Lock background scroll while the slider is open.
//   useEffect(() => {
//     const original = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = original;
//     };
//   }, []);

//   const goTo = useCallback(
//     (direction: "next" | "prev") => {
//       if (!canClick || images.length < 2) return;

//       setCanClick(false);
//       setScaling(true);

//       // "next" ripples in from the right edge, "prev" from the left —
//       // same mapping as rightSlide()/leftSlide() in the original script.
//       const side = direction === "next" ? "right" : "left";
//       setActiveSide(side);

//       const nextIndex =
//         direction === "next"
//           ? (current + 1) % images.length
//           : (current - 1 + images.length) % images.length;

//       // Timings mirror the original: move() fires 200ms after click, the
//       // slide swap happens 600ms into move(), the rings retract 850ms
//       // into move(), the zoom class drops at 1400ms, and clicking is
//       // re-enabled 1700ms into move().
//       const t1 = window.setTimeout(() => setStreaking(true), 200);
//       const t2 = window.setTimeout(() => setCurrent(nextIndex), 200 + 600);
//       const t3 = window.setTimeout(() => setStreaking(false), 200 + 850);
//       const t4 = window.setTimeout(() => setScaling(false), 1400);
//       const t5 = window.setTimeout(() => setCanClick(true), 200 + 1700);

//       timeouts.current.push(t1, t2, t3, t4, t5);
//     },
//     [canClick, current, images.length],
//   );

//   useEffect(() => {
//     function onKeyDown(event: KeyboardEvent) {
//       if (event.key === "ArrowRight") goTo("next");
//       else if (event.key === "ArrowLeft") goTo("prev");
//       else if (event.key === "Escape") onClose();
//     }

//     document.addEventListener("keydown", onKeyDown);
//     return () => document.removeEventListener("keydown", onKeyDown);
//   }, [goTo, onClose]);

//   const { width, height } = size;
//   const diagonal = Math.hypot(width, height) || 1;
//   const step = diagonal / CIRCLES_PER_SIDE;
//   const strokeWidth = step * 1.2; // slight overlap so rings tile with no gaps

//   const leftCx = width * 0.05;
//   const rightCx = width * 0.95;
//   const cy = height / 2;

//   function renderCircles(side: "left" | "right") {
//     const cx = side === "left" ? leftCx : rightCx;
//     const isActive = activeSide === side && streaking;

//     return (
//       <svg
//         className="pointer-events-none absolute inset-0 z-40 h-full w-full"
//         viewBox={`0 0 ${width || 1} ${height || 1}`}
//         preserveAspectRatio="none"
//         aria-hidden="true"
//       >
//         {Array.from({ length: CIRCLES_PER_SIDE }).map((_, i) => (
//           <circle
//             key={`${side}-circle-${i}`}
//             cx={cx}
//             cy={cy}
//             r={step * (i + 1)}
//             fill="none"
//             stroke="#fff"
//             style={{
//               strokeWidth: isActive ? strokeWidth : 0,
//               transition: "stroke-width 0.3s linear",
//               transitionDelay: `${(i + 1) * 0.05}s`,
//             }}
//           />
//         ))}
//       </svg>
//     );
//   }

//   if (images.length === 0) return null;

//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center bg-black">
//       {/* Close button */}
//       <button
//         type="button"
//         onClick={onClose}
//         aria-label="Close image slider"
//         className="
//           fixed
//           right-3
//           top-3
//           z-110
//           flex
//           size-10
//           items-center
//           justify-center
//           rounded-full
//           bg-white/90
//           text-black
//           shadow-lg
//           transition-colors
//           hover:bg-white
//           active:scale-95
//           sm:right-5
//           sm:top-5
//           sm:size-11
//         "
//       >
//         <X className="size-5 sm:size-6" strokeWidth={2.5} />
//       </button>

//       {/* Stage — fills the whole viewport on every breakpoint */}
//       <div
//         ref={stageRef}
//         className="relative h-dvh w-screen overflow-hidden bg-black"
//       >
//         {images.map((photo, index) => (
//           <img
//             key={photo.id}
//             src={photo.url}
//             alt={photo.alt}
//             className={`
//               absolute inset-0 h-full w-full object-contain
//               transition-transform duration-1400 ease-out
//               ${index === current ? "z-20 opacity-100" : "z-10 opacity-0"}
//               ${scaling ? "scale-110" : "scale-100"}
//             `}
//           />
//         ))}

//         {width > 0 && height > 0 && (
//           <>
//             {renderCircles("left")}
//             {renderCircles("right")}
//           </>
//         )}

//         {images.length > 1 && (
//           <>
//             <button
//               type="button"
//               onClick={() => goTo("prev")}
//               aria-label="Previous image"
//               className="
//                 absolute
//                 left-2
//                 top-1/2
//                 z-50
//                 flex
//                 size-10
//                 -translate-y-1/2
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-white/40
//                 bg-white/10
//                 text-white
//                 backdrop-blur-sm
//                 transition-colors
//                 hover:bg-white/90
//                 hover:text-black
//                 active:scale-95
//                 sm:left-4
//                 sm:size-12
//                 md:left-6
//                 md:size-14
//               "
//             >
//               <ChevronLeft className="size-5 sm:size-6 md:size-7" />
//             </button>

//             <button
//               type="button"
//               onClick={() => goTo("next")}
//               aria-label="Next image"
//               className="
//                 absolute
//                 right-2
//                 top-1/2
//                 z-50
//                 flex
//                 size-10
//                 -translate-y-1/2
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-white/40
//                 bg-white/10
//                 text-white
//                 backdrop-blur-sm
//                 transition-colors
//                 hover:bg-white/90
//                 hover:text-black
//                 active:scale-95
//                 sm:right-4
//                 sm:size-12
//                 md:right-6
//                 md:size-14
//               "
//             >
//               <ChevronRight className="size-5 sm:size-6 md:size-7" />
//             </button>
//           </>
//         )}

//         {images.length > 1 && (
//           <div
//             className="
//               absolute
//               bottom-3
//               left-1/2
//               z-50
//               -translate-x-1/2
//               rounded-full
//               bg-black/50
//               px-3
//               py-1
//               text-xs
//               text-white
//               sm:bottom-5
//               sm:text-sm
//             "
//           >
//             {current + 1} / {images.length}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RippleImageSlider;