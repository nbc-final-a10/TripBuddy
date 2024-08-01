import { Trip } from '@/types/Chat.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createClient();

    const {
        data: trips,
        error: tripError,
    }: {
        data: Trip[] | null;
        error: PostgrestError | null;
    } = await supabase
        .from('trips')
        .select('*')
        .order('trip_created_at', { ascending: false });

    if (tripError) {
        console.error(tripError);
        return NextResponse.json(
            { error: tripError?.message },
            { status: 401 },
        );
    }

    if (!trips) {
        return NextResponse.json({ error: 'Trips not found' }, { status: 404 });
    }
    return NextResponse.json(trips, { status: 200 });
}
