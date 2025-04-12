'use client';
import Input from './customInput';
import styles from './AddressInput.module.css';
import { useActivityStore } from '@/stores/useActivityStore';

import { useRef, useState } from 'react';
import Script from 'next/script';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DaumPostcode from 'react-daum-postcode';
import CustomButton from '@/components/CustomButton';

declare global {
  interface Window {
    kakao: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

interface DaumPostcodeData {
  address: string;
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;

}

interface KakaoGeocoderResult {
  address_name: string;
  y: string;
  x: string;

}

export default function AddressInput() {

  
  const { activity, setActivity } = useActivityStore();
  const mapInstance = useRef<any>(null);  // eslint-disable-line @typescript-eslint/no-explicit-any
  const markerInstance = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [daumLoaded, setDaumLoaded] = useState(false);
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const scriptLoaded = daumLoaded && kakaoLoaded; // 둘 다 로드됐을 때만 true

  const handleSearchAddress = () => {
    if (!scriptLoaded || !window.daum?.Postcode || !window.kakao?.maps) {
      alert('주소 검색 기능이 아직 준비되지 않았습니다.');
      console.log('카카오 키 확인:', process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
      console.log('window.daum:', window.daum);
      console.log('window.kakao:', window.kakao);
      return;
    }
  
    new window.daum.Postcode({
      oncomplete: function (data: DaumPostcodeData) {
        const selectedAddress = data.address;
        setActivity({ address: selectedAddress });
  
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(selectedAddress, function (results:  KakaoGeocoderResult[], status: string) {
          if (status === window.kakao.maps.services.Status.OK) {
            const result = results[0];
            const coords = new window.kakao.maps.LatLng(result.y, result.x);
            setActivity({
              address: selectedAddress,
              latitude: parseFloat(result.y),
              longitude: parseFloat(result.x),
            });
  
            if (mapInstance.current && markerInstance.current) {
              mapInstance.current.setCenter(coords);
              markerInstance.current.setPosition(coords);
            }
          }
        });
      },
    }).open();
  };

  return (
    <>
    <Script
  src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  strategy="lazyOnload"
  onLoad={() => setDaumLoaded(true)}
/>

<Script
  src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services`}
  strategy="lazyOnload"
  onLoad={() => setKakaoLoaded(true)}
/>
      <div className={styles.container}>
        <p className={styles.title}>주소</p>
        <div className={styles.inputWrapper}>
          <Input
            placeholder='주소'
            id='address'
            type='string'
            value={activity.address || ''}
            onChange={(e) => setActivity({ address: e.target.value })}
            className={styles.inputField}
          />
          <CustomButton
            onClick={handleSearchAddress}
            fontSize='md'
            className={`customButton-black ${styles.custombutton}`}
          >
            주소찾기
          </CustomButton>
        </div>
      </div>
    </>
  );
}
