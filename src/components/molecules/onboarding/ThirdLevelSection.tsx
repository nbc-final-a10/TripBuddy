'use client';

import { ThirdLevel } from '@/types/Location.types';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type ThirdLevelSectionProps = {
    selectedSecondLevelLocations: ThirdLevel[];
    setThirdLevelLocation: (loc: string) => void;
    secondLevelLocation: string;
};

//h-[80%]
const ThirdLevelSection = ({
    selectedSecondLevelLocations,
    setThirdLevelLocation,
    secondLevelLocation,
}: ThirdLevelSectionProps) => {
    const pathname = usePathname();

    return (
        <section
            className={twMerge(
                'relative h-[80%] overflow-y-auto xl:h-[70%] my-3',
                pathname === '/search' && 'h-[300px]',
                pathname === '/write' && 'h-[40vh]',
            )}
        >
            {selectedSecondLevelLocations.map(loc => (
                <div
                    key={loc.name}
                    className="flex mt-2 ml-2 mr-2 border-b pb-3 cursor-pointer hover:bg-main-color"
                    onClick={() => setThirdLevelLocation(loc.name)}
                >
                    <div className="text-sm text-gray-500 xl:text-base">
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
