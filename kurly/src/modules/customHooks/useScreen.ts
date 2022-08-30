import {useState} from 'react';
import {Dimensions} from 'react-native';

const _useScreen = () => {
  /**
   * useState
   */
  const [screenWidth] = useState<number>(Dimensions.get('window').width);
  const [screenHeight] = useState<number>(Dimensions.get('window').height);

  return {
    screenWidth,
    screenHeight,
  };
};

export default _useScreen;
