import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from './Typography';
import UserDetail from './UserDetail';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { resetButton } from './mixins';
import AppSearch from './AppSearch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../store/actions/userActions';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  justify-items: flex-start;

  .userExportBox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .libraryTitle {
    align-self: center;
    justify-self: center;
  }

  button {
    ${resetButton};
  }

  .MuiIconButton-root {
    align-self: flex-end;
    justify-self: flex-end;

    &:hover {
      background: none;
    }
  }
`;

const UserBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <div className="userExportBox">
        <UserDetail />
        <button type="button">
          <Typography textStyle="sm18">Export to My Spotify</Typography>
        </button>
      </div>
      <Typography
        className="libraryTitle"
        textStyle="sm18"
        textTheme={{ weight: 600 }}
        textColor="primary600"
      >
        My Library
      </Typography>
      <AppSearch
        value={search ?? ''}
        onChange={setSearch}
        onSubmit={() => {}}
        placeholder="Search"
      />
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

export default UserBar;
