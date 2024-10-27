const { kakao } = window;

export const getCoordinates = (address: string): Promise<{ longitude: string; latitude: string }> => {
  return new Promise(resolve => {
    if (typeof kakao === 'undefined' || !kakao.maps || !kakao.maps.services) {
      console.error('Kakao Maps API is not loaded');
      resolve({
        longitude: '',
        latitude: ''
      });
      return;
    }

    try {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (search: any, status: any) {
        if (status === kakao.maps.services.Status.OK && search && search.length > 0) {
          resolve({
            longitude: search[0].x,
            latitude: search[0].y
          });
        } else {
          console.warn('Geocoding failed or returned no results:', status);
          resolve({
            longitude: '',
            latitude: ''
          });
        }
      });
    } catch (error) {
      console.error('Error in getCoordinates:', error);
      resolve({
        longitude: '',
        latitude: ''
      });
    }
  });
};

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
