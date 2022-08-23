import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string;
      white: string;

      grayscale30: string;
    };

    font: {
      size: {
        xSmall: number;
        small: number;
      };

      weight: {
        bold: '700';
      };
    };
  }
}
