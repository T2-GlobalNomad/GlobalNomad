const BASE_URL = 'https://sp-globalnomad-api.vercel.app/12-2';

interface GetActivityReviewsProps {
  activityId: string;
  page: number;
  size: number;
}

export async function getActivity(activitiyId: string) {
  const response = await fetch(`${BASE_URL}/activities/${activitiyId}`);
  return await response.json();
}

export async function getActivityReviews({
  activityId,
  page,
  size = 3,
}: GetActivityReviewsProps) {
  const response = await fetch(
    `${BASE_URL}/activities/${activityId}/reviews?page=${page}&size=${size}`,
  );
  return await response.json();
}
