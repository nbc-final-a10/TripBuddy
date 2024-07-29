import Image from 'next/image';
import React from 'react';

export default function ProfileImage() {
    return (
        <Image
            src="/buddy_mascot.webp"
            alt="buddy character"
            width={100}
            height={100}
            className="rounded-full h-[100px] w-[100px] xl:w-[200px] xl:h-[200px] border-4 border-main-color"
        />
    );
}
