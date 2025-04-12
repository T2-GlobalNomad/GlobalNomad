import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/api';

const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => instance.delete(`/my-notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export default useDeleteNotification;
