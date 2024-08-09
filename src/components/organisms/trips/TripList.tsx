'use client';

import DefaultLoader from '@/components/atoms/common/defaultLoader';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import TripListMobile from './TripListMobile';
import TripListDesktop from './TripListDeskTop';

const TripList: React.FC = () => {
    const [isMobile, setIsMobile] = useState<string | null>(null);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile('mobile');
        } else {
            setIsMobile('desktop');
        }
    }, []);

    if (!isMobile) return <DefaultLoader />;

    if (isMobile === 'mobile') return <TripListMobile />;
    if (isMobile === 'desktop') return <TripListDesktop />;
};

export default TripList;
