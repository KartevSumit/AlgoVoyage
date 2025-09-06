import React, { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

interface AnimatedTextProps {
  heading: string;
  text: string;
  tag: string;
}

const AnimatedText = ({ heading, text, tag }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  const totalLength = heading.length + text.length + tag.length;

  const renderLineSimple = (str: string, startIndex: number, isGradient = false) => {
    const words = str.split(" ");
    let offset = 0;
    return words.map((word, wIdx) => {
      const wordChars = word.split("");
      const wordEl = (
        <span key={`${startIndex}-${wIdx}`} className="inline-block whitespace-nowrap mr-1">
          {wordChars.map((ch, i) => {
            const globalIndex = startIndex + offset;
            offset += 1;
            const letterProgress = globalIndex / Math.max(1, totalLength);
            const opacity = 2 * progress <= letterProgress ? 0.5 : 1;
            return (
              <motion.span
                key={i}
                animate={{ opacity }}
                transition={{ duration: 0.1 }}
                className="inline-block"
                style={{ color: isGradient ? undefined : "white" }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      );
      offset += 1;
      return wordEl;
    });
  };

  return (
    <div className="w-full">
      <div className="h-screen w-[49%] flex justify-center sticky top-0 x-1/2 translate-x-1/2">
        <div className="text-center flex flex-col gap-2 mt-[22vh]">
          <h1 className="text-5xl bitcount">
            {renderLineSimple(heading, 0)}
          </h1>

          <p className="text-3xl font-semibold">
            {renderLineSimple(text, heading.length)}
          </p>

          <p className="text-3xl font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
            {renderLineSimple(tag, heading.length + text.length, true)}
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-[600vh] bg-gradient-to-b from-slate-950 via-[#050C1D] to-[#040B1C]"
      />
    </div>
  );
};

export default AnimatedText;
