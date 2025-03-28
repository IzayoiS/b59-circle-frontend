import CoverProfile from '@/assets/icons/cover.svg';
import editProfileLogo from '@/assets/icons/edit-profile.svg';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/stores/auth';
import { Box, Flex, Image, Input, Spinner, Textarea } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { api } from '@/libs/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toaster } from '../ui/toaster';

export default function EditProfile() {
  const { user, setUser } = useAuthStore();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: user.profile.fullName || '',
    username: user.username || '',
    bio: user.profile.bio || '',
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const formDataPayload = new FormData();
      formDataPayload.append('fullName', formData.fullName);
      formDataPayload.append('username', formData.username);
      formDataPayload.append('bio', formData.bio);
      if (selectedFile) {
        formDataPayload.append('avatar', selectedFile);
      }
      console.log(`Sending request to: /profile/${user?.id}`);

      const response = await api.patch(`/profile/${user.id}`, formDataPayload);
      return response.data;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['user-profile', user.id] });
      setIsOpen(false);
      toaster.create({
        title: updatedUser.message,
        type: 'success',
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data?.message,
          type: 'error',
        });
      } else {
        toaster.create({
          title: 'Something went wrong!',
          type: 'error',
        });
      }
    },
  });

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <DialogRoot open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button
          width={'106px'}
          height={'30px'}
          border={'1px solid white'}
          backgroundColor={'transparent'}
          color={'white'}
          borderRadius={'20px'}
          _hover={{ backgroundColor: 'gray.600', transition: 'ease 0.4s' }}
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <DialogCloseTrigger onClick={() => setIsOpen(false)} />
            <Image src={CoverProfile} width={'100%'} />
            <Box
              position="relative"
              width="100px"
              height="100px"
              marginTop="-50px"
              marginLeft="20px"
              marginBottom={'20px'}
            >
              <Avatar
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : user.profile.avatarUrl ||
                      `https://api.dicebear.com/9.x/micah/svg?seed=${formData.fullName}`
                }
                width="100%"
                height="100%"
                border="4px solid black"
              />

              <Box
                as="div"
                onClick={(e) => {
                  e.stopPropagation();
                  onClickFile();
                }}
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="45px"
                height="45px"
                backgroundColor="blackAlpha.700"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                opacity="0"
                transition="opacity 0.3s"
                _hover={{ opacity: 1, cursor: 'pointer' }}
              >
                <Image src={editProfileLogo} width="80%" height="80%" />
              </Box>
              <Input
                type="file"
                ref={inputFileRef}
                display="none"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Box>
            <Flex direction={'column'} gap={'12px'}>
              <Box position="relative">
                <Input
                  name="fullName"
                  onChange={handleChange}
                  value={formData.fullName}
                  autoComplete="off"
                  height={'48px'}
                  outline={'none'}
                  border={'1px solid'}
                  borderColor={'outline'}
                  fontSize={'14px'}
                  paddingTop="10px"
                  fontWeight={'normal'}
                />
                <Box
                  as="label"
                  position="absolute"
                  top="40%"
                  left="13px"
                  transform="translateY(-100%)"
                  pointerEvents="none"
                  fontSize={'12px'}
                  color="secondary"
                >
                  Name
                </Box>
              </Box>
              <Box position="relative">
                <Input
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  height={'48px'}
                  autoComplete="off"
                  outline={'none'}
                  border={'1px solid'}
                  borderColor={'outline'}
                  paddingTop="10px"
                  fontSize={'14px'}
                  fontWeight={'normal'}
                />
                <Box
                  as="label"
                  position="absolute"
                  top="40%"
                  left="13px"
                  transform="translateY(-100%)"
                  pointerEvents="none"
                  fontSize={'12px'}
                  color="secondary"
                >
                  Username
                </Box>
              </Box>
              <Box position="relative">
                <Textarea
                  name="bio"
                  onChange={handleChange}
                  value={formData.bio}
                  outline={'none'}
                  border={'1px solid'}
                  borderColor={'outline'}
                  paddingTop="16px"
                  fontSize={'14px'}
                  fontWeight={'normal'}
                  resize={'none'}
                  rows={3}
                />
                <Box
                  as="label"
                  position="absolute"
                  top="49%"
                  left="13px"
                  transform="translateY(-220%)"
                  pointerEvents="none"
                  fontSize={'12px'}
                  color="secondary"
                >
                  Bio
                </Box>
              </Box>

              <Button
                backgroundColor={'brand'}
                color={'white'}
                borderRadius={'20px'}
                width={'63px'}
                height={'33px'}
                left={'86%'}
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? <Spinner /> : 'Save'}
              </Button>
            </Flex>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
