import MobileHeader from '@/components/molecules/common/MobileHeader';
import { defaultMetaData } from '@/utils/common/defaultMetaData';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import { Metadata } from 'next';
import React from 'react';

type ConditionalLayoutProps = {
    children: React.ReactNode;
};

export const metadata: Metadata = defaultMetaData;

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
    return <>{children}</>;
};

export default ConditionalLayout;
