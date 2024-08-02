import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromHeader } from '@/utils/auth/getUserIdFromHeader';

export async function POST(req: NextRequest) {
    const supabase = createClient();

    try {
        // 헤더에서 사용자 ID를 가져옴
        const userId = getUserIdFromHeader(req);
        if (!userId) {
            return NextResponse.json(
                { trip: null, error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const formData = await req.formData();
        const tripDataString = formData.get('trip_json');
        if (!tripDataString) {
            return NextResponse.json(
                { trip: null, error: 'Invalid trip data' },
                { status: 400 },
            );
        }

        const tripData = JSON.parse(tripDataString as string);

        // 'trips' 테이블에 여행 데이터를 삽입
        const { data: trip, error: tripError } = await supabase
            .from('trips')
            .insert(tripData)
            .select();

        if (tripError || !trip || trip.length === 0) {
            console.error('게시글 업데이트 중 오류 발생:', tripError);
            return NextResponse.json(
                { trip: null, error: tripError?.message },
                { status: 500 },
            );
        }

        const tripRecord = trip[0];
        const tripId = tripRecord.trip_id;

        const today = new Date();
        const tripEndDate = new Date(tripRecord.trip_end_date);
        const isValidate = today <= tripEndDate;

        const contractData = {
            contract_trip_id: tripId,
            contract_buddy_id: userId,
            contract_start_date: tripRecord.trip_start_date,
            contract_end_date: tripRecord.trip_end_date,
            contract_isLeader: true,
            contract_isPending: true,
            contract_isValidate: isValidate,
        };

        // 'contract' 테이블에 계약 데이터를 삽입
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

        return NextResponse.json(
            { trip: tripRecord, contract: contract[0] },
            { status: 200 },
        );
    } catch (error) {
        console.error('요청 처리 중 오류 발생:', error);
        return NextResponse.json(
            { trip: null, contract: null, error: '서버 오류' },
            { status: 500 },
        );
    }
}
