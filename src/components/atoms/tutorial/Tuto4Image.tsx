import React from 'react';
import Image from 'next/image';

const Tuto4Image: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Image
                src="/images/tuto4.webp"
                alt="튜토리얼 4페이지 이미지"
                width={500}
                height={500}
            />
        </div>
    );
};

export default Tuto4Image;
