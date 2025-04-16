import { Column, Img, Link, Row, Text } from '@react-email/components';
import { process } from 'env';
import * as React from 'react';
import { priceUtil } from 'src/common/utils/price.util';
import { OrderProduct } from 'src/modules/orders/entites/order-product.entity';

export default function RowOrderProduct({ product, quantity, className }: { product: OrderProduct, quantity: number, className?: string }) {
    return (
        <Row className={className ? className : 'pb-2 mb-3 border-b border-solid border-gray-200'}>
            <Column>
                <Link href={product?.product?.slug ? `${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}/product/${product?.product?.slug}` : ''} className='inline-block w-11 h-11 min-w-11 min-h-11 border border-solid border-gray-200 rounded'>
                    <Img src={product?.product?.images?.[0]?.src ? `${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}${product?.product?.images?.[0]?.src}` : `${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}/images/other/no-image.png`} alt={product?.title} className='w-full h-full object-contain object-center' />
                </Link>

                <Link href={product?.product?.slug ? `${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}/product/${product?.product?.slug}` : ''} className='inline-block pl-3 align-top' >
                    <Text className='text-black text-sm font-medium leading-relaxed truncate p-0 m-0'>{product?.title}</Text>
                    <Text className='text-black text-xs leading-relaxed p-0 m-0 pt-1'>{priceUtil(product?.price)} x {quantity} шт.</Text>
                </Link>
            </Column>
        </Row>
    );
}
 
