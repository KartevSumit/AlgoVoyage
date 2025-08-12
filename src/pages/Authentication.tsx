import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

function Authentication() {
  const { loading } = useSelector((state) => state.auth);
  return loading ? (
    <Spinner />
  ) : (
    <div className="w-full h-[92vh] bg-slate-950 flex items-center justify-center">
      <div className="w-[47vw] h-[47vw] rounded-full flex items-center justify-center relative overflow-hidden light-circle-shadow">
        <div className="absolute w-[700px] h-[400px] -top-74 linear-orb z-10"></div>
        <div className="absolute h-full w-full radial-orb"></div>
        <div className="absolute h-full w-full bg-gradient-to-b from-slate-950/5 from-10% via-slate-950/35 via-20% to-slate-950 to-50% top-13 rounded-full scale-103 blur-md"></div>
        <Outlet />
      </div>
    </div>
  );
}

export default Authentication;
