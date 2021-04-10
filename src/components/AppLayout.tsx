import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import UserTopBar from './UserTopBar';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-row-gap: 20px;
  padding: 20px 40px;
  background-color: ${(p) => p.theme.resolved.colors.bgPrimaryColor};

  .topBar {
    grid-row: 1/2;
  }

  .main {
    height: 100%;
    overflow: auto;
  }
`;

interface IAppLayoutProps {
  children: React.ReactNode;
  isHomePage?: boolean;
}

const AppLayout = (props: IAppLayoutProps) => {
  return (
    <Container>
      <div className="topBar">
        {props.isHomePage ? <TopBar /> : <UserTopBar />}
      </div>
      <div className="main">{props.children}</div>
    </Container>
  );
};

export default AppLayout;
