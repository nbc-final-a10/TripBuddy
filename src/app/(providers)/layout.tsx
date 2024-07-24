import { getUserServer } from '@/api-services/auth/getUserServer';
import { AuthProvider } from '@/contexts/auth.context';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import TapMenu from '@/components/molecules/TapMenu';
import { PropsWithChildren, Suspense } from 'react';
import Loading from './loading';
import { QUERY_KEY_USER } from '@/constants/query.constants';
import Header from '@/components/atoms/common/Header';

async function ProvidersLayout({ children }: PropsWithChildren) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_USER],
        queryFn: () => getUserServer(),
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className="bg-slate-50 xl:bg-white">
            <section className="w-[375px] mx-auto bg-white xl:w-[1080px] min-h-screen relative">
                <Suspense fallback={<Loading />}>
                    <HydrationBoundary state={dehydratedState}>
                        <AuthProvider>
                            <Header />
                            <div className="pb-[50px] xl:pt-[100px]">
                                {children}
                            </div>
                            <TapMenu />
                        </AuthProvider>
                    </HydrationBoundary>
                </Suspense>
            </section>
        </main>
    );
}

export default ProvidersLayout;
