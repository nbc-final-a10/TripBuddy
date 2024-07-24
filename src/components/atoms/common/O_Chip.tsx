import { SecondLevelNames } from '@/types/Location.types';
import { MBTI } from '@/types/Mbtis.types';
import { BuddyTheme, TripTheme } from '@/types/Themes.types';
import { tailwindMerge } from '@/utils/ui/tailwind_merge';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const chipVariants = cva(
    [
        'text-sm',
        'text-center',
        'border',
        'rounded-full',
        'px-2.5',
        'py-0.5',
        'transition-opacity',
        'whitespace-nowrap',
        'cursor-pointer',
    ],
    {
        variants: {
            intent: {
                인기: 'bg-blue-500 border-blue-500 text-white',
                '서울/경기': 'bg-gray-500 border-gray-500 text-white',
                경상남도: 'bg-red-500 border-red-500 text-white',
                경상북도: 'bg-yellow-500 border-yellow-500 text-white',
                충청남도: 'bg-violet-500 border-violet-500 text-white',
                충청북도: 'bg-white border-black text-black',
                전라남도: 'bg-white border-black text-black',
                전라북도: 'bg-white border-black text-black',
                제주도: 'bg-white border-black text-black',

                아시아: 'bg-white border-black text-black',
                유럽: 'bg-white border-black text-black',
                아프리카: 'bg-white border-black text-black',
                아메리카: 'bg-white border-black text-black',
                오세아니아: 'bg-white border-black text-black',

                계획: 'bg-white border-black text-black',
                즉흥: 'bg-white border-black text-black',
                빨리빨리: 'bg-white border-black text-black',
                느긋느긋: 'bg-white border-black text-black',
                촬영: 'bg-white border-black text-black',
                감상: 'bg-white border-black text-black',
                깔끔쟁이: 'bg-white border-black text-black',
                자연인: 'bg-white border-black text-black',
                가성비: 'bg-white border-black text-black',
                가심비: 'bg-white border-black text-black',

                도시: 'bg-white border-black text-black',
                자연: 'bg-white border-black text-black',
                유명맛집: 'bg-white border-black text-black',
                로컬맛집: 'bg-white border-black text-black',
                힐링: 'bg-white border-black text-black',
                액티비티: 'bg-white border-black text-black',
                쇼핑: 'bg-white border-black text-black',
                관광: 'bg-white border-black text-black',

                INTJ: 'bg-violet-700 border-violet-700 text-white',
                INTP: 'bg-violet-600 border-violet-600 text-white',
                ENTJ: 'bg-fuchsia-500 border-fuchsia-500 text-white',
                ENTP: 'bg-fuchsia-4000 border-fuchsia-400 text-white',
                INFJ: 'bg-lime-500 border-lime-500 text-white',
                INFP: 'bg-lime-400 border-lime-400 text-white',
                ENFJ: 'bg-green-500 border-green-500 text-white',
                ENFP: 'bg-green-400 border-green-400 text-white',
                ISTJ: 'bg-sky-500 border-sky-500 text-white',
                ISFJ: 'bg-sky-400 border-sky-400 text-white',
                ESTJ: 'bg-blue-500 border-blue-500 text-white',
                ESFJ: 'bg-blue-400 border-blue-400 text-white',
                ISTP: 'bg-orange-500 border-orange-500 text-white',
                ISFP: 'bg-orange-400 border-orange-400 text-white',
                ESTP: 'bg-amber-500 border-amber-500 text-white',
                ESFP: 'bg-amber-400 border-amber-400 text-white',
            },
            variant: {
                selected: 'opacity-100',
                unselected: 'opacity-60',
            },
        },
        defaultVariants: {
            intent: '인기',
            variant: 'unselected',
        },
    },
);

type ChipVariantsType = VariantProps<typeof chipVariants>;

type ChipProps = {
    children: SecondLevelNames | MBTI | TripTheme | BuddyTheme;
    selected: boolean;
    onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
} & ChipVariantsType &
    React.ComponentProps<'span'>;

function Chip({ children, intent, selected, onClick, ...props }: ChipProps) {
    return (
        <span
            className={tailwindMerge(
                chipVariants({
                    intent,
                    variant: selected ? 'selected' : 'unselected',
                }),
                props.className,
            )}
            {...props}
            onClick={onClick}
        >
            {children}
        </span>
    );
}

export default Chip;
