'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import TripCard from '@/components/molecules/trips/TripCard';
import Image from 'next/image';
import React, { useEffect } from 'react';
import HomePageRecommnedBuddiesList from '../homepage/HomePageRecommendBuddiesList';
import {
    useBuddyQueries,
    useRecommendBuddiesQuery,
    useSpecificBuddyQuery,
    useTripQuery,
} from '@/hooks/queries';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useRouter } from 'next/navigation';
import SelectImage from '../../../../public/svg/SelectImage.svg';

type TripDetailProps = {
    id: string;
    mode: 'edit' | 'detail';
};

const TripDetail: React.FC<TripDetailProps> = ({ id, mode }) => {
    const { data: trip, isPending, error: tripError } = useTripQuery(id);
    const router = useRouter();
    const {
        data: buddy,
        isPending: buddyPending,
        error: buddyError,
    } = useSpecificBuddyQuery(trip?.trip_master_id || '');

    const {
        data: recommendBuddies,
        isPending: recommendBuddiesPending,
        error: recommendBuddiesError,
    } = useRecommendBuddiesQuery();

    const queries = useBuddyQueries(
        trip?.contract.map(contract => contract.contract_buddy_id) || [],
    );

    useEffect(() => {
        if (tripError || buddyError || recommendBuddiesError) {
            showAlert(
                'error',
                tripError?.message ||
                    buddyError?.message ||
                    recommendBuddiesError?.message ||
                    '에러가 발생했습니다.',
                {
                    onConfirm: () => {
                        router.refresh();
                    },
                },
            );
        }
    }, [tripError, buddyError, recommendBuddiesError, router]);

    if (isPending) return <DefaultLoader />;
    if (buddyPending) return <DefaultLoader />;
    if (recommendBuddiesPending) return <DefaultLoader />;
    if (!trip || !buddy || !recommendBuddies) return null;

    // 마스터 아이디로 유저 찾아오는 로직 추가할 것
    return (
        <div className="flex flex-col gap-2 bg-gray-100">
            {/** 이미지 + 여행정보 묶음 영역 */}
            <div className="relative h-full flex flex-col">
                {/** 이미지 영역 */}
                <div className="h-[217px] bg-gray-40 relative aspect-auto">
                    {mode === 'edit' && (
                        <div className="absolute h-full w-full top-0 right-0 bg-black/55 z-10 flex justify-center items-center">
                            <button className="bg-grayscale-color-500/70 rounded p-1">
                                <SelectImage />
                            </button>
                        </div>
                    )}
                    <Image
                        src={trip.trip_thumbnail}
                        alt="trip image"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 33vw"
                        className="object-cover"
                    />
                </div>
                {/** 여행 정보 영역 */}
                {queries.length > 0 && (
                    <TripCard
                        trip={trip}
                        mode="detail"
                        queries={queries}
                        isEdit={mode === 'edit'}
                    />
                )}
            </div>

            {/** 글쓴이 정보 영역 */}
            <div className="flex items-center bg-white gap-2 h-[217px]">
                <BuddyProfile clickedBuddy={buddy} loading={false} />
            </div>

            {/** 글 내용 */}
            <div className="flex flex-col bg-white gap-2 h-[217px] p-4">
                <p className="text-gray-950 text-center whitespace-pre-wrap h-full flex items-center justify-center">
                    {trip.trip_content}
                </p>
            </div>

            {/** 추천인기 버디즈 */}
            <div className="flex flex-col bg-white gap-2 h-[350px] p-4 overflow-y-scroll">
                <h3 className="text-gray-950 text-xl font-bold">
                    추천인기 버디즈
                </h3>

                <HomePageRecommnedBuddiesList
                    buddies={recommendBuddies.buddies}
                />
            </div>
        </div>
    );
};

export default TripDetail;
