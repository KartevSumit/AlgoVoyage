import React, { useState, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { LiaEyeSlash, LiaEye } from 'react-icons/lia';
import GoogleAuth from './GoogleAuth.js';
import { setSignUpData, setEmailSent } from '../../../slices/AuthSlice.js';
import { sendOtpAction } from '../../../service/operations/AuthApi.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../reducers';
import { ThunkDispatch } from '@reduxjs/toolkit';

function Signup() {
  const { register, handleSubmit } = useForm();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const { emailSent, signUpData } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    if (emailSent) {
      navigate('/authentication/verify-email');
      dispatch(setEmailSent(false));
    }
  }, [emailSent]);

  const onSubmit = (data: FieldValues) => {
    dispatch(setSignUpData(data));
    dispatch(
      sendOtpAction({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      } as any)
    );
  };

  return (
    <div className="p-[2px] bg-gradient-to-t from-slate-950 via-slate-900 via-70% to-slate-500 rounded-2xl absolute z-10">
      <div className="p-8 flex flex-col justify-center items-center gap-5 rounded-2xl bg-gradient-to-t from-slate-950 from-80% to-slate-600/20">
        <h1 className="text-4xl bitcount">Hi There!</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="flex flex-col gap-2 w-full">
            <h1 className="text-lg ml-2">Email</h1>
            <input
              type="text"
              id="email"
              placeholder="please enter a valid email"
              {...register('email', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl border-2 border-slate-500"
            />
          </label>
          <label
            htmlFor="password"
            className="flex flex-col gap-2 w-full relative"
          >
            <h1 className="text-lg ml-2">Password</h1>
            <input
              type={viewPassword ? 'text' : 'password'}
              id="password"
              placeholder="enter a strong password"
              {...register('password', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl pr-12 border-2 border-slate-500"
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
              id="confirmPassword"
              placeholder="please confirm password"
              {...register('confirmPassword', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl pr-12 border-2 border-slate-500"
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
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
}

export default Signup;
