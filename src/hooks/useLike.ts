import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { api } from '@/libs/api';
import { toaster } from '@/components/ui/toaster';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';

interface LikeResponse {
  message: string;
  data: {
    id: string;
    userId: string;
    threadId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function useLike() {
  const queryClient = useQueryClient();

  const { isPending: isPendingLike, mutateAsync: mutateLike } = useMutation<
    LikeResponse,
    Error,
    CreateLikeSchemaDTO
  >({
    mutationKey: ['like'],
    mutationFn: async (data: CreateLikeSchemaDTO) => {
      const response = await api.post<LikeResponse>('/likes', data);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
      await queryClient.invalidateQueries({ queryKey: ['thread-detail'] });
    },
  });

  const { isPending: isPendingUnlike, mutateAsync: mutateUnlike } = useMutation<
    LikeResponse,
    Error,
    DeleteLikeSchemaDTO
  >({
    mutationKey: ['unlike'],
    mutationFn: async (data: DeleteLikeSchemaDTO) => {
      const response = await api.delete<LikeResponse>(
        `/likes/${data.threadId}`
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
      await queryClient.invalidateQueries({ queryKey: ['thread-detail'] });
    },
  });

  return { isPendingLike, isPendingUnlike, mutateLike, mutateUnlike };
}
