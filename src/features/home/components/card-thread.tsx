import likeLogoOutline from '@/assets/icons/like-outline.svg';
import likeLogo from '@/assets/icons/like.svg';
import replyLogoOutline from '@/assets/icons/reply-outline.svg';
import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/posts';

interface CardThreadProps extends BoxProps {
  postData: Post;
}

export default function CardThread({ postData }: CardThreadProps) {
  const navigate = useNavigate();
  const [, forceUpdate] = useReducer((state) => state + 1, 0);

  function onClickCard() {
    navigate(`/detail/${postData.id}`);
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
        name={postData.user.fullName}
        src={postData.user.avatarUrl}
        shape="full"
        size="full"
        width={'40px'}
        height={'40px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'medium'}>{postData.user.fullName}</Text>
          <Text color={'secondary'}>@{postData.user.username}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>{postData.createdAt.getHours()}h</Text>
        </Box>
        <Text cursor={'pointer'} onClick={onClickCard} fontWeight={'light'}>
          {postData.content}
        </Text>
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
            onClick={() => {
              postData.isLiked = !postData.isLiked;
              forceUpdate();
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
