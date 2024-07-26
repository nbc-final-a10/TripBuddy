import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import React from 'react';

const SearchResultPage: React.FC = () => {
    return (
        <div className="p-5">
            <section className="mb-5">
                <h3 className="text-base font-semibold py-4">여정 검색 결과</h3>
                <div className="overflow-x-auto scrollbar-hidden">
                    <ul className="flex gap-3.5 w-max">
                        <li className="bg-gray-300 w-36 h-36 xl:w-[250px] xl:h-[238px]"></li>
                        <li className="bg-gray-300 w-36 h-36 xl:w-[250px] xl:h-[238px]"></li>
                        <li className="bg-gray-300 w-36 h-36 xl:w-[250px] xl:h-[238px]"></li>
                        <li className="bg-gray-300 w-36 h-36 xl:w-[250px] xl:h-[238px]"></li>
                        <li className="bg-gray-300 w-36 h-36 xl:w-[250px] xl:h-[238px]"></li>
                        <li className="bg-gray-300 w-36 h-36 xl:w-[250px] xl:h-[238px]"></li>
                    </ul>
                </div>
            </section>

            <section className="mt-10 xl:mt-24">
                <SearchPageTitle
                    title="이런 여정은 어떠세요?"
                    description="모집 마감이 얼마 남지 않은 여정들이에요!"
                />
                <div className="xl:overflow-x-auto xl:scrollbar-hidden">
                    <ul className="xl:flex xl:flex-row xl:gap-3.5 xl:w-max">
                        <li className="bg-gray-300 w-[288px] h-[262px] rounded-[11px] justify-center items-center mx-auto mb-6 xl:w-72 xl:h-32"></li>
                        <li className="bg-gray-300 w-[288px] h-[262px] rounded-[11px] justify-center items-center mx-auto mb-6 xl:w-72 xl:h-32"></li>
                        <li className="bg-gray-300 w-[288px] h-[262px] rounded-[11px] justify-center items-center mx-auto mb-6 xl:w-72 xl:h-32"></li>
                        <li className="bg-gray-300 w-[288px] h-[262px] rounded-[11px] justify-center items-center mx-auto mb-6 xl:w-72 xl:h-32"></li>
                        <li className="bg-gray-300 w-[288px] h-[262px] rounded-[11px] justify-center items-center mx-auto mb-6 xl:w-72 xl:h-32"></li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default SearchResultPage;
