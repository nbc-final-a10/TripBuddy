import Image from 'next/image';
import React from 'react';

export default function WelcomeImage() {
    return (
        <Image
            src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202307/27/267ce76a-0edc-494a-8116-822e4a2c38f6.jpg"
            alt="buddy character"
            width={250}
            height={250}
            className="rounded-full object-contain xl:w-[500px] xl:h-[500px]"
        />
    );
}
