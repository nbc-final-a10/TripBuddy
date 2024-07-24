// locationData[0].name === 국내
// locationData[0].subLocations[0].name === 서울특별시
// locationData[0].subLocations[0].subLocations[0].name === 종로구

// [locationData[0].name, locationData[0].subLocations[0].name, locationData[0].subLocations[0].subLocations[0].name]

const locationData = [
    {
        name: '국내',
        subLocations: [
            {
                name: '서울/경기',
                subLocations: [
                    { name: '서울시' },
                    { name: '수원시' },
                    { name: '고양시' },
                    { name: '용인시' },
                    { name: '성남시' },
                    { name: '화성시' },
                    { name: '의정부시' },
                    { name: '안산시' },
                    { name: '부천시' },
                    { name: '남양주시' },
                    { name: '평택시' },
                    { name: '안양시' },
                    { name: '시흥시' },
                    { name: '인천시' },
                ],
            },
            {
                name: '경상남도',
                subLocations: [
                    { name: '부산시' },
                    { name: '창원시' },
                    { name: '울산시' },
                    { name: '대구시' },
                    { name: '진주시' },
                    { name: '거제시' },
                    { name: '양산시' },
                    { name: '밀양시' },
                    { name: '합천군' },
                    { name: '함양군' },
                    { name: '산청군' },
                    { name: '의령군' },
                    { name: '기장군' },
                    { name: '고성군' },
                ],
            },
            {
                name: '경상북도',
                subLocations: [
                    { name: '상주시' },
                    { name: '안동시' },
                    { name: '경주시' },
                    { name: '포항시' },
                    { name: '김천시' },
                    { name: '구미시' },
                    { name: '문경시' },
                    { name: '예천군' },
                    { name: '영주시' },
                    { name: '영양군' },
                    { name: '영덕군' },
                    { name: '경산시' },
                    { name: '고령군' },
                    { name: '봉화군' },
                ],
            },
            {
                name: '충청남도',
                subLocations: [
                    { name: '당진시' },
                    { name: '서산시' },
                    { name: '아산시' },
                    { name: '천안시' },
                    { name: '공주시' },
                    { name: '논산시' },
                    { name: '보령시' },
                    { name: '부여군' },
                    { name: '홍성군' },
                    { name: '예산군' },
                    { name: '태안군' },
                    { name: '금산군' },
                ],
            },
            {
                name: '충청북도',
                subLocations: [
                    { name: '진천군' },
                    { name: '음성군' },
                    { name: '충주시' },
                    { name: '제천시' },
                    { name: '단양군' },
                    { name: '괴산군' },
                    { name: '청주시' },
                    { name: '보은군' },
                    { name: '옥천군' },
                    { name: '영동군' },
                ],
            },
            {
                name: '전라남도',
                subLocations: [
                    { name: '영광군' },
                    { name: '장성군' },
                    { name: '담양군' },
                    { name: '곡성군' },
                    { name: '구례군' },
                    { name: '광양시' },
                    { name: '여수시' },
                    { name: '나주시' },
                    { name: '화순군' },
                    { name: '순천시' },
                    { name: '보성군' },
                    { name: '고흥군' },
                    { name: '장흥군' },
                    { name: '강진군' },
                    { name: '해남군' },
                    { name: '완도군' },
                    { name: '진도군' },
                    { name: '신안군' },
                ],
            },
            {
                name: '전라북도',
                subLocations: [
                    { name: '군산시' },
                    { name: '익산시' },
                    { name: '완주군' },
                    { name: '진안군' },
                    { name: '무주군' },
                    { name: '장수군' },
                    { name: '남원시' },
                    { name: '임실군' },
                    { name: '전주시' },
                    { name: '김제시' },
                    { name: '부안군' },
                    { name: '정읍시' },
                    { name: '고창군' },
                    { name: '순창군' },
                ],
            },
            {
                name: '강원도',
                subLocations: [
                    { name: '철원군' },
                    { name: '화천군' },
                    { name: '춘천시' },
                    { name: '양구군' },
                    { name: '고성군' },
                    { name: '인제군' },
                    { name: '속초시' },
                    { name: '양양군' },
                    { name: '강릉시' },
                    { name: '영월군' },
                    { name: '동해시' },
                    { name: '삼척시' },
                    { name: '태백시' },
                    { name: '평창군' },
                    { name: '횡성군' },
                    { name: '원주시' },
                ],
            },
            {
                name: '제주도',
                subLocations: [{ name: '서귀포시' }, { name: '제주시' }],
            },
        ],
    },
    {
        name: '국외',
        subLocations: [
            {
                name: '아시아',
                subLocations: [
                    { name: '일본' },
                    { name: '중국' },
                    { name: '한국' },
                    { name: '베트남' },
                    { name: '대만' },
                    { name: '마카오' },
                    { name: '홍콩' },
                    { name: '싱가포르' },
                    { name: '태국' },
                    { name: '인도' },
                    { name: '필리핀' },
                    { name: '캄보디아' },
                    { name: '방글라데시' },
                    { name: '네팔' },
                    { name: '몽골' },
                    { name: '카자흐스탄' },
                    { name: '투르크메니스탄' },
                    { name: '파키스탄' },
                    { name: '이란' },
                    { name: '사우디아라비아' },
                    { name: '카타르' },
                    { name: '이스라엘' },
                    { name: '튀르키예' },
                    { name: '아랍에미리트' },
                ],
            },
            {
                name: '유럽',
                subLocations: [
                    { name: '프랑스' },
                    { name: '독일' },
                    { name: '스페인' },
                    { name: '이탈리아' },
                    { name: '네덜란드' },
                    { name: '노르웨이' },
                    { name: '스웨덴' },
                    { name: '덴마크' },
                    { name: '오스트리아' },
                    { name: '체코' },
                    { name: '영국' },
                    { name: '폴란드' },
                    { name: '벨라루스' },
                    { name: '스위스' },
                    { name: '아일랜드' },
                    { name: '벨기에' },
                    { name: '핀란드' },
                    { name: '우크라이나' },
                ],
            },
            {
                name: '아프리카',
                subLocations: [
                    { name: '나미비아' },
                    { name: '에티오피아' },
                    { name: '케냐' },
                    { name: '탄자니아' },
                    { name: '카메룬' },
                    { name: '코트디부아르' },
                    { name: '남아프리카공화국' },
                    { name: '우간다' },
                    { name: '콩고민주공화국' },
                    { name: '말리' },
                    { name: '나이지리아' },
                    { name: '세네갈' },
                    { name: '토고' },
                    { name: '카메룬' },
                    { name: '알제리' },
                    { name: '이집트' },
                    { name: '모로코' },
                    { name: '수단' },
                    { name: '튀니지' },
                    { name: '마다가스카르' },
                    { name: '잠비아' },
                    { name: '짐바브웨' },
                ],
            },
            {
                name: '아메리카',
                subLocations: [
                    { name: '과테말라' },
                    { name: '미국' },
                    { name: '멕시코' },
                    { name: '바하마' },
                    { name: '아이티' },
                    { name: '앤티카 바부다' },
                    { name: '엘살바도르' },
                    { name: '캐나다' },
                    { name: '온두라스' },
                    { name: '자메이카' },
                    { name: '코스타리카' },
                    { name: '베네수엘라' },
                    { name: '브라질' },
                    { name: '볼리비아' },
                    { name: '에콰도르' },
                    { name: '우루과이' },
                    { name: '칠레' },
                    { name: '콜롬비아' },
                    { name: '페루' },
                    { name: '파라과이' },
                ],
            },
            {
                name: '오세아니아',
                subLocations: [
                    { name: '뉴질랜드' },
                    { name: '인도네시아' },
                    { name: '괌' },
                    { name: '통가' },
                ],
            },
        ],
    },
] as const;
export default locationData;
