import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const supabase = createClient();

    try {
        const { tripId, userId } = await req.json();

        // trip 데이터를 가져오기 위한 trips 테이블을 페칭
        const { data: trip, error: tripError } = await supabase
            .from('trips')
            .select('*')
            .eq('trip_id', tripId)
            .maybeSingle();

        if (tripError) {
            console.error('여행 데이터를 가져오는 중 오류 발생:', tripError);
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

        const today = new Date();
        const tripEndDate = new Date(trip.trip_end_date);
        const isValidate = today <= tripEndDate;

        const contractData = {
            contract_trip_id: tripId,
            contract_buddy_id: userId,
            contract_start_date: trip.trip_start_date,
            contract_end_date: trip.trip_end_date,
            contract_isLeader: false,
            contract_isPending: true,
            contract_isValidate: isValidate,
            contract_created_at: new Date().toISOString(),
        };

        // 'contract' 테이블에 참여정보 데이터를 삽입
        const { data: contract, error: contractError } = await supabase
            .from('contract')
            .insert(contractData)
            .select();

        if (contractError) {
            console.error('컨트랙트 생성 중 오류 발생:', contractError);
            return NextResponse.json(
                { contract: null, error: contractError?.message },
                { status: 500 },
            );
        }

        return NextResponse.json({ contract: contract[0] }, { status: 200 });
    } catch (error) {
        console.error('요청 처리 중 오류 발생:', error);
        return NextResponse.json(
            { trip: null, contract: null, error: '서버 오류' },
            { status: 500 },
        );
    }
}
