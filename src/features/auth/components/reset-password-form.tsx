import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
  Box,
  BoxProps,
  Field,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { usePasswordForm } from '../hooks/use-password-form';

export default function ResetPasswordForm(props: BoxProps) {
  const { errors, handleSubmit, isPending, onSubmit, register } =
    usePasswordForm();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={Logo} width={'100px'} />
      <Text fontSize={'28px'}>Reset password</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
      >
        <Field.Root invalid={!!errors.oldPassword?.message}>
          <Input
            placeholder="Password"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            type="password"
            {...register('oldPassword')}
          />
          <Field.ErrorText>{errors.oldPassword?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.newPassword?.message}>
          <Input
            placeholder="Confirm new password"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            type="password"
            {...register('newPassword')}
          />
          <Field.ErrorText>{errors.newPassword?.message}</Field.ErrorText>
        </Field.Root>
        <Button
          backgroundColor={'brand'}
          color={'white'}
          width={'100%'}
          borderRadius={'20px'}
          fontSize={'20px'}
          type="submit"
          disabled={isPending ? true : false}
        >
          {isPending ? <Spinner /> : 'Send'}
        </Button>
      </form>
    </Box>
  );
}
