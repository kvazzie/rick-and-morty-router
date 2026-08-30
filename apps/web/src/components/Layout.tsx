import { Outlet, useNavigate, useNavigation } from 'react-router';
import { NavigationBar } from './NavigationBar';
import { Providers } from '../context/index';
import { Suspense } from 'react';

export const Layout = () => {
  const navigator = useNavigation();
  console.log("navigator",navigator);
  const isNavigating = Boolean(navigator.location);
  console.log("isNavigating",isNavigating);

  return (
    <Providers>
      <div className="dark min-h-screen bg-gray-900 text-white">
        <NavigationBar />
        <main className="container mx-auto p-4">
          {isNavigating && <div>Loading in Layout main...</div>}
          <Suspense fallback={<div>Loading in Layout Suspense...</div>}>
          <Outlet />
          </Suspense>
        </main>
      </div>
    </Providers>
  );
};
