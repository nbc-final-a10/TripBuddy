'use client';

import React from 'react';

type DateSearchMainPageProps = {
    onClick: () => void;
};

const DateSearchButton: React.FC<DateSearchMainPageProps> = ({ onClick }) => {
    // 현재 날짜, 다음날 가져오기
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => {
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[today.getDay()];
        return `${today.getFullYear().toString().slice(-2)}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}(${dayOfWeek})`;
    };

    const formattedToday = formatDate(today);
    const formattedTomorrow = formatDate(tomorrow);

    return (
        <button
            className="w-full bg-gray-100 p-2 rounded-xl text-left"
            onClick={onClick}
        >
            {formattedToday} ~ {formattedTomorrow}
        </button>
    );
};

export default DateSearchButton;
