import styled, {css} from '@emotion/native';
import {Text as Txt} from 'react-native';
import theme from '../../styles/theme';

const TextProps = {
  decoration: ['cancle'],
};

interface Props {
  color?: keyof typeof theme.color;
  size?: keyof typeof theme.font.size;
  weight?: keyof typeof theme.font.weight;
  decoration?: typeof TextProps.decoration[number];
}

const Text = styled(Txt)<Props>`
  ${props => css`
    ${props.color && `color: ${props.theme.color[props.color]};`}
    ${props.size && `font-size: ${props.theme.font.size[props.size]}px;`}
    ${props.weight && `font-weight: ${props.theme.font.weight[props.weight]};`}
  `}

  ${props => {
    switch (props.decoration) {
      case 'cancle':
        return css`
          text-decoration-line: line-through;
        `;
    }
  }}
`;

export default Text;
