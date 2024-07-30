import {
    SecondLevelNames,
    ThirdLevelNames,
} from './../../types/Location.types';
import { showAlert } from '../ui/openCustomAlert';
import { BuddyTheme, TripTheme } from '@/types/Themes.types';
import { buddyThemes, tripThemes } from '@/data/themes';

type InPutValue =
    | string
    | number
    | undefined
    | [string | null, string | null]
    | []
    | (TripTheme | BuddyTheme)[]
    | SecondLevelNames[]
    | ThirdLevelNames[];

type onBoardingValidationType = (value: InPutValue, step: number) => boolean;

function isBuddyTheme(objs: BuddyTheme[]): boolean {
    return objs.every(obj => buddyThemes.find(theme => theme.ko === obj));
}

function isTripTheme(objs: TripTheme[]): boolean {
    return objs.every(obj => tripThemes.find(theme => theme.ko === obj));
}

export const onBoardingValidation: onBoardingValidationType = (value, step) => {
    console.log('value =====>', value);
    if (value !== undefined) {
        if (!value) {
            showAlert('caution', '필수 입력 사항입니다.');
            return false;
        }
        if (typeof value === 'number' && step === 2) {
            if (value < 18) {
                showAlert(
                    'caution',
                    '18세 이상부터 서비스를 이용할 수 있습니다.',
                );
                return false;
            }
        }
        if (Array.isArray(value)) {
            console.log('value ===>', value);
            if (value.length === 0) {
                showAlert('caution', '값을 확인해주세요!');
                return false;
            }
            if (step === 4 && (!value[0] || !value[1])) {
                showAlert('caution', '지역을 모두 선택해주세요.');
                return false;
            }

            if (step === 7 && isBuddyTheme(value as BuddyTheme[])) {
                if (value.length < 3) {
                    showAlert('caution', '3가지를 선택하셔야 합니다.');
                    return false;
                }
                return true;
            }
            if (step === 8 && isTripTheme(value as TripTheme[])) {
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
