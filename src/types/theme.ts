export interface ITextTheme {
  size: number;
  weight: string | number;
  height?: number;
  opacity?: number;
}

export interface ITheme {
  colors: {
    primaryColor: string;
    accentColor: string;
    bgPrimaryColor: string;
    bgAccentColor: string;
    bgPrimaryColor2: string;
  };
  text: {
    colors: {
      primary: string;
      primary300: string;
      primary400: string;
      primary500: string;
      primary600: string;
      primary800: string;
      secondary: string;
      secondary300: string;
      secondary400: string;
      secondary500: string;
      secondary600: string;
    };
    style: {
      sm12: ITextTheme;
      sm14: ITextTheme;
      sm16: ITextTheme;
      sm18: ITextTheme;
      md20: ITextTheme;
      md24: ITextTheme;
      lg36: ITextTheme;
    };
  };
}

export interface IAppTheme {
  screenWidth: number;
  default: ITheme;
  resolved: ITheme;
}
