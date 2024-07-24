import React from 'react';

// 필요한 것
// 바뀌는 라벨(필수)
// 뒤로가기 버튼 (옵셔널)
// 검색 버튼 돋보기(옵셔널)
// 엑스 버튼 (옵셔널)
// 알림 버튼 (옵셔널)
// 수정 버튼 (옵셔널)
// 설정 버튼 톱니바퀴 (옵셔널)

// 메인에는 없네...?????

// 검색 /search (뒤로가기, 엑스버튼)
// 위치 검색 /search?mode=location (뒤로가기, 엑스버튼)
// 날짜 선택 /search?mode=date (뒤로가기, 엑스버튼)
// 모집중 여정 /trips (검색버튼돋보기, 알림버튼)
// 없음 /write (뒤로가기) <== 여행지 선택, 날짜 선택, 여정 유형 선택, 추가 정보 선택, 여정 글쓰기, 글쓰기 완료
// 없음 /trips/[id] (뒤로가기, 수정)
// 채팅방 명 /chat/[id] (뒤로가기)
// 채팅목록 /chat (뒤로가기)
// 마이페이지 /[id] 인데 buddy.buddy_id 가 자신이면 (설정버튼톱니바퀴)
// 프로필 /[id] 인데 buddy.buddy_id 가 자신이 아니면
// 내 정보 수정 /editprofile?? (뒤로가기)

const MobileHeader: React.FC = () => {
    return (
        <header>
            <div></div>
        </header>
    );
};

export default MobileHeader;
