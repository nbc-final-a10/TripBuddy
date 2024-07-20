import { AuthProvider } from '@/contexts/auth.context';
// import { usePrefetchBuddy } from '@/hooks/auth.hooks';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import { PropsWithChildren, Suspense } from 'react';
import Loading from './loading';
import { QUERY_KEY_USER } from '@/constants/auth.constans';
import { getUserServer } from '@/api-services/auth/getUserServer';

async function ProvidersLayout({ children }: PropsWithChildren) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_USER],
        queryFn: () => getUserServer(),
    });
    const dehydratedState = dehydrate(queryClient);

    const initialBuddy = queryClient.getQueryData<any | undefined>([
        QUERY_KEY_USER,
    ]);

    return (
        <main className="bg-slate-50 xl:bg-white">
            <section className="w-[375px] mx-auto bg-white xl:w-[1280px] ">
                <Suspense fallback={<Loading />}>
                    <HydrationBoundary state={dehydratedState}>
                        <AuthProvider initialBuddy={initialBuddy}>
                            {children}
                        </AuthProvider>
                    </HydrationBoundary>
                </Suspense>
            </section>
        </main>
    );
}

export default ProvidersLayout;
