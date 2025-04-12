import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/api';
import { Notifications } from '@/lib/types';

const fetchNotifications = async (): Promise<Notifications[]> => {
  const response = await instance.get('/my-notifications');
  return response.data.notifications;
};

const useNotifications = () => {
  return useQuery<Notifications[]>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  });
};

export default useNotifications;
