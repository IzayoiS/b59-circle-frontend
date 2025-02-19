import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaDTO,
} from '@/utils/schemas/auth.schemas';
import {
  Box,
  BoxProps,
  Link as ChakraLink,
  Field,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'react-router-dom';
import dummyUsers from '@/utils/fake-datas/user.json';
import { useForm } from 'react-hook-form';
import { toaster } from '@/components/ui/toaster';

export default function ForgotPasswordForm(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');

  function onSubmit(data: ForgotPasswordSchemaDTO) {
    const user = dummyUsers.find((dummyUser) => dummyUser.email === email);

    if (!user) {
      return toaster.create({
        title: 'email is wrong',
        type: 'error',
      });
    }

    toaster.create({
      title: 'Link has been sent!',
      type: 'success',
    });

    console.log(data);
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={Logo} width={'100px'} />
      <Text fontSize={'28px'}>Forgot password</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
      >
        <Field.Root invalid={!!errors.email?.message}>
          <Input
            placeholder="Email"
            outline={'none'}
            border={'1px solid'}
            borderColor={'outline'}
            autoComplete="off"
            {...register('email')}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
        <Button
          backgroundColor={'brand'}
          color={'white'}
          width={'100%'}
          borderRadius={'20px'}
          fontSize={'20px'}
          type="submit"
        >
          Send Intruction
        </Button>
      </form>
      <Text fontWeight={'normal'}>
        Already have account?{' '}
        <ChakraLink asChild color={'brand'} outline={'none'}>
          <Link to={'/login'}> Login</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
