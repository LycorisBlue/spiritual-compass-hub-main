
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Heart, 
  BarChart3, 
  CalendarDays,
  UserCheck,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  console.log('Dashboard rendering for user:', user?.name);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const quickActions = [
    {
      title: 'Séances',
      description: 'Gérer les séances spirituelles',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      permission: 'manage_sessions',
      href: '/sessions'
    },
    {
      title: 'Présences',
      description: 'Enregistrer les présences',
      icon: UserCheck,
      color: 'bg-green-50 text-green-600 border-green-200',
      permission: 'manage_attendance',
      href: '/attendance'
    },
    {
      title: 'Événements',
      description: 'Organiser des événements',
      icon: CalendarDays,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      permission: 'manage_events',
      href: '/events'
    },
    {
      title: 'Statistiques',
      description: 'Voir les rapports',
      icon: BarChart3,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      permission: 'view_statistics',
      href: '/statistics'
    }
  ];

  const availableActions = quickActions.filter(action => 
    hasPermission(action.permission) || action.permission === 'view_sessions' || action.permission === 'view_events'
  );

  const stats = [
    { label: 'Prochaine séance', value: 'Dimanche 14h', subtext: 'Thème: Foi et Espérance' },
    { label: 'Membres présents', value: '24', subtext: 'Dimanche dernier' },
    { label: 'Événements du mois', value: '3', subtext: 'À venir' },
    { label: 'Suivi discipolat', value: '8', subtext: 'Actifs cette semaine' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 pb-20 max-w-7xl mx-auto">
        {/* En-tête de bienvenue */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {user?.name || 'Utilisateur'} 
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Bienvenue dans votre espace spirituel
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.subtext}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Accès rapides */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Accès rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableActions.map((action) => (
              <Card key={action.title} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${action.color} border flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => navigate(action.href)}
                  >
                    Accéder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Messages d'inspiration */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Pensée du jour
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              "La foi, c'est voir la lumière avec son cœur quand ses yeux ne voient que l'obscurité."
            </p>
            <p className="text-sm text-gray-500">
              - Citation spirituelle
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
