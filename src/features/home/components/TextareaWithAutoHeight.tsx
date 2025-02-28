import { Textarea, TextareaProps } from '@chakra-ui/react';
import { useRef } from 'react';

type TextareaWithAutoHeightProps = TextareaProps;

export function TextareaWithAutoHeight({
  ...props
}: TextareaWithAutoHeightProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function adjustHeight() {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  return (
    <Textarea
      ref={textareaRef}
      onInput={adjustHeight}
      overflow={'hidden'}
      resize={'none'}
      rows={1}
      {...props}
    />
  );
}
