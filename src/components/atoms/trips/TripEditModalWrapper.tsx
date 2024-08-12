'use client';

import React from 'react';

type TripEditModalWrapperProps = {
    children: React.ReactNode;
};

const TripEditModalWrapper: React.FC<TripEditModalWrapperProps> = ({
    children,
}) => {
    return (
        <div className="w-auto h-auto">
            <div className="fixed top-0 left-0 w-dvw h-dvh z-50 bg-white flex flex-col justify-center items-start">
                {children}
            </div>
        </div>
    );
};

export default TripEditModalWrapper;
