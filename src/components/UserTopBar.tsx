import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from './Typography';
import UserDetail from './UserDetail';
import { IconButton, Modal } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { resetButton } from './mixins';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../store/actions/userActions';
import ExportForm from './ExportForm';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  justify-items: flex-start;

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-column-gap: 10px;
  }

  .userExportBox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 500px) {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Container>
      <div className="userExportBox">
        <UserDetail />
        <button
          type="button"
          onClick={() => {
            setIsFormOpen(true);
          }}
        >
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
      <Modal
        open={isFormOpen}
        onBackdropClick={() => setIsFormOpen(false)}
        className="exportModal"
      >
        <div
          id="formWrapper"
          style={{ position: 'absolute', top: 100, left: 200 }}
        >
          <ExportForm onClose={() => setIsFormOpen(false)} />
        </div>
      </Modal>
    </Container>
  );
};

export default UserBar;
