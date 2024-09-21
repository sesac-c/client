import React, { useState, useEffect } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

interface AddressData {
  address: string;
  addressId: string;
  longitude: number;
  latitude: number;
}

const AddressRegistration: React.FC = () => {
  const [map, setMap] = useState<any>(null);
  const [address, setAddress] = useState<string>('');
  const [addressData, setAddressData] = useState<AddressData | null>(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!map) {
      alert('Map is not initialized yet. Please try again in a moment.');
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, async (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const { address_name, road_address } = result[0];
        const { x, y } = result[0];

        const newAddressData: AddressData = {
          address: address_name,
          addressId: road_address ? road_address.building_name : '',
          longitude: parseFloat(x),
          latitude: parseFloat(y)
        };

        setAddressData(newAddressData);

        // 지도 중심을 검색된 위치로 이동
        const moveLatLon = new kakao.maps.LatLng(y, x);
        map.setCenter(moveLatLon);

        // 마커 생성
        const marker = new kakao.maps.Marker({
          position: moveLatLon
        });
        marker.setMap(map);

        try {
          // Replace 'YOUR_API_ENDPOINT' with your actual server endpoint
          const response = await axios.post('YOUR_API_ENDPOINT', newAddressData);
          console.log('Server response:', response.data);
          alert('Address data saved successfully!');
        } catch (error) {
          console.error('Error saving address data:', error);
          alert('Failed to save address data. Please try again.');
        }
      } else {
        alert('Failed to find address. Please check the input and try again.');
      }
    });
  };

  return (
    <div>
      <h1>Address Registration</h1>
      <div
        id='map'
        style={{
          width: '500px',
          height: '500px',
          marginBottom: '20px'
        }}
      ></div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={address} onChange={handleAddressChange} placeholder='Enter address' required />
        <button type='submit'>Register Address</button>
      </form>
      {addressData && (
        <div>
          <h2>Extracted Address Data:</h2>
          <p>Address: {addressData.address}</p>
          <p>Address ID: {addressData.addressId}</p>
          <p>Longitude: {addressData.longitude}</p>
          <p>Latitude: {addressData.latitude}</p>
        </div>
      )}
    </div>
  );
};

export default AddressRegistration;
