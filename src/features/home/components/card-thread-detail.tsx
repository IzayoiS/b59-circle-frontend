import likeLogoOutline from '@/assets/icons/like-outline.svg';
import likeLogo from '@/assets/icons/like.svg';
import replyLogoOutline from '@/assets/icons/reply-outline.svg';
import { Avatar } from '@/components/ui/avatar';
import { useLike } from '@/hooks/useLike';
import { formatDate, formatTime } from '@/utils/format-date';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import { Box, BoxProps, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Thread } from '../types/posts';

interface CardThreadDetailProps extends BoxProps {
  postData?: Thread;
}

export default function CardThreadDetail({ postData }: CardThreadDetailProps) {
  const createdAt = postData?.createdAt
    ? new Date(postData.createdAt)
    : new Date();

  const { isPendingLike, isPendingUnlike, mutateLike, mutateUnlike } =
    useLike();

  async function onLike(data: CreateLikeSchemaDTO) {
    await mutateLike(data);
  }

  async function onUnlike(data: DeleteLikeSchemaDTO) {
    await mutateUnlike(data);
  }

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
          name={postData?.user.profile.fullName}
          src={
            postData?.user.avatarUrl ||
            `https://api.dicebear.com/9.x/micah/svg?seed=${postData?.user.profile.fullName}`
          }
          shape="full"
          size="full"
          width={'40px'}
          height={'40px'}
        />
        <Box>
          <Text fontWeight={'medium'} fontSize={'14px'}>
            {postData?.user.profile.fullName}
          </Text>
          <Text color={'secondary'} fontSize={'14px'}>
            @{postData?.user.username}
          </Text>
        </Box>
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Text fontWeight={'light'}>{postData?.content}</Text>
        <Image
          objectFit={'contain'}
          maxHeight={'300px'}
          maxWidth={'300px'}
          src={postData?.images}
          margin={'8px 0px 8px 0px'}
          borderRadius={'5px'}
        />
        <Flex align={'center'} gap={'5px'} marginTop={'10px'}>
          <Text color={'secondary'}>{formatTime(createdAt)}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>{formatDate(createdAt)}</Text>
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
            onClick={() =>
              postData?.isLiked
                ? onUnlike({ threadId: postData?.id as string })
                : onLike({ threadId: postData?.id as string })
            }
            disabled={isPendingLike || isPendingUnlike}
          >
            <Image
              src={postData?.isLiked ? likeLogo : likeLogoOutline}
              width={'27px'}
            />
            <Text color={'secondary'}>{postData?.likesCount}</Text>
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
            <Text color={'secondary'}>{postData?.repliesCount}</Text>
            <Text color={'secondary'}>Replies</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
