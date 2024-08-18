import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMyBookMarksQuery } from '@/hooks/queries/trip/useMyBookMarksQuery';
import { Trip, TripWithContract } from '@/types/Trips.types';
import TripCard from '@/components/organisms/trips/TripCard';

function MyBookmarksPage() {
    const router = useRouter();
    const { id: clickedBuddyId } = useParams();
    const {
        data: myBookmarkedTrips,
        isLoading,
        isError,
    } = useMyBookMarksQuery(
        Array.isArray(clickedBuddyId) ? clickedBuddyId[0] : clickedBuddyId,
    );
    console.log('id', clickedBuddyId);

    return (
        <>
            <div>
                {myBookmarkedTrips && myBookmarkedTrips.length > 0 ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 my-2 mx-2 gap-4">
                        {myBookmarkedTrips.map((trip: TripWithContract) => (
                            <TripCard
                                key={trip.trip_id}
                                trip={trip}
                                mode="card"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        만든 여정이 없습니다.
                    </div>
                )}
            </div>
        </>
    );
}

export default MyBookmarksPage;
