import { Column, Row, Section } from '@react-email/components';
import * as React from 'react';
export default function Card({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <Section className={`border border-solid border-gray-200 rounded-lg p-4 ${className}`}>
            <Row>
                <Column>
                    {children}
                </Column>
            </Row>
        </Section>
    );
}

