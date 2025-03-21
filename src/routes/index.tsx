import AppLayout from '@/components/layouts/app-layout';
import AuthLayout from '@/components/layouts/auth-layout';
import { createBrowserRouter } from 'react-router-dom';
import Page404 from './404';
import FollowsPage from './follows';
import ForgotPasswordPage from './forgot-password';
import HomePage from './home';
import LoginPage from './login';
import ProfilePage from './profile';
import RegisterPage from './register';
import ResetPasswordPage from './reset-password';
import SearchUsersPage from './search-users';
import ThreadDetailPage from './thread-detail';
import UserProfilePage from './user-profile';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchUsersPage />,
      },
      {
        path: '/follows',
        element: <FollowsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/detail/:threadId',
        element: <ThreadDetailPage />,
      },
      {
        path: '/profile/:username',
        element: <UserProfilePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

export default router;
