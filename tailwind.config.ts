import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        //'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/components/(calendar|button|ripple|spinner).js',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                // 전부 변경 끝나시면 main-color, secondary-color 줄 삭제
                'main-color': '#ffb806',
                'secondary-color': '#2f00ff',
                // Primary Color
                'primary-color-900': '#050300',
                'primary-color-800': '#382600',
                'primary-color-700': '#6b4900',
                'primary-color-600': '#9e6b00',
                'primary-color-500': '#d18e00',
                'primary-color-400': '#ffaf05',
                'primary-color-300': '#ffbf38',
                'primary-color-200': '#ffcf6b',
                'primary-color-100': '#ffe09e',
                'primary-color-50': '#fff0d1',
                // Secondary Color
                'secondary-color-900': '#010104',
                'secondary-color-800': '#070f31',
                'secondary-color-700': '#0d1d5e',
                'secondary-color-600': '#142b84',
                'secondary-color-500': '#1a3ab7',
                'secondary-color-400': '#264be0',
                'secondary-color-300': '#516fe6',
                'secondary-color-200': '#7e94ec',
                'secondary-color-100': '#aab9f3',
                'secondary-color-50': '#d7def9',
                // Primary Color
                'grayscale-color-900': '#141414',
                'grayscale-color-800': '#2e2e2e',
                'grayscale-color-700': '#474747',
                'grayscale-color-600': '#616161',
                'grayscale-color-500': '#7a7a7a',
                'grayscale-color-400': '#949494',
                'grayscale-color-300': '#adadad',
                'grayscale-color-200': '#c7c7c7',
                'grayscale-color-100': '#e0e0e0',
                'grayscale-color-70': '#f4f4f4',
                'grayscale-color-50': '#fafafa',
            },
            scrollbar: ['hidden'],
        },
    },
    plugins: [nextui()],
};
export default config;
