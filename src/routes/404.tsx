import { Image, Text } from '@chakra-ui/react';
import Logo404 from '@/assets/404.svg';

export default function Page404() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Maaf halaman tidak ditemukan</Text>
      <Image style={{ width: '40%' }} src={Logo404} />
    </div>
  );
}
