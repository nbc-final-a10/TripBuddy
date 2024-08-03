'use client';

import { ThirdLevel } from '@/types/Location.types';

type ThirdLevelSectionProps = {
    selectedSecondLevelLocations: ThirdLevel[];
    setThirdLevelLocation: (loc: string) => void;
    secondLevelLocation: string;
};

const ThirdLevelSection = ({
    selectedSecondLevelLocations,
    setThirdLevelLocation,
    secondLevelLocation,
}: ThirdLevelSectionProps) => {
    return (
        <section className="relative h-[80%] overflow-y-auto xl:h-[70%]">
            <div className="my-3">
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
            </div>
        </section>
    );
};

export default ThirdLevelSection;
