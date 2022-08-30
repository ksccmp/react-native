import styled, {css} from '@emotion/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ImageURISource,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import _useScreen from '../../modules/customHooks/useScreen';

interface Props {
  imageList: (ImageSourcePropType & ImageURISource)[];
}

const Carousel = (props: Props) => {
  /**
   * customRecoil
   */
  const useScreen = _useScreen();

  /**
   * useState
   */
  const [imageIndex, setImageIndex] = useState<number>(0);

  /**
   * useRef
   */
  const timerRef = useRef<number>();
  const flatListRef = useRef<FlatList>(null);

  /**
   * useEffect
   */
  useEffect(() => {
    setTimer();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: imageIndex,
        animated: true,
      });
    }
  }, [imageIndex]);

  /**
   * handle
   */
  const handle = {
    touchStartBanner: () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    },

    scrollEndDragBanner: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const gap = 80;

      if (offsetX < useScreen.screenWidth * imageIndex - gap) {
        setImageIndex(
          (imageIndex - 1 + props.imageList.length) % props.imageList.length,
        );
      } else if (offsetX > useScreen.screenWidth * imageIndex + gap) {
        setImageIndex((imageIndex + 1) % props.imageList.length);
      } else {
        setImageIndex(imageIndex);
      }

      setTimer();
    },
  };

  /**
   * setTimer
   */
  const setTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setImageIndex(prev => (prev + 1) % props.imageList.length);
    }, 3000);
  };

  return (
    <Wrapper>
      <FlatList
        ref={flatListRef}
        data={props.imageList}
        horizontal // 수평으로 보이게 하기
        pagingEnabled // 페이징 가능하게 만들기
        showsHorizontalScrollIndicator={false} // 스크롤 보이지 않게 하기
        onTouchStart={handle.touchStartBanner}
        onScrollEndDrag={handle.scrollEndDragBanner}
        renderItem={({item}) => (
          <Image
            source={item}
            style={{
              width: useScreen.screenWidth,
              height: useScreen.screenWidth,
            }}
          />
        )}
      />

      <IndicatorContainer>
        <Indicator>
          {imageIndex + 1}/{props.imageList.length}
        </Indicator>
      </IndicatorContainer>
    </Wrapper>
  );
};

export default Carousel;

const Wrapper = styled.View`
  position: relative;
`;

const IndicatorContainer = styled.View`
  position: absolute;
  right: 12px;
  bottom: 12px;

  background-color: rgba(0, 0, 0, 0.15);

  padding: 2px 6px;

  border-radius: 10px;
`;

const Indicator = styled.Text`
  ${props => css`
    color: ${props.theme.color.white};
    ${props.theme.font.size.xSmall &&
    `font-size: ${props.theme.font.size.xSmall}px`};
  `}
`;
