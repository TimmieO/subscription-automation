import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      background: string;
      surface: string;
      text: {
        primary: string;
        secondary: string;
      };
      border: string;
      accent: string;
      destructive: string;
      info: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
  }
} 