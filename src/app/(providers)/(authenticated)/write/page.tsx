'use client';

import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import CompletePage from '@/components/organisms/write/CompletePage';
import SelectAdditionalBuddyThemes from '@/components/organisms/write/SelectAdditionalBuddyThemes';
import SelectRegionPage from '@/components/organisms/write/SelectRegionPage';
import SelectTripThemesPage from '@/components/organisms/write/SelectTripThemesPage';
import SelectDatePage from '@/components/organisms/write/SelectDatePage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';
import { useAuth } from '@/hooks/auth';
import useSelectBuddyCounts from '@/hooks/useSelectBuddyCounts';
import useCalendar from '@/hooks/useCalendar';
import useSelectRegion from '@/hooks/useSelectRegion';
import usePreferTheme from '@/hooks/usePreferTheme';
import { Tables } from '@/types/supabase';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useRouter } from 'next/navigation';
import useTripWrite from '@/hooks/MyPage/useTripWrite';
import WriteTrip from '@/components/organisms/write/WriteTrip';
import useSelectSex from '@/hooks/useSelectSex';
import useSelectAges from '@/hooks/useSelectAges';
import useSelectMeetPlace from '@/hooks/useSelectMeetPlace';

const WritePage: React.FC = () => {
    const router = useRouter();
    const { NextButton, step } = useNextButton({
        buttonText: '다음',
        limit: 6,
    });
    const { buddy } = useAuth();
    const { buddyCounts, SelectBuddyCounts } = useSelectBuddyCounts();
    const { SelectCalendar, startDateTimestamp, endDateTimestamp } =
        useCalendar();
    const {
        SelectRegion,
        firstLevelLocation,
        secondLevelLocation,
        thirdLevelLocation,
    } = useSelectRegion();
    const [PreferTripThemesToRender, selectedTripThemes] = usePreferTheme({
        mode: 'trip',
    });
    const [PreferWantedBuddiesToRender, selectedWantedBuddies] = usePreferTheme(
        {
            mode: 'buddy',
        },
    );
    const {
        tripTitle,
        tripContent,
        tripImage,
        handleTitleChange,
        handleContentChange,
    } = useTripWrite();
    const { wantedSex, SelectWantedSexButton } = useSelectSex();
    const { startAge, endAge, handleStartAge, handleEndAge } = useSelectAges();
    const { meetPlace, SelectMeetPlaceButton } = useSelectMeetPlace();

    type TripData = Tables<'trips'>;
    // 파셜트립데이터는 데이터 컬럼을 선택적으로 쓰겠다
    type PartialTripData = Partial<TripData>;

    // Todo: 핸들러 함수 정의 (커스텀 훅의 state를 supabase에 한번에 쓰는 함수) -> WritePage에 함수만 내려주기
    // Todo: 더 큰 함수로 바꾸어서 step 별로 유효성 검사 등 실행 로직 분리하기
    const handleWriteTrip = async () => {
        const tripData: PartialTripData = {
            trip_title: tripTitle,
            trip_content: tripContent,
            trip_thumbnail: tripImage,
            trip_master_id: buddy?.buddy_id ?? '',
            trip_max_buddies_counts: buddyCounts,
            trip_bookmarks_counts: buddyCounts,
            trip_start_date: startDateTimestamp,
            trip_end_date: endDateTimestamp,
            trip_final_destination: `${secondLevelLocation} ${thirdLevelLocation}`,
            trip_meet_location: meetPlace,
            trip_theme1: selectedTripThemes[0],
            trip_theme2: selectedTripThemes[1],
            trip_theme3: selectedTripThemes[2],
            trip_wanted_buddies1: selectedWantedBuddies[0],
            trip_wanted_buddies2: selectedWantedBuddies[1],
            trip_wanted_buddies3: selectedWantedBuddies[2],
            trip_wanted_sex: wantedSex,
            trip_start_age: startAge,
            trip_end_age: endAge,
        };
        try {
            const response = await fetch('/api/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tripData),
            });

            // const result = await response.json();
            if (response.ok) {
                showAlert('success', '게시글 업데이트 성공', {
                    onConfirm: () => {
                        router.push('/');
                    },
                });
            } else {
                const errorResult = await response.json();
                console.error('게시글 업데이트 중 오류 발생:', errorResult);
                showAlert('error', '게시글 업데이트 실패');
            }
        } catch (error) {
            console.error('게시글 업데이트 중 오류 발생:', error);
        }
    };

    return (
        <>
            <ProgressIndicator step={step} counts={7} />
            <section className="h-dvh flex flex-col">
                <div className="flex flex-col">
                    {step === 0 && (
                        <WelcomePage SelectBuddyCounts={SelectBuddyCounts} />
                    )}
                    {step === 1 && (
                        <SelectRegionPage
                            SelectRegion={SelectRegion}
                            pxHeight={60}
                        />
                    )}
                    {step === 2 && (
                        <SelectDatePage
                            startDateTimestamp={startDateTimestamp}
                            endDateTimestamp={endDateTimestamp}
                            SelectCalendar={SelectCalendar}
                        />
                    )}
                    {step === 3 && (
                        <SelectTripThemesPage
                            PreferThemeToRender={PreferTripThemesToRender}
                            SelectMeetPlaceButton={SelectMeetPlaceButton}
                        />
                    )}
                    {step === 4 && (
                        <SelectAdditionalBuddyThemes
                            PreferThemeToRender={PreferWantedBuddiesToRender}
                            SelectWantedSexButton={SelectWantedSexButton}
                            startAge={startAge}
                            endAge={endAge}
                            handleStartAge={handleStartAge}
                            handleEndAge={handleEndAge}
                        />
                    )}
                    {step === 5 && (
                        <WriteTrip
                            tripTitle={tripTitle}
                            tripContent={tripContent}
                            handleTitleChange={handleTitleChange}
                            handleContentChange={handleContentChange}
                        />
                    )}
                    {step === 6 && <CompletePage />}
                </div>
                <div className="flex justify-center">
                    <NextButton
                        className="text-xl text-white bg-main-color font-bold py-2 px-4 mt-4 mx-2 rounded-xl w-full hover:bg-main-color/80"
                        onClick={step === 5 ? handleWriteTrip : undefined}
                    />
                </div>
            </section>
        </>
    );
};

export default WritePage;
