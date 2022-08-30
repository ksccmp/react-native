export const discountRatio = (salePrice: number, discountPrice: number) => {
  return Math.floor(discountPrice / salePrice) * 100;
};

export const realSalePrice = (salePrice: number, discountPrice: number) => {
  return salePrice - discountPrice;
};
