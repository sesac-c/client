import { KakaoMapProps } from '@/types';
import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;
const KakaoMap: React.FC<KakaoMapProps> = ({ longitude, latitude }) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude), // props로 받은 위도, 경도를 중심으로 설정
      level: 2 // 확대 레벨
    };
    const newMap = new kakao.maps.Map(container, options);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude)
    });
    marker.setMap(newMap);
  }, [latitude, longitude]);

  return (
    <div>
      <div
        id='map'
        style={{
          width: '100%',
          aspectRatio: '16 / 9'
        }}
      ></div>
    </div>
  );
};

export default KakaoMap;
