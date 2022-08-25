import styled, {css} from '@emotion/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ImageURISource,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import banner_1 from '../../assets/images/banner_1.webp';
import banner_2 from '../../assets/images/banner_2.webp';
import banner_3 from '../../assets/images/banner_3.webp';
import banner_4 from '../../assets/images/banner_4.webp';
import banner_5 from '../../assets/images/banner_5.webp';

const Recommend = () => {
  /**
   * useState
   */
  const [bannerImageList] = useState<(ImageSourcePropType & ImageURISource)[]>([
    banner_1,
    banner_2,
    banner_3,
    banner_4,
    banner_5,
  ]);
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const [screenWidth] = useState<number>(Dimensions.get('window').width);

  /**
   * useRef
   */
  const timerRef = useRef<number>();
  const bannerRef = useRef<FlatList>(null);

  /**
   * useEffect
   */
  useEffect(() => {
    setTimer();
  }, []);

  useEffect(() => {
    console.log(bannerIndex);
    if (bannerRef.current) {
      bannerRef.current.scrollToIndex({
        index: bannerIndex,
        animated: true,
      });
    }
  }, [bannerIndex]);

  /**
   * setTimer
   */
  const setTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % bannerImageList.length);
    }, 3000);
  };

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
      if (offsetX < screenWidth * bannerIndex - 80) {
        setBannerIndex(
          (bannerIndex - 1 + bannerImageList.length) % bannerImageList.length,
        );
      } else if (offsetX > screenWidth * bannerIndex + 80) {
        setBannerIndex((bannerIndex + 1) % bannerImageList.length);
      } else {
        setBannerIndex(bannerIndex);
      }

      setTimer();
    },

    scrollBanner: (e: NativeSyntheticEvent<NativeScrollEvent>) => {},
  };

  return (
    <View>
      <BannerContainer>
        <FlatList
          ref={bannerRef}
          data={bannerImageList}
          horizontal // 수평으로 보이게 하기
          pagingEnabled // 페이징 가능하게 만들기
          showsHorizontalScrollIndicator={false} // 스크롤 보이지 않게 하기
          onTouchStart={handle.touchStartBanner}
          onScrollEndDrag={handle.scrollEndDragBanner}
          onScroll={handle.scrollBanner}
          renderItem={({item, index}) => (
            <Image
              source={item}
              style={{
                width: screenWidth,
                height: screenWidth,
              }}
            />
          )}
        />

        <IndicatorContainer>
          <Indicator>
            {bannerIndex + 1}/{bannerImageList.length}
          </Indicator>
        </IndicatorContainer>
      </BannerContainer>

      <ProductContainer>
        <Title>이 상품 어때요?</Title>
      </ProductContainer>
    </View>
  );
};

export default Recommend;

const BannerContainer = styled.View`
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

const ProductContainer = styled.View`
  padding: 20px;
  margin: 12px 0;
`;

const Title = styled.Text`
  ${props => css`
    ${props.theme.font.size.medium &&
    `font-size: ${props.theme.font.size.medium}px`};
    font-weight: ${props.theme.font.weight.bold};
  `}
`;
