import { locationData } from '@/data/location';

type LocationName = {
    ko: string;
    en: string;
};

type SubLocation = {
    name: string;
};

type NestedSubLocation = {
    name: LocationName;
    subLocations: SubLocation[];
};

type LocationData = {
    name: LocationName;
    subLocations: (NestedSubLocation | SubLocation)[];
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

type LocationDataType = typeof locationData;
type Location =
    LocationDataType[number]['subLocations'][number]['subLocations'][number];

// type ExtractThirdLevelNames<T extends { subLocations?: readonly any[] }> =
//     T['subLocations'] extends readonly (infer U)[]
//         ? U extends { subLocations: readonly (infer V)[] }
//             ? V extends { name: infer W }
//                 ? W
//                 : never
//             : never
//         : never;

// export type ThirdLevelNames = ExtractThirdLevelNames<
//     (typeof locationData)[number]['subLocations'][number]
// >;

// type ExtractThirdLevelNames<T extends { subLocations?: readonly any[] }> =
//     T['subLocations'] extends readonly (infer U)[]
//         ? U extends { subLocations: readonly (infer V)[] }
//             ? V extends { name: { ko: infer W } }
//                 ? W
//                 : never
//             : never
//         : never;

// export type ThirdLevelNames = ExtractThirdLevelNames<
//     (typeof locationData)[number]['subLocations'][number]
// >;
