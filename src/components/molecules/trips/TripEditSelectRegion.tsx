'use client';
import TripEditModalWrapper from '@/components/atoms/trips/TripEditModalWrapper';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import React, { forwardRef } from 'react';
import SelectRegions from '../common/SelectRegion';
import Button from '@/components/atoms/common/Button';
import { useModal } from '@/contexts/modal.context';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import { useSelectRegion } from '@/hooks';
import { SelectRegionPageProps } from '@/types/Location.types';

const TripEditSelectRegion = forwardRef<Partial<SelectRegionPageProps>>(
    (props, ref) => {
        const { states, actions } = useSelectRegion();
        const modal = useModal();
        React.useImperativeHandle(ref, () => ({ states }));

        return (
            <TripEditModalWrapper>
                <div className="xl:w-[70%] w-[90%] h-[10%] mx-auto flex justify-start flex-col mt-2 mb-5 xl:mt-2">
                    <Left2xlBoldText text="여행지를 선택해주세요" />
                    <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
                </div>
                <SelectRegions
                    className="xl:w-[70%] w-[90%] h-[84%] mx-auto"
                    states={states}
                    actions={actions}
                />
                <Button
                    className="xl:w-[70%] w-[90%] h-[6%] mx-auto my-2"
                    onClick={modal.closeModal}
                >
                    완료
                </Button>
            </TripEditModalWrapper>
        );
    },
);

TripEditSelectRegion.displayName = 'TripEditSelectRegion';

export default TripEditSelectRegion;

// const TripEditSelectRegion: React.FC = () => {
//     const modal = useModal();
//     return (
//         <TripEditModalWrapper>
//             <div className="w-[70%] h-[10%] mx-auto flex justify-start flex-col mt-2 mb-5 xl:mt-2">
//                 <Left2xlBoldText text="여행지를 선택해주세요" />
//                 <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
//             </div>
//             <SelectRegions className="w-[70%] h-[84%] mx-auto" />
//             <Button
//                 className="w-[70%] h-[6%] mx-auto my-2"
//                 onClick={modal.closeModal}
//             >
//                 완료
//             </Button>
//         </TripEditModalWrapper>
//     );
// };

// export default TripEditSelectRegion;