import { useQuery } from '@tanstack/react-query';
import { getBuddyTripStory } from '@/api-services/home';
import {
    QUERY_KEY_BUDDY,
    QUERY_KEY_STORY,
    QUERY_KEY_TRIP,
} from '@/constants/query.constants';
import { BuddyTripStory } from '@/types/Home.type';

export default function useHomeQuery() {
    return useQuery<BuddyTripStory, Error>({
        queryKey: [QUERY_KEY_BUDDY, QUERY_KEY_TRIP, QUERY_KEY_STORY],
        queryFn: () => getBuddyTripStory(),
        staleTime: 1000 * 60 * 5,
    });
}
