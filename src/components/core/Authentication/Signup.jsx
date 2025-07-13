import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LiaEyeSlash, LiaEye } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import google from '../../../../public/search.png';

function Signup() {
  const { register, onSubmit, setValues, getValue } = useForm();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  return (
    <div className="p-[2px] bg-gradient-to-t from-slate-950 via-slate-900 via-70% to-slate-500 rounded-2xl absolute z-10">
      <div className="p-8 flex flex-col justify-center items-center gap-5 rounded-2xl bg-gradient-to-t from-slate-950 from-80% to-slate-600/20">
        <h1 className="text-4xl bitcount">Hi There!</h1>
        <form className="flex flex-col gap-4">
          <label htmlFor="email" className="flex flex-col gap-2 w-full">
            <h1 className="text-lg ml-2">Email</h1>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="please enter a valid email"
              {...register('email', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl"
            />
          </label>
          <label
            htmlFor="password"
            className="flex flex-col gap-2 w-full relative"
          >
            <h1 className="text-lg ml-2">Password</h1>
            <input
              type={viewPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="enter a strong password"
              {...register('password', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl pr-12"
            />
            <button
              type="button"
              className="absolute bottom-3 right-4"
              onClick={() => {
                setViewPassword((prev) => !prev);
              }}
            >
              {viewPassword ? <LiaEye /> : <LiaEyeSlash />}
            </button>
          </label>
          <label
            htmlFor="confirmPassword"
            className="flex flex-col gap-2 w-full relative"
          >
            <h1 className="text-lg ml-2">Confirm Password</h1>
            <input
              type={viewConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="please confirm password"
              {...register('confirmPassword', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl pr-12"
            />
            <button
              type="button"
              className="absolute bottom-3 right-4"
              onClick={() => {
                setViewConfirmPassword((prev) => !prev);
              }}
            >
              {viewConfirmPassword ? <LiaEye /> : <LiaEyeSlash />}
            </button>
          </label>
          <button className=" p-2 rounded-full button_shadow bg-slate-950 hover:scale-90">
            Sign Up
          </button>
          <div className="text-slate-500 text-sm text-center mt-1">
            -------------------- or --------------------
          </div>
        </form>
        <div className="w-full flex flex-col gap-3 items-center">
          <button className="w-full p-3 rounded-full button_shadow bg-slate-950 hover:scale-90">
            <div className="flex items-center justify-center gap-4">
              <img src={google} alt="" className="h-6" />
              <h1>Sign in with Google</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
