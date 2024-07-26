import React from 'react';

export const travelThemes: string[] = [
    '도시',
    '자연',
    '유명맛집',
    '로컬맛집',
    '힐링',
    '액티비티',
    '쇼핑',
    '관광',
];

export const buddiesPreferences: string[] = [
    '계획',
    '즉흥',
    '빨리빨리',
    '느릿느릿',
    '촬영',
    '감상',
    '깔끔쟁이',
    '자연인',
    '가성비',
    '가심비',
];

export const additionalAttributes: string[] = [
    '성별',
    '나이',
    '인원수',
    '만남 장소',
];

interface ChipProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, isSelected, onClick }) => {
    return (
        <span
            onClick={onClick}
            className={`px-2 py-1 rounded-full cursor-pointer ${
                isSelected ? 'bg-gray-500 text-white' : 'bg-gray-300 text-white'
            }`}
        >
            {label}
        </span>
    );
};
