import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

const AnimatedText = ({ heading, text, tag }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
  });
  motion;
  return (
    <div className="w-full">
      <div className="h-screen w-[49%] flex justify-center sticky top-0 x-1/2 translate-x-1/2">
        <div className="text-center flex flex-col gap-2 mt-48">
          <h1 className="text-4xl font-bold">
            {heading.split('').map((letter, index) => {
              const letterProgress =
                index / (text.length + heading.length + tag.length);
              const opacity = 2 * progress <= letterProgress ? 0.5 : 1;

              return (
                <motion.span
                  key={index}
                  animate={{ opacity }}
                  transition={{ duration: 0.1 }}
                  style={{ color: 'white' }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              );
            })}
          </h1>
          <p className="text-3xl font-semibold">
            {text.split('').map((letter, index) => {
              const letterProgress =
                (index + heading.length) /
                (text.length + heading.length + tag.length);
              const opacity = 2 * progress <= letterProgress ? 0.5 : 1;

              return (
                <motion.span
                  key={index}
                  animate={{ opacity }}
                  transition={{ duration: 0.1 }}
                  style={{ color: 'white' }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              );
            })}
          </p>
          <p className="text-3xl font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
            {tag.split('').map((letter, index) => {
              const letterProgress =
                (index + heading.length + text.length) /
                (text.length + heading.length + tag.length);
              const opacity = 2 * progress <= letterProgress ? 0.5 : 1;

              return (
                <motion.span
                  key={index}
                  animate={{ opacity }}
                  transition={{ duration: 0.1 }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-[600vh] bg-gradient-to-b from-slate-950 via-gray-950 to-blue-950"
      ></div>
    </div>
  );
};

export default AnimatedText;
