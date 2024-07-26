import React from 'react';
import Image from 'next/image';

const Tuto3Image: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Image
                src="/images/송강호.jpg"
                alt="튜토리얼 3페이지 이미지"
                width={300}
                height={300}
            />
        </div>
    );
};

export default Tuto3Image;
