import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import convertToWebP from '@/utils/common/convertToWebp';
import { PartialTrip, TripWithContract } from '@/types/Trips.types';
import { PostgrestError } from '@supabase/supabase-js';
import { Contract } from '@/types/Contract.types';
import { getUserIdAndModeFromHeader } from '@/utils/auth/getUserIdFromHeader';
import OpenAI from 'openai';

const OPEN_AI_SECRET_KEY = process.env.OPEN_AI_SECRET_KEY;

export async function POST(req: NextRequest) {
    const supabase = createClient();

    try {
        // 헤더에서 사용자 ID를 가져옴
        const headerData = getUserIdAndModeFromHeader(req);

        if (!headerData) {
            return NextResponse.json(
                { trip: null, error: '헤더 데이터가 없습니다.' },
                { status: 401 },
            );
        }

        const { userId, mode } = headerData;

        if (!userId) {
            return NextResponse.json(
                { trip: null, error: '사용자 ID가 없습니다.' },
                { status: 401 },
            );
        }
        if (!mode) {
            return NextResponse.json(
                { trip: null, error: '모드가 없습니다.' },
                { status: 401 },
            );
        }

        const formData = await req.formData();
        const tripDataString = formData.get('trip_json');
        const tripImageFile = formData.get('trip_image') as File;
        const tripData: PartialTrip = JSON.parse(tripDataString as string);

        // console.log('tripDataString 라우트에서 ====>', tripDataString);
        // console.log('tripImageFile 라우트에서 ====>', tripImageFile);

        if (!tripDataString) {
            return NextResponse.json(
                { trip: null, error: 'Invalid trip data' },
                { status: 400 },
            );
        }

        if (!tripImageFile && mode === 'new' && tripData) {
            const openai = new OpenAI({
                apiKey: OPEN_AI_SECRET_KEY,
            });

            // OpenAI를 사용하여 이미지를 생성
            const imageGeneration = await openai.images.generate({
                prompt: `A beautiful landscape in ${tripData.trip_final_destination}`,
                n: 1,
                size: '1024x1024',
                response_format: 'url', // URL로 이미지 반환
            });

            const imageUrl = imageGeneration.data[0].url;

            if (!imageUrl) {
                return NextResponse.json(
                    { error: '이미지 생성 중 오류 발생' },
                    { status: 500 },
                );
            }
            // 이미지 다운로드
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const imageBuffer = await convertToWebP(blob, 1024);

            const filePath = `trips_${Date.now()}.webp`;

            if (!imageBuffer) {
                return NextResponse.json(
                    { error: '이미지 변환 중 오류 발생' },
                    { status: 500 },
                );
            }

            const { data: imageData, error: imageError } =
                await supabase.storage
                    .from('trips')
                    .upload(filePath, imageBuffer, {
                        contentType: 'image/webp',
                    });

            if (imageError) {
                return NextResponse.json(
                    { error: '이미지 업로드 중 오류 발생' },
                    { status: 500 },
                );
            }

            const { data: publicUrl } = supabase.storage
                .from('trips')
                .getPublicUrl(filePath);

            tripData.trip_thumbnail = publicUrl.publicUrl;
        }

        if (tripImageFile) {
            const imageBuffer = await convertToWebP(tripImageFile, 1080);
            const filePath = `trips_${Date.now()}.webp`;

            if (!imageBuffer) {
                return NextResponse.json(
                    { error: '이미지 변환 중 오류 발생' },
                    { status: 500 },
                );
            }

            const { data: imageData, error: imageError } =
                await supabase.storage
                    .from('trips')
                    .upload(filePath, imageBuffer, {
                        contentType: 'image/webp',
                    });

            if (imageError) {
                return NextResponse.json(
                    { error: '이미지 업로드 중 오류 발생' },
                    { status: 500 },
                );
            }

            const { data: publicUrl } = supabase.storage
                .from('trips')
                .getPublicUrl(filePath);

            tripData.trip_thumbnail = publicUrl.publicUrl;
        }

        // 'trips' 테이블에 여행 데이터를 삽입
        const {
            data: trip,
            error: tripError,
        }: {
            data: TripWithContract | null;
            error: PostgrestError | null;
        } = await supabase
            .from('trips')
            .upsert({ ...tripData })
            .select()
            .single();

        if (tripError || !trip) {
            console.error('게시글 업데이트 중 오류 발생:', tripError);
            return NextResponse.json(
                { error: tripError?.message },
                { status: 500 },
            );
        }
        const tripId = trip.trip_id;

        const {
            data: relatedContracts,
            error: selectError,
        }: { data: Contract[] | null; error: PostgrestError | null } =
            await supabase
                .from('contract')
                .select('*')
                .eq('contract_trip_id', tripId);

        if (selectError) {
            return NextResponse.json(
                { error: selectError?.message },
                { status: 500 },
            );
        }

        if (!relatedContracts) {
            return NextResponse.json({ error: '서버 오류' }, { status: 500 });
        }

        if (mode === 'patch') {
            trip.contract = relatedContracts;
            return NextResponse.json(trip, { status: 200 });
        } else {
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

            // 먼저 데이터를 삽입
            const { data: insertedData, error: insertError } = await supabase
                .from('contract')
                .insert(contractData)
                .select('*');

            if (insertError) {
                return NextResponse.json(
                    { error: insertError?.message },
                    { status: 500 },
                );
            }

            if (!insertedData) {
                return NextResponse.json(
                    { error: '서버 오류' },
                    { status: 500 },
                );
            }
            // 삽입이 성공시, 관련된 tripId로 데이터를 조회
            const {
                data: relatedContracts,
                error: selectError,
            }: { data: Contract[] | null; error: PostgrestError | null } =
                await supabase
                    .from('contract')
                    .select('*')
                    .eq('contract_trip_id', tripId);

            if (selectError) {
                return NextResponse.json(
                    { error: selectError?.message },
                    { status: 500 },
                );
            }

            if (!relatedContracts) {
                return NextResponse.json(
                    { error: '서버 오류' },
                    { status: 500 },
                );
            }

            trip.contract = relatedContracts;

            return NextResponse.json(trip, { status: 200 });
        }
    } catch (error) {
        console.error('요청 처리 중 오류 발생:', error);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}
