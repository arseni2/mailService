import { Column, Img, Link, Row, Section } from '@react-email/components';
import { process } from 'env';
import * as React from 'react';

export default function Header() {
    const appName = process.env.MAIL_APP_NAME || 'Company Name';

    return (
        <Section>
            <Row>
                <Column className="text-center py-4">
                    <Link href={`${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}`}>
                        <Img
                            src={`${process.env.CDN_PROTOCOL}${process.env.CDN_URL}/images/other/logo.png`}
                            alt={process.env.FRONT_NAME}
                            className="h-7 mx-auto"
                        />
                    </Link>
                </Column>
            </Row>
        </Section>
    );
}  