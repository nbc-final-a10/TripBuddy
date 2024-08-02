import QueryProvider from '@/providers/QueryProvider';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React, { PropsWithChildren } from 'react';
import Script from 'next/script';
import { defaultMetaData } from '@/data/defaultMetaData';

const inter = Inter({ subsets: ['latin'] });

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
        <html lang="en">
            <body className={inter.className}>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
};

export default RootLayout;
