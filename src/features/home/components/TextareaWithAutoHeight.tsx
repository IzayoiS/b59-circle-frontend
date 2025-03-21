import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { Textarea, TextareaProps } from '@chakra-ui/react';

type TextareaWithAutoHeightProps = TextareaProps;

export const TextareaWithAutoHeight = forwardRef<
  HTMLTextAreaElement,
  TextareaWithAutoHeightProps
>(({ onInput, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function adjustHeight() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  useEffect(() => {
    adjustHeight();
  }, []);

  useImperativeHandle(ref, () => textareaRef.current!);

  return (
    <Textarea
      ref={textareaRef}
      onInput={(e) => {
        adjustHeight();
        if (onInput) onInput(e);
      }}
      overflow="hidden"
      resize="none"
      rows={1}
      {...props}
    />
  );
});

TextareaWithAutoHeight.displayName = 'TextareaWithAutoHeight';
