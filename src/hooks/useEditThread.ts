import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/libs/api';

export function useEditThread(threadId: string, userId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await api.patch(`/threads/${threadId}`, { content });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-posts', userId] });
    },
  });

  return mutation;
}
