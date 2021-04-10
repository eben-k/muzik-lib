import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-rows: 1fr max-content;
`;

export const ItemsListWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;

  .itemTitle {
    margin-bottom: 20px;
  }

  .itemContainer {
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
    grid-gap: 36px;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    }
  }
`;

export const ItemCardBox = styled.div`
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

  .itemArtLogo {
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
