import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { ComponentProps, PropsWithChildren } from 'react';

const buttonVariant = cva(
    'border rounded font-semibold transition hover:brightness-90 active:brightness-75',
    {
        variants: {
            intent: {
                primary: 'border-main-color',
                secondary: 'border-secondary-color',
                danger: 'border-red-500',
                onBoarding: 'w-[90%] h-[88px] bg-transparent font-semibold',
            },
            size: {
                sm: 'px-3 py-1 text-[13px]',
                md: 'px-4 py-1.5 text-[15px]',
                lg: 'px-5 py-2 text-[17px]',
            },
            variant: {
                selected: 'border-[#9E6B00] text-[#9E6B00]',
                unselected: 'text-black',
            },
        },
        compoundVariants: [
            {
                intent: 'onBoarding',
                variant: 'selected',
                className: 'border-[#9E6B00] text-[#9E6B00] bg-main-color/50',
            },
            {
                intent: 'onBoarding',
                variant: 'unselected',
                className: 'text-black',
            },
            // {
            //     intent: 'primary',
            //     variant: 'unselected',
            //     className: 'text-main-color',
            // },
            // {
            //     intent: 'secondary',
            //     variant: 'selected',
            //     className: 'bg-secondary-color',
            // },
            // {
            //     intent: 'secondary',
            //     variant: 'unselected',
            //     className: 'text-secondary-color',
            // },
            // { intent: 'danger', variant: 'selected', className: 'bg-red-500' },
            // {
            //     intent: 'danger',
            //     variant: 'unselected',
            //     className: 'text-red-500',
            // },
        ],
        defaultVariants: {
            intent: 'primary',
            size: 'md',
            variant: 'selected',
        },
    },
);

type ButtonVariantType = VariantProps<typeof buttonVariant>;

type ButtonProps = {
    selected: boolean;
} & ButtonVariantType &
    (
        | ({} & ComponentProps<'button'>)
        | ({ href: string } & ComponentProps<typeof Link>)
    );

function Button({
    intent = 'primary',
    size = 'md',
    selected,
    children,
    ...props
}: PropsWithChildren<ButtonProps>) {
    if ('href' in props) {
        return (
            <a
                className={buttonVariant({
                    intent,
                    size,
                    variant: selected ? 'selected' : 'unselected',
                })}
                {...props}
            >
                {children}
            </a>
        );
    } else {
        return (
            <button
                className={buttonVariant({
                    intent,
                    size,
                    variant: selected ? 'selected' : 'unselected',
                })}
                {...props}
            >
                {children}
            </button>
        );
    }
}

export default Button;
