import Image from 'next/image';
import React from 'react';

const AddButtonSmall: React.FC = () => {
    return (
        <div className="absolute bottom-0 right-0 w-[16px] h-[16px] bg-white rounded-full flex justify-center items-center">
            <Image
                src="/svg/add.svg"
                alt="add"
                width={10}
                height={10}
                className="object-contain"
            />
        </div>
    );
};

export default AddButtonSmall;
