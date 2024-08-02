'use client';

import React, { useCallback } from 'react';
import Calendar_month from '../../../../public/svg/Calendar_month.svg';
import Distance from '../../../../public/svg/Distance.svg';
import Groups from '../../../../public/svg/Groups.svg';
import clsx from 'clsx';
import TripTimeSinceUpload from '@/components/atoms/trips/TripTimeSinceUpload';
import { Trip } from '@/types/Trips.types';
import Link from 'next/link';
import remainDays from '@/utils/common/getRemainDays';
import Chip from '@/components/atoms/common/Chip';
import { useAuth } from '@/hooks/auth';
import { createContract } from '@/utils/contract/createContract';

type TripCardProps = {
    trip: Trip;
    mode?: 'card' | 'detail' | 'list';
};

const TripCard: React.FC<TripCardProps> = ({ trip, mode = 'list' }) => {
    const { buddy } = useAuth();

    const handleCreateContract = useCallback(async () => {
        if (!buddy?.buddy_id) {
            console.error('인증되지 않은 사용자입니다.');
            return;
        }

        try {
            const result = await createContract(trip.trip_id, buddy.buddy_id);
            console.log('contract 생성:', result);
        } catch (error) {
            console.error('contract 생성 중 오류 발생:', error);
        }
    }, [buddy, trip.trip_id]);

    return (
        <div
            className={clsx(
                'bg-white box-border h-fit shadow-xl',
                mode === 'detail' && 'p-4',
                mode === 'list' && 'w-[90%] rounded-lg',
                mode === 'card' && 'h-[215px] rounded-lg min-w-[250px]',
            )}
        >
            <div
                className={clsx(
                    'bg-white p-2 rounded-lg box-border h-auto w-full',
                    mode === 'detail' && 'bg-white rounded-none',
                    mode === 'list' && 'bg-gray-200 rounded-b-none',
                    mode === 'card' && 'rounded-b-none',
                )}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
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

                            {mode === 'card' && (
                                <div className="flex flex-row gap-2 text-sm">
                                    <span className="font-bold text-md leading-none">
                                        {`${remainDays(trip.trip_start_date)}`}
                                    </span>
                                    <span className="text-xs leading-none">
                                        {new Date(
                                            trip.trip_created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {mode === 'card' && (
                            <h2 className="text-xl font-bold leading-none pt-1">
                                {trip.trip_final_destination}
                            </h2>
                        )}
                        <h3
                            className={clsx(
                                'text-lg font-bold leading-none',
                                mode === 'list' && 'text-black text-xl',
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

                    {/** 추후 수정 필요 */}
                    {mode === 'card' && (
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row">
                                <p className="text-sm leading-none">
                                    {`신청 ${trip.trip_max_buddies_counts}`}
                                    <span className="text-gray-500">/4</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {mode === 'list' && (
                        <TripTimeSinceUpload time={trip.trip_created_at} />
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
                    mode === 'list' && 'justify-between',
                    mode === 'card' && 'rounded-b-lg',
                )}
            >
                <button
                    className={clsx(
                        'p-2',
                        mode === 'detail' &&
                            'bg-white text-main-color border-main-color rounded-xl border w-[48%]',
                        mode === 'card' && 'hidden',
                        mode === 'list' &&
                            'bg-white text-main-color border-main-color rounded-br-none rounded-bl-lg border w-1/2',
                    )}
                >
                    찜하기
                </button>

                <Link
                    href={
                        mode === 'card' || mode === 'list'
                            ? `/trips/${trip.trip_id}`
                            : `/chat/${trip.trip_id}`
                    }
                    className={clsx(
                        'p-2 text-center',
                        mode === 'detail' &&
                            'bg-main-color text-white rounded-xl border border-main-color w-[48%]',
                        mode === 'list' &&
                            'w-1/2 bg-main-color text-white rounded-br-lg rounded-bl-none leading-none py-2.5',
                        mode === 'card' &&
                            'bg-main-color text-white font-bold rounded-t-none rounded-b-lg w-full',
                    )}
                >
                    <button
                        className="flex justify-center items-center w-full h-full"
                        onClick={handleCreateContract}
                    >
                        {mode === 'card' || mode === 'list'
                            ? '상세보기'
                            : '참여하기'}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TripCard;
