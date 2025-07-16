import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormButtons from '../../common/FormButtons';
import { requestResetTokenAction } from '../../../service/operations/AuthApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmailSent, setSignUpData } from '../../../slices/AuthSlice';

function Forgot_password() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { emailSent } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailSent) {
      navigate('/authentication/confirmation-page');
      dispatch(setEmailSent(false));
    }
  }, [emailSent]);

  const onSubmit = (data) => {
    dispatch(setSignUpData({ email: data.email }));
    dispatch(requestResetTokenAction(data));
  };

  return (
    <div className="p-[2px] bg-gradient-to-t from-slate-950 via-slate-900 via-70% to-slate-500 rounded-2xl absolute z-10">
      <div className="p-8 flex flex-col justify-center items-center gap-5 rounded-2xl bg-gradient-to-t from-slate-950 from-80% to-slate-600/20">
        <h1 className="text-4xl bitcount">Forgot Password?</h1>
        <p className="text-xl">Where should we contact you?</p>
        <form
          className="w-full p-4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="w-full bg-slate-800 p-2 px-4 rounded-2xl border-2 border-slate-500"
            placeholder="Enter a valid email"
            {...register('email', { required: true })}
          />
          <FormButtons text="Send Email"></FormButtons>
        </form>
      </div>
    </div>
  );
}

export default Forgot_password;
