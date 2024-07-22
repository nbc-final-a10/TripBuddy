import Image from 'next/image';
import React from 'react';

export default function WelcomeImage() {
    return (
        <Image
            src="https://i.namu.wiki/i/_NPDOv8et8JgpbfpRailhTtJa62PoFLU5-MjYvBLT2OkmN8I-VdHWawlsyguTszlnLDQD0iQhz70QuqpIE_erg.webp"
            alt="buddy character"
            width={300}
            height={300}
            className="rounded-full xl:w-[500px] xl:h-[500px]"
        />
    );
}
