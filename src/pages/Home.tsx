import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Bg from '../assets/bg.svg';
import {} from 'motion/react';
import AnimatedText from '../components/core/Home/AnimatedText';
import CardAnimation from '../components/core/Home/CardAnimation';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { IoCodeOutline } from 'react-icons/io5';
import { BsGraphUp } from 'react-icons/bs';
import { FaTrophy } from 'react-icons/fa6';

const CardData = [
  {
    svg: <IoCodeOutline size={22} />,
    color1: '#328EEE',
    color2: '#3B96EA',
    heading: 'Connect Your Profile',
    para: 'Link your Codeforces, AtCoder, and other CP platform accounts to get started with personalized analysis',
  },
  {
    svg: <BsGraphUp size={22} />,
    color1: '#B960E2',
    color2: '#DD59AF',
    heading: 'Get Insights',
    para: 'Receive detailed performance analysis, problem recommendations, and track your progress with beautiful visualizations',
  },
  {
    svg: <FaTrophy size={22} />,
    color1: '#70C465',
    color2: '#6ABE7A',
    heading: 'Improve & Compete',
    para: 'Stay motivated with streaks, compare with rivals, and never miss an important contest again',
  },
];

const Home = () => {
  return (
    <div className="w-full min-h-[93vh] flex flex-col items-center">
      {/* Section 1 */}
      <section className="flex w-full h-[65vh] flex-col items-center justify-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-center">
            <span className="bg-gradient-to-r from-[#61B5FE] via-[#CD6CFD] to-[#61B5FE] bg-clip-text text-transparent">
              Master Competitive
            </span>
            <br />
            <span className="text-[#F0F1F4]">Programming</span>
          </h1>
        </div>
        <p className="w-full text-2xl text-[#9DA2A6] mb-2 max-w-3xl text-center leading-relaxed">
          AlgoVoyage aggregates real-time contest data, personalized problem
          recommendations, and performance analytics to optimize your CP
          workflow
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link
            to="/authentication/signup"
            className="rounded-xl p-3 px-6 bg-slate-700 ease-in hover:shadow-inner hover:shadow-slate-600 transition duration-150 flex gap-2 items-center"
          >
            <h1 className="text-lg">Get Started</h1>
            <AiOutlineThunderbolt size={20} />
          </Link>
        </div>
      </section>

      {/* Section2 */}
      <section className="w-full min-h-[100vh] flex flex-col items-center justify-center relative">
        <AnimatedText
          heading={'Key   Features'}
          text={
            'AlgoVoyage aggregates real-time contest data, personalized problem recommendations, and performance analytics to optimize your CP workflow'
          }
          tag={'Stay Consistent, Stay Sharp'}
        />
        <CardAnimation></CardAnimation>
      </section>

      {/* Section3 */}
      <section className="w-full h-[60vh] flex flex-col items-center justify-center relative gap-10 ">
        <div className="flex flex-col items-center text-center gap-3">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center bg-gradient-to-r from-[#61B5FE] via-[#CD6CFD] to-[#61B5FE] bg-clip-text text-transparent">
            How AlgoVoyage Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your competitive programming journey
          </p>
        </div>
        <div className="w-full h-[50%] flex md:flex-row items-center justify-center gap-8">
          {CardData.map((card, index) => (
            <div
              key={index}
              className="w-110 h-full p-5 flex flex-col items-center text-center bg-gray-900 rounded-xl gap-5 pt-13  shadow-inner shadow-gray-700 "
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-${card.color1} to-${card.color2}`}
                style={{
                  background: `linear-gradient(135deg, ${card.color1}, ${card.color2})`,
                }}
              >
                {card.svg}
              </div>
              <h1 className="text-2xl font-semibold">{card.heading}</h1>
              <p className="">{card.para}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 */}
      <section className="w-full bg-[#040B1C] flex items-center justify-center py-32">
        <div className="w-full flex flex-col items-center justify-center gap-10 max-w-[1000px] bg-gradient-to-br from-[#1C2D3A] via-[#29213A] to-[#1C2D3A] p-6 py-14 rounded-xl">
          <div className="flex flex-col items-center text-center gap-3">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center bg-gradient-to-r from-[#61B5FE] via-[#CD6CFD] to-[#61B5FE] bg-clip-text text-transparent">
              How AlgoVoyage Works
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to transform your competitive programming
              journey
            </p>
          </div>
          <div className="p-[1px] rounded-full w-fit rainbow-border flow-button relative hover:scale-105">
            <Link
              to="/authentication/signup"
              className="p-2 px-6 bg-slate-800 rounded-full flex items-center gap-2 w-fit text-xl"
            >
              Start Competitive Programming
            </Link>
          </div>
        </div>
      </section>

      <footer>
        
      </footer>
    </div>
  );
};

export default Home;
