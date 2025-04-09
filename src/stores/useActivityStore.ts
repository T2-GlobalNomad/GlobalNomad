import { create } from "zustand";

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface ActivityData {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: { id: number; imageUrl: string }[];
  subImageFiles: File[]; 
  startTime: string;
  endTime: string;  
  date: string;
  bannerImageFile: File | null;
  latitude?: number;
  longitude?: number;
  subImageUrlsToAdd: string[];
  subImageIdsToRemove:number[];
  schedulesToAdd: Schedule[];
  scheduleIdsToRemove: number[];
}
interface ActivityStore {
    activity: ActivityData;
    setActivity: (
      data: Partial<ActivityData> | ((prev: ActivityData) => Partial<ActivityData>)
    ) => void;
    addSchedule: () => void;
    removeSchedule: (index: number) => void;
    updateSchedule: (index: number, field: keyof Schedule, value: string) => void;
    resetActivity: () => void; // ✅ 이 줄 추가
  }
  
  const initialActivityState: ActivityData = {
    title: "",
    category: "",
    description: "",
    address: "",
    price: 0,
    schedules: [],
    bannerImageUrl: "",
    subImageUrls: [],
    subImageFiles: [],
    date: "",
    startTime: "0:00",
    endTime: "0:00",
    bannerImageFile: null,
    latitude: undefined,
    longitude: undefined,
    subImageUrlsToAdd: [],
    subImageIdsToRemove:[],
    schedulesToAdd: [],
    scheduleIdsToRemove: [],
  };
  
  export const useActivityStore = create<ActivityStore>((set) => ({
    activity: { ...initialActivityState },
  
    setActivity: (data) =>
      set((state) => ({
        activity: {
          ...state.activity,
          ...(typeof data === 'function' ? data(state.activity) : data),
        },
        // activity: { ...state.activity, ...data },
      })),
  
    addSchedule: () =>
      set((state) => {
        const { date, startTime, endTime, schedules } = state.activity;
        if (!date) {
          alert("날짜를 입력하세요!");
          return state;
        }
        return {
          activity: {
            ...state.activity,
            schedules: [...schedules, { date, startTime, endTime }],
          },
        };
      }),
  
    removeSchedule: (index) =>
      set((state) => ({
        activity: {
          ...state.activity,
          schedules: state.activity.schedules.filter((_, i) => i !== index),
        },
      })),
  
    updateSchedule: (index, field, value) =>
      set((state) => ({
        activity: {
          ...state.activity,
          schedules: state.activity.schedules.map((schedule, i) =>
            i === index ? { ...schedule, [field]: value } : schedule
          ),
        },
      })),
  
    resetActivity: () => set({ activity: { ...initialActivityState } }), // ✅ 여기가 핵심
  }));
  