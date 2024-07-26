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
    mode?: 'card' | 'detail' | 'main';
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
                'bg-white box-border',
                mode === 'detail' && 'py-4',
                mode === 'card' &&
                    'cursor-pointer shadow-md max-h-[230px] rounded-lg',
                mode === 'main' && '',
            )}
        >
            <div
                className={clsx(
                    'bg-gray-200 p-4 rounded-lg box-border h-[80%]',
                    mode === 'detail' && 'bg-white rounded-none',
                    mode === 'card' && 'bg-white rounded-b-none',
                    mode === 'main' && '',
                )}
            >
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2 box-border pb-4">
                        <div className="flex flex-row gap-2">
                            {mode === 'main' && (
                                <Chip intent="rounded" selected={false}>
                                    {'국내'}
                                </Chip>
                            )}
                            <h2 className="text-lg font-bold text-gray-600">
                                {'경주'}
                            </h2>
                        </div>

                        <h3 className="text-lg font-bold">{title}</h3>

                        <div className="flex gap-2">
                            <Chip intent="small" selected={false}>
                                {'힐링'}
                            </Chip>
                        </div>
                    </div>

                    <div
                        className={clsx(
                            'flex flex-col gap-1',
                            mode === 'main' && 'hidden',
                        )}
                    >
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
                    mode === 'detail' &&
                        'bg-white text-gray-950 rounded-none justify-center gap-4',
                    mode === 'card' && 'justify-between',
                    mode === 'main' && '',
                )}
            >
                <button
                    className={clsx(
                        'p-2',
                        mode === 'detail' &&
                            'bg-white text-gray-950 rounded-md border border-gray-500 w-[40%]',
                        mode === 'card' &&
                            'rounded-t-none rounded-br-none rounded-bl-lg w-1/2 bg-gray-400',
                        mode === 'main' && '',
                    )}
                >
                    찜하기
                </button>
                <button
                    className={clsx(
                        'w-1/2 p-2',
                        mode === 'detail' &&
                            'bg-gray-100 text-gray-950 rounded-md border border-gray-500 w-[40%]',
                        mode === 'card' &&
                            'bg-gray-500 rounded-t-none rounded-bl-none rounded-br-lg w-1/2',
                        mode === 'main' && '',
                    )}
                >
                    참가하기
                </button>
            </div>
        </div>
    );
};

export default TripCard;
