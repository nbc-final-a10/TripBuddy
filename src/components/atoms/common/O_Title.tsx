import clsx from 'clsx';
import React from 'react';

type O_TitleProps = {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
};

const Title: React.FC<O_TitleProps> = ({
    children,
    className,
    align = 'center',
}) => {
    return (
        <div
            className={clsx('flex flex-col w-full items-center', {
                'justify-start': align === 'left',
                'justify-end': align === 'right',
                'justify-center': align === 'center',
            })}
        >
            <h2 className={clsx('text-black font-bold', className)}>
                {children}
            </h2>
        </div>
    );
};

export default Title;
