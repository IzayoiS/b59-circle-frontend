import likeLogoOutline from '@/assets/icons/like-outline.svg';
import likeLogo from '@/assets/icons/like.svg';
import replyLogoOutline from '@/assets/icons/reply-outline.svg';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { useDeleteThread } from '@/hooks/useDeleteThread';
import { useEditThread } from '@/hooks/useEditThread';
import { useLike } from '@/hooks/useLike';
import { useAuthStore } from '@/stores/auth';
import { formatTimeRelative } from '@/utils/format-date';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import {
  Box,
  BoxProps,
  Button,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegCheckCircle, FaWindowClose } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Thread } from '../types/posts';
import { TextareaWithAutoHeight } from './TextareaWithAutoHeight';

interface CardThreadProps extends BoxProps {
  threadData: Thread;
}

export default function CardThread({ threadData }: CardThreadProps) {
  const navigate = useNavigate();
  const { user: userLogin } = useAuthStore();
  const [editedContent, setEditedContent] = useState(threadData.content);
  const [isEditing, setIsEditing] = useState(false);

  const editThread = useEditThread(threadData.id, threadData.userId);
  const deleteThread = useDeleteThread(threadData.id, threadData.userId);

  function onClickCard() {
    navigate(`/detail/${threadData.id}`);
  }

  function goToProfile() {
    if (threadData.user.username === userLogin.username) {
      navigate('/profile');
    } else {
      navigate(`/profile/${threadData.user.username}`);
    }
  }

  const { isPendingLike, isPendingUnlike, mutateLike, mutateUnlike } =
    useLike();

  async function onLike(data: CreateLikeSchemaDTO) {
    await mutateLike(data);
  }

  async function onUnlike(data: DeleteLikeSchemaDTO) {
    await mutateUnlike(data);
  }

  async function handleEdit() {
    try {
      const response = await editThread.mutateAsync(editedContent);

      toaster.create({
        title: response.message,
        type: 'success',
      });
      setIsEditing(false);
    } catch (error) {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
    }
  }

  async function handleDelete() {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this thread?'
    );

    if (!isConfirmed) return;

    try {
      const response = await deleteThread.mutateAsync();
      toaster.create({
        title: response.message,
        type: 'success',
      });
    } catch (error) {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
    }
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
        name={threadData.user.profile.fullName}
        onClick={goToProfile}
        cursor={'pointer'}
        src={
          threadData.user.profile.avatarUrl ||
          `https://api.dicebear.com/9.x/micah/svg?seed=${threadData.user.profile.fullName}`
        }
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
            {threadData.user.profile.fullName}
          </Text>
          <Text color={'secondary'} onClick={goToProfile} cursor={'pointer'}>
            @{threadData.user.username}
          </Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>
            {formatTimeRelative(new Date(threadData.createdAt))}
          </Text>
        </Box>

        {isEditing ? (
          <TextareaWithAutoHeight
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            size="sm"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
          />
        ) : (
          <Text cursor={'pointer'} onClick={onClickCard} fontWeight={'light'}>
            {threadData.content}
          </Text>
        )}

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
            onClick={onClickCard}
          >
            <Image src={replyLogoOutline} width={'27px'} />
            <Text color={'secondary'}>{threadData.repliesCount}</Text>
            <Text color={'secondary'}>Replies</Text>
          </Button>
        </Box>
      </Box>
      {userLogin.id === threadData.userId && (
        <Box marginLeft="auto" display="flex" gap="5px">
          {!isEditing ? (
            <>
              <IconButton
                aria-label="Edit thread"
                size="sm"
                variant={'ghost'}
                onClick={() => setIsEditing(true)}
              >
                <MdOutlineEdit />
              </IconButton>
              <IconButton
                aria-label="Delete thread"
                size="sm"
                colorScheme="red"
                variant={'ghost'}
                onClick={handleDelete}
              >
                <AiOutlineDelete />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                aria-label="Save edit"
                size="sm"
                colorScheme="green"
                variant={'ghost'}
                onClick={handleEdit}
              >
                <FaRegCheckCircle />
              </IconButton>
              <IconButton
                aria-label="Cancel edit"
                size="sm"
                colorScheme="gray"
                variant={'ghost'}
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(threadData.content);
                }}
              >
                <FaWindowClose />
              </IconButton>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
