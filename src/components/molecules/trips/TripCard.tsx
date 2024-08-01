'use client';

import React, { useCallback } from 'react';
import Calendar_month from '../../../../public/svg/Calendar_month.svg';
import Distance from '../../../../public/svg/Distance.svg';
import Groups from '../../../../public/svg/Groups.svg';
import Chip from '@/components/atoms/common/O_Chip';
import clsx from 'clsx';
import TripTimeSinceUpload from '@/components/atoms/trips/TripTimeSinceUpload';
import { Trip } from '@/types/Trips.types';
import Link from 'next/link';
import remainDays from '@/utils/common/getRemainDays';

type TripCardProps = {
    trip: Trip;
    mode?: 'card' | 'detail' | 'main';
};

const TripCard: React.FC<TripCardProps> = ({ trip, mode = 'main' }) => {
    return (
        <div
            className={clsx(
                'bg-white box-border h-fit shadow-lg',
                mode === 'detail' && 'p-4',
                mode === 'main' && 'rounded-lg',
                mode === 'card' && 'w-[90%] h-[215px]',
            )}
        >
            <div
                className={clsx(
                    'bg-white p-2 rounded-lg box-border h-auto',
                    mode === 'detail' && 'bg-white rounded-none',
                    mode === 'main' && 'bg-gray-200 rounded-b-none',
                    mode === 'card' && 'rounded-b-none',
                )}
            >
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 box-border">
                        <div className="flex flex-row gap-2 justify-between">
                            {mode === 'card' && (
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

                            {mode === 'main' && (
                                <div className="flex flex-row gap-2">
                                    <span className="font-bold text-lg leading-none">
                                        {`${remainDays(trip.trip_start_date)}`}
                                    </span>
                                    <span className="text-sm leading-none">
                                        {new Date(
                                            trip.trip_created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {mode === 'card' && (
                            <h2 className="text-xl font-bold leading-none">
                                {trip.trip_final_destination}
                            </h2>
                        )}
                        <h3
                            className={clsx(
                                'text-lg font-bold leading-none pb-2',
                                mode === 'main' && 'text-black text-xl',
                                mode === 'card' && 'text-gray-600',
                            )}
                        >
                            {trip.trip_title}
                        </h3>

                        <div className="flex flex-row justify-between">
                            <div className="flex gap-1">
                                <Chip selected={false} intent="square">
                                    {trip.trip_theme1}
                                </Chip>
                                <Chip selected={false} intent="square_white">
                                    {trip.trip_theme2}
                                </Chip>
                                <Chip selected={false} intent="square_white">
                                    {trip.trip_theme3}
                                </Chip>
                                <Chip selected={false} intent="square_white">
                                    {trip.trip_wanted_sex}
                                </Chip>
                            </div>

                            {mode === 'detail' && (
                                <TripTimeSinceUpload
                                    time={trip.trip_created_at}
                                />
                            )}
                        </div>
                    </div>

                    {/** svg icons + text */}
                    <div
                        className={clsx(
                            'flex flex-col gap-1',
                            mode === 'card' && 'hidden',
                        )}
                    >
                        <div className="flex gap-2 items-center">
                            <Distance />
                            <span>{trip.trip_final_destination}</span>
                        </div>

                        <div className="flex gap-2 items-center">
                            <Calendar_month />
                            <span>
                                {new Date(
                                    trip.trip_start_date,
                                ).toLocaleDateString()}
                            </span>
                        </div>

                        {/** 추후 수정 필요 */}
                        <div className="flex gap-2 items-center">
                            <Groups />
                            <span>{`${trip.trip_max_buddies_counts}/4`}</span>
                        </div>
                    </div>

                    {/** 인원수 카드에서만 보임 여기도 추후 수정 필요 */}
                    {mode === 'card' && (
                        <>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row">
                                    <p className="text-sm leading-none">
                                        {`신청 ${trip.trip_max_buddies_counts}`}
                                        <span className="text-gray-500">
                                            /4
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <TripTimeSinceUpload time={trip.trip_created_at} />
                        </>
                    )}

                    {/** 프로필 이미지 원형 */}
                    {mode === 'detail' && (
                        <div className="relative flex flex-row h-10">
                            <div className="absolute w-10 h-10 bg-gray-100 border-2 border-white rounded-full" />
                            <div className="absolute w-10 h-10 left-[24px] bg-gray-100 border-2 border-white rounded-full" />
                            <div className="absolute w-10 h-10 left-[48px] bg-gray-100 border-2 border-white rounded-full" />
                            <div className="absolute w-10 h-10 left-[72px] bg-gray-100 border-2 border-white rounded-full" />
                        </div>
                    )}
                </div>
            </div>

            <div
                className={clsx(
                    'flex w-full text-white rounded-lg h-[16%]',
                    mode === 'detail' &&
                        'bg-white text-gray-950 rounded-none justify-center gap-2',
                    mode === 'main' && 'justify-between',
                    mode === 'card' && 'rounded-b-lg',
                )}
            >
                <button
                    className={clsx(
                        'p-2',
                        mode === 'detail' &&
                            'bg-white text-main-color border-main-color rounded-xl border w-[48%]',
                        mode === 'main' && 'hidden',
                        mode === 'card' && 'hidden',
                    )}
                >
                    찜하기
                </button>
                <button
                    className={clsx(
                        'p-2 text-center',
                        mode === 'detail' &&
                            'bg-main-color text-white rounded-xl border border-main-color w-[48%]',
                        mode === 'main' &&
                            'bg-main-color text-white font-bold rounded-t-none rounded-b-lg w-full',
                        mode === 'card' &&
                            'w-full bg-main-color text-white rounded-b-lg leading-none py-2.5',
                    )}
                >
                    {mode === 'main' ? (
                        <Link
                            href={`/trips/${trip.trip_id}`}
                            className="relative block w-full h-full"
                        >
                            상세보기
                        </Link>
                    ) : (
                        <Link
                            href={`/chat/${trip.trip_id}`}
                            className="relative block w-full h-full"
                        >
                            참여하기
                        </Link>
                    )}
                </button>
            </div>
        </div>
    );
};

export default TripCard;
