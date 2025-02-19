import Home from '@/features/home/components/home';
import { Box, Text } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Box>
      <Text padding={'20px 20px 8px 20px'} fontSize={'28px'}>
        Home
      </Text>
      <Home />
    </Box>
  );
}
