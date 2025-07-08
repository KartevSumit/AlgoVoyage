import React from 'react';
import { AiOutlineLogin } from 'react-icons/ai';

function Navbar() {
  return (
    <div className="w-full h-[7%] p-3 flex items-center justify-between px-48">
      <div>
        <h1 className="text-3xl text-white font-semibold font-serif">
          AlgoVoyage
        </h1>
      </div>
      <div>
        <button className="border-2 border-blue-500 hover:scale-90 text-white font-semibold py-2 px-4 rounded-full flex items-center gap-2">
          <AiOutlineLogin size={20} />
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
