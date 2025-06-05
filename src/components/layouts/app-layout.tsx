import FacebookLogo from '@/assets/icons/facebook.svg';
import GithubLogo from '@/assets/icons/github.svg';
import InstagramLogo from '@/assets/icons/instagram.svg';
import LinkedinLogo from '@/assets/icons/linkedin.svg';
import Logout from '@/assets/icons/logout.svg';
import Logo from '@/assets/logo.svg';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
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
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useSuggestedUsers } from '../hooks/useSuggestedUsers';
import CreatePost from './create-post-dialog';
import ProfileCard from './profile-card';
import SuggestedFollowing from './suggest-following';
import { SearchUser } from '@/features/search-users/types/search-user';

export default function AppLayout() {
  const { user, setUser, logout } = useAuthStore();

  const { isFetched } = useQuery({
    queryKey: ['check-auth'],
    queryFn: async () => {
      try {
        const token = Cookies.get('token');
        const response = await api.post(
          '/auth/check',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data);
        return response.data;
      } catch (error) {
        console.log(error);
        Cookies.remove('token');
        logout();
      }
    },
  });

  if (isFetched) {
    if (!user?.username) return <Navigate to={'/login'} />;

    return (
      <Grid templateColumns="repeat(4,1fr)" height={'100vh'}>
        <GridItem colSpan={1}>
          <LeftBar
            width={'417px'}
            position={'sticky'}
            top={'0'}
            backgroundColor={'#171923'}
          />
        </GridItem>

        <GridItem colSpan={2} marginLeft={'-30px'} backgroundColor={'#171923'}>
          <Outlet />
        </GridItem>

        <GridItem>
          <RightBar
            width={'563px'}
            position={'sticky'}
            top={'0'}
            loggedInUserId={user.id}
            backgroundColor={'#171923'}
          />
        </GridItem>
      </Grid>
    );
  }

  return <></>;
}

function LeftBar(props: BoxProps) {
  const { pathname } = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    Cookies.remove('token');
    navigate('/login');
  }

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

        <CreatePost />
      </Box>

      <Box>
        <ChakraLink
          display={'flex'}
          gap={'16px'}
          padding={'14px 0px'}
          paddingLeft={'20px'}
          outline={'none'}
          textDecoration={'none'}
          _hover={{ backgroundColor: 'gray.800', transition: 'ease 0.3s' }}
          borderRadius={'8px'}
          onClick={onLogout}
        >
          <Image src={Logout} />
          <Text>Logout</Text>
        </ChakraLink>
      </Box>
    </Box>
  );
}

function RightBar({
  loggedInUserId,
  ...props
}: { loggedInUserId: string } & BoxProps) {
  const location = useLocation();

  const isProfilePage = location.pathname.startsWith('/profile');
  // const [suggestedUsers, setSuggestedUsers] = useState<SearchUser[]>([]);
  const navigate = useNavigate();

  const {
    data: suggestedUsers,
    isLoading,
    isError,
  } = useSuggestedUsers(loggedInUserId);

  return (
    <Box
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      gap={'16px'}
      borderLeft={'1px solid'}
      borderColor={'outline'}
      padding={'40px'}
      {...props}
    >
      {!isProfilePage && <ProfileCard />}

      <Card.Root backgroundColor={'card'} width={'483px'}>
        <Card.Body gap={'7px'}>
          {isError && <Text color="red.500">Failed to load suggestions</Text>}

          {!isLoading && !isError && suggestedUsers?.length === 0 && (
            <Text color={'gray.500'}>No suggestions available</Text>
          )}
          <Text
            fontSize={'20px'}
            fontWeight={'bold'}
            margin={'-10px 0px 10px 10px'}
          >
            Suggested For You
          </Text>
          {isLoading && <Spinner margin={'auto'} />}
          {!isLoading &&
            !isError &&
            suggestedUsers?.map((user: SearchUser) => (
              <SuggestedFollowing
                key={user.id}
                SuggestedFollowingUser={user}
                goToProfile={(username) => navigate(`/profile/${username}`)}
              />
            ))}
        </Card.Body>
      </Card.Root>

      <Card.Root backgroundColor={'card'} width={'483px'}>
        <Flex
          gap={'8px'}
          direction={'row'}
          padding={'12px 0px 10px 23px'}
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
        <Flex padding={'0px 0px 10px 23px'} direction={'row'} fontSize={'14px'}>
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
