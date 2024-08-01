import { Buddy } from '@/types/Auth.types';
import { StoryWithBuddies } from '@/types/Story.types';
import { Trip } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createClient();

    try {
        // buddies 테이블에서 buddy_temperature가 가장 높은 10명 가져오기
        const {
            data: buddies,
            error: buddiesError,
        }: { data: Buddy[] | null; error: PostgrestError | null } =
            await supabase
                .from('buddies')
                .select('*')
                .order('buddy_temperature', { ascending: false })
                .limit(10);

        // 데이터베이스 에러 처리
        if (buddiesError) {
            console.error('버디 추천 리스트 통신 오류 발생:', buddiesError);
            return NextResponse.json(
                { buddies: null, error: buddiesError?.message },
                { status: 404 },
            );
        }
        if (!buddies) {
            return NextResponse.json(
                { error: 'Buddies not found' },
                { status: 404 },
            );
        }

        const {
            data: stories,
            error: storyError,
        }: {
            data: StoryWithBuddies[] | null;
            error: PostgrestError | null;
        } = await supabase
            .from('stories')
            .select('*, buddies:story_created_by (*)')
            .order('story_created_at', { ascending: false });

        if (storyError) {
            console.error(storyError);
            return NextResponse.json(
                { error: storyError?.message },
                { status: 404 },
            );
        }

        if (!stories) {
            return NextResponse.json(
                { error: 'Stories not found' },
                { status: 404 },
            );
        }

        const {
            data: trips,
            error: tripsError,
        }: {
            data: Trip[] | null;
            error: PostgrestError | null;
        } = await supabase
            .from('trips')
            .select('*')
            .order('trip_created_at', { ascending: false });

        if (tripsError) {
            console.error(tripsError);
            return NextResponse.json(
                { error: tripsError?.message },
                { status: 404 },
            );
        }

        if (!trips) {
            return NextResponse.json(
                { error: 'Trips not found' },
                { status: 404 },
            );
        }

        return NextResponse.json({ buddies, stories, trips }, { status: 200 });
    } catch (error) {
        console.error(error);
    }
}