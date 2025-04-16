import { Body, Column, Container, Font, Head, Html, Row, Section, Tailwind } from '@react-email/components';
import * as React from 'react';
import Footer from './partials/footer';
import Header from './partials/header';

export default function Layout({ title, children }: { title?: string, children: React.ReactNode }) {
    return (
        <Tailwind config={{
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Nunito Sans', 'sans-serif'],
                    },
                    colors: {
                        "primary-50": "#FFF5F5",
                        "primary-100": "#FFE0E0",
                        "primary-200": "#FFC2C2",
                        "primary-300": "#FF9999",
                        "primary-400": "#FF4D4D",
                        "primary-500": "#EC0000",
                        "primary-600": "#CC0000",
                        "primary-700": "#A30000",
                        "primary-800": "#7A0000",
                        "primary-900": "#520000",
                    },
                },
            },
        }}>
            <Html lang="ru" dir="ltr">
                <Head>
                    <title>{title ?? process.env.FRONT_URL}</title>
                    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta name="x-apple-disable-message-reformatting" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
                    <meta name="color-scheme" content="light dark" />
                    <meta name="supported-color-schemes" content="light dark" />
                    <meta name="x-ua-compatible" content="ie=edge" />
                    <meta name="robots" content="noindex, nofollow" />

                    <Font
                        fontFamily="Nunito Sans"
                        fallbackFontFamily="sans-serif"
                        webFont={{
                            url: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
                            format: "woff2",
                        }}
                        fontWeight={400}
                        fontStyle="normal"
                    />
                </Head>

                <Body className={"bg-white text-black p-0 m-0"}>
                    <Container>
                        <Row>
                            <Column className={"w-[580px] max-w-[580px] px-4"}>
                                <Header />

                                <Section>
                                    <Row>
                                        <Column>
                                            {children}
                                        </Column>
                                    </Row>
                                </Section>

                                <Footer />
                            </Column>
                        </Row>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
} 