import MobileHeader from '@/components/molecules/common/MobileHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import React from 'react';

type AuthenticatedLayoutProps = {
    children: React.ReactNode;
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
    children,
}) => {
    const { pathname, queryParams } = getPathnameServer();

    console.log('queryParams ===>', queryParams);

    return (
        <>
            {pathname === '/write' && <MobileHeader title="여정 작성" close />}
            {children}
        </>
    );
};

export default AuthenticatedLayout;
