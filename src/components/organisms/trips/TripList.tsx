'use client';

import Loading from '@/app/(providers)/loading';
import TripCard from '@/components/molecules/trips/TripCard';
import useTripInfiniteQuery from '@/hooks/queries/useTripInfiniteQuery';
import { TripInfiniteQueryResponse } from '@/types/Trips.types';
import { sliceArrayByLimit } from '@/utils/common/sliceArrayByLimits';
import React, { useMemo, useState } from 'react';
import { RxTriangleLeft, RxTriangleRight } from 'react-icons/rx';

const TripList: React.FC = () => {
    const {
        data = {} as TripInfiniteQueryResponse,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useTripInfiniteQuery();

    console.log(data);

    const [paginationIndex, setPaginationIndex] = useState(0);

    const totalPageArray = useMemo(() => {
        const slicedPageArray = sliceArrayByLimit(data.totalPages, 5);
        return slicedPageArray;
    }, [data]);

    console.log(totalPageArray);

    // 추후수정요망
    if (isFetching) return <Loading />;
    if (!data) return <div>No trips</div>;

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

            <div className="w-full mx-auto grid grid-cols-1 xl:grid-cols-4 gap-3">
                {data.trips.map(item => (
                    <TripCard key={item.trip_id} trip={item} mode="list" />
                ))}
            </div>

            <div className="w-full justify-center items-center hidden xl:flex">
                <div className="flex justify-center items-center">
                    <RxTriangleLeft className="cursor-pointer text-2xl" />
                    {totalPageArray[paginationIndex].map(page => (
                        <button key={page}>{page}</button>
                    ))}
                    <RxTriangleRight className="cursor-pointer text-2xl" />
                </div>
            </div>
        </section>
    );
};

export default TripList;
