import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import FormButtons from '../components/common/FormButtons';
import { useDispatch, useSelector } from 'react-redux';
import { createProfileAction } from '../service/operations/AuthApi';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../reducers';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../slices/UserSlice';

interface FormData {
  firstName: string;
  lastName: string;
  codeforces: string;
  university: string;
  year: number;
}

const CompleteProfileForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    const res = await dispatch(
      createProfileAction({
        email: user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        codeforces: data.codeforces,
        university: data.university,
        year: data.year,
      })
    );
    if(res.payload) {
      dispatch(setUser(res.payload.NewUser));
      navigate('/contest');
    }
  };
  return (
    <div className="w-full min-h-[97vh] flex flex-col items-center">
      <div className="w-[40%] flex flex-col gap-6 mt-15">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-4xl bg-gradient-to-r from-[#61B5FE] via-[#CD6CFD] to-[#61B5FE] bg-clip-text text-transparent font-semibold capitalize">
            Complete your profile
          </h1>
          <p className="text-slate-400 text-xl text-center">
            Complete your profile to access AlgoVoyage. This step is required to
            personalize your experience.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full bg-gradient-to-t from-slate-950 via-slate-900 via-70% to-slate-800 p-6 rounded-xl"
        >
          <h1 className="text-2xl font-semibold">Profile Information</h1>
          <div className="w-full flex justify-between items-center">
            <label htmlFor="first name" className="w-[46%] flex flex-col gap-2">
              <h1 className="text-lg text-semibold">First Name</h1>
              <input
                type="text"
                className="bg-slate-800 p-2 rounded-lg border-2 border-slate-600"
                placeholder="Enter your first name"
                {...register('firstName', { required: true })}
              />
            </label>
            <label htmlFor="last name" className="w-[46%] flex flex-col gap-2">
              <h1 className="text-lg text-semibold">Last Name</h1>
              <input
                type="text"
                className="bg-slate-800 p-2 rounded-lg border-2 border-slate-600"
                placeholder="Enter your last name"
                {...register('lastName', { required: true })}
              />
            </label>
          </div>

          <label
            htmlFor="Codeforces Handle"
            className="w-full flex flex-col gap-2"
          >
            <h1 className="text-lg text-semibold">Codeforces Handle</h1>
            <input
              type="text"
              className="bg-slate-800 p-2 rounded-lg border-2 border-slate-600"
              placeholder="Enter your codeforces handle"
              {...register('codeforces', { required: true })}
            />
          </label>

          <label htmlFor="University" className="w-full flex flex-col gap-2">
            <h1 className="text-lg text-semibold">University</h1>
            <input
              type="text"
              className="bg-slate-800 p-2 rounded-lg border-2 border-slate-600"
              placeholder="Enter your university"
              {...register('university', { required: true })}
            />
          </label>

          <label
            htmlFor="Graduation Year"
            className="w-full flex flex-col gap-2"
          >
            <h1 className="text-lg text-semibold">Graduation Year</h1>
            <input
              type="text"
              className="bg-slate-800 p-2 rounded-lg border-2 border-slate-600"
              placeholder="Enter your graduation year"
              {...register('year', { required: true })}
            />
          </label>

          <FormButtons text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CompleteProfileForm;
