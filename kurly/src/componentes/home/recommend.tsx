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
  ScrollView,
  Text,
  View,
} from 'react-native';
import banner_1 from '../../assets/images/banner_1.webp';
import banner_2 from '../../assets/images/banner_2.webp';
import banner_3 from '../../assets/images/banner_3.webp';
import banner_4 from '../../assets/images/banner_4.webp';
import banner_5 from '../../assets/images/banner_5.webp';
import product_1 from '../../assets/images/product_1.webp';
import product_2 from '../../assets/images/product_2.webp';
import product_3 from '../../assets/images/product_3.webp';
import product_4 from '../../assets/images/product_4.webp';
import product_5 from '../../assets/images/product_5.webp';

interface Product {
  name: string;
  price: number;
  salePrice: number;
  imagePath: ImageSourcePropType & ImageURISource;
}

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
  const [productList, setProductList] = useState<Product[]>([
    {
      name: '[그릭슈바인] 미니핫도그 10입',
      price: 8900,
      salePrice: 890,
      imagePath: product_1,
    },
    {
      name: '[만토바] 기버터 스프레이 오일',
      price: 12900,
      salePrice: 2900,
      imagePath: product_2,
    },
    {
      name: '[유로포멜라] 부라타 치즈 (냉동)',
      price: 5500,
      salePrice: 450,
      imagePath: product_3,
    },
    {
      name: '[퀴네] 스모크 페퍼 바베큐 소스',
      price: 4900,
      salePrice: 700,
      imagePath: product_4,
    },
    {
      name: '[풀무원] 로스팅 짜장면 파기름 4개입',
      price: 4980,
      salePrice: 896,
      imagePath: product_5,
    },
  ]);

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
  };

  return (
    <ScrollView>
      <BannerContainer>
        <FlatList
          ref={bannerRef}
          data={bannerImageList}
          horizontal // 수평으로 보이게 하기
          pagingEnabled // 페이징 가능하게 만들기
          showsHorizontalScrollIndicator={false} // 스크롤 보이지 않게 하기
          onTouchStart={handle.touchStartBanner}
          onScrollEndDrag={handle.scrollEndDragBanner}
          renderItem={({item}) => (
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
        <Title style={{marginBottom: 12}}>이 상품 어때요?</Title>
        <FlatList
          data={productList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{width: 156, display: 'flex'}}>
              <Image
                source={item.imagePath}
                style={{width: '100%', height: 202}}
              />
              <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'rgb(250, 98, 47)',
                    marginRight: 10,
                  }}>
                  {Math.floor((item.salePrice / item.price) * 100)}%
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  {item.price - item.salePrice}원
                </Text>
              </View>
              <Text
                style={{
                  color: 'rgb(181, 181, 181)',
                  textDecorationLine: 'line-through',
                }}>
                {item.price}원
              </Text>
            </View>
          )}
        />
      </ProductContainer>
    </ScrollView>
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
