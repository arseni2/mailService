export function priceUtil(price: number | null | undefined): string {
  if (price === null || price === undefined || price <= 0) {
    return '0 ₽';
  }

  const roundedPrice = Math.round(price);
  const formattedPrice = roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₽';

  return formattedPrice;
}
