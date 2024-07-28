import Image from 'next/image';
import React from 'react';

const Tuto2Image: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Image
                src="/images/박은빈.jpeg"
                alt="튜토리얼 2페이지 이미지"
                width={500}
                height={500}
            />
        </div>
    );
};

export default Tuto2Image;
