import useLockBodyScroll from '@/hooks/common/useLockBodyScroll';
import useTapScroll from '@/hooks/useTapScroll';
import { StoryFilter } from '@/types/Story.types';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface StoryFilterImageProps {
    handleStep: (step: number) => void;
    selectedMedia: string;
    filterImage: StoryFilter[];
    selectedFilter: StoryFilter;
    handleFilter: (filter: StoryFilter) => void;
}

const StoryFilterImage: React.FC<StoryFilterImageProps> = ({
    handleStep,
    selectedMedia,
    filterImage,
    selectedFilter,
    handleFilter,
}) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { isLocked, setLock } = useLockBodyScroll();
    const filterRef = useRef<HTMLDivElement>(null);

    useTapScroll({ refs: [filterRef] });

    useEffect(() => {
        setLock(true);
    }, [setLock]);

    return (
        <section
            className={clsx(
                'relative flex flex-col gap-4 w-full h-[calc(100dvh-57px)] max-h-dvh overflow-hidden aspect-auto bg-gray-600',
                !isLocked && 'hidden',
            )}
        >
            <div className="absolute flex justify-end w-full top-0 right-0 z-10 gap-2">
                <button
                    className=" bg-main-color text-white px-2 pt-0.5 pb-1.5 rounded-md leading-none"
                    onClick={() => handleStep(0)}
                >
                    이전
                </button>
                <button
                    className=" bg-main-color text-white px-2 pt-0.5 pb-1.5 rounded-md top-0 leading-none"
                    onClick={() => handleStep(2)}
                >
                    다음
                </button>
            </div>

            <div
                className={clsx(
                    'relative w-full h-[80%] aspect-auto',
                    selectedFilter,
                )}
            >
                <Image
                    src={selectedMedia}
                    alt="my-story-background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    onLoad={() => setIsLoaded(true)}
                    className={clsx(
                        'object-contain',
                        isLoaded ? 'opacity-100' : 'opacity-0',
                    )}
                />
            </div>

            <div
                className="relative flex flex-row bottom-0 overflow-x-scroll scrollbar-hidden gap-2 px-3"
                ref={filterRef}
            >
                {filterImage.map(filter => (
                    <button
                        key={filter.name}
                        className={`relative min-w-[90px] h-[120px] aspect-auto ${filter.className}`}
                        onClick={() => handleFilter(filter)}
                    >
                        <Image
                            src={selectedMedia}
                            alt={filter.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="relative object-contain w-full h-full"
                        />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default StoryFilterImage;
