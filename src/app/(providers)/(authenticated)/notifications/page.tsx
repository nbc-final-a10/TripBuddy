import NotificationsList from '@/components/organisms/notifications/NotificationsList';

const NotificationsPage = () => {
    return (
        <div className="xl:bg-transparent bg-white border-t-2 border-gray-200 h-[calc(100vh-131px)]">
            <h1 className="xl:flex hidden text-grayscale-800 text-[24px] font-semibold my-[30px]">
                알림
            </h1>
            <NotificationsList />
        </div>
    );
};

export default NotificationsPage;
