
import { createBrowserRouter } from 'react-router';
import { Layout } from '../components/Layout';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

const lazy = <S, R>(p: () => Promise<S>, f: (prop: Awaited<ReturnType<typeof p>>) => R) => ({
  lazy: async () => ({ element: f(await p()) })
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        ...lazy(() => import('./LoginPage'), (module) => <module.LoginPage />),
      },
      {
        path: 'signup',
        ...lazy(() => import('./SignupPage'), (module) => <module.SignupPage />),
      },
      {
        path: ':category',
        ErrorBoundary: NotFoundPage,
        ...lazy(
          () => import('./ItemsListPage'),
          (module) => (
            <ProtectedRoute>
              <module.ItemsListPage />
            </ProtectedRoute>
          ),
        ),
      },
      {
        path: ':category/:id',
        errorElement: <NotFoundPage />,
        ...lazy(
          () => import('./ItemDetailPage'),
          (module) => (
            <ProtectedRoute>
              <module.ItemDetailPage />
            </ProtectedRoute>
          ),
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
