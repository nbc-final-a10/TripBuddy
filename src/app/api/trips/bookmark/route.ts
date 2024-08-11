import {
    BookMark,
    BookMarkRequest,
    PartialBookMark,
} from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const supabase = createClient();
    const bookmark_buddy_id = req.nextUrl.searchParams.get('bookmark_buddy_id');
    const bookmark_trip_id = req.nextUrl.searchParams.get('bookmark_trip_id');

    const {
        data: bookmarks,
        error: bookmarksError,
    }: { data: BookMark | null; error: PostgrestError | null } = await supabase
        .from('tripbookmarks')
        .select('*')
        .eq('bookmark_buddy_id', bookmark_buddy_id)
        .eq('bookmark_trip_id', bookmark_trip_id)
        .maybeSingle();

    if (bookmarksError) {
        console.error('북마크 조회 중 오류 발생:', bookmarksError);
        return NextResponse.json(
            { error: '북마크 조회 중 오류 발생' },
            { status: 500 },
        );
    }

    if (!bookmarks) {
        return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(bookmarks, { status: 200 });
}

export async function POST(req: NextRequest) {
    const supabase = createClient();
    const {
        bookmark_buddy_id,
        bookmark_trip_id,
        is_bookmarked,
    }: BookMarkRequest = await req.json();

    // trip 데이터를 가져오기 위해 Supabase에서 trips 테이블을 조회
    const { data: trip, error: tripError } = await supabase
        .from('trips')
        .select('*')
        .eq('trip_id', bookmark_trip_id)
        .maybeSingle();

    if (tripError) {
        return NextResponse.json(
            { error: '여행 데이터를 가져오는 중 오류 발생' },
            { status: 500 },
        );
    }

    if (!trip) {
        return NextResponse.json(
            { error: '여행을 찾을 수 없습니다' },
            { status: 404 },
        );
    }

    // 지금 입력하려는 bookmark_trip_id와 userId가 있는지 확인
    const { data: existingBookmarks, error: existingBookmarksError } =
        await supabase
            .from('tripbookmarks')
            .select('*')
            .eq('bookmark_trip_id', bookmark_trip_id)
            .eq('bookmark_buddy_id', bookmark_buddy_id);

    if (existingBookmarksError) {
        console.error(
            '기존 bookmark 조회 중 오류 발생:',
            existingBookmarksError,
        );
        return NextResponse.json(
            { error: '기존 bookmark 조회 중 오류 발생' },
            { status: 500 },
        );
    }

    let bookmarkResponse;

    if (is_bookmarked) {
        bookmarkResponse = await supabase
            .from('tripbookmarks')
            .insert({
                bookmark_buddy_id: bookmark_buddy_id,
                bookmark_trip_id: bookmark_trip_id,
            })
            .select()
            .single();
    } else {
        bookmarkResponse = await supabase
            .from('tripbookmarks')
            .delete()
            .eq('bookmark_trip_id', bookmark_trip_id)
            .eq('bookmark_buddy_id', bookmark_buddy_id)
            .select()
            .single();
    }

    const {
        data: bookmark,
        error: bookmarkError,
    }: {
        data: BookMark | null;
        error: PostgrestError | null;
    } = bookmarkResponse;

    if (bookmarkError) {
        console.error('컨트랙트 생성 중 오류 발생:', bookmarkError);
        return NextResponse.json(
            { error: bookmarkError?.message },
            { status: 500 },
        );
    }

    if (!bookmark) {
        return NextResponse.json(
            { error: '북마크 생성 중 오류 발생' },
            { status: 500 },
        );
    }

    return NextResponse.json(bookmark, { status: 200 });
}