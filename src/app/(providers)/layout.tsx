import { AuthProvider } from '@/contexts/auth.context';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import TapMenu from '@/components/molecules/TapMenu';
import React, { PropsWithChildren, Suspense } from 'react';
import Loading from './loading';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import Header from '@/components/atoms/common/Header';
import { getBuddyServer } from '@/api-services/auth/server';
import { getUserFromHeader } from '@/utils/auth/getUserFromHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';

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
            <section className="max-w-[430px] min-w-[360px] mx-auto bg-white xl:w-[1080px] relative">
                <Suspense fallback={<Loading />}>
                    <HydrationBoundary state={dehydratedState}>
                        <AuthProvider>
                            <Header />
                            <div className="relative pb-[50px] xl:pt-[100px]">
                                {children}
                            </div>
                            <TapMenu pathname={pathname as string} />
                        </AuthProvider>
                    </HydrationBoundary>
                </Suspense>
            </section>
        </main>
    );
};

export default ProvidersLayout;
