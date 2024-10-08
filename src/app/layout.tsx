import QueryProvider from '@/providers/QueryProvider';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import React, { PropsWithChildren } from 'react';
import { defaultMetaData } from '@/data/defaultMetaData';
import { Analytics } from '@vercel/analytics/react';

const pretendard = localFont({
    src: '../font/PretendardVariable.woff2',
    weight: '45 920',
    style: 'normal',
    display: 'swap',
});

export const viewport: Viewport = {
    themeColor: 'black',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
};

export const metadata: Metadata = defaultMetaData;

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="ko">
            <body className={pretendard.className}>
                <QueryProvider>{children}</QueryProvider>
                <Analytics />
            </body>
        </html>
    );
};

export default RootLayout;
