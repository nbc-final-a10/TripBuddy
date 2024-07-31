'use client';

import Input from '@/components/atoms/common/O_Input';
import useLockBodyScroll from '@/hooks/common/useLockBodyScroll';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

const StorySelectMedia: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<string>('');
    const isLocked = useLockBodyScroll();

    return (
        <section
            className={clsx(
                'relative flex flex-col gap-4 w-full h-dvh max-h-dvh overflow-hidden aspect-auto bg-gray-600',
                !isLocked && 'hidden',
            )}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 rounded-lg z-10"></div>
            {selectedMedia && (
                <Image
                    src={selectedMedia}
                    alt="my-profile-background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onLoad={() => setIsLoaded(true)}
                    className={clsx(
                        'object-contain',
                        isLoaded ? 'opacity-100' : 'opacity-0',
                    )}
                />
            )}
            <form>
                <Input
                    type="file"
                    accept="image/*"
                    className="z-10"
                    intent={false}
                    // onChange={handleFileChange}
                />
            </form>
        </section>
    );
};

export default StorySelectMedia;
