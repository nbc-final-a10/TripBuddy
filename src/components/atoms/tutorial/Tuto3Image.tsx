import React from 'react';
import Image from 'next/image';

const Tuto3Image: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Image
                src="/images/tuto3.webp"
                alt="튜토리얼 3페이지 이미지"
                width={500}
                height={500}
            />
        </div>
    );
};

export default Tuto3Image;
