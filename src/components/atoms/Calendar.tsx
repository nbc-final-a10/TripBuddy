import { DateValue, RangeCalendar, RangeValue } from '@nextui-org/calendar';
import { I18nProvider } from '@react-aria/i18n';
import { useState } from 'react';

type DateRange = {
    start: DateValue | null;
    end: DateValue | null;
};

// const defaultDate: DateValue = new Date() as DateValue;

const Calendar = () => {
    const [selectedRange, setSelectedRange] = useState<RangeValue<DateValue>>({
        start: null,
        end: null,
    });

    const handleRangeChange = (newRange: RangeValue<DateValue>) => {
        setSelectedRange(newRange);
    };

    console.log({
        start: selectedRange.start ? selectedRange.start.toString() : 'None',
        end: selectedRange.end ? selectedRange.end.toString() : 'None',
    });

    return (
        <div className="w-full flex justify-center mb-20 mt-12">
            <I18nProvider locale="ko-KR-u-ca-dangi">
                <RangeCalendar
                    aria-label="Date (Controlled Focused Value)"
                    value={selectedRange}
                    onChange={handleRangeChange}
                />
            </I18nProvider>
        </div>
    );
};

export default Calendar;
