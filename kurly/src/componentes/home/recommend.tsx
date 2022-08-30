import styled, {css} from '@emotion/native';
import React, {useState} from 'react';
import {FlatList, ImageSourcePropType, ImageURISource} from 'react-native';
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
import {Product} from '../../interfaces/product';
import Text from '../atoms/text';
import Carousel from '../molecules/carousel';
import ProductCard from '../molecules/productCard';

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

  const [productList] = useState<Product[]>([
    {
      name: '[그릭슈바인] 미니핫도그 10입',
      salePrice: 8900,
      discountPrice: 890,
      imagePath: product_1,
    },
    {
      name: '[만토바] 기버터 스프레이 오일',
      salePrice: 12900,
      discountPrice: 2900,
      imagePath: product_2,
    },
    {
      name: '[유로포멜라] 부라타 치즈 (냉동)',
      salePrice: 5500,
      discountPrice: 450,
      imagePath: product_3,
    },
    {
      name: '[퀴네] 스모크 페퍼 바베큐 소스',
      salePrice: 4900,
      discountPrice: 700,
      imagePath: product_4,
    },
    {
      name: '[풀무원] 로스팅 짜장면 파기름 4개입',
      salePrice: 4980,
      discountPrice: 896,
      imagePath: product_5,
    },
  ]);

  return (
    <Wrapper>
      <Carousel imageList={bannerImageList} />

      <ProductContainer>
        <Title color="black" size="medium" weight="bold">
          이 상품 어때요?
        </Title>

        <FlatList
          data={productList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <ProductCard product={item} />}
        />
      </ProductContainer>
    </Wrapper>
  );
};

export default Recommend;

const Wrapper = styled.ScrollView`
  ${props => css`
    background-color: ${props.theme.color.white};
  `}
`;

const ProductContainer = styled.View`
  padding: 20px;
  margin: 12px 0;
`;

const Title = styled(Text)`
  margin-bottom: 12px;
`;
