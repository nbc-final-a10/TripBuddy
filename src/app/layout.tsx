import Footer from '@/components/molecules/Footer';
import Header from '@/components/molecules/Header';
import QueryProvider from '@/providers/QueryProvider';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
    themeColor: 'black',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
};

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
    manifest: '/manifest.json',
    icons: {
        icon: '/test_icon.png',
        shortcut: '/test_icon.png',
        apple: '/test_icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/test_icon.png',
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
