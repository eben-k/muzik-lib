import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ISpotifyTrack } from '../../types/search';
import { FirebaseContext } from '../../components/FirebaseProvider';
import SearchResultCard from './SearchResultCard';
import { Typography } from '../../components/Typography';

const SearchResultsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${(p) => p.theme.resolved.colors.accentColor};
  padding: 20px;
`;

const SearchResults = ({ results }: { results: ISpotifyTrack[] }) => {
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

  return (
    <SearchResultsWrapper>
      <Typography
        className="mainTitle"
        textStyle="sm18"
        textColor="primary"
        textTheme={{ weight: 600 }}
      >
        Search Results
      </Typography>
      {results.map((track) => (
        <SearchResultCard
          key={track.id}
          result={track}
          isSaved={savedTracks[track.id] ?? false}
          onToggleSave={() => toggleSave(track.id)}
        />
      ))}
    </SearchResultsWrapper>
  );
};

export default SearchResults;
