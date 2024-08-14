import { Contract } from '@/types/Contract.types';
import { Trip } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params;
    const supabase = createClient();

    const {
        data: contractsData,
        error: contractsError,
    }: { data: Contract[] | null; error: PostgrestError | null } =
        await supabase.from('contract').select('*').eq('contract_trip_id', id);

    if (contractsError) {
        console.error('컨트랙트 오류 발생:', contractsError);
        return NextResponse.json(
            { error: contractsError?.message },
            { status: 500 },
        );
    }

    if (!contractsData) {
        return NextResponse.json(
            { error: '컨트랙트 데이터가 없습니다.' },
            { status: 404 },
        );
    }

    const {
        data: tripData,
        error: tripError,
    }: { data: Trip[] | null; error: PostgrestError | null } = await supabase
        .from('trips')
        .select('*')
        .eq('trip_id', id)
        .order('trip_start_date', { ascending: false });
    // .limit(1)
    // .single();

    if (tripError) {
        console.error('여정 가져오기 오류 발생:', tripError);
        return NextResponse.json(
            { error: tripError?.message },
            { status: 500 },
        );
    }

    if (!tripData) {
        return NextResponse.json(
            { error: '여정 데이터가 없습니다.' },
            { status: 404 },
        );
    }

    return NextResponse.json(
        { contracts: contractsData, trips: tripData },
        { status: 200 },
    );
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    const supabase = createClient();

    try {
        const { id: tripId } = params;
        const token = req.headers.get('Authorization')?.replace('Bearer ', '');

        if (!tripId || !token) {
            return NextResponse.json(
                { error: 'tripId와 토큰이 필요합니다.' },
                { status: 400 },
            );
        }

        const buddyId = token;

        const {
            data: tripData,
            error: tripError,
        }: { data: Trip | null; error: PostgrestError | null } = await supabase
            .from('trips')
            .select('*')
            .eq('trip_id', tripId)
            .single();

        if (tripError || !tripData) {
            console.error('여정 데이터 오류 발생:', tripError || '데이터 없음');
            return NextResponse.json(
                { error: '여정 정보를 불러오는 데 실패했습니다.' },
                { status: 404 },
            );
        }

        if (tripData.trip_master_id !== buddyId) {
            return NextResponse.json(
                { error: '본인이 작성한 여정 모집이 아닙니다.' },
                { status: 403 },
            );
        }

        const { error: deleteTripError } = await supabase
            .from('trips')
            .delete()
            .eq('trip_id', tripId);

        if (deleteTripError) {
            console.error('여정 삭제 오류 발생:', deleteTripError);
            return NextResponse.json(
                { error: '여정 정보를 삭제하는 데 실패했습니다.' },
                { status: 500 },
            );
        }

        return NextResponse.json(
            { message: '여정이 삭제되었습니다.' },
            { status: 200 },
        );
    } catch (err) {
        console.error('서버 내부 오류:', err);
        return NextResponse.json(
            { error: '서버 내부 오류가 발생했습니다.' },
            { status: 500 },
        );
    }
}
