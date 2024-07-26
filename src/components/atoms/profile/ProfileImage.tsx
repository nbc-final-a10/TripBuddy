import Image from 'next/image';
import React from 'react';

export default function ProfileImage() {
    return (
        <Image
            src="https://i.namu.wiki/i/_NPDOv8et8JgpbfpRailhTtJa62PoFLU5-MjYvBLT2OkmN8I-VdHWawlsyguTszlnLDQD0iQhz70QuqpIE_erg.webp"
            alt="buddy character"
            width={100}
            height={100}
            className="rounded-full xl:w-[200px] xl:h-[200px] border-4 border-main-color"
        />
    );
}
