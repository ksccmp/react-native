import {ImageSourcePropType, ImageURISource} from 'react-native';

export interface Product {
  name: string;
  salePrice: number;
  discountPrice: number;
  imagePath: ImageSourcePropType & ImageURISource;
}
