import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { FirebaseContext } from '../../components/FirebaseProvider';
import { Typography } from '../../components/Typography';
import { getAlbumsByIdsService } from '../../services/searchService';
import { ItemsListWrapper } from './components';
import ItemCard from './ItemCard';

const Albums = () => {
  const firebase = useContext(FirebaseContext)!;
  const userId = useSelector((state) => state.user.userData?.id);
  const savedAlbums = useSelector((state) => Object.keys(state.library.albums));
  const albumsQuery = useQuery(
    ['library', 'albums', savedAlbums],
    () => getAlbumsByIdsService(savedAlbums.slice(0, 19)),
    { keepPreviousData: true }
  );
  const albums = albumsQuery.data?.albums ?? [];

  const onRemove = async (albumId: string) => {
    if (!userId) return;

    try {
      await firebase.database
        .ref(`library/${userId}/albums/${albumId}`)
        .remove();
    } catch (error) {
      // do some notifications
    }
  };

  return (
    <ItemsListWrapper>
      <Typography
        className="itemTitle"
        textStyle="sm18"
        textColor="primary"
        textTheme={{ weight: 600 }}
      >
        My Saved Albums
      </Typography>
      <div className="itemContainer">
        {albums.map((album) => (
          <ItemCard
            key={album.id}
            item={album}
            onRemove={() => onRemove(album.id)}
          />
        ))}
      </div>
    </ItemsListWrapper>
  );
};

export default Albums;
