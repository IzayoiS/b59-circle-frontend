import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import { Avatar } from '@/components/ui/avatar';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { userSession } from '@/utils/fake-datas/session';
import { Box, Button, Image, Input, Textarea } from '@chakra-ui/react';
import { useRef } from 'react';

export default function CreateThread() {
  const { fullName, avatarUrl } = userSession;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function adjustHeight() {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  return (
    <DialogRoot>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        borderBottom={'1px solid'}
        borderBottomColor={'outline'}
        padding={'20px 25px'}
      >
        <Avatar
          name={fullName}
          src={avatarUrl}
          shape="full"
          size="full"
          width={'40px'}
          height={'40px'}
        />
        <Textarea
          placeholder="What is happening?!"
          outline={'none'}
          border={'none'}
          borderColor={'outline'}
          resize={'none'}
          rows={1}
          onInput={adjustHeight}
          overflow={'hidden'}
          width={'500px'}
          ref={textareaRef}
        />

        <Button variant={'ghost'} onClick={onClickFile} cursor={'disabled'}>
          <Image src={galleryAddLogo} width={'27px'} />
        </Button>
        <Input type={'file'} hidden ref={inputFileRef} />

        <Button
          backgroundColor={'brand'}
          color={'white'}
          borderRadius={'20px'}
          width={'63px'}
          height={'33px'}
        >
          Post
        </Button>
      </Box>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <DialogBody />
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  );
}
