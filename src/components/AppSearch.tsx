import { IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  /* .MuiIconButton-root {
    right: 0;
    top: 0;
    margin-top: 52px;
    position: absolute;

    &:hover {
      background: none;
    }

    svg {
      font-size: 30px;
    }
  } */

  .inputWrapper {
    width: 90%;
    position: relative;

    input {
      border: none;
      padding: 20px 32px 15px 20px;
      outline: none;
      font-size: 18px;
      background: ${(p) => p.theme.resolved.colors.bgAccentColor};
      width: 100%;
    }

    .MuiIconButton-root {
      position: absolute;
      margin: 0;
      right: 10px;
      top: 12px;
      height: 30px;
    }
  }
`;

interface IAppSearchProps {
  onSubmit: (value: string) => void;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

const AppSearch = (props: IAppSearchProps) => {
  return (
    <Container>
      <div className="inputWrapper">
        <input
          type="text"
          name="globalSearch"
          id="globalSearch"
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
          placeholder={props.placeholder ?? 'Enter search here'}
        />
        <IconButton
          disableRipple
          onClick={() => {
            props.onSubmit(props.value);
          }}
        >
          <Search />
        </IconButton>
      </div>
    </Container>
  );
};

export default AppSearch;
