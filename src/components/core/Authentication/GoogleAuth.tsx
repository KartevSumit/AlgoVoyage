import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import google from '../../../assets/search.png';
import { googleAuthAction } from '../../../service/operations/AuthApi';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

function GoogleAuth() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (tokenResponse) => {
      dispatch(googleAuthAction({ code: tokenResponse.code }));
    },
    onError: () => toast.error('Login Failed. Please retry again'),
  });
  return (
    <button
      onClick={() => login()}
      className="w-full p-3 rounded-full button_shadow bg-slate-950 hover:scale-90"
    >
      <div className="flex items-center justify-center gap-4">
        <img src={google} alt="" className="h-6" />
        <h1>Sign in with Google</h1>
      </div>
    </button>
  );
}

export default GoogleAuth;
