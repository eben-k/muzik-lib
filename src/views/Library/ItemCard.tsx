import { IconButton } from '@material-ui/core';
import { RemoveCircle } from '@material-ui/icons';
import React from 'react';
import { Typography } from '../../components/Typography';
import { ISpotifyAlbum, ISpotifyTrack } from '../../types/search';
import { ItemCardBox } from './components';

const ItemCard = ({
  item,
  onRemove,
}: {
  item: ISpotifyAlbum | ISpotifyTrack;
  onRemove: VoidFunction;
}) => {
  const album = (item as ISpotifyTrack).album
    ? (item as ISpotifyTrack).album
    : (item as ISpotifyAlbum);

  return (
    <ItemCardBox>
      <div className="itemArtLogo">
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
        {item.name}
      </Typography>
      <IconButton disableRipple onClick={onRemove}>
        <RemoveCircle />
        <Typography textColor="primary500" textStyle="sm14">
          Remove
        </Typography>
      </IconButton>
    </ItemCardBox>
  );
};

export default ItemCard;
