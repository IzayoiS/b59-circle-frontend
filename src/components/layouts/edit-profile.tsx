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
import { Box, Flex, Image, Input, Textarea } from '@chakra-ui/react';
import { useRef } from 'react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';

export default function EditProfile() {
  const {
    username,
    profile: { fullName, avatarUrl, bio },
  } = useAuthStore((state) => state.user);
  const inputFileRef = useRef<HTMLInputElement>(null);

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  return (
    <DialogRoot>
      <DialogTrigger>
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
          <DialogCloseTrigger />
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
                avatarUrl ||
                `https://api.dicebear.com/9.x/micah/svg?seed=${fullName}`
              }
              width="100%"
              height="100%"
              border="4px solid black"
            />

            <Box
              as="button"
              onClick={onClickFile}
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
            <Input type="file" ref={inputFileRef} display="none" />
          </Box>
          <Flex direction={'column'} gap={'12px'}>
            <Box position="relative">
              <Input
                as={'span'}
                placeholder=""
                defaultValue={fullName}
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
                top="50%"
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
                as={'span'}
                placeholder=""
                defaultValue={username}
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
                top="50%"
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
                as={'span'}
                placeholder=""
                defaultValue={bio}
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
                top="50%"
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
            >
              Post
            </Button>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
