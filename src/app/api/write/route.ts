import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const supabase = createClient();
    const {
        title,
        content,
        buddy,
        buddyCounts,
        startDateTimestamp,
        endDateTimestamp,
        thirdLevelLocation,
        selectedTripThemes,
        selectedBuddyThemes,
    } = await req.json();

    const { data, error } = await supabase.from('trips').insert({
        trip_title: title,
        trip_content: content,
        trip_master_id: buddy.buddy_id,
        trip_max_buddies_counts: buddyCounts,
        trip_start_date: startDateTimestamp,
        trip_end_date: endDateTimestamp,
        trip_final_destination: thirdLevelLocation,
        // trip_meet_location: ,
        trip_theme1: selectedTripThemes[0],
        trip_theme2: selectedTripThemes[1],
        trip_theme3: selectedTripThemes[2],
        trip_wanted_buddies1: selectedBuddyThemes[0],
        trip_wanted_buddies2: selectedBuddyThemes[1],
        trip_wanted_buddies3: selectedBuddyThemes[2],
        // trip_wanted_sex:,
        // trip_start_age: ,
        // trip_end_age: ,
        // trip_thumbnail: ,
    });

    return NextResponse.json({ data, error }, { status: 200 });
}
