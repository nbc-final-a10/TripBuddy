'use client';

import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import useSelectRegion from '@/hooks/useSelectRegion';

export default function LocationSearchPage() {
    const { SelectRegion, thirdLevelLocation, setThirdLevelLocation } =
        useSelectRegion();

    return (
        <div className="p-5">
            <SearchPageTitle
                title="어디로 떠나시나요?"
                description="지역, 국가, 도시를 1개 선택해주세요."
            />
            <SelectRegion />
        </div>
    );
}
