import MobileHeader from '@/components/molecules/common/MobileHeader';
import { defaultMetaData } from '@/utils/common/defaultMetaData';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import { Metadata } from 'next';
import React from 'react';

type AuthenticatedLayoutProps = {
    children: React.ReactNode;
};

export const metadata: Metadata = defaultMetaData;

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
    children,
}) => {
    return <>{children}</>;
};

export default AuthenticatedLayout;
