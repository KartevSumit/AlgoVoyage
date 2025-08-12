import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Bg from '../assets/bg.svg';
import {} from 'motion/react';
import AnimatedText from '../components/core/Home/AnimatedText';
import CardAnimation from '../components/core/Home/CardAnimation';

const Home = () => {
  return (
    <div className="w-10/12 min-h-[93vh] flex flex-col items-center">
      {/* Section 1 */}
      <section className="flex w-full h-[93vh]">
        {/* <img
          src={Bg}
          alt=""
          className="absolute w-[100vw] h-[93vh] top-16 left-0"
        /> */}
        <div className="w-[70%] flex flex-col gap-4 mt-36">
          <div className="flex flex-col gap-2 text-7xl font-semibold">
            <h1 className="text-amber-50">Want to excel in Coding?</h1>
            <h1 className="bg-gradient-to-br from-indigo-800 via-violet-600 to-purple-800 bg-clip-text text-transparent">
              We Got You
            </h1>
          </div>
          <p className="w-[75%] text-gray-500">
            AlgoVoyage is a personalized competitive-programming platform that
            dynamically recommends problems and tracks your progress across
            multiple sites, tailoring difficulty to your rating.
          </p>
          <Link to="/authentication/signup" className="w-fit p-2 px-6 bg-blue-950 rounded-full flex items-center  gap-2">
            <h1 className="text-white text-xl">Let's Practice</h1>
            <FaArrowRight className="text-white" size={20} />
          </Link>
        </div>
      </section>
      {/* Section2 */}
      <section className="w-[99vw] min-h-[100vh] flex flex-col items-center justify-center relative">
        <AnimatedText
          heading={'Key Features'}
          text={
            'AlgoVoyage aggregates real-time contest data, personalized problem recommendations, and performance analytics to optimize your CP workflow'
          }
          tag={'Stay Consistent, Stay Sharp'}
        />
        <CardAnimation></CardAnimation>
      </section>
    </div>
  );
};

export default Home;
