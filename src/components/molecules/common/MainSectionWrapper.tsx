'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type MainSectionWrapperProps = {
    children: React.ReactNode;
};

const MainSectionWrapper = ({ children }: MainSectionWrapperProps) => {
    const pathname = usePathname();

    const isHidePaddingBottom =
        pathname.startsWith('/chat/') ||
        pathname.startsWith('/stories/') ||
        pathname === '/writestory' ||
        pathname === '/login' ||
        pathname === '/signup' ||
        pathname === '/recover';

    return (
        <section
            className={twMerge(
                'relative max-w-[430px] min-w-[360px] mx-auto min-h-dvh pb-[50px] xl:w-[1080px] xl:max-w-[1280px]',
                isHidePaddingBottom && 'pb-0',
            )}
        >
            {children}
        </section>
    );
};

export default MainSectionWrapper;
//xl:pt-[100px]
