import convertToWebP from '@/utils/common/convertToWebp';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const supabase = createClient();
    try {
        const formData = await req.formData();
        const tripData = JSON.parse(formData.get('trip_json') as string);
        const tripImageFile = formData.get('trip_image') as File;

        const imageBuffer = await convertToWebP(tripImageFile, 1080);
        const filePath = `trips_${Date.now()}_${tripData.trip_id}.webp`;

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

        const { data: trip, error } = await supabase
            .from('trips')
            .insert(tripData)
            .select();

        // 데이터베이스 에러 처리
        if (error) {
            console.error('게시글 업데이트 중 오류 발생:', error);
            return NextResponse.json(
                { trip: null, error: error?.message },
                { status: 500 },
            );
        }

        // 성공 시 응답
        return NextResponse.json({ trip }, { status: 200 });
    } catch (error) {
        // 일반 에러 처리
        console.error('게시글 업데이트 중 오류 발생:', error);
        return NextResponse.json(
            { trip: null, error: '서버 오류' },
            { status: 500 },
        );
    }
}
