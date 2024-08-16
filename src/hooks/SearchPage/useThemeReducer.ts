import React, { useReducer } from 'react';

type ThemeAction =
    | { type: 'SET_THEMES'; payload: string[] }
    | { type: 'RESET_THEMES' };

type ThemeState = {
    selectedThemes: string[];
};

// 빈 배열로 초기화
const initialState: ThemeState = {
    selectedThemes: [],
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
    switch (action.type) {
        case 'SET_THEMES':
            // selectedThemes 업데이트
            return { ...state, selectedThemes: action.payload };
        case 'RESET_THEMES':
            return initialState;
        default:
            throw new Error('action type?: ${action.type}');
    }
}

export function useThemeReducer() {
    const [state, dispatch] = useReducer<
        React.Reducer<ThemeState, ThemeAction>
    >(themeReducer, initialState);

    const setSelectedThemes: React.Dispatch<
        React.SetStateAction<string[]>
    > = value => {
        if (typeof value === 'function') {
            // value가 함수일 때
            dispatch({
                type: 'SET_THEMES',
                payload: (value as (prevState: string[]) => string[])(
                    state.selectedThemes,
                ),
            });
        } else {
            // value가 배열일 때
            dispatch({ type: 'RESET_THEMES' });
        }
    };

    const resetThemes = () => {
        dispatch({ type: 'RESET_THEMES' });
    };

    return {
        selectedThemes: state.selectedThemes,
        setSelectedThemes,
        resetThemes,
    };
}
