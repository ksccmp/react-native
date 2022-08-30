import styled from '@emotion/native';
import React from 'react';
import {Product} from '../../interfaces/product';
import {toThousands} from '../../utils/numberFormat';
import {discountRatio, realSalePrice} from '../../utils/price';
import Text from '../atoms/text';

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  return (
    <Wrapper>
      <ProductImage source={props.product.imagePath} />
      <Text color="black">{props.product.name}</Text>

      <SaleContainer>
        <SaleText color="statusSale" weight="bold">
          {discountRatio(props.product.salePrice, props.product.discountPrice)}%
        </SaleText>

        <Text color="black" weight="bold">
          {toThousands(
            realSalePrice(props.product.salePrice, props.product.discountPrice),
          )}
          원
        </Text>
      </SaleContainer>

      <Text color="grayscale40" decoration="cancle">
        {toThousands(props.product.salePrice)}원
      </Text>
    </Wrapper>
  );
};

export default ProductCard;

const Wrapper = styled.View`
  width: 156px;
  display: flex;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 202px;
`;

const SaleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const SaleText = styled(Text)`
  margin-right: 10px;
`;
