import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="w-full h-[7%] p-3 flex items-center justify-between px-48">
      <div>
        <h1 className="text-3xl text-white font-semibold font-serif">
          AlgoVoyage
        </h1>
      </div>
      <div>
        <Link
          to="/authentication/login"
          className="border-2 border-blue-500 hover:scale-90 text-white font-semibold py-2 px-4 rounded-full flex items-center gap-2"
        >
          <AiOutlineLogin size={20} />
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
