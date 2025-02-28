import likeLogoOutline from '@/assets/icons/like-outline.svg';
import likeLogo from '@/assets/icons/like.svg';
import replyLogoOutline from '@/assets/icons/reply-outline.svg';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Thread } from '../types/posts';

interface CardThreadProps extends BoxProps {
  threadData: Thread;
}
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

export default function CardThread({ threadData }: CardThreadProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const [, forceUpdate] = useReducer((state) => state + 1, 0);

  function onClickCard() {
    navigate(`/detail/${threadData.id}`);
  }

  function goToProfile() {
    navigate(`/profile/${threadData.user.username}`);
  }

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
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
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
      console.log(error);
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
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
    },
  });

  async function onLike(data: CreateLikeSchemaDTO) {
    await mutateLike(data);
  }

  async function onUnlike(data: DeleteLikeSchemaDTO) {
    await mutateUnlike(data);
  }

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 20px'}
    >
      <Avatar
        name={threadData.user.fullName}
        src={threadData.user.avatarUrl}
        shape="full"
        size="full"
        width={'40px'}
        height={'40px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text
            fontWeight={'medium'}
            onClick={goToProfile}
            cursor={'pointer'}
            _hover={{ textDecoration: 'underline' }}
          >
            {threadData.user.fullName}
          </Text>
          <Text color={'secondary'} onClick={goToProfile} cursor={'pointer'}>
            @{threadData.user.username}
          </Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>
            {new Date(threadData.createdAt).getHours()}h
          </Text>
        </Box>
        <Text cursor={'pointer'} onClick={onClickCard} fontWeight={'light'}>
          {threadData.content}
        </Text>
        <Image
          objectFit={'contain'}
          maxHeight={'300px'}
          maxWidth={'300px'}
          src={threadData.images}
          margin={'8px 0px 8px 0px'}
          borderRadius={'5px'}
        />
        <Box display={'flex'} gap={'10px'}>
          <Button
            variant={'ghost'}
            display={'flex'}
            padding={'0'}
            margin={'0'}
            _hover={{
              '& > img': {
                filter:
                  'invert(16%) sepia(89%) saturate(6053%) hue-rotate(358deg) brightness(99%) contrast(106%)',
              },
              '& > :nth-child(2)': {
                color: 'red.400',
              },
            }}
            onClick={() =>
              threadData.isLiked
                ? onUnlike({ threadId: threadData.id })
                : onLike({ threadId: threadData.id })
            }
            disabled={isPendingLike || isPendingUnlike}
            // onClick={() => {
            //   threadData.isLiked = !threadData.isLiked;
            //   forceUpdate();
            // }}
          >
            <Image
              src={threadData.isLiked ? likeLogo : likeLogoOutline}
              width={'27px'}
            />
            <Text color={'secondary'}>{threadData.likesCount}</Text>
          </Button>

          <Button
            variant={'ghost'}
            display={'flex'}
            gap={'8px'}
            padding={'0'}
            margin={'0'}
            _hover={{
              '& > img': {
                filter:
                  'invert(39%) sepia(97%) saturate(748%) hue-rotate(176deg) brightness(91%) contrast(93%)',
              },
              '& > :nth-child(2), & > :nth-child(3)': {
                color: 'blue.400',
              },
            }}
          >
            <Image src={replyLogoOutline} width={'27px'} />
            <Text color={'secondary'}>{threadData.repliesCount}</Text>
            <Text color={'secondary'}>Replies</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
