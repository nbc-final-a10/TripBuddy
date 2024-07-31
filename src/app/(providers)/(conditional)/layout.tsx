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
            {pathname?.includes('/trips') && (
                <MobileHeader
                    title="여정 보기"
                    // notification
                    // search
                    // settings
                    edit
                    // close
                />
            )}
            {children}
        </>
    );
};

export default ConditionalLayout;
