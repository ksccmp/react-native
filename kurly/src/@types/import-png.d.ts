declare module '*.png' {
  import {ImageSourcePropType, ImageURISource} from 'react-native';
  const content: ImageSourcePropType & ImageURISource;
  export default content;
}
