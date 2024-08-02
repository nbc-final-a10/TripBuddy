import React, { useState } from 'react';
import { Gender } from '@/types/Gender.types';
import { useSearchStore } from '@/zustand/search.store';
import Chip from '@/components/atoms/common/Chip';

const genderOptions: Gender[] = ['여자만', '남자만', '상관없음'];

const GenderChipGroup: React.FC = () => {
    const { selectedGender, setSelectedGender } = useSearchStore(state => ({
        selectedGender: state.selectedGender,
        setSelectedGender: state.setSelectedGender,
    }));

    const handleGenderClick = async (gender: string) => {
        const isSelected = selectedGender === gender;
        const newSelectedGender = isSelected ? null : gender;

        setSelectedGender(newSelectedGender);

        // if (newSelectedGender) {
        //     console.log(`현재 선택된 버튼: ${newSelectedGender}`);
        // } else {
        //     console.log('선택이 취소되었습니다.');
        // }
    };

    return (
        <div className="flex gap-1.5">
            {genderOptions.map(gender => (
                <Chip
                    key={gender}
                    intent="natural"
                    selected={selectedGender === gender}
                    onClick={() => handleGenderClick(gender)}
                    // className="w-1/3"
                >
                    {gender}
                </Chip>
            ))}
        </div>
    );
};

export default GenderChipGroup;
