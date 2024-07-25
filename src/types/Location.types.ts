import { locationData } from '@/data/location';

export type Location = {
    name: string;
    subLocations?: Location[];
};

// Todo : 이 부분 추가로 공부할 것
type ExtractSecondLevelNames<T extends { subLocations?: readonly any[] }> =
    T['subLocations'] extends readonly (infer U)[]
        ? U extends { name: { ko: infer V } }
            ? V
            : never
        : never;

export type SecondLevelNames = ExtractSecondLevelNames<
    (typeof locationData)[number]
>;
