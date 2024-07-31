import clsx from 'clsx';
import React from 'react';

type MainSectionWrapperProps = {
    children: React.ReactNode;
    pathname: string;
};

const MainSectionWrapper = ({
    children,
    pathname,
}: MainSectionWrapperProps) => {
    const isHidePaddingBottom =
        pathname.startsWith('/chat/') ||
        pathname === '/writestory' ||
        pathname === '/login' ||
        pathname === '/signup' ||
        pathname === '/recover';

    return (
        <section
            className={clsx(
                'relative max-w-[430px] min-w-[360px] mx-auto min-h-dvh bg-white pb-[50px] xl:pt-[100px] xl:w-[1080px] ',
                isHidePaddingBottom && 'pb-0',
            )}
        >
            {children}
        </section>
    );
};

export default MainSectionWrapper;
