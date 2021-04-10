import React from 'react';
import styled from 'styled-components';
import AppLayout from '../../components/AppLayout';
import NewReleases from './NewReleases';
import SearchResults from './SearchResults';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr;
  overflow: auto;
`;

const HomePage = () => {
  return (
    <AppLayout isHomePage>
      <Container>
        <NewReleases />
        <SearchResults />
      </Container>
    </AppLayout>
  );
};

export default HomePage;
