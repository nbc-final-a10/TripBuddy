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

    const setSelectedThemes = (
        value: string[] | ((prevState: string[]) => string[]),
    ) => {
        dispatch({
            type: 'SET_THEMES',
            payload:
                typeof value === 'function'
                    ? (value as (prevState: string[]) => string[])(
                          state.selectedThemes,
                      )
                    : value,
        });
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
