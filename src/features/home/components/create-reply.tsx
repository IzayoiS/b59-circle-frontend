import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  createReplySchema,
  CreateReplySchemaDTO,
} from '@/utils/schemas/reply.schema';
import { Box, Button, Field, Image, Input, Spinner } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { RepliesResponse } from '../types/replies';
import { TextareaWithAutoHeight } from './TextareaWithAutoHeight';

export default function CreateReply() {
  const {
    user: {
      profile: { fullName, avatarUrl },
    },
  } = useAuthStore();
  const { threadId } = useParams<{ threadId: string }>();
  const queryClient = useQueryClient();

  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateReplySchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(createReplySchema),
    defaultValues: { content: '', images: undefined },
  });

  const {
    ref: registerImagesRef,
    onChange: registerImagesOnChange,
    ...restRegisterImages
  } = register('images');

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  const { isPending, mutateAsync } = useMutation<
    RepliesResponse,
    Error,
    CreateReplySchemaDTO
  >({
    mutationKey: ['create-replies', threadId],
    mutationFn: async (data: CreateReplySchemaDTO) => {
      if (!threadId) throw new Error('Thread ID is missing');

      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('images', data.images[0]);
      console.log('🔹 Data yang dikirim ke API:', Object.fromEntries(formData));

      const response = await api.post<RepliesResponse>(
        `/replies/${threadId}`,
        formData
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['threads', threadId],
      });

      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function onSubmit(data: CreateReplySchemaDTO) {
    await mutateAsync(data);
    reset();
    setPreviewURL('');
  }

  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'20px 25px'}
      >
        <Avatar
          name={fullName}
          src={
            avatarUrl ||
            `https://api.dicebear.com/9.x/micah/svg?seed=${fullName}`
          }
          shape="full"
          size="full"
          width={'40px'}
          height={'40px'}
        />

        <Field.Root invalid={!!errors.content?.message}>
          <TextareaWithAutoHeight
            placeholder="Type your reply!"
            outline={'none'}
            border={'none'}
            borderColor={'outline'}
            {...register('content')}
          />
          <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
        </Field.Root>

        <Button variant={'ghost'} onClick={onClickFile}>
          <Image src={galleryAddLogo} width={'27px'} />
        </Button>
        <Input
          type={'file'}
          hidden
          {...restRegisterImages}
          onChange={(e) => {
            handlePreview(e);
            registerImagesOnChange(e);
          }}
          ref={(e) => {
            registerImagesRef(e);
            inputFileRef.current = e;
          }}
        />

        <Button
          type="submit"
          backgroundColor={'brand'}
          color={'white'}
          borderRadius={'20px'}
          width={'63px'}
          height={'33px'}
          disabled={!isValid || isPending}
        >
          {isPending ? <Spinner /> : 'Post'}
        </Button>
      </Box>

      <Box
        display={'flex'}
        borderBottom={'1px solid'}
        borderBottomColor={'outline'}
        justifyContent={'center'}
        paddingBottom={'15px'}
      >
        <Image
          objectFit={'contain'}
          maxHeight={'300px'}
          maxWidth={'300px'}
          src={previewURL ?? ''}
        />
      </Box>
    </form>
  );
}
