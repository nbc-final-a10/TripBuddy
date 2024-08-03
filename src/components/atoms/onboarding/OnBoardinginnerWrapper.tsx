import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type OnBoardingInnerWrapperProps = PropsWithChildren<{
    align?: 'start' | 'end' | 'center';
    className?: string;
}>;

const OnBoardingInnerWrapper = ({
    children,
    className,
    align = 'center',
}: OnBoardingInnerWrapperProps) => {
    return (
        <div
            className={twMerge(
                clsx(
                    'flex flex-col gap-4 w-full h-full items-center xl:h-[90%]',
                    {
                        'justify-start': align === 'start',
                        'justify-end': align === 'end',
                        'justify-center': align === 'center',
                    },
                ),
                className,
            )}
        >
            {children}
        </div>
    );
};

export default OnBoardingInnerWrapper;
