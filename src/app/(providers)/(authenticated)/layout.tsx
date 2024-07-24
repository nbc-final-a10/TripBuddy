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
    searchParams,
}) => {
    // const pathname = getPathnameServer(request);

    let headerMode = 'default';

    console.log('searchParams', searchParams);

    // if (params.slug === 'write') headerMode = 'write';

    return (
        <>
            {headerMode === 'write' && <MobileHeader title="여정 작성" close />}
            {children}
        </>
    );
};

export default AuthenticatedLayout;
