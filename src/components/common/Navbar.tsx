import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { dp } = useSelector((state) => state.user);

  const links = [
    {
      name: 'Contests',
      link: '/contest',
    },
    {
      name: 'Daily Problem',
      link: '/dailyProblem',
    },
  ];
  return (
    <div className="w-full h-[7%] p-3 flex items-center justify-between px-48">
      <Link to="/" className="flex gap-2 items-center">
        <img src={Logo} alt="" className="h-10" />
        <h1 className="text-2xl text-[#399AFE] font-semibold font-serif">
          AlgoVoyage
        </h1>
      </Link>
      {token && (
        <div className="flex gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.link}
              className="px-4 p-1 rounded-full ease-in hover:shadow-inner hover:shadow-slate-600 transition duration-150"
            >
              <h1 className="text-lg">{link.name}</h1>
            </Link>
          ))}
        </div>
      )}
      <div>
        {!token ? (
          <Link
            to="/authentication/login"
            className="border-2 border-blue-500 hover:scale-90 text-white font-semibold py-2 px-4 rounded-full flex items-center gap-2"
          >
            <AiOutlineLogin size={20} />
            Login
          </Link>
        ) : (
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <Link to="/dashboard">
              <img src={dp} alt="" className="" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
