'use client';

import TripChip from '@/components/atoms/trips/TripChip';
import React from 'react';
import Calendar_month from '../../../../public/svg/Calendar_month.svg';
import Distance from '../../../../public/svg/Distance.svg';
import Groups from '../../../../public/svg/Groups.svg';
import Chip from '@/components/atoms/common/O_Chip';
import { VariantProps } from 'class-variance-authority';

type ChipVariantsType = VariantProps<typeof TripCardVariants>;

type TripCardProps = {
    title: string;
    description: string;
    date: string;
    location: string;
    participants: string;
} & ChipVariantsType &
    React.ComponentProps<'div'>;

const TripCard: React.FC<TripCardProps> = ({
    title,
    date,
    location,
    participants,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md max-h-[230px] box-border">
            <div className="bg-gray-200 p-4 rounded-lg rounded-b-none box-border h-[80%]">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2 box-border pb-4">
                        <h3 className="text-lg font-bold">{title}</h3>
                        <div className="flex gap-2">
                            <Chip
                                onClick={() => {}}
                                intent="small"
                                selected={false}
                            >
                                {'힐링'}
                            </Chip>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <Distance />
                            <span>{location}</span>
                        </div>

                        <div className="flex gap-2 items-center">
                            <Calendar_month />
                            <span>{date}</span>
                        </div>

                        <div className="flex gap-2 items-center">
                            <Groups />
                            <span>{participants}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-full text-white rounded-lg h-[20%]">
                <button className="bg-gray-400 w-1/2 p-2 rounded-t-none rounded-br-none rounded-bl-lg">
                    찜하기
                </button>
                <button className="bg-gray-500 w-1/2 p-2 rounded-t-none rounded-bl-none rounded-br-lg">
                    채팅하기
                </button>
            </div>
        </div>
    );
};

export default TripCard;
