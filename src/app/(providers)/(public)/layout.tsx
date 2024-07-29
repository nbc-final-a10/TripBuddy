import MobileHeader from '@/components/molecules/common/MobileHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import React from 'react';

type PublicLayoutProps = {
    children: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    const { pathname, queryParams } = getPathnameServer();

    return (
        <>
            {pathname === '/onboarding' && (
                <MobileHeader
                // title="여정 작성"
                // notification
                // search
                // settings
                // edit
                // close
                />
            )}
            {children}
        </>
    );
};

export default PublicLayout;
