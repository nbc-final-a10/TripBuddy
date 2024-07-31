'use client';

import React, { useEffect, useState } from 'react';
import DraggableInput from './DraggableInput';
import Image from 'next/image';
import useLockBodyScroll from '@/hooks/common/useLockBodyScroll';
import clsx from 'clsx';

type StoryWriteTextProps = {
    imageFile: File;
    selectedMedia: string;
};

const StoryWriteText: React.FC<StoryWriteTextProps> = ({
    imageFile,
    selectedMedia,
}) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [texts, setTexts] = useState<
        { text: string; position: { x: number; y: number } }[]
    >([]);
    const isLocked = useLockBodyScroll();

    const handleSaveButtonClick = () => {
        console.log('save');

        if (!imageFile) return;
        if (!texts.length) return;

        const payload = {
            imageFile,
            texts,
        };
    };

    // 이미지 스토리지에 쓰기
    // 데이터 테이블에 쓰기
    // 스토리 생성 완료 후 리다이렉트

    return (
        <section
            className={clsx(
                'relative flex flex-col gap-4 w-full h-dvh max-h-dvh overflow-hidden aspect-auto bg-gray-600',
                !isLocked && 'hidden',
            )}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 rounded-lg z-10"></div>
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
            <DraggableInput texts={texts} setTexts={setTexts} />
            <button
                className="absolute bg-main-color text-white px-2 pt-0.5 pb-1.5 rounded-md top-0 right-0 z-10 leading-none"
                onClick={handleSaveButtonClick}
            >
                save
            </button>
        </section>
    );
};

export default StoryWriteText;
