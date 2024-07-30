import React, { useState } from 'react';
import Chip from '@/components/atoms/common/O_Chip';
import { Gender } from '@/types/Gender.types';
import supabase from '@/utils/supabase/client';

const genderOptions: Gender[] = ['여자만', '남자만', '상관없음'];

const GenderChipGroup: React.FC = () => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [clickCount, setClickCount] = useState<number>(0);

    const handleGenderClick = async (gender: string) => {
        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);

        if (newClickCount % 2 !== 0) {
            const { data, error } = await supabase
                .from('Buddies')
                .insert([{ buddy_sex: gender }]);

            if (error) {
                console.error('데이터 삽입 오류: ', error);
            } else {
                console.log('데이터 삽입됨: ', data);
            }
        }

        setSelectedGender(prevSelectedGender =>
            prevSelectedGender === gender ? null : gender,
        );
        // console.log(gender);
    };

    return (
        <div className="flex gap-1.5 mt-3 mb-5">
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
