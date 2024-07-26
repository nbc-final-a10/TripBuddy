import MobileHeader from '@/components/molecules/common/MobileHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import React from 'react';

type ConditionalLayoutProps = {
    children: React.ReactNode;
};

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
    const { pathname, queryParams } = getPathnameServer();

    return (
        <>
            {pathname === '/trips' && (
                <MobileHeader
                    title="모집중 여정"
                    notification
                    search
                    // settings
                    // edit
                    // close
                />
            )}
            {children}
        </>
    );
};

export default ConditionalLayout;
