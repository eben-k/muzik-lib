import { IconButton } from '@material-ui/core';
import { Add, RemoveCircle } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { ISpotifyAlbum } from '../../types/search';
import { Typography } from '../../components/Typography';

const NewReleaseCardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  padding: 15px;
  background-color: ${(p) => p.theme.resolved.colors.bgAccentColor};

  &:hover {
    background-color: ${(p) => p.theme.resolved.text.colors.primary};
    transition: 500ms linear;

    > * {
      color: ${(p) => p.theme.resolved.colors.bgAccentColor};
    }
  }

  .musicArtLogo {
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 12px;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .MuiIconButton-root {
    padding: 12px 0;

    &:hover {
      background: none;
    }
  }
`;

const NewReleaseCard = ({
  album,
  onToggleSave,
  isSaved,
}: {
  album: ISpotifyAlbum;
  onToggleSave: VoidFunction;
  isSaved: boolean;
}) => {
  return (
    <NewReleaseCardBox>
      <div className="musicArtLogo">
        <img
          src={album.images[0]?.url ?? 'https://picsum.photos/id/237/200'}
          alt="album art"
        />
      </div>
      <Typography
        textStyle="sm16"
        textTheme={{ weight: 600 }}
        textColor="primary600"
        className="releaseMusicTitle"
      >
        {album.name}
      </Typography>
      <IconButton disableRipple onClick={onToggleSave}>
        {isSaved ? <RemoveCircle /> : <Add />}
        <Typography textColor="primary500" textStyle="sm14">
          {isSaved ? 'Remove from library' : 'Save to library'}
        </Typography>
      </IconButton>
    </NewReleaseCardBox>
  );
};

export default NewReleaseCard;
