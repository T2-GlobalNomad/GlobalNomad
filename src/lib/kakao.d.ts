/* kakaoMap */

interface MapOptions {
  center: kakao.maps.LatLng;
  level?: number;
  mapTypeId?: string; // 문자열로 간단 처리 가능
}

declare namespace kakao {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(latlng: LatLng): void;
    }

    class Marker {
      constructor(options: { map: Map; position: LatLng });
    }

    namespace services {
      interface Address {
        x: string;
        y: string;
      }

      type Status = 'OK' | 'ERROR';

      class Geocoder {
        addressSearch(
          address: string,
          callback: (result: Address[], status: Status) => void,
        ): void;
      }
    }

    function load(callback: () => void): void;
  }
}
