import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useUrlParams() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [params, setParams] = useState(
        new URLSearchParams(searchParams.toString()),
    );

    useEffect(() => {
        setParams(new URLSearchParams(searchParams.toString()));
    }, [searchParams]);

    const updateParams = (
        newParams: Record<string, string | number | null>,
    ) => {
        const updatedParams = new URLSearchParams(params.toString());
        let hasChange = false;

        Object.keys(newParams).forEach(key => {
            if (newParams[key] === null || newParams[key] === '') {
                updatedParams.delete(key);
                hasChange = true;
            } else {
                updatedParams.set(key, newParams[key].toString());
                hasChange = true;
            }
        });

        if (hasChange) {
            // 새로 설정된 값으로 업데이트
            window.history.replaceState({}, '', `?${updatedParams.toString()}`);
            setParams(updatedParams);
        }
        return { params, updateParams };
    };

    // url 쿼리 파라미터 업데이트
    const updateQueryParams = (
        params: Record<string, string | number | null | string[]>,
    ) => {
        const query = new URLSearchParams();
        for (const key in params) {
            const value = params[key];
            if (Array.isArray(value)) {
                value.forEach(i => query.append(key, i));
            } else if (value != null) {
                query.set(key, String(value));
            }
        }
        router.push(`/search?${query.toString()}`);
    };

    return { params, updateParams, updateQueryParams };
}
