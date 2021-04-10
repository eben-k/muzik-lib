import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ISpotifyUser } from '../types/user';
import { Typography } from './Typography';

const UserDetailBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: auto;
`;

interface IUserAvatarProps {
  user: ISpotifyUser;
  backgroundColor?: string;
}

const AvatarWrapper = styled.div`
  margin-right: 12px;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  overflow: hidden;
  box-sizing: content-box;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const UserAvatar = (props: IUserAvatarProps) => {
  const { user, backgroundColor } = props;
  const image = user.images[0];
  return (
    <AvatarWrapper>
      <img
        src={
          image?.url ??
          `https://ui-avatars.com/api/?bold=true&background=${
            backgroundColor ?? '3157BE'
          }&color=${'B3B3B3'}&name=${user?.display_name}&length=1&size=128`
        }
        alt="user avatar"
      />
    </AvatarWrapper>
  );
};

const UserDetail = () => {
  const user = useSelector((state) => state.user.userData);

  if (!user) return null;

  return (
    <UserDetailBox>
      <UserAvatar user={user} backgroundColor="0B0C10" />
      <Typography
        textStyle="sm18"
        textColor="primary500"
        textTheme={{ weight: 500 }}
      >
        {user.display_name}
      </Typography>
    </UserDetailBox>
  );
};

export default UserDetail;
