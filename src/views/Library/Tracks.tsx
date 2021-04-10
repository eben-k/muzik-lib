import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { FirebaseContext } from '../../components/FirebaseProvider';
import { Typography } from '../../components/Typography';
import { getTracksByIdsService } from '../../services/searchService';
import { ItemsListWrapper } from './components';
import ItemCard from './ItemCard';

const Tracks = () => {
  const firebase = useContext(FirebaseContext)!;
  const userId = useSelector((state) => state.user.userData?.id);
  const savedAlbums = useSelector((state) => Object.keys(state.library.tracks));
  const tracksQuery = useQuery(['library', 'albums', savedAlbums], () =>
    getTracksByIdsService(savedAlbums.slice(0, 49))
  );
  const tracks = tracksQuery.data?.tracks ?? [];

  const onRemove = async (albumId: string) => {
    if (!userId) return;

    try {
      await firebase.database
        .ref(`library/${userId}/tracks/${albumId}`)
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
        My Saved Tracks
      </Typography>
      <div className="itemContainer">
        {tracks.map((track) => (
          <ItemCard
            key={track.id}
            item={track}
            onRemove={() => onRemove(track.id)}
          />
        ))}
      </div>
    </ItemsListWrapper>
  );
};

export default Tracks;
