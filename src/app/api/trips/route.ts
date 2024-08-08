import { TRIPS_ITEMS_PER_PAGE } from '@/constants/common.constants';
import { TripWithContract } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const pageString = searchParams.get('page');

    const supabase = createClient();

    if (pageString) {
        const page = Number(pageString);
        const start = page * TRIPS_ITEMS_PER_PAGE;
        const end = start + TRIPS_ITEMS_PER_PAGE - 1;

        const {
            data: trips,
            error: tripError,
        }: {
            data: TripWithContract[] | null;
            error: PostgrestError | null;
        } = await supabase
            .from('trips')
            .select(
                '*, contract:contract!contract_contract_trip_id_foreign (*)',
            )
            .order('trip_created_at', { ascending: false })
            .range(start, end);

        if (tripError) {
            console.error(tripError);
            return NextResponse.json(
                { error: tripError?.message },
                { status: 401 },
            );
        }

        if (!trips) {
            return NextResponse.json(
                { error: 'Trips not found' },
                { status: 404 },
            );
        }
        return NextResponse.json(trips, { status: 200 });
    }

    const {
        data: trips,
        error: tripError,
    }: {
        data: TripWithContract[] | null;
        error: PostgrestError | null;
    } = await supabase
        .from('trips')
        .select('*, contract:contract!contract_contract_trip_id_foreign (*)')
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
