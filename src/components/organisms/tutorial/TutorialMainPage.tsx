'use client';
import Tuto from '@/components/atoms/tutorial/Tuto';
import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import { setCookieAction } from '@/utils/tutorial/setCookieAction';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ArrowBack from '../../../../public/svg/Arrow_back.svg';

const TutorialMainPage: React.FC = () => {
    const [step, setStep] = useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleNext = async () => {
        if (step < 4) {
            setStep(prev => prev + 1);
        } else {
            await setCookieAction();
        }
    };

    const handleBack = async () => {
        if (step > 0) {
            setStep(prev => prev - 1);
        }
    };

    const handleSkip = async () => {
        await setCookieAction();
    };

    useEffect(() => {
        const funnel = searchParams.get('funnel');
        if (funnel) {
            setStep(Number(funnel));
        }
    }, [searchParams]);

    useEffect(() => {
        if (step <= 4) {
            router.push(`/tutorial?funnel=${step}`);
        }
    }, [step, router]);

    return (
        <div className="relative  h-dvh overflow-x-auto bg-white xl:h-[calc(100dvh-100px)] xl:mt-14 px-[20px] ">
            <div className="flex justify-between items-center relative w-full mt-[64px] xl:mt-14 px-[20px] min-h-[32px]">
                {step > 0 ? (
                    <ArrowBack
                        onClick={handleBack}
                        className="cursor-pointer"
                    />
                ) : (
                    <div className="w-[24px]"></div>
                )}

                {step < 4 && (
                    <button
                        onClick={handleSkip}
                        className="text-base py-1 px-1 rounded ml-auto"
                    >
                        건너뛰기
                    </button>
                )}
            </div>

            <section className="flex flex-col items-center justify-start w-full flex-1 text-center pb-0 mb-0">
                <Tuto step={step} />
            </section>

            <div className="mb-5 xl:mb-5 flex justify-center">
                <ProgressIndicator className="pt-5" step={step} counts={5} />
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={handleNext}
                    className="text-[18px] bg-main-color font-bold rounded-2xl mb-4 text-white"
                    style={{ width: '335px', height: '48px' }}
                >
                    {step < 4 ? '다음' : '홈으로'}
                </button>
            </div>
        </div>
    );
};

export default TutorialMainPage;
