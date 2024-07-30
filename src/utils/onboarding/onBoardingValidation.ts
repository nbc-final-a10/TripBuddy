import {
    SecondLevelNames,
    ThirdLevelNames,
} from './../../types/Location.types';
import { showAlert } from '../ui/openCustomAlert';
import { BuddyTheme, TripTheme } from '@/types/Themes.types';
import { buddyThemes, tripThemes } from '@/data/themes';

function isSecondThirdLevelName(
    obj: any,
): obj is SecondLevelNames | ThirdLevelNames {
    return typeof obj === 'string'; // Assuming SecondLevelNames is a string type
}

function isBuddyTheme(objs: BuddyTheme[]): boolean {
    return objs.every(obj => buddyThemes.find(theme => theme.ko === obj));
}

function isTripTheme(objs: TripTheme[]): boolean {
    return objs.every(obj => tripThemes.find(theme => theme.ko === obj));
}

export const onBoardingValidation = (value: string | number) => {
    if (value !== undefined) {
        if (!value) {
            showAlert('caution', '필수 입력 사항입니다.');
            return false;
        }
        if (typeof value === 'number') {
            if (value < 18) {
                showAlert(
                    'caution',
                    '18세 이상부터 서비스를 이용할 수 있습니다.',
                );
                return false;
            }
        }
        if (Array.isArray(value)) {
            if (value.length === 0) {
                showAlert('caution', '값을 확인해주세요!');
                return false;
            }
            if (isSecondThirdLevelName(value[0])) {
                showAlert('caution', '선택된 지역을 다시 확인해 주세요.');
                return false;
            }
            if (isSecondThirdLevelName(value[1])) {
                showAlert('caution', '선택된 지역을 다시 확인해 주세요.');
                return false;
            }
            if (isBuddyTheme(value)) {
                if (value.length < 3) {
                    showAlert('caution', '3가지를 선택하셔야 합니다.');
                    return false;
                }
                return true;
            }
            if (isTripTheme(value)) {
                if (value.length < 3) {
                    showAlert('caution', '3가지를 선택하셔야 합니다.');
                    return false;
                }
                return true;
            }
        }
        return true;
    }
    return false;
};
