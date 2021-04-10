import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import AppLayout from '../../components/AppLayout';
import AppSearch from '../../components/AppSearch';
import { searchTracksService } from '../../services/searchService';
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
  const [currentSearch, setCurrentSearch] = useState('');
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [searchContainer, setSearchContainer] = useState<HTMLElement | null>(
    null
  );
  const searchResults = useQuery(
    ['search', 'tracks', search, offset],
    () => searchTracksService({ q: search, offset }),
    {
      enabled: !!search,
    }
  );

  useEffect(() => {
    setSearchContainer(document.getElementById('global-search-container'));
  });

  return (
    <AppLayout isHomePage>
      {searchContainer &&
        createPortal(
          <AppSearch
            value={currentSearch}
            onChange={setCurrentSearch}
            onSubmit={() => setSearch(currentSearch)}
            placeholder="Search music"
          />,
          searchContainer
        )}
      <Container>
        <NewReleases />
        <SearchResults results={searchResults.data?.tracks.items ?? []} />
      </Container>
    </AppLayout>
  );
};

export default HomePage;
