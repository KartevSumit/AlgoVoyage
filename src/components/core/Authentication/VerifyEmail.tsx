import React from 'react';
import OtpInput from 'react-otp-input';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import FormButtons from '../../common/FormButtons';
import { signUpAction } from '../../../service/operations/AuthApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../reducers';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setUser } from '../../../slices/UserSlice';
import { setLoading, setToken } from '../../../slices/AuthSlice';

function VerifyEmail() {
  const { control, handleSubmit } = useForm();
  const { signUpData } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onSubmit = async (data: FieldValues) => {
    dispatch(setLoading(true));
    const { token, user } = await dispatch(
      signUpAction({ otp: data.otp } as any)
    ).unwrap();

    dispatch(setUser(user));
    dispatch(setToken(token));
    if (token) {
      dispatch(setLoading(false));
      navigate('/contest');
    }
  };

  return (
    <div className="p-[2px] bg-gradient-to-t from-slate-950 via-slate-900 via-70% to-slate-500 rounded-2xl absolute z-10">
      <div className="p-8 flex flex-col justify-center items-center gap-5 rounded-2xl bg-gradient-to-t from-slate-950 from-80% to-slate-600/20">
        <form
          className="w-full flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="otp"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                numInputs={6}
                shouldAutoFocus={true}
                renderInput={(props) => <input {...props} placeholder="-" />}
                inputStyle={{
                  width: '40px',
                  height: '50px',
                  border: '2px solid #334155',
                  borderRadius: '0.5rem',
                  backgroundColor: '#0F172A',
                  color: '#F8FAFC',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  padding: 0,
                  margin: 0,
                  outline: 'none',
                  caretColor: '#F8FAFC',
                  WebkitTextFillColor: '#F8FAFC',
                }}
                containerStyle={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  width: '100%',
                  gap: '1rem',
                }}
              />
            )}
          />
          <FormButtons text="Verify Email" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
