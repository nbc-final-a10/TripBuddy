'use client';

import PendingPage from '@/components/organisms/write/PendingPage';
import React from 'react';

function page() {
    throw new Error('Test Error');

    return (
        <div>
            <div className="fixed flex items-center justify-center h-dvh w-dvw top-0 left-0 z-50" />
            <PendingPage />
        </div>
    );
}

export default page;
