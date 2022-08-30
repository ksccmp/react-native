import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      white: string;
      black: string;

      primary: string;

      grayscale30: string;
      grayscale40: string;

      statusSale: string;
    };

    font: {
      size: {
        xSmall: number;
        small: number;
        medium: number;
      };

      weight: {
        bold: '700';
      };
    };
  }
}
