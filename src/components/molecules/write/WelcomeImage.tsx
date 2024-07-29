import Image from 'next/image';
import React from 'react';

export default function WelcomeImage() {
    return (
        <Image
            src="/buddy_mascot.webp"
            alt="buddy character"
            width={250}
            height={250}
            className="rounded-full h-[250px] w-[250px] xl:w-[500px] xl:h-[500px]"
        />
    );
}
