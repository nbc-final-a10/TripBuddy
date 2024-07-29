import React, { useState } from 'react';
import Chip from '@/components/atoms/common/O_Chip';
import { Gender } from '@/types/Gender.types';
import supabase from '@/utils/supabase/client';

const genderOptions: Gender[] = ['여자만', '남자만', '상관없음'];

const GenderChipGroup: React.FC = () => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const handleGenderClick = async (gender: string) => {
        const isSelected = selectedGender === gender;
        const newSelectedGender = isSelected ? null : gender;

        setSelectedGender(newSelectedGender);

        if (!isSelected) {
            console.log(gender);
        }

        // if (!isSelected) {
        //     const { data, error } = await supabase
        //         .from('trips')
        //         .insert([{ trip_wanted_sex: gender }]);

        //     if (error) {
        //         console.error('데이터 삽입 오류: ', error.message);
        //     } else {
        //         console.log('데이터 삽입됨: ', data);
        //     }
        // } else {
        //     // 버튼이 선택 해제되면 데이터 삭제
        //     const { data, error } = await supabase
        //         .from('trips')
        //         .delete()
        //         .eq('trip_wanted_sex', gender);

        //     if (error) {
        //         console.error('데이터 삭제 오류: ', error.message);
        //     } else {
        //         console.log('데이터 삭제됨: ', data);
        //     }
        // }
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
