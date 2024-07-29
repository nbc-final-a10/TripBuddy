import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import useCalendar from '@/hooks/useCalendar';
import React from 'react';
import SelectedResultRealtimeText from './SelectedResultRealtimeText';

export default function SelectDatePage() {
    const { SelectCalendar, startDateTimestamp, endDateTimestamp } =
        useCalendar();

    const title = '날짜를 선택해주세요';
    const subtitle = `여정 시작 날짜와 종료 날짜의 범위를 선택해주세요.`;
    return (
        <>
            <div>
                <Left2xlBoldText text={title} />
                <LeftSmGrayText text={subtitle} />
            </div>
            <div className="flex justify-center">
                <SelectCalendar />
            </div>
            <div>
                {startDateTimestamp && endDateTimestamp ? (
                    <SelectedResultRealtimeText
                        selectedData={`${startDateTimestamp} ~ ${endDateTimestamp}`}
                        firstLabel="선택하신 날짜는"
                        secondLabel="입니다."
                    />
                ) : (
                    <SelectedResultRealtimeText firstLabel="날짜를 선택해주세요" />
                )}
            </div>
        </>
    );
}
