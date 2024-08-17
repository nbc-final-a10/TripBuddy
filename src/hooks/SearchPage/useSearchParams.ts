import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useUrlParams() {
    const searchParams = useSearchParams();
    const [params, setParams] = useState(
        new URLSearchParams(searchParams.toString()),
    );

    useEffect(() => {
        setParams(new URLSearchParams(searchParams.toString()));
    }, [searchParams]);

    // 파라미터 업데이트 함수
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

    return { params, updateParams };
}
