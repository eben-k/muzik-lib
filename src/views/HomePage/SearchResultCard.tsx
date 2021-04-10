import { IconButton } from '@material-ui/core';
import { RemoveCircle, Add } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { ISpotifyTrack } from '../../types/search';
import { Typography } from '../../components/Typography';

const SearchResultCardBox = styled.div`
  padding: 10px 20px;
  margin-top: 20px;
  border: 1px solid #b39c68;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 50px;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(p) => p.theme.resolved.text.colors.primary};
    transition: 500ms linear;

    > * {
      color: ${(p) => p.theme.resolved.colors.bgAccentColor};

      .hoverSongTitle {
        color: ${(p) => p.theme.resolved.colors.bgAccentColor};
      }
    }
  }

  .songTitleBox {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-column-gap: 15px;
    align-items: center;
    justify-content: center;

    .songAvatar {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 30%;

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
  }

  .MuiIconButton-root {
    align-self: flex-end;
    justify-self: flex-end;

    &:hover {
      background: none;
    }
  }
`;

const SearchResultCard = ({
  result,
  onToggleSave,
  isSaved,
}: {
  result: ISpotifyTrack;
  onToggleSave: VoidFunction;
  isSaved: boolean;
}) => {
  const msToMinutes = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  return (
    <SearchResultCardBox>
      <div className="songTitleBox">
        <div className="songAvatar">
          <img
            src={
              result.album.images[0]?.url ??
              'https://picsum.photos/seed/picsum/200'
            }
            alt="album art"
          />
        </div>
        <Typography
          textStyle="sm16"
          textColor="primary800"
          textTheme={{ weight: 500 }}
          className="hoverSongTitle"
        >
          {result.name}
        </Typography>
      </div>
      <Typography
        textStyle="sm16"
        textColor="primary800"
        textTheme={{ weight: 500 }}
      >
        {result.album.name}
      </Typography>
      <Typography
        textStyle="sm16"
        textColor="primary800"
        textTheme={{ weight: 500 }}
      >
        {msToMinutes(result.duration_ms)}
      </Typography>
      <IconButton disableRipple onClick={onToggleSave}>
        {isSaved ? <RemoveCircle /> : <Add />}
        <Typography textColor="primary500" textStyle="sm14">
          {isSaved ? 'Remove' : 'Save'}
        </Typography>
      </IconButton>
    </SearchResultCardBox>
  );
};

export default SearchResultCard;
