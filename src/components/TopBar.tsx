import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logoutUserAction } from '../store/actions/userActions';
import { resetButton } from './mixins';
import { Typography } from './Typography';
import UserDetail from './UserDetail';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 70px 1fr 150px 100px;
  grid-column-gap: 20px;

  .libraryLink {
    align-self: center;

    button {
      ${resetButton};
    }
  }

  .MuiIconButton-root {
    &:hover {
      background: none;
    }
  }
`;

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <UserDetail />
      <div id="global-search-container" />
      <Link className="libraryLink" to="/library">
        <button type="button">
          <Typography textStyle="sm18">My Library</Typography>
        </button>
      </Link>
      <IconButton
        onClick={() => {
          dispatch(logoutUserAction());
          navigate('/login');
        }}
      >
        <ExitToApp />
        <Typography textColor="primary500" textStyle="sm14">
          Logout
        </Typography>
      </IconButton>
    </Container>
  );
};

export default TopBar;
