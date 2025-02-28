import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/stores/auth';
import { Flex, Image, Input, Textarea } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';

export default function CreatePost() {
  const {
    profile: { fullName, avatarUrl },
  } = useAuthStore((state) => state.user);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');

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
    <DialogRoot
      initialFocusEl={() => textareaRef.current || inputFileRef.current}
    >
      <DialogTrigger>
        <Button
          backgroundColor={'brand'}
          color={'white'}
          width={'337px'}
          height={'43px'}
          marginTop={'10px'}
          borderRadius={'20px'}
          fontSize={'20px'}
        >
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody>
          <DialogCloseTrigger />
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
            <Textarea
              placeholder="What is happening?!"
              outline={'none'}
              border={'none'}
              borderColor={'outline'}
              resize={'none'}
              rows={1}
              onInput={adjustHeight}
              overflow={'hidden'}
              ref={textareaRef}
              onChange={(e) => setText(e.target.value)}
            />
          </Flex>
          <Flex padding={'25px 0 10px 0'} justify={'space-between'}>
            <Button variant={'ghost'} onClick={onClickFile} cursor={'disabled'}>
              <Image src={galleryAddLogo} width={'27px'} />
            </Button>
            <Input type={'file'} hidden ref={inputFileRef} />
            <Button
              backgroundColor={text ? 'brand' : 'brandSoft'}
              color={'white'}
              borderRadius={'20px'}
              width={'63px'}
              height={'33px'}
              disabled={!text}
            >
              Post
            </Button>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
