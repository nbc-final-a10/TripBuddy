import { BuddyTheme, TripTheme } from '@/types/Themes.types';

const handleChipClick = (
    target: EventTarget & HTMLSpanElement,
    data: (TripTheme | BuddyTheme)[],
    prevSelected: string[],
    setSelected: (value: string[]) => void,
) => {
    if (prevSelected.includes(target.innerText)) {
        // 선택 해제
        const newSelected = prevSelected.filter(
            selected => selected !== target.innerText,
        );
        setSelected(newSelected);
    } else if (prevSelected.length < 3) {
        // 새로운 선택 추가
        setSelected([...prevSelected, target.innerText]);
    } else {
        // 선택된 Chip이 3개일 때, 가장 가까운 인덱스의 Chip을 해제하고 새로운 선택 추가
        const newSelected = [...prevSelected];
        const targetIndex = data.findIndex(item => item === target.innerText);
        const indexToReplace = prevSelected
            .map(selected => data.findIndex(item => item === selected))
            .reduce(
                (prev, curr, idx) =>
                    Math.abs(curr - targetIndex) < Math.abs(prev - targetIndex)
                        ? idx
                        : prev,
                0,
            );
        newSelected[indexToReplace] = target.innerText;
        setSelected(newSelected);
    }
};

export default handleChipClick;
