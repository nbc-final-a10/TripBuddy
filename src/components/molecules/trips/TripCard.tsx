'use client';

import React from 'react';
import Calendar_month from '../../../../public/svg/Calendar_month.svg';
import Distance from '../../../../public/svg/Distance.svg';
import Groups from '../../../../public/svg/Groups.svg';
import Chip from '@/components/atoms/common/O_Chip';
import clsx from 'clsx';
import TripCustomSlider from '@/components/atoms/trips/TripCustomSlider';

type TripCardProps = {
    title: string;
    description: string;
    date: string;
    location: string;
    participants: number;
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
                'bg-white box-border h-fit',
                mode === 'detail' && 'py-4',
                mode === 'card' && 'shadow-md rounded-lg',
                mode === 'main' && 'shadow-md w-[211px] h-[215px]',
            )}
        >
            <div
                className={clsx(
                    'bg-white p-2 rounded-lg box-border h-auto',
                    mode === 'detail' && 'bg-white rounded-none',
                    mode === 'card' && 'bg-gray-200 rounded-b-none',
                    mode === 'main' && 'rounded-b-none',
                )}
            >
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 box-border">
                        <div className="flex flex-row gap-2 justify-between">
                            {mode === 'main' && (
                                <div className="flex flex-row gap-1">
                                    <Chip selected={false} intent="rounded">
                                        해외
                                    </Chip>
                                    <Chip
                                        selected={false}
                                        intent="rounded_blue"
                                    >
                                        HOT
                                    </Chip>
                                </div>
                            )}

                            <div className="flex flex-row gap-2">
                                <span className="font-bold text-lg leading-none">
                                    {'D-4'}
                                </span>
                                <span className="text-sm leading-none">
                                    {'24.07.20'}
                                </span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold leading-none">
                            {'경주'}
                        </h2>
                        <h3 className="text-lg font-bold text-gray-600 leading-none pb-2">
                            {title}
                        </h3>

                        <div className="flex gap-1">
                            <Chip selected={false} intent="square">
                                {'힐링'}
                            </Chip>
                            <Chip selected={false} intent="square_white">
                                {'쇼핑'}
                            </Chip>
                            <Chip selected={false} intent="square_white">
                                {'즉흥'}
                            </Chip>
                            <Chip selected={false} intent="square_white">
                                {'여자만'}
                            </Chip>
                        </div>
                    </div>

                    {/** svg icons + text */}
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
                            <span>{`${participants}/4`}</span>
                        </div>
                    </div>

                    {/** 인원수 */}
                    <div
                        className={clsx(
                            'flex flex-col gap-1',
                            mode === 'card' && 'hidden',
                            mode === 'detail' && 'hidden',
                        )}
                    >
                        <div className="flex flex-row">
                            <p className="text-sm leading-none">
                                {`신청 ${participants}`}
                                <span className="text-gray-500">/4</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={clsx(
                    'flex w-full text-white rounded-lg h-[16%]',
                    mode === 'detail' &&
                        'bg-white text-gray-950 rounded-none justify-center gap-4',
                    mode === 'card' && 'justify-between',
                    mode === 'main' && 'rounded-b-lg',
                )}
            >
                <button
                    className={clsx(
                        'p-2',
                        mode === 'detail' &&
                            'bg-white text-gray-950 rounded-md border border-gray-500 w-[40%]',
                        mode === 'card' &&
                            'bg-gray-400 text-white rounded-t-none rounded-br-none rounded-bl-lg w-1/2 ',
                        mode === 'main' && 'hidden',
                    )}
                >
                    찜하기
                </button>
                <button
                    className={clsx(
                        'p-2',
                        mode === 'detail' &&
                            'bg-gray-100 text-gray-950 rounded-md border border-gray-500 w-[40%]',
                        mode === 'card' &&
                            'bg-gray-500 text-white rounded-t-none rounded-bl-none rounded-br-lg w-1/2',
                        mode === 'main' &&
                            'w-full bg-main-color text-white rounded-b-lg leading-none py-2.5',
                    )}
                >
                    참여하기
                </button>
            </div>
        </div>
    );
};

export default TripCard;
