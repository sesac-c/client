function formatDate(date) {
    /**
     * 날짜 문자열을 "yyyy년 mm월 dd일" 형식으로 변환하는 함수
     * @param {string} dateString - ISO 8601 형식의 날짜 문자열
     * @returns {string} - 포맷팅된 날짜 문자열
     */
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일`;
}
function formatTime(date) {

    /**
     * 시간 문자열을 "hh시 mm분 ss초" 형식으로 변환하는 함수
     * @param {string} dateString - ISO 8601 형식의 날짜 문자열
     * @returns {string} - 포맷팅된 시간 문자열
     */
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}시 ${minutes}분 ${seconds}초`;
}


export function formatDateToKorean(dateString) {
    const date = new Date(dateString);

    return formatDate(date);
}

export function formatTimeToKorean(dateString) {
    const date = new Date(dateString);

    return formatTime(date);
}

export function formateDateTimeToKorean(dateString) {
    const date = new Date(dateString);
    return `${formatDate(date)} ${formatTime(date)}`
}