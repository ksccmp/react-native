import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string;
      white: string;
    };

    font: {
      size: {
        small: number;
      };

      weight: {
        bold: '700';
      };
    };
  }
}
