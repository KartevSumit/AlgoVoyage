import React, { useState } from 'react';
import { useForm,FieldValues } from 'react-hook-form';
import { LiaEyeSlash, LiaEye } from 'react-icons/lia';
import FormButtons from '../../common/FormButtons';
import { resetPasswordAction } from '../../../service/operations/AuthApi';
import { useDispatch } from 'react-redux';
import { useParams }  from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';

function UpdatePassword() {
  const { register, handleSubmit } = useForm();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { token } = useParams();

  const onSubmit = (data:FieldValues) => {
    dispatch(resetPasswordAction({ ...data, token } as any));
  };

  return (
    <div className="p-[2px] bg-gradient-to-t from-slate-950 via-slate-900 via-70% to-slate-500 rounded-2xl absolute z-10">
      <div className="p-8 flex flex-col justify-center items-center gap-5 rounded-2xl bg-gradient-to-t from-slate-950 from-80% to-slate-600/20">
        <h1 className="text-4xl bitcount">Update Password</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4"
        >
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
          <FormButtons text={'Update Password'}></FormButtons>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
