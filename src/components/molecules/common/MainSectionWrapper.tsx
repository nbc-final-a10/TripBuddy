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
        pathname === '/write/story' ||
        pathname === '/login' ||
        pathname === '/signup' ||
        pathname === '/recover' ||
        pathname === '/onboarding' ||
        pathname === '/tutorial' ||
        pathname === '/trips';

    return (
        <main
            className={twMerge(
                'bg-slate-50 xl:bg-slate-50 min-h-dvh overflow-hidden xl:min-h-[calc(100dvh-100px)]',
                pathname === '/tutorial' && 'bg-white xl:bg-white',
            )}
        >
            <section
                className={twMerge(
                    'relative max-w-[430px] min-w-[320px] mx-auto min-h-dvh pb-[50px] xl:w-[1080px] xl:max-w-[1280px] xl:min-h-full',
                    isHidePaddingBottom && 'pb-0',
                )}
            >
                {children}
            </section>
        </main>
    );
};

export default MainSectionWrapper;
//xl:pt-[100px]
