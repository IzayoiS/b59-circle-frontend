import likeLogoOutline from '@/assets/icons/like-outline.svg';
import likeLogo from '@/assets/icons/like.svg';
import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { Reply } from '../types/posts';

interface CardReplyProps extends BoxProps {
  replyData: Reply;
}

export default function CardReply({ replyData }: CardReplyProps) {
  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 25px'}
    >
      <Avatar
        name={replyData.user.fullName}
        src={replyData.user.avatarUrl}
        shape="full"
        size="full"
        width={'40px'}
        height={'40px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'medium'}>{replyData.user.fullName}</Text>
          <Text color={'secondary'}>@{replyData.user.username}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>{replyData.createdAt.getHours()}h</Text>
        </Box>
        <Text fontWeight={'light'}>{replyData.content}</Text>
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
            <Text color={'secondary'}>{replyData.likesCount}</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
