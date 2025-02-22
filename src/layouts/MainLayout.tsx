import { Outlet } from 'react-router';

export const MainLayout = () => {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
};
