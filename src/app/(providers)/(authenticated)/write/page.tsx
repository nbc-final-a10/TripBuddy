'use client';

import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import CompletePage from '@/components/organisms/write/CompletePage';
import SelectAdditionalBuddyThemes from '@/components/organisms/write/SelectAdditionalBuddyThemes';
import SelectRegionPage from '@/components/organisms/write/SelectRegionPage';
import SelectTripThemesPage from '@/components/organisms/write/SelectTripThemesPage';
import SelectDatePage from '@/components/organisms/write/SelectDatePage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import WriteTrip from '@/components/organisms/write/WriteTrip';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';
import { useAuth } from '@/hooks/auth';
import useSelectBuddyCounts from '@/hooks/useSelectBuddyCounts';
import useCalendar from '@/hooks/useCalendar';
import useSelectRegion from '@/hooks/useSelectRegion';
import usePreferTheme from '@/hooks/usePreferTheme';

const WritePage: React.FC = () => {
    const { NextButton, step } = useNextButton({
        buttonText: '다음',
        limit: 6,
    });

    const { buddy } = useAuth();
    console.log(`buddy: ${buddy}`);

    const { buddyCounts, SelectBuddyCounts } = useSelectBuddyCounts();
    const { SelectCalendar, startDateTimestamp, endDateTimestamp } =
        useCalendar();
    const {
        SelectRegion,
        firstLevelLocation,
        secondLevelLocation,
        thirdLevelLocation,
    } = useSelectRegion();
    const [PreferThemeToRender, selectedTheme] = usePreferTheme({
        mode: 'trip',
    });

    // Todo: 핸들러 함수 정의 (커스텀 훅의 state를 supabase에 한번에 쓰는 함수) -> WritePage에 함수만 내려주기

    return (
        <>
            {/* <div className="mt-4 xl:mt-20 ml-5 xl:ml-64"> */}
            <ProgressIndicator step={step} counts={7} />
            {/* </div> */}
            <section className="h-dvh flex flex-col">
                <div className="flex flex-col">
                    {step === 0 && (
                        <WelcomePage
                            buddyCounts={buddyCounts}
                            SelectBuddyCounts={SelectBuddyCounts}
                        />
                    )}
                    {step === 1 && (
                        <SelectRegionPage SelectRegion={SelectRegion} />
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
                            PreferThemeToRender={PreferThemeToRender}
                        />
                    )}
                    {step === 4 && <SelectAdditionalBuddyThemes />}
                    {step === 5 && (
                        <WriteTrip
                            firstLevelLocation={firstLevelLocation}
                            secondLevelLocation={secondLevelLocation || ''}
                            thirdLevelLocation={thirdLevelLocation || ''}
                        />
                    )}
                    {step === 6 && <CompletePage />}
                </div>
                <div className="flex justify-center">
                    <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-full" />
                </div>
            </section>
        </>
    );
};

export default WritePage;
