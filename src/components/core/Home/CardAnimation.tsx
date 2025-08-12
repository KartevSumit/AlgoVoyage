import React, { useRef } from 'react';
import {
  motion,
  useTransform,
  useScroll,
  // useMotionValueEvent,
} from 'motion/react';
import Code from '../../../assets/code.png';
import Card from './Card';
import Problem from '../../../assets/problem.png';
import Perform from '../../../assets/perform.png';
motion
const CardAnimation = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 0.67], [600, 600, 0]);
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.67],
    [45, 45, 15, 0]
  );
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.67],
    [45, 45, 15, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.62, 0.67],
    [0.8, 0.9, 0.95, 0.99, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.67],
    [0, 0, 0.7, 1]
  );

  const y2 = useTransform(scrollYProgress, [0, 0.33, 0.5], [600, 600, 0]);
  const rotateX2 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.42, 0.5],
    [45, 45, 15, 0]
  );
  const rotateZ2 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.42, 0.5],
    [45, 45, 15, 0]
  );
  const scale2 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.39, 0.45, 0.5],
    [0.8, 0.9, 0.95, 0.99, 1]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.42, 0.5, 0.67, 0.67],
    [0, 0, 0.7, 1, 1, 0]
  );

  const y3 = useTransform(scrollYProgress, [0, 0.17, 0.33], [600, 600, 0]);
  const rotateX3 = useTransform(
    scrollYProgress,
    [0, 0.17, 0.23, 0.33],
    [45, 45, 15, 0]
  );
  const rotateZ3 = useTransform(
    scrollYProgress,
    [0, 0.17, 0.25, 0.33],
    [45, 45, 15, 0]
  );
  const scale3 = useTransform(
    scrollYProgress,
    [0, 0.17, 0.21, 0.28, 0.33],
    [0.8, 0.9, 0.95, 0.99, 1]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0, 0.17, 0.23, 0.33, 0.5, 0.5],
    [0, 0, 0.7, 1, 1, 0]
  );

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 flex flex-col items-center">
      <div className="h-screen w-[90%] flex items-center justify-center sticky top-0">
        <motion.div
          style={{
            y: y3,
            rotateX: rotateX3,
            rotateZ: rotateZ3,
            scale: scale3,
            opacity: opacity3,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
          className="pointer-events-auto w-full flex justify-center"
        >
          <motion.div
            className="w-[75%] min-h-48 bg-slate-900  rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
              style={{
                opacity: useTransform(rotateX2, [45, 0], [0, 0.4]),
              }}
            />

            <motion.div
              className="absolute -bottom-4 left-4 right-4 h-12 bg-black/20 rounded-2xl blur-lg"
              style={{
                scaleY: useTransform(rotateX2, [45, 0], [0.2, 1]),
                opacity: useTransform(opacity2, [0, 1], [0, 0.6]),
              }}
            />

            <Card
              heading={'Real-Time Contest Aggregation'}
              text={
                'AlgoVoyage taps into public APIs across Codeforces, AtCoder, LeetCode, and more, then normalizes all start times to your local timezone. You get a single, up-to-date timeline with countdowns and quick-join links—no more hopping between sites.'
              }
              image={Code}
            ></Card>
          </motion.div>
        </motion.div>
      </div>

      <div className="h-screen w-[90%] flex items-center justify-center sticky top-0">
        <motion.div
          style={{
            y: y2,
            rotateX: rotateX2,
            rotateZ: rotateZ2,
            scale: scale2,
            opacity: opacity2,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
          className="pointer-events-auto w-full flex justify-center"
        >
          <motion.div
            className="w-[75%] min-h-48 bg-slate-900  rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
              style={{
                opacity: useTransform(rotateX2, [45, 0], [0, 0.4]),
              }}
            />

            <motion.div
              className="absolute -bottom-4 left-4 right-4 h-12 bg-black/20 rounded-2xl blur-lg"
              style={{
                scaleY: useTransform(rotateX2, [45, 0], [0.2, 1]),
                opacity: useTransform(opacity2, [0, 1], [0, 0.6]),
              }}
            />

            <Card
              heading={'Adaptive Problem Recommendation'}
              text={
                'By analyzing your solve history, rating changes, and tag-specific accuracy, AlgoVoyage builds a custom difficulty curve just for you. It then ranks problems in real time, ensuring every suggestion pushes your limits without overwhelming you.'
              }
              image={Problem}
            ></Card>
          </motion.div>
        </motion.div>
      </div>

      <div className="h-screen w-[90%] flex items-center justify-center sticky top-0">
        <motion.div
          style={{
            y,
            rotateX,
            rotateZ,
            scale,
            opacity,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
          className="pointer-events-auto w-full flex justify-center"
        >
          <motion.div
            className="w-[75%] min-h-48 bg-slate-900  rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
              style={{
                opacity: useTransform(rotateX, [45, 0], [0, 0.4]),
              }}
            />

            <motion.div
              className="absolute -bottom-4 left-4 right-4 h-12 bg-black/20 rounded-2xl blur-lg"
              style={{
                scaleY: useTransform(rotateX, [45, 0], [0.2, 1]),
                opacity: useTransform(opacity, [0, 1], [0, 0.6]),
              }}
            />

            <Card
              heading={'Interactive Performance Analytics'}
              text={
                'Track daily solves on a vibrant heatmap, watch your streaks grow, and dive into tag-level accuracy charts. These live visualizations turn raw data into clear insights, so you can target weak spots and celebrate milestones as they happen.'
              }
              image={Perform}
            ></Card>
          </motion.div>
        </motion.div>
      </div>

      <div ref={containerRef} className="h-[400vh]"></div>
    </div>
  );
};

export default CardAnimation;
