// 페이지네이션 할 때, 특정 숫자까지의 배열을 만들고 limit 기준으로 자른 배열 만들기
export const sliceArrayByLimit = (totalPage: number, limit: number) => {
    const totalPageArray = Array(totalPage)
        .fill(0)
        .map((_, i) => i + 1);
    // .reverse(); // 배열을 역순으로 정렬

    return Array(Math.ceil(totalPage / limit))
        .fill(0)
        .map(() => totalPageArray.splice(0, limit));
};
