'use client';

import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import Calendar from '@/components/atoms/Calendar';

const DateSearchPage = () => {
    return (
        <main className="p-4">
            <SearchPageTitle
                title="언제 떠나시나요?"
                description="버디즈와 함께 여행하고 싶은 날짜를 선택해주세요."
            />

            <Calendar />

            <button className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden">
                선택하기
            </button>
        </main>
    );
};

export default DateSearchPage;
