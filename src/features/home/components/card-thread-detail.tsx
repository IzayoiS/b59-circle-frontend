import likeLogo from '@/assets/icons/like.svg';
import replyLogoOutline from '@/assets/icons/reply-outline.svg';
import likeLogoOutline from '@/assets/icons/like-outline.svg';
import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Post } from '../types/posts';
import { formatDate, formatTime } from '@/utils/format-date';

interface CardThreadDetailProps extends BoxProps {
  postData: Post;
}

export default function CardThreadDetail({ postData }: CardThreadDetailProps) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 25px'}
    >
      <Box display={'flex'} gap={'16px'}>
        <Avatar
          name={postData.user.fullName}
          src={postData.user.avatarUrl}
          shape="full"
          size="full"
          width={'40px'}
          height={'40px'}
        />
        <Box>
          <Text fontWeight={'medium'} fontSize={'14px'}>
            {postData.user.fullName}
          </Text>
          <Text color={'secondary'} fontSize={'14px'}>
            @{postData.user.username}
          </Text>
        </Box>
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Text fontWeight={'light'}>{postData.content}</Text>

        <Flex align={'center'} gap={'5px'} marginTop={'10px'}>
          <Text color={'secondary'}>{formatTime(postData.createdAt)}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>{formatDate(postData.createdAt)}</Text>
        </Flex>

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
          >
            <Image
              src={postData.isLiked ? likeLogo : likeLogoOutline}
              width={'27px'}
            />
            <Text color={'secondary'}>{postData.likesCount}</Text>
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
            <Text color={'secondary'}>{postData.repliesCount}</Text>
            <Text color={'secondary'}>Replies</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
