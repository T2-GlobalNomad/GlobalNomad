type Schedule = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

type SubImages = {
  id: number;
  ImageUrl: string;
};

export interface ActivityType {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  schedules: Schedule[];
  subImages: SubImages[];
  title: string;
  updatedAt: string;
  userId: number;
}
