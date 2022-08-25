declare module '*.webp' {
  import {ImageSourcePropType, ImageURISource} from 'react-native';
  const content: ImageSourcePropType & ImageURISource;
  export default content;
}
