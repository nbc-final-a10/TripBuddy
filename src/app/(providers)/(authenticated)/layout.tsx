import MobileHeader from '@/components/molecules/common/MobileHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import React from 'react';

type AuthenticatedLayoutProps = {
    children: React.ReactNode;
};

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
    children,
}) => {
    const { pathname, queryParams } = getPathnameServer();

    // 아래 콘솔로그를 주석해제 하시면 테스트 해볼 수 있습니다.
    // console.log('pathname =============>', pathname);
    // console.log('queryParams =============>', queryParams);

    return (
        <>
            {pathname === '/write' && (
                <MobileHeader
                    title="여정 작성"
                    // notification
                    // search
                    // settings
                    // edit
                    close
                />
            )}
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

export default AuthenticatedLayout;
