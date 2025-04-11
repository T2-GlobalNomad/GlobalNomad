export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Map {
        constructor(
          container: HTMLElement,
          options: {
            center: LatLng;
            level: number;
          },
        );

        setCenter(latlng: LatLng): void;
      }

      class Marker {
        constructor(options: { map: Map; position: LatLng });
      }

      namespace services {
        class Geocoder {
          addressSearch(
            address: string,
            callback: (result: Address[], status: Status) => void,
          ): void;
        }

        interface Address {
          address_name: string;
          y: string;
          x: string;
          zip_code: string;
          region_1depth_name: string;
          region_2depth_name: string;
          region_3depth_name: string;
          road_name: string;
          underground_yn: 'Y' | 'N';
          main_building_no: string;
          sub_building_no: string;
          building_name: string;
          zone_no: string;
        }

        type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';
      }

      function load(callback: () => void): void;
    }
  }
}
