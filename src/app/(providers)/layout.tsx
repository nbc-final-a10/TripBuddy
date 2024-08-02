import { AuthProvider } from '@/contexts/auth.context';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import React, { PropsWithChildren, Suspense } from 'react';
import Loading from './loading';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import Header from '@/components/atoms/common/Header';
import { getBuddyServer } from '@/api-services/auth/server';
import { getUserFromHeader } from '@/utils/auth/getUserFromHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import MainSectionWrapper from '@/components/molecules/common/MainSectionWrapper';
import MobileHeader from '@/components/molecules/common/MobileHeader';
import TapMenu from '@/components/molecules/common/TapMenu';
import { Metadata } from 'next';
import { defaultMetaData } from '@/utils/common/defaultMetaData';

export const metadata: Metadata = defaultMetaData;

const ProvidersLayout: React.FC<PropsWithChildren> = async ({ children }) => {
    const userId = getUserFromHeader();
    const { pathname, queryParams } = getPathnameServer();

    console.log('헤더에서 user =====>', userId);

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_BUDDY],
        queryFn: () => getBuddyServer(userId),
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className="bg-slate-50 xl:bg-white min-h-dvh overflow-hidden">
            <MainSectionWrapper>
                <Suspense fallback={<Loading />}>
                    <HydrationBoundary state={dehydratedState}>
                        <AuthProvider>
                            <MobileHeader />
                            <Header />
                            {children}
                            <TapMenu pathname={pathname as string} />
                        </AuthProvider>
                    </HydrationBoundary>
                </Suspense>
            </MainSectionWrapper>
        </main>
    );
};

export default ProvidersLayout;
