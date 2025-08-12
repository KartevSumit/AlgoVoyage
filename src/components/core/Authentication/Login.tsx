import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LiaEyeSlash, LiaEye } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import FormButtons from '../../common/FormButtons';
import { loginAction } from '../../../service/operations/AuthApi';
import { useDispatch, useSelector } from 'react-redux';
import GoogleAuth from './GoogleAuth';

function Login() {
  const { register, handleSubmit, setValues, getValue } = useForm();
  const [viewPassword, setViewPassword] = useState(false);
  //const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginAction(data));
    console.log(token);
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
              name="email"
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
              name="password"
              id="password"
              placeholder="enter a strong password"
              {...register('password', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl pr-12 border-2 border-slate-500"
            />
            <button
              type="button"
              className="absolute bottom-10 right-4"
              onClick={() => {
                setViewPassword((prev) => !prev);
              }}
            >
              {viewPassword ? <LiaEye /> : <LiaEyeSlash />}
            </button>
            <Link
              to="/authentication/forgot-password"
              className="text-end text-slate-100 text-sm"
            >
              Forgot Password?
            </Link>
          </label>
          <FormButtons text="Login"></FormButtons>
          <div className="text-slate-500 text-sm text-center mt-1">
            -------------------- or --------------------
          </div>
        </form>
        <div className="w-full flex flex-col gap-3 items-center">
          <GoogleAuth />
          <div className="flex gap-1 text-sm">
            <h1 className="text-slate-500">Dont have an account?</h1>
            <Link to="/authentication/signup">Sign in its free!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
