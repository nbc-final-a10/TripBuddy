'use client';

import TripChip from '@/components/atoms/trips/TripChip';
import React from 'react';
import Calendar_month from '../../../../public/svg/Calendar_month.svg';
import Distance from '../../../../public/svg/Distance.svg';
import Groups from '../../../../public/svg/Groups.svg';
import Chip from '@/components/atoms/common/O_Chip';

type TripCardProps = {
    title: string;
    description: string;
    date: string;
    location: string;
    participants: string;
};

const TripCard: React.FC<TripCardProps> = ({
    title,
    date,
    location,
    participants,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-md">
            <div className="bg-gray-200 p-6 rounded-xl rounded-b-none box-border">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <h3>{title}</h3>
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

                    <div>
                        <div className="flex gap-2">
                            <Distance />
                            <span>{location}</span>
                        </div>

                        <div className="flex gap-2">
                            <Calendar_month />
                            <span>{date}</span>
                        </div>

                        <div className="flex gap-2">
                            <Groups />
                            <span>{participants}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-full text-white rounded-xl">
                <button className="bg-gray-400 w-1/2 p-2 rounded-t-none rounded-br-none rounded-bl-xl">
                    저장하기
                </button>
                <button className="bg-gray-500 w-1/2 p-2 rounded-t-none rounded-bl-none rounded-br-xl">
                    채팅하기
                </button>
            </div>
        </div>
    );
};

export default TripCard;
