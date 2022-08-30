import styled from '@emotion/native';
import React from 'react';
import {FlatList} from 'react-native';
import {Product} from '../../interfaces/product';
import Text from '../atoms/text';
import ProductCard from '../molecules/productCard';

interface Props {
  title: string;
  productList: Product[];
}

const ProductCardList = (props: Props) => {
  return (
    <Wrapper>
      <Title color="black" size="medium" weight="bold">
        {props.title}
      </Title>

      <FlatList
        data={props.productList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <ProductCard product={item} />}
      />
    </Wrapper>
  );
};

export default ProductCardList;

const Wrapper = styled.View`
  padding: 20px 0;
  margin: 12px 0;
`;

const Title = styled(Text)`
  margin-bottom: 12px;
`;
