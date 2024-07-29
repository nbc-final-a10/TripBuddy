import Image from 'next/image';
import React from 'react';

type MascotImageProps = {
    intent: 'main' | 'happy' | 'blue';
};

const MascotImage: React.FC<MascotImageProps> = ({ intent }) => {
    let src = '';
    if (intent === 'main') {
        src = '/images/mascot_main.png';
    } else if (intent === 'happy') {
        src = '/images/mascot_happy.png';
    } else if (intent === 'blue') {
        src = '/images/mascot_blue.png';
    }
    return (
        <div className="relative w-full flex items-center justify-center">
            <div className="relative w-1/2 aspect-auto">
                <Image src={src} alt="mascot" fill className="object-contain" />
            </div>
        </div>
    );
};

export default MascotImage;
