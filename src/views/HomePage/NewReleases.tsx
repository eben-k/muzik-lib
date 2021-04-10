import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { newReleasesService } from '../../services/searchService';
import { FirebaseContext } from '../../components/FirebaseProvider';
import NewReleaseCard from './NewReleaseCard';
import { Typography } from '../../components/Typography';

const NewReleaseWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;

  .mainTitle {
    margin-bottom: 20px;
  }

  .releaseCardContainer {
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
    grid-gap: 36px;
  }
`;

const NewReleases = () => {
  const firebase = useContext(FirebaseContext)!;
  const userData = useSelector((state) => state.user.userData);
  const savedAlbums = useSelector((state) => state.library.albums);
  const [offset, setOffset] = useState(0);
  const results = useQuery(['search', 'new-releases', offset], () =>
    newReleasesService(offset)
  );
  const albums = results.data?.albums.items ?? [];

  const toggleSave = async (albumId: string) => {
    if (!userData) return;

    const isSaved = savedAlbums[albumId] ?? false;
    const ref = firebase.database.ref(
      `library/${userData.id}/albums/${albumId}`
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
    <NewReleaseWrapper>
      <Typography
        className="mainTitle"
        textStyle="sm18"
        textColor="primary"
        textTheme={{ weight: 600 }}
      >
        New Releases
      </Typography>
      <div className="releaseCardContainer">
        {albums.map((album) => (
          <NewReleaseCard
            key={album.id}
            album={album}
            onToggleSave={() => toggleSave(album.id)}
            isSaved={savedAlbums[album.id] ?? false}
          />
        ))}
      </div>
    </NewReleaseWrapper>
  );
};

export default NewReleases;
