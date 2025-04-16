import { Link, Section } from '@react-email/components';
import { process } from 'env';
import * as React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Section className="text-center py-4">
            <Link className="text-black text-sm text-decoration-none p-0 m-0" href={`${process.env.FRONT_PROTOCOL}${process.env.FRONT_URL}`}>
                &copy; {currentYear} {process.env.FRONT_URL}
            </Link>
        </Section>
    );
}  