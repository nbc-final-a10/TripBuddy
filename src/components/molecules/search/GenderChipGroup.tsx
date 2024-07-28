import React, { useState } from 'react';
import SearchPageChipsTitle from './SearchMainPageChipsTitle';
import Chip from '@/components/atoms/common/O_Chip';
import { Gender } from '@/types/Gender.types';

const genderOptions: Gender[] = ['여자만', '남자만', '상관없음'];

const GenderChipGroup: React.FC = () => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const handleGenderClick = (gender: string) => {
        setSelectedGender(prevSelectedGender =>
            prevSelectedGender === gender ? null : gender,
        );
    };

    return (
        <div className="flex gap-1.5 mt-3 mb-5">
            {genderOptions.map(gender => (
                <Chip
                    key={gender}
                    intent={gender}
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
