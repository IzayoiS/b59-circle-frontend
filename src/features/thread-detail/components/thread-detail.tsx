import CardReply from '@/features/home/components/card-reply';
import CardThreadDetail from '@/features/home/components/card-thread-detail';
import CreateReply from '@/features/home/components/create-reply';
import { Reply, Thread } from '@/features/home/types/posts';
import { api } from '@/libs/api';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { threadId } = useParams();
  const {
    data: thread,
    isLoading,
    isError,
    failureReason,
  } = useQuery<Thread>({
    queryKey: ['thread', threadId],
    queryFn: async () => {
      const response = await api.get(`/threads/${threadId}`);
      const userIds = response.data.replies.map((reply: Reply) => reply.userId);
      const usersData = await Promise.all(
        userIds.map(async (userId: string) => {
          const userResponse = await api.get(`/users/${userId}`);
          return userResponse.data;
        })
      );

      const repliesWithUser = response.data.replies.map(
        (reply: Reply, index: number) => ({
          ...reply,
          user: usersData[index],
          createdAt: new Date(reply.createdAt),
        })
      );

      return {
        ...response.data,
        replies: repliesWithUser,
      };
    },
    enabled: !!threadId,
  });

  return (
    <Box>
      {isError && <Text color={'red'}>{failureReason?.message}</Text>}
      {isLoading ? (
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={'10px'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'80vh'}
        >
          <Spinner />
        </Box>
      ) : (
        <Box>
          <CardThreadDetail postData={thread} />
          <CreateReply />
          <Box marginTop={'20px'}>
            {thread?.replies?.length ? (
              thread.replies.map((reply) => (
                <CardReply key={reply.id} replyData={reply} />
              ))
            ) : (
              <Text color={'gray.500'} marginLeft={'20px'}>
                No replies yet.
              </Text>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
