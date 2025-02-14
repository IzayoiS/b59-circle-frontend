import CoverProfile from '@/assets/icons/cover.svg';
import Logout from '@/assets/icons/logout.svg';
import Logo from '@/assets/logo.svg';
import GithubLogo from '@/assets/icons/github.svg';
import LinkedinLogo from '@/assets/icons/linkedin.svg';
import FacebookLogo from '@/assets/icons/facebook.svg';
import InstagramLogo from '@/assets/icons/instagram.svg';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
import {
  Box,
  BoxProps,
  Card,
  Link as ChakraLink,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import SuggestedFollowing from './suggest-following';
import { isLogin } from '@/utils/fake-datas/session';

export default function AppLayout() {
  if (!isLogin) return <Navigate to={'/login'} />;

  return (
    <Grid templateColumns="repeat(4,1fr)" height={'100vh'}>
      <GridItem colSpan={1}>
        <LeftBar width={'417px'} />
      </GridItem>

      <GridItem colSpan={2}>
        <Outlet />
      </GridItem>

      <GridItem colSpan={1}>
        <RightBar width={'563px'} />
      </GridItem>
    </Grid>
  );
}

function LeftBar(props: BoxProps) {
  const { pathname } = useLocation();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      height={'100vh'}
      padding={'40px'}
      borderRight={'1px solid'}
      borderColor={'outline'}
      {...props}
    >
      <Box>
        <Image src={Logo} width={'220px'} paddingLeft={'20px'} />
        <Box
          display={'flex'}
          flexDirection={'column'}
          marginTop={'22px'}
          gap={'10px'}
        >
          {NAV_LINK_MENU.map(({ label, logo, path }, index) => (
            <ChakraLink
              asChild
              display={'flex'}
              alignItems={'center'}
              gap={'16px'}
              padding={'14px 0px'}
              paddingLeft={'20px'}
              outline={'none'}
              textDecoration={'none'}
              _hover={{ backgroundColor: 'gray.800', transition: 'ease 0.3s' }}
              borderRadius={'8px'}
              key={index}
            >
              <Link to={path}>
                <Image src={pathname === path ? logo.fill : logo.outline} />
                <Text fontWeight={pathname === path ? 'bold' : 'normal'}>
                  {label}
                </Text>
              </Link>
            </ChakraLink>
          ))}
        </Box>

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
      </Box>

      <Box>
        <ChakraLink
          asChild
          display={'flex'}
          gap={'16px'}
          padding={'14px 0px'}
          paddingLeft={'20px'}
          outline={'none'}
          textDecoration={'none'}
          _hover={{ backgroundColor: 'gray.800', transition: 'ease 0.3s' }}
          borderRadius={'8px'}
        >
          <Link to={'/login'}>
            <Image src={Logout} />
            <Text>Logout</Text>
          </Link>
        </ChakraLink>
      </Box>
    </Box>
  );
}
function RightBar(props: BoxProps) {
  return (
    <Box
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      gap={'16px'}
      borderLeft={'1px solid'}
      borderColor={'outline'}
      padding={'45px'}
      {...props}
    >
      <Card.Root backgroundColor={'card'} width={'483px'}>
        <Card.Body gap={'2'}>
          <Card.Title>My Profile</Card.Title>
          <Image src={CoverProfile} />
          <Flex
            justify={'space-between'}
            alignItems={'end'}
            marginTop={'-50px'}
          >
            <Avatar
              src="https://api.dicebear.com/9.x/micah/svg?seed=iqbal"
              width={'90px'}
              height={'90px'}
              border={'4px solid black'}
              marginLeft={'20px'}
            />
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
          </Flex>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            ✨Iqbal✨
          </Text>
          <Text color={'gray.400'} fontSize={'12px'}>
            @iqbal
          </Text>
          <Text>Profile bio</Text>
          <Flex gap={'4px'}>
            <Text>291</Text>
            <Text color={'gray.400'}>Following</Text>
            <Text>32</Text>
            <Text color={'gray.400'}>Followers</Text>
          </Flex>
        </Card.Body>
      </Card.Root>

      <Card.Root backgroundColor={'card'} width={'483px'}>
        <Card.Body gap={'10px'}>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            Suggested For You
          </Text>
          <SuggestedFollowing
            name="Naruto Uzumaki"
            username="@naruto"
            initialFollowing={true}
            profilLogo="naruto"
          />
          <SuggestedFollowing
            name="Sasuke Uchiha"
            username="@sasuke"
            initialFollowing={false}
            profilLogo="sasuke"
          />
          <SuggestedFollowing
            name="Anos Voldigoad"
            username="@anos"
            initialFollowing={false}
            profilLogo="anos"
          />
          <SuggestedFollowing
            name="Rimuru Tempest"
            username="@rimuru"
            initialFollowing={false}
            profilLogo="rimuru"
          />
        </Card.Body>
      </Card.Root>
      <Card.Root backgroundColor={'card'} width={'483px'}>
        <Flex
          gap={'8px'}
          direction={'row'}
          padding={'15px 0px 10px 23px'}
          alignItems={'center'}
          color={'white'}
        >
          <Card.Title fontSize={'16px'} fontWeight={'normal'}>
            Developed by
          </Card.Title>
          <Card.Title fontSize={'16px'}>Iqbal</Card.Title>
          <Text>•</Text>
          <ChakraLink>
            <Link to={'https://github.com/IzayoiS'} target="_blank">
              <Image src={GithubLogo} />
            </Link>
            <Link
              to={'https://www.linkedin.com/in/iqbalmhasbi/'}
              target="_blank"
            >
              <Image src={LinkedinLogo} />
            </Link>
            <Link
              to={'https://www.facebook.com/iqbal.mhasby.5'}
              target="_blank"
            >
              <Image src={FacebookLogo} />
            </Link>
            <Link to={'https://www.instagram.com/balhsby14/'} target="_blank">
              <Image src={InstagramLogo} />
            </Link>
          </ChakraLink>
        </Flex>
        <Flex padding={'0px 0px 10px 23px'} direction={'row'}>
          <Text>Powered by</Text>
          <Image
            src={Logo}
            margin={'0px 6px'}
            width={'10%'}
            objectFit={'contain'}
          />
        </Flex>
      </Card.Root>
    </Box>
  );
}
