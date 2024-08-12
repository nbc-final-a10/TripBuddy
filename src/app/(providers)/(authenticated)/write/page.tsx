'use client';

import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import SelectAdditionalBuddyThemes from '@/components/organisms/write/SelectAdditionalBuddyThemes';
import SelectRegionPage from '@/components/organisms/write/SelectRegionPage';
import SelectTripThemesPage from '@/components/organisms/write/SelectTripThemesPage';
import SelectDatePage from '@/components/organisms/write/SelectDatePage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import React, { useEffect, useState } from 'react';
import { Tables } from '@/types/supabase';
import { showAlert } from '@/utils/ui/openCustomAlert';
import WriteTrip from '@/components/organisms/write/WriteTrip';
import { useRouter } from 'next/navigation';
import { validateStep } from '@/utils/write/validateStep';
import SuccessNotificationPage from '@/components/organisms/write/SuccessNotificationPage';
import { twMerge } from 'tailwind-merge';
import {
    useAuth,
    useCalendar,
    useNextButton,
    usePreferTheme,
    useSelectAges,
    useSelectBuddyCounts,
    useSelectMeetPlace,
    useSelectRegion,
    useSelectSex,
    useTripWrite,
} from '@/hooks';

// 버튼 라벨 배열
const buttonText = [
    '다음',
    '다음',
    '다음',
    '다음',
    '다음',
    '여정 만들기',
    '여정 페이지로',
];

const WritePage: React.FC = () => {
    const [stepToDisplay, setStepToDisplay] = useState<number>(0);
    const [tripId, setTripId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [isMini, setIsMini] = useState<boolean>(false);

    const { buddy } = useAuth();
    const router = useRouter();
    const { buddyCounts, SelectBuddyCounts } = useSelectBuddyCounts();
    const { SelectCalendar, startDateTimestamp, endDateTimestamp } =
        useCalendar();
    const { actions, states } = useSelectRegion();
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
        tripImageFile,
        handleTitleChange,
        handleContentChange,
        handleImageChange,
    } = useTripWrite();
    const { wantedSex, SelectWantedSexButton } = useSelectSex();
    const { startAge, endAge, handleStartAge, handleEndAge } = useSelectAges();
    const { meetPlace, SelectMeetPlaceButton } = useSelectMeetPlace();

    const { NextButton, step } = useNextButton({
        buttonText: buttonText[stepToDisplay],
        limit: 6,
        validateStep: () =>
            validateStep(step, {
                secondLevelLocation: states.secondLevelLocation,
                thirdLevelLocation: states.thirdLevelLocation,
                startDateTimestamp,
                endDateTimestamp,
                selectedTripThemes,
                meetPlace,
                wantedSex,
                startAge,
                endAge,
                selectedWantedBuddies,
                tripImageFile,
                tripTitle,
                tripContent,
            }),
        disabled: isLoading,
    });

    type TripData = Tables<'trips'>;
    // 파셜트립데이터는 데이터 컬럼을 선택적으로 쓰겠다
    type PartialTripData = Partial<TripData>;

    // Todo: 핸들러 함수 정의 (커스텀 훅의 state를 supabase에 한번에 쓰는 함수) -> WritePage에 함수만 내려주기
    // Todo: 더 큰 함수로 바꾸어서 step 별로 유효성 검사 등 실행 로직 분리하기
    const handleWriteTrip = async () => {
        setIsLoading(true);
        const tripData: PartialTripData = {
            trip_title: tripTitle,
            trip_content: tripContent,
            trip_thumbnail: '',
            trip_master_id: buddy?.buddy_id ?? '',
            trip_max_buddies_counts: buddyCounts,
            trip_start_date: startDateTimestamp,
            trip_end_date: endDateTimestamp,
            trip_final_destination: `${states.secondLevelLocation} ${states.thirdLevelLocation}`,
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
        const formData = new FormData();
        if (tripImageFile) {
            formData.append('trip_image', tripImageFile);
            formData.append('trip_json', JSON.stringify(tripData));
        }
        try {
            const response = await fetch('/api/write', {
                method: 'POST',
                body: formData,
                headers: {
                    user: buddy?.buddy_id ?? '', // 헤더에 사용자 ID 포함
                },
            });
            if (response.ok) {
                const data = await response.json();
                // console.log('게시글 업데이트 성공');
                setTripId(data.trip.trip_id);
                // console.log('데이터', data);
                setIsLoading(false);
                setIsSuccess(true);
                // showAlert('success', '여정을 작성하였습니다.');
                // router.push(`/trips/${tripId}`);
                return true;
            } else {
                const errorResult = await response.json();
                console.error('게시글 업데이트 중 오류 발생:', errorResult);
                showAlert('error', '여정을 작성하지 못하였습니다.');
                setIsLoading(false);
                setIsSuccess(false);
                return false;
            }
        } catch (error) {
            console.error('게시글 업데이트 중 오류 발생:', error);
            showAlert('error', '여정을 작성하지 못하였습니다.');
            setIsLoading(false);
            setIsSuccess(false);
            return false;
        }
    };

    useEffect(() => {
        setStepToDisplay(step);
    }, [step]);

    useEffect(() => {
        const isMini = window.innerHeight < 659;
        setIsMini(isMini);
    }, []);

    const handlePush = (path: string) => {
        router.push(path);
    };

    return (
        <div
            className={twMerge(
                'relative h-[calc(100dvh-56px-57px)]',
                step === 5 && 'h-auto',
            )}
        >
            <ProgressIndicator className="pt-2" step={step} counts={7} />
            <section className="h-auto flex flex-col">
                <div className={twMerge('flex flex-col', step === 0 && 'mb-2')}>
                    {step === 0 && (
                        <WelcomePage
                            SelectBuddyCounts={SelectBuddyCounts}
                            isMini={isMini}
                        />
                    )}
                    {step === 1 && (
                        <SelectRegionPage
                            isMini={isMini}
                            states={states}
                            actions={actions}
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
                            tripImage={tripImage}
                            tripImageFile={tripImageFile}
                            handleTitleChange={handleTitleChange}
                            handleContentChange={handleContentChange}
                            handleImageChange={handleImageChange}
                        />
                    )}
                    {step === 6 && (
                        <SuccessNotificationPage isSuccess={isSuccess} />
                    )}
                </div>
                <div className="flex justify-center">
                    <NextButton
                        className={twMerge(
                            'text-xl text-white bg-main-color font-bold py-2 px-4 mt-4 mx-2 mb-20 rounded-xl w-full hover:bg-main-color/80',
                            isMini && 'mt-0.5 mb-10',
                        )}
                        onClick={async () => {
                            const isValid = await validateStep(step, {
                                secondLevelLocation: states.secondLevelLocation,
                                thirdLevelLocation: states.thirdLevelLocation,
                                startDateTimestamp,
                                endDateTimestamp,
                                selectedTripThemes,
                                meetPlace,
                                wantedSex,
                                startAge,
                                endAge,
                                selectedWantedBuddies,
                                tripImageFile,
                                tripTitle,
                                tripContent,
                            });
                            if (!isValid) return; // 유효성 검사 실패 시 미진행
                            if (step === 5) {
                                const success = await handleWriteTrip();
                                if (!success) return; // 요청 실패 시 미진행
                            }
                            if (step === 6) handlePush(`/trips/${tripId}`);
                        }}
                        disabled={isLoading}
                    />
                </div>
            </section>
        </div>
    );
};

export default WritePage;
