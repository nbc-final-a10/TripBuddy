import DefaultLoader from '@/components/atoms/common/defaultLoader';
import PendingPage from '@/components/organisms/write/PendingPage';
import React from 'react';

function page() {
    return (
        <div>
            <div className="fixed flex items-center justify-center h-dvh w-dvw top-0 left-0 z-50" />
            <PendingPage />
        </div>
    );
}

export default page;
