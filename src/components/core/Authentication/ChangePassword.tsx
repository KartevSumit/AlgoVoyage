import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LiaEyeSlash, LiaEye } from 'react-icons/lia';
import FormButtons from '../../common/FormButtons';

function ChangePassword() {
  const { register, handleSubmit } = useForm();
  const [viewOldPassword, setViewOldPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  return (
    <div className="p-[2px] bg-gradient-to-t from-slate-950 via-slate-900 via-70% to-slate-500 rounded-2xl absolute z-10">
      <div className="p-8 flex flex-col justify-center items-center gap-5 rounded-2xl bg-gradient-to-t from-slate-950 from-80% to-slate-600/20">
        <h1 className="text-4xl bitcount">Update Password</h1>
        <form action="" className="flex flex-col items-center gap-4">
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
            htmlFor="old password"
            className="flex flex-col gap-2 w-full relative"
          >
            <h1 className="text-lg ml-2">Old Password</h1>
            <input
              type={viewOldPassword ? 'text' : 'password'}
              id="password"
              placeholder="enter a strong password"
              {...register('oldPassword', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl pr-12 border-2 border-slate-500"
            />
            <button
              type="button"
              className="absolute bottom-3 right-4"
              onClick={() => {
                setViewOldPassword((prev) => !prev);
              }}
            >
              {viewOldPassword ? <LiaEye /> : <LiaEyeSlash />}
            </button>
          </label>
          <label
            htmlFor="new password"
            className="flex flex-col gap-2 w-full relative"
          >
            <h1 className="text-lg ml-2">New Password</h1>
            <input
              type={viewNewPassword ? 'text' : 'password'}
              id="newPassword"
              placeholder="enter a strong password"
              {...register('newPassword', { required: true })}
              className="w-full bg-slate-800 p-2 px-4 rounded-2xl pr-12 border-2 border-slate-500"
            />
            <button
              type="button"
              className="absolute bottom-3 right-4"
              onClick={() => {
                setViewNewPassword((prev) => !prev);
              }}
            >
              {viewNewPassword ? <LiaEye /> : <LiaEyeSlash />}
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
          <FormButtons text={'Change Password'}></FormButtons>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
