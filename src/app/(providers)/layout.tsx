import { AuthProvider } from '@/contexts/auth.context';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import React, { PropsWithChildren, Suspense } from 'react';
import Loading from './loading';
import {
    QUERY_KEY_BUDDY,
    QUERY_KEY_NOTIFICATION,
} from '@/constants/query.constants';
import Header from '@/components/molecules/common/Header';
import { getBuddyServer } from '@/api-services/auth/server';
import { getUserFromHeader } from '@/utils/auth/getUserFromHeader';
import MainSectionWrapper from '@/components/molecules/common/MainSectionWrapper';
import MobileHeader from '@/components/molecules/common/MobileHeader';
import TapMenu from '@/components/molecules/common/TapMenu';
import { Metadata } from 'next';
import { defaultMetaData } from '@/data/defaultMetaData';
import { ModalProviderSetter } from '@/providers/ModalProvider';
import { ModalProviderDefault } from '@/contexts/modal.context';
import { UnreadMessagesProvider } from '@/contexts/unreadMessages.context';
import { NotificationProvider } from '@/contexts/notification.context';
import { getNotifications } from '@/api-services/notification';
import { Notification } from '@/types/Notification.types';
import { LocationProvider } from '@/contexts/locationSearch.context';

export const metadata: Metadata = defaultMetaData;

const ProvidersLayout: React.FC<PropsWithChildren> = async ({ children }) => {
    const userId = getUserFromHeader();

    // console.log('헤더에서 user =====>', userId);

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_BUDDY],
        queryFn: () => getBuddyServer(userId),
    });
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_NOTIFICATION],
        queryFn: () => getNotifications(),
    });
    const dehydratedState = dehydrate(queryClient);

    const notifications = await queryClient.getQueryData<Notification[]>([
        QUERY_KEY_NOTIFICATION,
    ]);

    const filteredNotifications = notifications?.filter(
        notification => notification.notification_receiver === userId,
    );

    return (
        <Suspense fallback={<Loading />}>
            <HydrationBoundary state={dehydratedState}>
                <ModalProviderDefault>
                    <AuthProvider>
                        <NotificationProvider
                            initialNotifications={filteredNotifications}
                        >
                            <UnreadMessagesProvider>
                                <Header />
                                <MainSectionWrapper>
                                    <ModalProviderSetter>
                                        <MobileHeader />
                                        <LocationProvider>
                                            {children}
                                        </LocationProvider>
                                        <TapMenu />
                                    </ModalProviderSetter>
                                </MainSectionWrapper>
                            </UnreadMessagesProvider>
                        </NotificationProvider>
                    </AuthProvider>
                </ModalProviderDefault>
            </HydrationBoundary>
        </Suspense>
    );
};

export default ProvidersLayout;
