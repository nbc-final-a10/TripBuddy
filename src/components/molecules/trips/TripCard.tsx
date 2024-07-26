'use client';

import React from 'react';
import Calendar_month from '../../../../public/svg/Calendar_month.svg';
import Distance from '../../../../public/svg/Distance.svg';
import Groups from '../../../../public/svg/Groups.svg';
import Chip from '@/components/atoms/common/O_Chip';
import clsx from 'clsx';

type TripCardProps = {
    title: string;
    description: string;
    date: string;
    location: string;
    participants: string;
    mode?: 'card' | 'detail';
};

const TripCard: React.FC<TripCardProps> = ({
    title,
    date,
    location,
    participants,
    mode = 'card',
}) => {
    return (
        <div
            className={clsx(
                'bg-white rounded-lg max-h-[230px] box-border',
                mode === 'detail' ? '' : 'cursor-pointer shadow-md',
            )}
        >
            <div
                className={clsx(
                    'bg-gray-200 p-4 rounded-lg rounded-b-none box-border h-[80%]',
                    mode === 'detail' ? 'bg-white rounded-none' : '',
                )}
            >
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

            <div
                className={clsx(
                    'flex w-full text-white rounded-lg h-[20%]',
                    mode === 'detail'
                        ? 'bg-white text-gray-950 rounded-none justify-center gap-4'
                        : 'justify-between',
                )}
            >
                <button
                    className={clsx(
                        'bg-gray-400 p-2',
                        mode === 'detail'
                            ? 'bg-white text-gray-950 rounded-md border border-gray-500 w-[40%]'
                            : 'rounded-t-none rounded-br-none rounded-bl-lg w-1/2',
                    )}
                >
                    찜하기
                </button>
                <button
                    className={clsx(
                        'bg-gray-500 w-1/2 p-2',
                        mode === 'detail'
                            ? 'bg-white text-gray-950 rounded-md border border-gray-500 w-[40%]'
                            : 'rounded-t-none rounded-bl-none rounded-br-lg w-1/2',
                    )}
                >
                    채팅하기
                </button>
            </div>
        </div>
    );
};

export default TripCard;
