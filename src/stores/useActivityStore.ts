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
  subImageUrls: string[];
  subImageFiles: File[]; 
  startTime: string;
  endTime: string;  
  date: string;
  bannerImageFile: File | null;
  latitude?: number;
  longitude?: number;

}

interface ActivityStore {
  activity: ActivityData;
  setActivity: (data: Partial<ActivityData>) => void;
  addSchedule: () => void;
  removeSchedule: (index: number) => void;
  updateSchedule: (index: number, field: keyof Schedule, value: string) => void;
}
export const useActivityStore = create<ActivityStore>((set) => ({
  activity: {
      title: "",
      category: "",
      description: "",
      address: "",
      price: 0,
      schedules: [],
      bannerImageUrl: "",
      subImageUrls: [],
      subImageFiles: [],
      date: "",  // ✅ 추가됨
      startTime: "0:00", // 기본값
      endTime: "0:00",   // 기본값
      bannerImageFile: null,
      longitude: undefined,
      latitude: undefined,
  },

  setActivity: (data) =>
      set((state) => ({
          activity: { ...state.activity, ...data },
          
      })),

  addSchedule: () =>
      set((state) => {
          const { date, startTime, endTime, schedules } = state.activity;
          if (!date) {
              alert("날짜를 입력하세요!"); // ❌ 날짜가 없으면 추가 방지
              return state;
          }
          return {
              activity: {
                  ...state.activity,
                  schedules: [
                      ...schedules,
                      { date, startTime, endTime }, // ✅ 명확하게 date 추가!
                  ],
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
}));
