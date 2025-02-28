import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { ThreadResponse } from '@/features/thread/dto/thread';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  createThreadSchema,
  CreateThreadSchemaDTO,
} from '@/utils/schemas/thread.schema';
import { Box, Button, Field, Image, Input, Spinner } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextareaWithAutoHeight } from './TextareaWithAutoHeight';

export default function CreateThread() {
  const {
    user: {
      profile: { fullName, avatarUrl },
    },
  } = useAuthStore();

  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(createThreadSchema),
  });

  const {
    ref: registerImagesRef,
    onChange: registerImagesOnChange,
    ...restRegisterImages
  } = register('images');

  const queryClient = useQueryClient();

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  const { isPending, mutateAsync } = useMutation<
    ThreadResponse,
    Error,
    CreateThreadSchemaDTO
  >({
    mutationKey: ['create-threads'],
    mutationFn: async (data: CreateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('images', data.images[0]);

      const response = await api.post<ThreadResponse>('/threads', formData);
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
        queryKey: ['threads'],
      });

      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function onSubmit(data: CreateThreadSchemaDTO) {
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
            placeholder="What is happening?!"
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
          disabled={isPending ? true : false}
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
