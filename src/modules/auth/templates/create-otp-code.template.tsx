import { Column, Heading, Link, Row, Section, Text } from '@react-email/components';
import { process } from 'env';
import * as React from 'react';
import Card from 'src/shared/components/atoms/cards/card';
import Layout from 'src/shared/components/templates/layout/layout';
import { CreateOtpCodeDto } from '../dto/create-otp-code.dto';

export default function CreateOtpCodeTemplate({ dto }: { dto: CreateOtpCodeDto }) {
  return (
    <Layout title='Авторизация'>
      <Card>
        <Section>
          <Row>
            <Column>
              <Heading as='h1' className='text-black text-base font-semibold leading-relaxed p-0 m-0'>Авторизация</Heading>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                Вы указали адрес {''}

                <Link
                  className='text-primary-500 text-decoration-none'
                  href={`mailto:${dto?.to}`}
                >
                  {dto?.to ?? 'example@example.com'}
                </Link>

                {''} в качестве логина на {''}

                <Link className='text-primary-500 text-decoration-none' href={`${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}`}>{process.env.FRONT_URL}</Link>.

                Для подтверждения адреса введите вот этот код:
              </Text>
            </Column>
          </Row>

          <Row className='py-4'>
            <Column>
              <Text className='text-black text-4xl font-semibold text-center tracking-widest leading-normal p-0 m-0'>{dto?.code ?? 111111}</Text>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                Код действителен 15 минут.
              </Text>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
                Если вы не авторизуетесь или регистрируетесь на {''}

                <Link className='text-primary-500 no-underline' href={`${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}`}>
                  {process.env.FRONT_URL}
                </Link>

                {''}, просто не обращайте внимания на это письмо. Скорее всего, кто-то указал ваш адрес по ошибке.
              </Text>
            </Column>
          </Row>
        </Section>
      </Card>
    </Layout>
  );
}
