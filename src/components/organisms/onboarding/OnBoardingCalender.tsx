import Input from '@/components/atoms/common/O_Input';
import Paragraph from '@/components/atoms/common/O_Paragraph';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import { Calendar, CalendarDate } from '@nextui-org/calendar';
import React, { useLayoutEffect, useRef } from 'react';

type OnBoardingCalenderProps = {
    calenderValue: CalendarDate;
    setCalenderValue: (value: CalendarDate) => void;
};

const OnBoardingCalender = ({
    calenderValue,
    setCalenderValue,
}: OnBoardingCalenderProps) => {
    const calenderRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (calenderRef.current) {
            const rows = calenderRef.current.querySelectorAll(
                'tr[data-slot="grid-body-row"]',
            );
            rows.forEach(row => {
                const firstChild = row.firstElementChild;
                if (firstChild) {
                    const disabled = firstChild.getAttribute('aria-disabled');
                    if (!disabled) {
                        (
                            firstChild.children[0].children[0] as HTMLElement
                        ).style.color = 'red';
                    }
                }
            });
        }
    }, []);

    return (
        <OnBoardingWrapper>
            <Title className="text-2xl text-left py-1" align="left">
                생일을 입력해 주세요
            </Title>
            <Paragraph className="text-left">{`력해주세요`}</Paragraph>
            <OnBoardingInnerWrapper>
                <Calendar
                    aria-label="Date (Show Month and Year Picker Controlled)"
                    className="w-[90%] flex justify-center items-center"
                    showMonthAndYearPickers
                    classNames={{
                        gridBody: 'bg-white w-full',
                        gridBodyRow: 'gap-3',
                        gridHeaderRow: 'gap-3',
                        content: 'w-[337px]',
                        headerWrapper: 'after:-z-50',
                        header: 'z-0',
                    }}
                    ref={calenderRef}
                    value={calenderValue}
                    onChange={setCalenderValue}
                />
            </OnBoardingInnerWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingCalender;
