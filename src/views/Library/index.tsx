import React from 'react';
import AppLayout from '../../components/AppLayout';
import Albums from './Albums';
import { Container } from './components';
import Tracks from './Tracks';

const Library = () => {
  return (
    <AppLayout>
      <Container>
        <Albums />
        <Tracks />
      </Container>
    </AppLayout>
  );
};

export default Library;
