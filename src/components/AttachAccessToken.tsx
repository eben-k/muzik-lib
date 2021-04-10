import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authHttp } from '../services/httpService';
import { logoutUserAction } from '../store/actions/userActions';

const AttachAccessToken = () => {
  const { authData, expires } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentExpiresIn = useRef(expires);

  if (authData?.access_token) {
    authHttp.defaults.headers.authorization = `Bearer ${authData?.access_token}`;
    currentExpiresIn.current = expires;
  }

  useEffect(() => {
    const id = authHttp.interceptors.response.use(undefined, (err) => {
      // logout on expired access_token error
      // TODO: perform token refresh
      if (err.response?.status === 401) {
        dispatch(logoutUserAction());
        navigate('/login');
      }

      throw err;
    });

    return () => authHttp.interceptors.request.eject(id);
  }, [dispatch, navigate]);

  return null;
};

export default AttachAccessToken;
