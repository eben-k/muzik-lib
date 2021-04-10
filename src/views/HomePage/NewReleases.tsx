import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import styled from 'styled-components';
import { newReleasesService } from '../../services/searchService';
import { FirebaseContext } from '../../components/FirebaseProvider';
import NewReleaseCard from './NewReleaseCard';
import { Typography } from '../../components/Typography';
import { centerItem } from '../../components/mixins';
import toast from 'toastr';

const NewReleaseWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;

  .titleNavBox {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .navButtons {
      ${centerItem};

      .MuiIconButton-root {
        &:hover {
          background: none;
        }
      }
    }
  }

  .releaseCardContainer {
    padding: 0 20px;
    display: grid;
    grid-gap: 36px;
    grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));

    @media (max-width: 1000px) {
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    }
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
      toast.error(error);
    }
  };

  return (
    <NewReleaseWrapper>
      <div className="titleNavBox">
        <Typography
          textStyle="sm18"
          textColor="primary"
          textTheme={{ weight: 600 }}
        >
          New Releases
        </Typography>
        <div className="navButtons">
          <IconButton
            disableRipple
            disabled={offset === 0}
            onClick={() => {
              setOffset(offset - 4);
            }}
          >
            <NavigateBefore />
          </IconButton>
          <IconButton
            disableRipple
            disabled={results.data?.albums.next === null}
            onClick={() => {
              setOffset(offset + 4);
            }}
          >
            <NavigateNext />
          </IconButton>
        </div>
      </div>
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
