'use client';

import Loading from '@/app/(providers)/loading';
import TripCard from '@/components/molecules/trips/TripCard';
import useTripInfiniteQuery from '@/hooks/queries/useTripInfiniteQuery';
import useTripsQuery from '@/hooks/queries/useTripsQuery';
import {
    TripInfiniteQueryResponse,
    TripWithContract,
} from '@/types/Trips.types';
import { sliceArrayByLimit } from '@/utils/common/sliceArrayByLimits';
import React, { useEffect, useMemo, useState } from 'react';
import { RxTriangleLeft, RxTriangleRight } from 'react-icons/rx';

const TripList: React.FC = () => {
    // const {
    //     data: tripsInfinite,
    //     isFetching,
    //     fetchNextPage,
    //     hasNextPage,
    // } = useTripInfiniteQuery();

    const { data: tripsData, isPending, error } = useTripsQuery();

    console.log(tripsData);

    const [paginationIndex, setPaginationIndex] = useState(0);

    const slicedPageArray = useMemo(() => {
        const { slicedPageArray } = sliceArrayByLimit(
            tripsData?.totalPages ?? 0,
            5,
        );
        return slicedPageArray;
    }, [tripsData]);

    const handlePagination = (index: number) => {
        setPaginationIndex(index);
    };

    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);

    // 추후수정요망
    if (isPending) return <Loading />;
    // if (isFetching) return <Loading />;
    if (!tripsData) return <div>No trips</div>;
    // if (!tripsInfinite) return <div>No trips</div>;

    return (
        <section className="w-full flex flex-col justify-center items-center h-[calc(100dvh-56px-57px)] pt-4 mb-10 xl:h-[calc(100dvh-100px)] xl:pt-0 xl:mb-0 xl:gap-4">
            <div className="w-full justify-end items-center hidden xl:flex">
                <button className="flex justify-between items-center border-1 border-black rounded-md p-1">
                    <select className="w-full focus:outline-none">
                        <option value="popular">인기순</option>
                        <option value="latest">최신순</option>
                    </select>
                </button>
            </div>

            <div className="hidden xl:grid w-full mx-auto grid-cols-1 xl:grid-cols-4 gap-3">
                {tripsData.allTrips?.[paginationIndex].map(item => (
                    <TripCard key={item.trip_id} trip={item} mode="list" />
                ))}
            </div>

            <div className="w-full justify-center items-center hidden xl:flex">
                <div className="flex justify-center items-center gap-3">
                    <RxTriangleLeft className="cursor-pointer text-2xl" />
                    <div className="flex justify-center items-center gap-3">
                        {slicedPageArray[paginationIndex].map(page => (
                            <button key={page}>{page}</button>
                        ))}
                    </div>
                    <RxTriangleRight className="cursor-pointer text-2xl" />
                </div>
            </div>
        </section>
    );
};

export default TripList;
