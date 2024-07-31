import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type OnBoardingInnerWrapperProps = PropsWithChildren<{
    align?: 'start' | 'end' | 'center';
}>;

const OnBoardingInnerWrapper = ({
    children,
    align = 'center',
}: OnBoardingInnerWrapperProps) => {
    return (
        <div
            className={clsx('flex flex-col gap-4 w-full h-[80%] items-center', {
                'justify-start': align === 'start',
                'justify-end': align === 'end',
                'justify-center': align === 'center',
            })}
        >
            {children}
        </div>
    );
};

export default OnBoardingInnerWrapper;
