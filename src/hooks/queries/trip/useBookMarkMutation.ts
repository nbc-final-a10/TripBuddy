import { postBookMark } from '@/api-services/trips';
import { QUERY_KEY_TRIP_BY_BOOKMARK } from '@/constants/query.constants';
import { BookMark, BookMarkRequest } from '@/types/Trips.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useBookMarkMutation() {
    const queryClient = useQueryClient();
    return useMutation<BookMark, Error, BookMarkRequest>({
        mutationFn: bookmark => postBookMark(bookmark),
        onSuccess: bookmark => {
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEY_TRIP_BY_BOOKMARK,
                    bookmark.bookmark_buddy_id,
                    bookmark.bookmark_trip_id,
                ],
            });
        },
    });
}
