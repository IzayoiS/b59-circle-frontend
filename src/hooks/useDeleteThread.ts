import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/libs/api';

export function useDeleteThread(threadId: string, userId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/threads/${threadId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-posts', userId] });
    },
  });

  return mutation;
}
