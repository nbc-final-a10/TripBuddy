import { VariantProps, cva } from 'class-variance-authority';

const chipVariants = cva(
    [
        'text-sm',
        'border',
        'rounded-full',
        'px-2.5',
        'py-0.5',
        'hover:opacity-50',
        'transition-opacity',
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
        },
        defaultVariants: {
            intent: '인기',
        },
    },
);

type ChipVariantsType = VariantProps<typeof chipVariants>;

type ChipProps = {
    label: string;
} & ChipVariantsType;

function Chip({ label, intent }: ChipProps) {
    return <div className={chipVariants({ intent })}>{label}</div>;
}

export default Chip;
