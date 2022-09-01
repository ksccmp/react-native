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
  const prevImageIndexRef = useRef<number>(0);

  /**
   * useEffect
   */
  useEffect(() => {
    setTimer();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      if (
        imageIndex % props.imageList.length !==
        prevImageIndexRef.current % props.imageList.length
      ) {
        prevImageIndexRef.current = imageIndex;

        flatListRef.current.scrollToIndex({
          index: imageIndex,
          animated: true,
        });

        setTimeout(() => {
          if (flatListRef.current) {
            const changeIndex =
              (imageIndex % props.imageList.length) + props.imageList.length;
            flatListRef.current.scrollToIndex({
              index: changeIndex,
              animated: false,
            });

            setImageIndex(changeIndex);
          }
        }, 300);
      }
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
        const prevIndex = getPrevIndex(imageIndex);
        setImageIndex(prevIndex);
      } else if (offsetX > useScreen.screenWidth * imageIndex + gap) {
        const nextIndex = getNextIndex(imageIndex);
        setImageIndex(nextIndex);
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
      setImageIndex(prev => prev + 1);
    }, 3000);
  };

  /**
   * getNextIndex
   */
  const getNextIndex = (index: number) => {
    return index + 1;
  };

  /**
   * getPrevIndex
   */
  const getPrevIndex = (index: number) => {
    return index - 1;
  };

  return (
    <Wrapper>
      <FlatList
        ref={flatListRef}
        data={[...props.imageList, ...props.imageList, ...props.imageList]}
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
          {(imageIndex % props.imageList.length) + 1}/{props.imageList.length}
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
