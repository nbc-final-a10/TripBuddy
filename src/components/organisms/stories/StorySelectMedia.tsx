'use client';

import Input from '@/components/atoms/common/Input';
import useLockBodyScroll from '@/hooks/common/useLockBodyScroll';
import clsx from 'clsx';
import React, { useRef } from 'react';

type StorySelectMediaProps = {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StorySelectMedia: React.FC<StorySelectMediaProps> = ({
    handleFileChange,
}) => {
    // const { isLocked } = useLockBodyScroll(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        inputRef.current?.click();
    };

    return (
        <section className="relative flex flex-col gap-4 w-full h-[calc(100dvh-57px-56px)] max-h-dvh overflow-hidden aspect-auto">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 z-10"></div>

            <form
                className="z-10 w-full flex justify-center items-center h-full top-0 left-0"
                ref={formRef}
            >
                <Input
                    type="file"
                    accept="image/*"
                    intent={false}
                    ref={inputRef}
                    onChange={handleFileChange}
                />
                <button
                    type="button"
                    className="text-sm text-white bg-main-color px-4 py-2 rounded-lg relative font-bold"
                    onClick={handleButtonClick}
                >
                    업로드
                </button>
            </form>
        </section>
    );
};

export default StorySelectMedia;
