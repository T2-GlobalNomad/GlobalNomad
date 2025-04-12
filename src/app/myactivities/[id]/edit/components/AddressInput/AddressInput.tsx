'use client';
import Input from './customInput';
import styles from './AddressInput.module.css';
import { useActivityStore } from '@/stores/useActivityStore';

import { useRef } from 'react';
import Script from 'next/script';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DaumPostcode from 'react-daum-postcode';
import CustomButton from '@/components/CustomButton';

declare global {
  interface Window {
    kakao: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export default function AddressInput() {
  const { activity, setActivity } = useActivityStore();
  const mapInstance = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const markerInstance = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const handleSearchAddress = () => {
    if (!window.daum?.Postcode || !window.kakao?.maps) return;

    new window.daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      oncomplete: function (data: any) {
        const selectedAddress = data.address;
        setActivity({ address: selectedAddress }); // 💡 store에 저장

        const geocoder = new window.kakao.maps.services.Geocoder();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geocoder.addressSearch(selectedAddress, function (results: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const result = results[0];
            const coords = new window.kakao.maps.LatLng(result.y, result.x);

            setActivity({
              address: selectedAddress,
              latitude: parseFloat(result.y), // 위도
              longitude: parseFloat(result.x), // 경도
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
      <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' strategy='beforeInteractive' />
      <div className={styles.container}>
        <p className={styles.title}>주소</p>
        <div className={styles.inputWrapper}>
          <Input placeholder='주소' id='address' type='string' value={activity.address || ''} onChange={(e) => setActivity({ address: e.target.value })} className={styles.inputField} />
          <CustomButton onClick={handleSearchAddress} fontSize='md' className={`customButton-black ${styles.custombutton}`}>
            주소찾기
          </CustomButton>
        </div>
      </div>
    </>
  );
}
