'use client';

import { useEffect } from 'react';

interface KakaoMapProps {
  address: string;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  useEffect(() => {
    const loadMap = () => {
      const container = document.getElementById('map');
      if (!container) return;

      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, mapOption);
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        address,
        (
          result: kakao.maps.services.Address[],
          status: kakao.maps.services.Status,
        ) => {
          if (status === 'OK') {
            const coords = new kakao.maps.LatLng(
              parseFloat(result[0].y),
              parseFloat(result[0].x),
            );
            map.setCenter(coords);
            new kakao.maps.Marker({
              map,
              position: coords,
            });
          }
        },
      );
    };

    if (typeof window === 'undefined') return;

    const scriptId = 'kakao-map-script';
    const scriptExist = document.getElementById(scriptId);

    if (!scriptExist) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=21c9b3dc612bf50d71305d082ca082a5&autoload=false&libraries=services';
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          loadMap();
        });
      };
      document.head.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (window.kakao?.maps?.load) {
          clearInterval(interval);
          window.kakao.maps.load(() => {
            loadMap();
          });
        }
      }, 100);
    }
  }, [address]);

  return (
    <div
      id='map'
      style={{ width: '100%', height: '450px', borderRadius: '16px' }}
    ></div>
  );
}
