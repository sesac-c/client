const { kakao } = window;

export function getCoords(address: string) {
  // x좌표, y좌표 얻기
  var geocoder = new kakao.maps.services.Geocoder();
  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(address, function (search: any, status: any) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      return {
        longitude: search[0].x,
        latitude: search[0].y
      };
    }
  });

  return null;
}

export const handleAddress = (
  data: {
    address: string;
    sido: string;
    sigungu: string;
    addressType: 'R' | 'J' | 'r' | 'j';
    bname: string;
    buildingName: string;
  },
  setFuc?: (address: string) => void
) => {
  let fullAddress = data.address;
  let extraAddress = '';
  let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
  if (data.addressType === 'R') {
    //주소타입이 도로명주소일 경우
    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }
  }
  fullAddress = fullAddress.replace(localAddress, ''); //지역주소 제외 전체주소 치환
  const result = localAddress + (fullAddress += extraAddress !== '' ? `(${extraAddress})` : '');

  setFuc && setFuc(result);
  console.log(result);
};
