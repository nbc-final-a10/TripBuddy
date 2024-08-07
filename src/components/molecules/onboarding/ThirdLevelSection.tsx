'use client';

import { ThirdLevel } from '@/types/Location.types';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type ThirdLevelSectionProps = {
    selectedSecondLevelLocations: ThirdLevel[];
    setThirdLevelLocation: (loc: string) => void;
    secondLevelLocation: string;
    thirdLevelLocation?: string | null;
};

//h-[80%]
const ThirdLevelSection = ({
    selectedSecondLevelLocations,
    setThirdLevelLocation,
    secondLevelLocation,
    thirdLevelLocation = '',
}: ThirdLevelSectionProps) => {
    const pathname = usePathname();

    return (
        <section
            className={twMerge(
                'relative h-[76%] overflow-y-auto xl:h-[70%]',
                pathname === '/search' && 'h-[300px]',
                pathname === '/write' && 'h-[40vh]',
            )}
        >
            {selectedSecondLevelLocations.map(loc => (
                <div
                    key={loc.name}
                    className={twMerge(
                        'flex ml-2 mr-2 border-b cursor-pointer hover:bg-main-color items-center',
                        thirdLevelLocation === loc.name && 'bg-main-color',
                    )}
                    onClick={() => setThirdLevelLocation(loc.name)}
                >
                    <div className="text-sm text-gray-500 xl:text-base flex items-center p-1.5">
                        <div>
                            <p className="font-bold">{loc.name}</p>
                            <p>{secondLevelLocation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ThirdLevelSection;
