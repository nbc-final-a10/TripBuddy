'use client';

import MobileHeader from '@/components/molecules/common/MobileHeader';
import React from 'react';

type TripEditModalWrapperProps = {
    children: React.ReactNode;
};

const TripEditModalWrapper: React.FC<TripEditModalWrapperProps> = ({
    children,
}) => {
    return (
        <div className="fixed top-0 left-0 w-dvw h-dvh z-[9999]">
            <MobileHeader />
            <div className="relative top-0 left-0 w-dvw h-[calc(100dvh-57px-76px)] xl:h-dvh z-50 bg-white flex flex-col justify-center items-start">
                {children}
            </div>
        </div>
    );
};

export default TripEditModalWrapper;
