'use client';

import React, { useEffect, useState } from 'react';
import DraggableInput from './DraggableInput';
import Image from 'next/image';
import useLockBodyScroll from '@/hooks/common/useLockBodyScroll';
import clsx from 'clsx';

const StoryWrite: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const isLocked = useLockBodyScroll();

    return (
        <section
            className={clsx(
                'flex flex-col gap-4 w-full h-dvh max-h-dvh overflow-hidden aspect-auto bg-gray-600',
                !isLocked && 'hidden',
            )}
        >
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent to-black/80 rounded-lg z-10"></div>
            <Image
                src="/images/test2.webp"
                alt="my-profile-background"
                fill
                sizes="100vw"
                onLoad={() => setIsLoaded(true)}
                className={clsx(
                    'object-contain',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                )}
            />
            <DraggableInput />
        </section>
    );
};

export default StoryWrite;
