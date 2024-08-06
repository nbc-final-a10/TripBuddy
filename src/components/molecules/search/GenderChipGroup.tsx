import React from 'react';
import { Gender } from '@/types/Gender.types';
import Chip from '@/components/atoms/common/Chip';

const genderOptions: Gender[] = ['여성', '남성', '성별무관'];

type GenderChipGroupProps = {
    selectedGender: string | null;
    setSelectedGender: (gender: string | null) => void;
};

const GenderChipGroup: React.FC<GenderChipGroupProps> = ({
    selectedGender,
    setSelectedGender,
}) => {
    const handleGenderClick = async (gender: string) => {
        const isSelected = selectedGender === gender;
        const newSelectedGender = isSelected ? null : gender;

        setSelectedGender(newSelectedGender);
    };

    return (
        <div className="grid grid-cols-3 gap-2 xl:w-3/4">
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
