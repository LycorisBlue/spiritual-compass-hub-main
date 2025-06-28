
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Calendar, 
  Users, 
  BarChart3, 
  User,
  Heart,
  CalendarDays
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string;
  href: string;
}

const BottomNavigation = () => {
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Accueil', icon: Home, href: '/' },
    { id: 'sessions', label: 'Séances', icon: Calendar, permission: 'manage_sessions', href: '/sessions' },
    { id: 'attendance', label: 'Présences', icon: Users, permission: 'manage_attendance', href: '/attendance' },
    { id: 'events', label: 'Événements', icon: CalendarDays, permission: 'manage_events', href: '/events' },
    { id: 'statistics', label: 'Stats', icon: BarChart3, permission: 'view_statistics', href: '/statistics' }
  ];

  const visibleItems = navItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  // Limiter à 5 items max pour l'affichage mobile
  const displayItems = visibleItems.slice(0, 5);

  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const currentItem = navItems.find(item => item.href === currentPath);
    return currentItem?.id || 'dashboard';
  };

  const activeTab = getCurrentTab();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border/50 z-50 animate-slide-up">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {displayItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.href)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive 
                  ? 'bg-spiritual-blue/10 text-spiritual-blue' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
