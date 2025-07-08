import React from 'react';
import { Link } from 'react-router-dom';
import '../../../App.css'

function Card({ heading, text, image }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[60%] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-slate-400">{heading}</h1>
          <p className="text-sm">{text}</p>
        </div>
        <div
          className="p-[1px] rounded-full w-fit rainbow-border flow-button relative hover:scale-105"
        >
          <Link className="p-2 px-6 bg-slate-800 rounded-full flex items-center gap-2 w-fit">
            Become our user
          </Link>
        </div>
      </div>
      <div className="w-[35%] p-10">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Card;
