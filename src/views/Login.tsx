import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '../components/Typography';
import qs from 'qs';
import { clientId, redirectURL } from '../config/environment';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../store/actions/userActions';
import { centerItem } from '../components/mixins';

const Container = styled.div`
  ${centerItem}
  background-color: ${(p) => p.theme.resolved.colors.primaryColor};
  width: 100%;
  height: 100vh;

  .homepageScene {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .homepageContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 561px;

    .welcomeText {
      margin-bottom: 10px;
      text-align: center;
    }

    button {
      width: 100%;
      cursor: pointer;
      background-color: ${(p) => p.theme.resolved.text.colors.secondary600};
      padding: 20px;
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const dispatch = useDispatch();
  const spotifyUrl = 'https://accounts.spotify.com/authorize';
  const scopes = [
    'user-read-email',
    'playlist-modify-private',
    'playlist-read-private',
  ];

  useEffect(() => {
    if (code) {
      dispatch(loginUserAction(code as string));
    }
  }, [code, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <Container>
      <div className="homepageContent">
        <Typography
          className="welcomeText"
          textStyle="lg36"
          textColor="secondary600"
        >
          Enjoy SoulMusic
        </Typography>
        <a
          href={`${spotifyUrl}?${qs.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scopes.join(' '),
            redirect_uri: redirectURL,
          })}`}
        >
          <button type="button">
            <Typography
              textStyle="sm18"
              textTheme={{ weight: 500 }}
              style={{ color: '#FFDA8A' }}
            >
              Login with Spotify
            </Typography>
          </button>
        </a>
      </div>
    </Container>
  );
};

export default Login;
