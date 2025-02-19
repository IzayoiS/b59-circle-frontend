import HomeLogo from '@/assets/icons/home.svg';
import HomeLogoOutline from '@/assets/icons/home-outline.svg';
import HeartLogo from '@/assets/icons/heart.svg';
import HeartLogoOutline from '@/assets/icons/heart-outline.svg';
import ProfileLogo from '@/assets/icons/profile-circle.svg';
import ProfileLogoOutline from '@/assets/icons/profile-circle-outline.svg';
import SearchLogo from '@/assets/icons/user-search.svg';
import SearchLogoOutline from '@/assets/icons/user-search-outline.svg';

interface NavLinkMenu {
  label: string;
  path: string;
  logo: {
    fill: string;
    outline: string;
  };
}

export const NAV_LINK_MENU: NavLinkMenu[] = [
  {
    path: '/',
    label: 'Home',
    logo: {
      fill: HomeLogo,
      outline: HomeLogoOutline,
    },
  },
  {
    path: '/search',
    label: 'Search',
    logo: {
      fill: SearchLogo,
      outline: SearchLogoOutline,
    },
  },
  {
    path: '/follows',
    label: 'Follows',
    logo: {
      fill: HeartLogo,
      outline: HeartLogoOutline,
    },
  },
  {
    path: '/profile/iqbal_hasbi',
    label: 'Profile',
    logo: {
      fill: ProfileLogo,
      outline: ProfileLogoOutline,
    },
  },
];
