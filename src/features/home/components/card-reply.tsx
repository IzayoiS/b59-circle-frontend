import likeLogoOutline from '@/assets/icons/like-outline.svg';
import likeLogo from '@/assets/icons/like.svg';
import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { Reply } from '../types/posts';

interface CardReplyProps extends BoxProps {
  replyData?: Reply;
}

export default function CardReply({ replyData }: CardReplyProps) {
  // Cegah akses ke properti undefined
  if (!replyData || !replyData.user || !replyData.user.profile) {
    return null; // Atau tampilkan skeleton loader
  }

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 25px'}
    >
      <Avatar
        name={replyData.user.profile.fullName || 'Unknown User'}
        src={
          replyData.user.profile.avatarUrl ||
          `https://api.dicebear.com/9.x/micah/svg?seed=${replyData.user.profile.fullName}`
        }
        shape="full"
        size="full"
        width={'40px'}
        height={'40px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'medium'}>
            {replyData.user.profile.fullName || 'Unknown'}
          </Text>
          <Text color={'secondary'}>
            @{replyData.user.username || 'anonymous'}
          </Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>
            {replyData.createdAt
              ? new Date(replyData.createdAt).getHours() + 'h'
              : ''}
          </Text>
        </Box>
        <Text fontWeight={'light'}>{replyData.content || 'No content'}</Text>
        <Image
          objectFit={'contain'}
          maxHeight={'300px'}
          maxWidth={'300px'}
          src={replyData.images}
          margin={'8px 0px 8px 0px'}
          borderRadius={'5px'}
        />
        <Box display={'flex'}>
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
          >
            <Image
              src={replyData.likesCount ? likeLogo : likeLogoOutline}
              width={'27px'}
            />
            <Text color={'secondary'}>{replyData.likesCount || 0}</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
