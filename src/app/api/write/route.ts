import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromHeader } from '@/utils/auth/getUserIdFromHeader';
import convertToWebP from '@/utils/common/convertToWebp';

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
        const tripImageFile = formData.get('trip_image') as File;

        if (!tripDataString) {
            return NextResponse.json(
                { trip: null, error: 'Invalid trip data' },
                { status: 400 },
            );
        }

        if (!tripImageFile) {
            return NextResponse.json(
                { trip: null, error: 'Invalid trip image' },
                { status: 400 },
            );
        }

        const imageBuffer = await convertToWebP(tripImageFile, 1080);

        const tripData = JSON.parse(tripDataString as string);
        const filePath = `trips_${Date.now()}.webp`;

        if (!imageBuffer) {
            return NextResponse.json(
                { trip: null, error: '이미지 변환 중 오류 발생' },
                { status: 500 },
            );
        }

        const { data: imageData, error: imageError } = await supabase.storage
            .from('trips')
            .upload(filePath, imageBuffer, { contentType: 'image/webp' });

        if (imageError) {
            return NextResponse.json(
                { trip: null, error: '이미지 업로드 중 오류 발생' },
                { status: 500 },
            );
        }

        const { data: publicUrl } = supabase.storage
            .from('trips')
            .getPublicUrl(filePath);

        tripData.trip_thumbnail = publicUrl.publicUrl;

        console.log('서버에서 tripData', tripData);

        // 'trips' 테이블에 여행 데이터를 삽입
        const { data: trip, error: tripError } = await supabase
            .from('trips')
            .insert(tripData)
            .select()
            .single();

        if (tripError || !trip || trip.length === 0) {
            console.error('게시글 업데이트 중 오류 발생:', tripError);
            return NextResponse.json(
                { trip: null, error: tripError?.message },
                { status: 500 },
            );
        }

        const tripId = trip.trip_id;

        const today = new Date();
        const tripEndDate = new Date(trip.trip_end_date);
        const isValidate = today <= tripEndDate;

        const contractData = {
            contract_trip_id: tripId,
            contract_buddy_id: userId,
            contract_start_date: trip.trip_start_date,
            contract_end_date: trip.trip_end_date,
            contract_isLeader: true,
            contract_isPending: true,
            contract_isValidate: isValidate,
        };

        // 'contract' 테이블에 계약 데이터를 삽입
        const { data: contract, error: contractError } = await supabase
            .from('contract')
            .insert(contractData)
            .select()
            .single();

        if (contractError) {
            console.error('컨트랙트 생성 중 오류 발생:', contractError);
            return NextResponse.json(
                { contract: null, error: contractError?.message },
                { status: 500 },
            );
        }

        return NextResponse.json(
            { trip: trip, contract: contract },
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
