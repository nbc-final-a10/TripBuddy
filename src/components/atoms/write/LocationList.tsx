import Chip from '../common/O_Chip';
import { SecondLevel } from '@/types/Location.types';
import React from 'react';

function LocationList({
    locations,
    selectedLocationName,
    onChipClick,
}: {
    locations: SecondLevel[];
    selectedLocationName: string;
    onChipClick: (name: string) => void;
}) {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = React.useState(false);

    // 가로 스크롤이 생기는지  확인하는 로직
    React.useEffect(() => {
        const checkScrollable = () => {
            if (scrollRef.current) {
                setIsScrollable(
                    scrollRef.current.scrollWidth >
                        scrollRef.current.clientWidth,
                );
            }
        };
        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        return () => window.removeEventListener('resize', checkScrollable);
    }, [locations]);

    return (
        <div className="relative">
            {/* 도/대륙 목록 */}
            <div
                className="flex flex-nowrap gap-2 py-3 whitespace-nowrap mb-5 overflow-x-hidden scrollbar-hide"
                ref={scrollRef}
            >
                {locations.map(subLocation => (
                    <div key={subLocation.name.en} className="flex-none">
                        <Chip
                            selected={
                                selectedLocationName === subLocation.name.ko
                            }
                            onClick={() => onChipClick(subLocation.name.ko)}
                        >
                            {subLocation.name.ko}
                        </Chip>
                    </div>
                ))}
            </div>

            {/* 스크롤 버튼 */}
            {/* {isScrollable && (
                <div className="flex justify-between">
                    <button
                        className="left-2 z-10"
                        onClick={() => {
                            scrollRef.current?.scrollBy({
                                left: -100,
                                behavior: 'smooth',
                            }); // 왼쪽으로 스크롤
                        }}
                    >
                        {'<'}
                    </button>
                    <button
                        className="right-2 z-10"
                        onClick={() => {
                            scrollRef.current?.scrollBy({
                                left: 100,
                                behavior: 'smooth',
                            }); // 오른쪽으로 스크롤
                        }}
                    >
                        {'>'}
                    </button>
                </div>
            )} */}
        </div>
    );
}

export default LocationList;
