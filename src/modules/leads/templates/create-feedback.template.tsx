import { Column, Heading, Link, Row, Section, Text } from '@react-email/components';
import { process } from 'env';
import * as React from 'react';
import { emailUtil } from 'src/common/utils/email.util';
import { phoneUtil } from 'src/common/utils/phone.util';
import { CreateLeadDto } from 'src/modules/leads/dto/create-lead.dto';
import { LeadStatus } from 'src/modules/leads/enum/lead.enum';
import Card from 'src/shared/components/atoms/cards/card';
import Layout from 'src/shared/components/templates/layout/layout';

const status = {
  [LeadStatus.NEW]: 'Новый',
  [LeadStatus.COMPLETED]: 'Выполненный',
  [LeadStatus.PROCESSED]: 'В обработке',
  [LeadStatus.CANCELLED]: 'Отменён',
};

export default function CreateFeedbackTemplate({ dto }: { dto: CreateLeadDto }) {
  return ( 
    <Layout title={`Запрос #${dto?.id} успешно создан`}>
      <Card>
        <Section>
          <Row>
            <Column>
              <Heading as='h1' className='text-black text-base font-semibold leading-relaxed p-0 m-0'>Запрос #{dto?.id} успешно создан</Heading>
            </Column>
          </Row>

          <Row className='pt-1'>
            <Column>
              <Text className='text-black text-sm leading-relaxed p-0 m-0'>
              Спасибо, что обратились к нам! Мы рады сообщить, что {''}

                <Link
                  href={`${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}/feedbacks/view/${dto?.id}`}
                  className='text-primary-500 no-underline duration-200 hover:text-primary-600'
                >
                  Запрос #{dto?.id}
                </Link>{' '}

                был успешно создан. Вот основные детали:
              </Text>
            </Column>
          </Row>
        </Section>

        <Section className='pt-4'>
          <Row>
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
        </Section>
      </Card>
    </Layout>
  );
} 