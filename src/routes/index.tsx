import { createBrowserRouter } from 'react-router-dom';
import Page404 from './404';
import ForgotPasswordPage from './forgot-password';
import HomePage from './home';
import LoginPage from './login';
import RegisterPage from './register';
import ResetPasswordPage from './reset-password';
import AppLayout from '@/components/layouts/app-layout';
import SearchPage from './search';
import FollowsPage from './follows';
import ProfilePage from './profile';
import AuthLayout from '@/components/layouts/auth-layout';

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
        element: <SearchPage />,
      },
      {
        path: '/follows',
        element: <FollowsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
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
