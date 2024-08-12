'use client';

import React, { useEffect, useMemo } from 'react';
import Calendar_month from '../../../../public/svg/Calendar_month.svg';
import Distance from '../../../../public/svg/Distance.svg';
import Groups from '../../../../public/svg/Groups.svg';
import clsx from 'clsx';
import TripTimeSinceUpload from '@/components/atoms/trips/TripTimeSinceUpload';
import {
    BookMarkRequest,
    PartialBookMark,
    TripWithContract,
} from '@/types/Trips.types';
import Link from 'next/link';
import remainDays from '@/utils/common/getRemainDays';
import Chip from '@/components/atoms/common/Chip';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { Contract, PartialContract } from '@/types/Contract.types';
import { twMerge } from 'tailwind-merge';
import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import { useRouter } from 'next/navigation';
import {
    useBookMarkMutation,
    useBookMarkQuery,
    useBuddyQueries,
    useContractMutation,
} from '@/hooks/queries';
import { useAuth } from '@/hooks';

type TripCardProps = {
    trip: TripWithContract;
    mode?: 'card' | 'detail' | 'list';
    queries?: ReturnType<typeof useBuddyQueries>;
    isEdit?: boolean;
};

const TripCard: React.FC<TripCardProps> = ({
    trip,
    mode = 'list',
    queries,
    isEdit = false,
}) => {
    const { buddy } = useAuth();
    const router = useRouter();

    // const {
    //     data: contract,
    //     isPending: isContractPending,
    //     error: contractError,
    // } = useContractQuery({
    //     isBuddy: false,
    //     id: trip.trip_id,
    // });

    const {
        data: bookMark,
        isPending: isBookMarkPending,
        error: bookMarkError,
    } = useBookMarkQuery(mode, {
        bookmark_trip_id: trip.trip_id,
        bookmark_buddy_id: buddy?.buddy_id || '',
    });

    const {
        mutate: createContract,
        isPending: isContractMutationPending,
        error: contractMutationError,
        isSuccess: isContractMutationSuccess,
    } = useContractMutation();

    const {
        mutate: createBookMark,
        isPending: isBookMarkMutationPending,
        error: bookMarkMutationError,
    } = useBookMarkMutation();

    const handleCreateContract = async (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        const mode = e.currentTarget.dataset.mode;
        if (!buddy) {
            return showAlert('caution', '먼저 로그인 해주세요.', {
                onConfirm: () => {
                    router.push('/login');
                },
            });
        }

        if (mode === '참여하기') {
            const newContract: PartialContract = {
                contract_trip_id: trip.trip_id,
                contract_buddy_id: buddy.buddy_id,
            };

            createContract(newContract);
        }

        if (mode === '수정하기') {
            return router.push(`/edit/trips/${trip.trip_id}/`);
        }

        if (mode === '수정완료') {
            return showAlert('success', '수정이 완료되었습니다.');
        }
    };

    const handleCreateBookMark = async (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        const mode = e.currentTarget.dataset.mode;
        if (!buddy) {
            return showAlert('caution', '먼저 로그인 해주세요.', {
                onConfirm: () => {
                    router.push('/login');
                },
            });
        }
        if (mode === '찜하기' || mode === '찜하기취소') {
            const newBookMark: BookMarkRequest = {
                bookmark_trip_id: trip.trip_id,
                bookmark_buddy_id: buddy.buddy_id,
                is_bookmarked: bookMark ? false : true,
            };

            createBookMark(newBookMark);
            return showAlert('success', '찜하기가 완료되었습니다.');
        }
        if (mode === '삭제하기') {
            return showAlert('success', '삭제가 완료되었습니다.');
        }
    };

    const bookmarkButtonText = useMemo(() => {
        if (trip.trip_master_id === buddy?.buddy_id) {
            return '삭제하기';
        }
        return bookMark ? '찜하기취소' : '찜하기';
    }, [bookMark, trip, buddy]);

    const participantButtonText = useMemo(() => {
        if (trip.trip_master_id === buddy?.buddy_id) {
            if (!isEdit) {
                return '수정하기';
            } else {
                return '수정완료';
            }
        }
        return '참여하기';
    }, [trip, buddy, isEdit]);

    useEffect(() => {
        if (
            contractMutationError ||
            // contractError ||
            bookMarkError ||
            bookMarkMutationError
        ) {
            const message =
                contractMutationError?.message ||
                // contractError?.message ||
                bookMarkError?.message ||
                bookMarkMutationError?.message;
            showAlert('error', message || '오류가 발생했습니다.');
        }
    }, [
        contractMutationError,
        // contractError,
        bookMarkError,
        bookMarkMutationError,
    ]);

    useEffect(() => {
        if (isContractMutationSuccess) {
            showAlert(
                'success',
                '버디장에게 참여 요청이 전달되었습니다. 베타 기간에는 자동으로 참여됩니다.',
            );
        }
    }, [isContractMutationSuccess]);

    return (
        <>
            {/* {isBookMarkPending && <DefaultLoader />} */}
            {isContractMutationPending && <DefaultLoader />}
            {isBookMarkMutationPending && <DefaultLoader />}
            {/* {isContractPending && <DefaultLoader />} */}
            <div
                className={clsx(
                    'bg-white box-border h-fit shadow-xl',
                    mode === 'detail' && 'p-4',
                    mode === 'list' && 'w-[90%] rounded-lg xl:w-full',
                    mode === 'card' &&
                        'h-[215px] rounded-lg min-w-[250px] xl:min-w-[254px]',
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
                                                trip.trip_start_date,
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
                                    'text-lg font-bold leading-none text-ellipsis overflow-hidden whitespace-nowrap',
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
                                    <Chip
                                        selected={false}
                                        intent="square_white"
                                    >
                                        {trip.trip_theme2}
                                    </Chip>
                                    <Chip
                                        selected={false}
                                        intent="square_white"
                                    >
                                        {trip.trip_theme3}
                                    </Chip>
                                    <Chip
                                        selected={false}
                                        intent="square_white"
                                    >
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
                                    ).toLocaleDateString('ko-KR', {
                                        month: 'numeric', // 월 숫자로 표시
                                        day: 'numeric', // 일 숫자로 표시
                                        weekday: 'short', // 요일을 짧은 형식으로 표시 (e.g., 'Mon', 'Tue')
                                    })}
                                </span>
                            </div>

                            {/** 추후 수정 필요 */}
                            <div className="flex gap-2 items-center">
                                <Groups />
                                <span>{`${(trip.contract as Contract[]).length}/${trip.trip_max_buddies_counts}`}</span>
                            </div>
                        </div>

                        {/** 추후 수정 필요 */}
                        {mode === 'card' && (
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row">
                                    <p className="text-sm leading-none">
                                        {`신청`}
                                        <span className="text-gray-5000">{`${(trip.contract as Contract[]).length}`}</span>
                                        <span className="text-gray-500">{`/${trip.trip_max_buddies_counts}`}</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {mode === 'list' && (
                            <TripTimeSinceUpload time={trip.trip_created_at} />
                        )}

                        {/** 프로필 이미지 원형 */}
                        {mode === 'detail' && queries && (
                            <div className="relative flex flex-row h-10">
                                {queries.map((query, index) => (
                                    <div
                                        key={index}
                                        className={twMerge(
                                            'absolute w-10 h-10 bg-gray-100 border-2 border-white rounded-full bg-cover bg-center',
                                            index === 1 && 'left-[24px]',
                                            index === 2 && 'left-[48px]',
                                            index === 3 && 'left-[72px]',
                                        )}
                                        style={{
                                            backgroundImage: `url(${query.data?.buddy_profile_pic})`,
                                        }}
                                    />
                                ))}
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
                        onClick={handleCreateBookMark}
                        disabled={isBookMarkMutationPending}
                        data-mode={bookmarkButtonText}
                    >
                        {bookmarkButtonText}
                    </button>

                    <Link
                        href={
                            mode === 'card' || mode === 'list'
                                ? `/trips/${trip.trip_id}`
                                : `/chat/${trip.trip_id}`
                        }
                        className={clsx(
                            'p-2 text-center',
                            mode === 'detail' && 'hidden',
                            mode === 'list' &&
                                'w-1/2 bg-main-color text-white rounded-br-lg rounded-bl-none leading-none py-2.5',
                            mode === 'card' &&
                                'bg-main-color text-white font-bold rounded-t-none rounded-b-lg w-full',
                        )}
                    >
                        <button className="flex justify-center items-center w-full h-full">
                            상세보기
                        </button>
                    </Link>

                    {mode === 'detail' && (
                        <button
                            className="flex justify-center items-center h-full bg-main-color text-white rounded-xl border border-main-color w-[48%] py-2.5"
                            onClick={handleCreateContract}
                            disabled={isContractMutationPending}
                            data-mode={participantButtonText}
                        >
                            {participantButtonText}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TripCard;
