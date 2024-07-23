'use client';
import { tailwindMerge } from '@/utils/ui/tailwind_merge';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

const InputVariants = cva(
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            intent: {
                true: '',
                false: '',
            },
        },
        defaultVariants: {
            intent: false,
        },
    },
);

type InputVariant = VariantProps<typeof InputVariants>;

type InputProps = {
    type: string;
    placeholder?: string;
    name?: string;
    className?: string;
} & InputVariant;

function Input({
    className,
    type,
    intent,
    name,
    placeholder,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };
    return (
        <div className="relative flex items-center w-full">
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                className={tailwindMerge(InputVariants({ intent }), className)}
                name={name}
                placeholder={placeholder}
                {...props}
            />
            {type === 'password' && (
                <div
                    className="absolute right-3 cursor-pointer text-muted-foreground"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                </div>
            )}
        </div>
    );
}

export default Input;
