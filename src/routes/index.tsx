import Dashboard from '@/features/dashboard/components/dashboard';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
]);
