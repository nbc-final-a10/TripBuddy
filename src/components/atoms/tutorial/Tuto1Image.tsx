import React from 'react';
import Image from 'next/image';

const Tuto1Image: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Image
                src="/images/tuto1.webp"
                alt="튜토리얼 1페이지 이미지"
                width={500}
                height={500}
            />
        </div>
    );
};

export default Tuto1Image;
