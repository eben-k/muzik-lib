import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FirebaseContext } from '../../components/FirebaseProvider';
import SearchResultCard from './SearchResultCard';
import { Typography } from '../../components/Typography';
import { IconButton } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { centerItem } from '../../components/mixins';
import { createPortal } from 'react-dom';
import { useQuery } from 'react-query';
import AppSearch from '../../components/AppSearch';
import { searchTracksService } from '../../services/searchService';

const SearchResultsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${(p) => p.theme.resolved.colors.accentColor};
  padding: 20px;

  .titleNavBox {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .navButtons {
      ${centerItem};

      .MuiIconButton-root {
        &:hover {
          background: none;
        }
      }
    }
  }
`;

const SearchResults = () => {
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
  }, []);
  const firebase = useContext(FirebaseContext)!;
  const userData = useSelector((state) => state.user.userData);
  const savedTracks = useSelector((state) => state.library.tracks);

  const toggleSave = async (trackId: string) => {
    if (!userData) return;

    const isSaved = savedTracks[trackId] ?? false;
    const ref = firebase.database.ref(
      `library/${userData.id}/tracks/${trackId}`
    );

    try {
      if (!isSaved) {
        await ref.set(true);
      } else {
        await ref.remove();
      }
    } catch (error) {
      // do some notifications
    }
  };

  const tracks = searchResults.data?.tracks.items ?? [];

  return (
    <>
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
      <SearchResultsWrapper>
        <div className="titleNavBox">
          <Typography
            textStyle="sm18"
            textColor="primary"
            textTheme={{ weight: 600 }}
          >
            Search Results
          </Typography>
          <div className="navButtons">
            <IconButton
              disableRipple
              disabled={offset === 0}
              onClick={() => {
                setOffset(offset - 20);
              }}
            >
              <NavigateBefore />
            </IconButton>
            <IconButton
              disableRipple
              disabled={searchResults.data?.tracks.next === null}
              onClick={() => {
                setOffset(offset + 20);
              }}
            >
              <NavigateNext />
            </IconButton>
          </div>
        </div>
        {tracks.map((track) => (
          <SearchResultCard
            key={track.id}
            result={track}
            isSaved={savedTracks[track.id] ?? false}
            onToggleSave={() => toggleSave(track.id)}
          />
        ))}
      </SearchResultsWrapper>
    </>
  );
};

export default SearchResults;
