import { api } from '@/libs/api';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Thread } from '../types/posts';
import CardThread from './card-thread';
import CreateThread from './create-thread';

export default function Home() {
  const {
    data: threads,
    isLoading,
    isError,
    failureReason,
    refetch,
  } = useQuery<Thread[]>({
    queryKey: ['threads'],
    queryFn: async () => {
      const response = await api.get('/threads');
      return response.data;
    },
  });

  return (
    <Box>
      <CreateThread onCreateSuccess={refetch} />
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
        <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
          {threads?.map((thread) => (
            <CardThread threadData={thread} key={thread.id} />
          ))}
        </Box>
      )}
    </Box>
  );
}
