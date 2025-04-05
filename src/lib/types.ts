/** 
* 사용 방법
  import {Reservation} from '@/lib//types';
  const myReservation: Reservation = {
    id: data.id,
    title: data.title,
    price: data.price
    ...
  };
*/

export interface tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setPageSize: (page: number) => void;
  setPage: (page: number) => void;
  setTotalPages: (page: number) => void;
}

/* Activities */

type SubImages = {
  id: number;
  imageUrl: string;
};

type Schedules = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

/**
 * 활동 정보
 * @type {number} id - 활동 ID
 * @type {number} userId - 사용자 ID
 * @type {string} title - 제목
 * @type {string} description - 설명
 * @type {"문화·예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙"} category - 카테고리
 * @type {number} price - 가격
 * @type {string} address - 주소
 * @type {string} bannerImageUrl - 배너 이미지 URL
 * @type {number} rating - 평점
 * @type {number} reviewCount - 리뷰 수
 * @type {string} createdAt - 생성일
 * @type {string} updatedAt - 수정일
 */
export interface Activities {
  id?: number;
  userId?: number;
  title?: string;
  description?: string;
  category?: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  price?: number;
  address?: string;
  bannerImageUrl?: string;
  subImages?: SubImages[];
  schedules?: Schedules[];
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Activities 배열 타입을 명확히 정의
export type ActivitiesArray = Activities[];

/* User */

/**
 * 유저 정보
 * @type {number} id - 유저 ID
 * @type {string} email - 이메일
 * @type {string} password - 비밀번호
 * @type {string} nickname - 닉네임
 * @type {string} profileImageUrl - 프로필 이미지 URL
 * @type {string} createdAt - 생성일
 * @type {string} updatedAt - 수정일
 */

export interface User {
  id?: number;
  email?: string;
  password?: string;
  nickname?: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

/* Resevation */

/**
 * 예약 정보
 * @type {number} id - 예약 ID
 * @type {number} teamId - 팀 ID
 * @type {number} userId - 사용자 ID
 * @type {number} activityId - 활동 ID
 * @type {number} scheduleId - 스케줄 ID
 * @type {"pending" | "confirmed" | "declined"} status - 예약 상태
 * @type {boolean} reviewSubmitted - 리뷰 제출 여부
 * @type {number} totalPrice - 총 가격
 * @type {number} headCount - 인원 수
 * @type {string} date - 날짜
 * @type {string} startTime - 시작 시간
 * @type {string} endTime - 종료 시간
 * @type {string} createdAt - 생성일
 * @type {string} updatedAt - 수정일
 */

interface ReservationActivity {
  bannerImageUrl?: string;
  id: number;
  title: string;
}

export interface Reservation {
  id?: number;
  teamId?: number;
  userId?: number;
  activity: ReservationActivity;
  scheduleId?: number;
  status?: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  reviewSubmitted?: boolean;
  totalPrice?: number;
  headCount?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  createdAt?: string;
  updatedAt?: string;
}

/* Notification */

export interface Notifications {
  id: number;
  userId?: number;
  teamId?: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Notification {
  notifications: Notifications[];
  totalCount: number;
}
