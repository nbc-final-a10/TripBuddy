import Image from 'next/image';
import React from 'react';

type MascotImageProps = {
    intent: 'main' | 'happy' | 'blue';
};

const MascotImage: React.FC<MascotImageProps> = ({ intent }) => {
    let src = '';
    if (intent === 'main') {
        src = '/images/mascot_main.webp';
    } else if (intent === 'happy') {
        src = '/images/mascot_happy.webp';
    } else if (intent === 'blue') {
        src = '/images/mascot_blue.webp';
    }
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[80%] h-1/2 aspect-auto">
                <Image
                    src={src}
                    alt="mascot"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </div>
    );
};

export default MascotImage;