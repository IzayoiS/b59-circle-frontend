import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toaster } from '@/components/ui/toaster';
import { TextareaWithAutoHeight } from '@/features/home/components/TextareaWithAutoHeight';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  createThreadSchema,
  CreateThreadSchemaDTO,
} from '@/utils/schemas/thread.schema';
import { Field, Flex, Image, Input, Spinner } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';

export default function CreatePost() {
  const {
    profile: { fullName, avatarUrl },
  } = useAuthStore((state) => state.user);

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 Gunakan useForm untuk mengelola form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    // watch,
  } = useForm<CreateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(createThreadSchema),
    defaultValues: { content: '', images: undefined },
  });

  const {
    ref: registerImagesRef,
    onChange: registerImagesOnChange,
    ...restRegisterImages
  } = register('images');

  const queryClient = useQueryClient();

  // 🔥 Mutasi untuk mengirim data ke backend
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['create-threads'],
    mutationFn: async (data: CreateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append('content', data.content);
      if (data.images && data.images.length > 0) {
        formData.append('images', data.images[0]);
      }

      const response = await api.post('/threads', formData);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({ title: 'Something went wrong!', type: 'error' });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
      toaster.create({ title: data.message, type: 'success' });
      reset();
      setPreviewURL(null);
      setIsModalOpen(false);
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

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  return (
    <DialogRoot open={isModalOpen}>
      <DialogTrigger>
        <Button
          backgroundColor={'brand'}
          color={'white'}
          width={'337px'}
          height={'43px'}
          marginTop={'10px'}
          borderRadius={'20px'}
          fontSize={'20px'}
          onClick={() => setIsModalOpen(true)}
        >
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogBody>
          <DialogCloseTrigger />

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profil User */}
            <Flex
              padding={'20px 20px 40px 10px'}
              borderBottom={'1px solid'}
              borderColor={'outline'}
            >
              <Avatar
                name={fullName}
                src={
                  avatarUrl ||
                  `https://api.dicebear.com/9.x/micah/svg?seed=${fullName}`
                }
                shape="full"
                size="full"
                width={'30px'}
                height={'30px'}
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
            </Flex>

            {/* Preview Gambar */}
            {previewURL && (
              <Flex justify={'center'} padding={'10px'}>
                <Image
                  src={previewURL}
                  maxHeight={'300px'}
                  maxWidth={'300px'}
                  objectFit={'contain'}
                />
              </Flex>
            )}

            {/* Tombol & Input File */}
            <Flex padding={'25px 0 10px 0'} justify={'space-between'}>
              <Button variant={'ghost'} onClick={onClickFile}>
                <Image src={galleryAddLogo} width={'27px'} />
              </Button>
              {/* <Input
                type={'file'}
                hidden
                {...register('images')}
                onChange={(e) => {
                  handlePreview(e);
                }}
                ref={inputFileRef}
              /> */}
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
                backgroundColor={isValid ? 'brand' : 'brandSoft'}
                color={'white'}
                borderRadius={'20px'}
                width={'63px'}
                height={'33px'}
                disabled={!isValid || isPending}
              >
                {isPending ? <Spinner /> : 'Post'}
              </Button>
            </Flex>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
