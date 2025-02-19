import Follows from '@/features/follows/components/follows';
import { Box, Text } from '@chakra-ui/react';

export default function FollowsPage() {
  return (
    <Box>
      <Text padding={'20px 20px 8px 20px'} fontSize={'28px'}>
        Follows
      </Text>
      <Follows />
    </Box>
  );
}
