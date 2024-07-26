import Image from 'next/image';
import React from 'react';

export default function ProfileImage() {
    return (
        <Image
            src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202307/27/267ce76a-0edc-494a-8116-822e4a2c38f6.jpg"
            alt="buddy character"
            width={100}
            height={100}
            className="rounded-full h-[100px] w-[100px] xl:w-[200px] xl:h-[200px] border-4 border-main-color"
        />
    );
}
