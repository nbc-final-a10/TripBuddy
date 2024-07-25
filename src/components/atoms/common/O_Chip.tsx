import { type SecondLevelNames } from '@/types/Location.types';
import { type MBTI } from '@/types/Mbtis.types';
import { type BuddyTheme, type TripTheme } from '@/types/Themes.types';
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
                small: 'bg-white text-black rounded-md px-2 py-0.3',
                'Seoul/Gyeonggi': 'bg-gray-500 border-gray-500 text-white',
                Gyeongsangnamdo: 'bg-red-500 border-red-500 text-white',
                Gyeongsangbukdo: 'bg-yellow-500 border-yellow-500 text-white',
                Chungcheongnamdo: 'bg-violet-500 border-violet-500 text-white',
                Chungcheongbukdo: 'bg-red-400 border-red-400 text-white',
                Jeonlamdo: 'bg-yellow-400 border-yellow-400 text-white',
                Jeonrabukdo: 'bg-blue-400 border-blue-400 text-white',
                Gangwondo: 'bg-green-400 border-green-400 text-white',
                Jejudo: 'bg-purple-400 border-purple-400 text-white',

                Asia: 'bg-slate-500 border-slate-500 text-white',
                Europe: 'bg-fuchsia-500 border-fuchsia-500 text-white',
                Africa: 'bg-amber-500 border-amber-500 text-white',
                America: 'bg-lime-500 border-lime-500 text-white',
                Oceania: 'bg-sky-500 border-sky-500 text-white',

                plan: 'bg-slate-500 border-slate-500 text-white',
                improvise: 'bg-fuchsia-500 border-fuchsia-500 text-white',
                fast: 'bg-red-500 border-red-500 text-white',
                slow: 'bg-lime-500 border-lime-500 text-white',
                photo: 'bg-white border-black text-black',
                review: 'bg-black border-black text-white',
                clean: 'bg-pink-400 border-pink-400 text-white',
                natural: 'bg-green-600 border-green-600 text-white',
                'cost-effective': 'bg-blue-600 border-blue-600 text-white',
                satisfaction: 'bg-amber-400 border-amber-400 text-white',

                city: 'bg-red-400 border-red-400 text-white',
                nature: 'bg-green-400 border-green-400 text-white',
                'famous-food': 'bg-blue-500 border-blue-500 text-white',
                'local-food': 'bg-fuchsia-500 border-fuchsia-500 text-white',
                healing: 'bg-lime-400 border-lime-400 text-white',
                activity: 'bg-orange-400 border-orange-400 text-white',
                shopping: 'bg-purple-400 border-purple-400 text-white',
                tour: 'bg-white border-black text-black',

                INTJ: 'bg-violet-700 border-violet-700 text-white',
                INTP: 'bg-violet-600 border-violet-600 text-white',
                ENTJ: 'bg-fuchsia-500 border-fuchsia-500 text-white',
                ENTP: 'bg-fuchsia-400 border-fuchsia-400 text-white',
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
                unselected: 'opacity-40',
                small: 'text-xs',
            },
        },
        defaultVariants: {
            intent: 'small',
            variant: 'unselected',
        },
        compoundVariants: [
            {
                intent: 'small',
                variant: 'selected',
                className: 'bg-gray-7000 text-white opacity-100',
            },
            {
                intent: 'small',
                variant: 'unselected',
                className: 'bg-white text-black opacity-100',
            },
        ],
    },
);

type ChipVariantsType = VariantProps<typeof chipVariants>;

type ChipProps = {
    label?: SecondLevelNames | MBTI | TripTheme | BuddyTheme;
    children?: React.ReactNode;
    selected?: boolean;
    onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
} & ChipVariantsType &
    React.ComponentProps<'span'>;

function Chip({
    label,
    children,
    intent,
    selected = false,
    onClick,
    ...props
}: ChipProps) {
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
            {label}
            {children}
        </span>
    );
}

export default Chip;
