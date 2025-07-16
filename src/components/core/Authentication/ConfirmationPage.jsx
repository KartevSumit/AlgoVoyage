import React from 'react';
import { requestResetTokenAction } from '../../../service/operations/AuthApi';
import { useDispatch, useSelector } from 'react-redux';

function ConfirmationPage() {
  const { signUpData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(requestResetTokenAction(signUpData));
  };

  return (
    <div className="max-w-[60%] p-[2px] bg-gradient-to-t from-slate-950 via-slate-900 via-70% to-slate-500 rounded-2xl absolute z-10">
      <div className="p-8 flex flex-col justify-center items-center gap-5 rounded-2xl bg-gradient-to-t from-slate-950 from-80% to-slate-600/20">
        <h1 className="text-4xl bitcount">Mail sent Successfully ^_^</h1>
        <p className="text-xl">
          Check your inbox for further steps to claim back your account
        </p>
        <div className="flex gap-1 text-base">
          <h1 className=" text-slate-500">Did not receive email?</h1>
          <button onClick={onClick} className="text-slate-300">
            Resend email
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
