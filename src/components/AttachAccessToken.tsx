import React from 'react';
import { useSelector } from 'react-redux';
import { authHttp } from '../services/httpService';

const AttachAccessToken = () => {
  const token = useSelector((state) => state.auth.authData?.access_token);

  if (token) {
    authHttp.defaults.headers.authorization = `Bearer ${token}`;
  }

  return null;
};

export default AttachAccessToken;
