import { Column, Heading, Link, Row, Section, Text } from '@react-email/components';
import { process } from 'env';
import * as React from 'react';
import { emailUtil } from 'src/common/utils/email.util';
import { phoneUtil } from 'src/common/utils/phone.util';
import { priceUtil } from 'src/common/utils/price.util';
import Card from 'src/shared/components/atoms/cards/card';
import RowOrderProduct from 'src/shared/components/molecules/rows/product/row.order.product';
import Layout from 'src/shared/components/templates/layout/layout';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderStatus } from '../enums/order.enum';

const status = {
  [OrderStatus.NEW]: 'Новый',
  [OrderStatus.COMPLETED]: 'Выполненный',
  [OrderStatus.PROCESSED]: 'В обработке',
  [OrderStatus.CANCELLED]: 'Отменён',
};

export default function CreateOrderTemplate({ dto }: { dto: CreateOrderDto }) {
  return (
    <Layout title={`Заказ #${dto?.id} успешно создан`}>
      <Card>
        <Section>
          <Row>
            <Column>
              <Heading as='h1' className='text-black text-base font-semibold leading-relaxed p-0 m-0'>Заказ #{dto?.id} успешно создан</Heading>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                Информируем о новом заказе. {''}

                <Link
                  href={`${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}/sales/update/${dto?.id}`}
                  className='text-primary-500 no-underline duration-200 hover:text-primary-600'
                >
                  Заказ #{dto?.id}
                </Link>

                {''} зарегистрирован в системе. Вот основные детали:
              </Text>
            </Column>
          </Row>
        </Section>

        <Section className='pt-4'>
          <Row >
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                <span className='font-medium'>Статус:</span> {status[dto?.status as keyof typeof status] || 'Новый'}
              </Text>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                <span className='font-medium'>Email:</span> {emailUtil(dto?.email) ?? 'Не указан'}
              </Text>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                <span className='font-medium'>Телефон:</span> {phoneUtil(dto?.phone) ?? 'Не указан'}
              </Text>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                <span className='font-medium'>Комментарий:</span> {dto?.comment ?? 'Не указан'}
              </Text>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                <span className='font-semibold'>Итого:</span> {priceUtil(dto?.total || 0)}
              </Text>
            </Column>
          </Row>
        </Section>
      </Card>

      {dto?.products?.length > 0 && (
        <Card className='mt-4'>
          <Section>
            <Row>
              <Column>
                <Heading as='h2' className='text-black text-base leading-relaxed font-semibold p-0 m-0'>Товары в заказе</Heading>
              </Column>
            </Row>

            <Row className='pt-4'>
              <Column>
                <Section>
                  {dto?.products?.map((product, index) => (
                    <RowOrderProduct key={index} product={product} quantity={product?.quantity} className={index === dto?.products?.length - 1 && ' '} />
                  ))}
                </Section>
              </Column>
            </Row>
          </Section> 
        </Card>
      )}
    </Layout>
  );
} 