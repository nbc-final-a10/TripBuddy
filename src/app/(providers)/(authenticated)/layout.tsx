import MobileHeader from '@/components/molecules/common/MobileHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import React from 'react';

type AuthenticatedLayoutProps = {
    children: React.ReactNode;
};

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
    children,
}) => {
    return <>{children}</>;
};

export default AuthenticatedLayout;
