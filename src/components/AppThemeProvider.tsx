import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import React, { useMemo } from 'react';
import {
  createGlobalStyle,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components';
import { appEnv } from '../config/environment';
import useScreenSize from '../hooks/useScreenSize';
import { IAppTheme, ITheme } from '../types/theme';

interface IProps {
  children: React.ReactNode;
}

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  font-size: 1em;
  box-sizing: border-box;
}
body {
  font-family: 'Montserrat';
  height: 100%;
  background-color: #ffffff;
}

#root {
  height: 100%;
}

div, input {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  font-family: inherit;
}

html {
    height: 100%;
    font-size: 1rem;
  }`;

const AppThemeProvider = (props: IProps) => {
  const size = useScreenSize();
  const theme = useMemo<IAppTheme>(() => {
    const defaultTheme: ITheme = {
      colors: {
        primaryColor: '#F3CE7D',
        accentColor: '#FFDA8A',
        bgPrimaryColor: '#F7F2EC',
        bgAccentColor: '#fff',
        bgPrimaryColor2: '#ECE5FF',
      },
      text: {
        colors: {
          primary: '#17161B',
          primary300: '#9D9B9C',
          primary400: '#6D6D6F',
          primary500: '#626063',
          primary600: '#0C0D11',
          primary800: '#0A0B10',
          secondary: '#F7F7F7',
          secondary300: '#21007A',
          secondary400: '#21007A',
          secondary500: '#21007A',
          secondary600: '#161613',
        },
        style: {
          sm12: {
            weight: 'normal',
            size: 12,
          },
          sm14: {
            weight: 'normal',
            size: 14,
          },
          sm16: {
            weight: 'normal',
            size: 16,
          },
          sm18: {
            weight: 'normal',
            size: 18,
          },
          md20: {
            size: 24,
            weight: 500,
          },
          md24: {
            size: 24,
            weight: 500,
          },
          lg36: {
            size: 36,
            weight: 600,
          },
        },
      },
    };
    return {
      screenWidth: size.width,
      default: defaultTheme,
      resolved: defaultTheme,
    };
  }, [size.width]);

  return (
    <StyleSheetManager disableVendorPrefixes={appEnv === 'local'}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {props.children}
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default AppThemeProvider;
