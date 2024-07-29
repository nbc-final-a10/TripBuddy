import React from 'react';
import Image from 'next/image';

const Tuto5Image: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Image
                src="/images/tuto5.webp"
                alt="튜토리얼 5페이지 이미지"
                width={900}
                height={900}
            />
        </div>
    );
};

export default Tuto5Image;
