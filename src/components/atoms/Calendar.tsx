import { RangeCalendar } from '@nextui-org/calendar';
import { I18nProvider } from '@react-aria/i18n';

const Calendar = () => {
    return (
        <div className="w-full flex justify-center mb-20 mt-12">
            <I18nProvider locale="ko-KR-u-ca-dangi">
                <RangeCalendar aria-label="Date (Controlled Focused Value)" />
            </I18nProvider>
        </div>
    );
};

export default Calendar;
