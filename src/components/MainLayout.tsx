
import React from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="min-h-[calc(100vh-5rem)]">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
