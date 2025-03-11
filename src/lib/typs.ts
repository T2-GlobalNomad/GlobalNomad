/** 
 * 사용 방법
  import {Reservation} from './types';
  const myReservation: Reservation = {
    id: data.id,
    title: data.title,
    price: data.price
    ...
  };
*/

export interface Activities {
  id?: number;
  userId?: number;
  title?: string;
  description?: string;
  category?: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  price?: number;
  address?: string;
  bannerImageUrl?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: number;
  email?: string;
  password?: string;
  nickname?: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Reservation {
  id?: number;
  teamId?: number;
  userId?: number;
  activityId?: number;
  scheduleId?: number;
  status?: "pending" | "confirmed" | "declined";
  reviewSubmitted?: boolean;
  totalPrice?: number;
  headCount?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  createdAt?: string;
  updatedAt?: string;
}
