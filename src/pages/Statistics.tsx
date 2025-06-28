
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Award,
  Download,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Statistics = () => {
  const [period, setPeriod] = useState('month');

  // Données d'exemple pour les graphiques
  const attendanceData = [
    { month: 'Jan', sessions: 4, attendance: 85 },
    { month: 'Fév', sessions: 4, attendance: 92 },
    { month: 'Mar', sessions: 5, attendance: 78 },
    { month: 'Avr', sessions: 4, attendance: 88 },
    { month: 'Mai', sessions: 4, attendance: 95 },
    { month: 'Jun', sessions: 3, attendance: 82 }
  ];

  const membersByAge = [
    { name: '18-25 ans', value: 12, color: '#3B82F6' },
    { name: '26-35 ans', value: 18, color: '#10B981' },
    { name: '36-50 ans', value: 24, color: '#8B5CF6' },
    { name: '51-65 ans', value: 16, color: '#F59E0B' },
    { name: '65+ ans', value: 8, color: '#EF4444' }
  ];

  const discipleshipProgress = [
    { month: 'Jan', active: 6, completed: 2 },
    { month: 'Fév', active: 8, completed: 3 },
    { month: 'Mar', active: 7, completed: 4 },
    { month: 'Avr', active: 9, completed: 2 },
    { month: 'Mai', active: 8, completed: 5 },
    { month: 'Jun', active: 10, completed: 3 }
  ];

  const eventStats = [
    { name: 'Portes ouvertes', contacts: 12, conversions: 8 },
    { name: 'Conférences', contacts: 8, conversions: 5 },
    { name: 'Retraites', contacts: 15, conversions: 12 },
    { name: 'Ateliers', contacts: 6, conversions: 4 }
  ];

  return (
    <div className="p-4 pb-20 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-orange-600" />
          Statistiques & Analyses
        </h1>
        <p className="text-slate-600">
          Analysez les données de votre communauté spirituelle
        </p>
      </div>

      {/* Filtres et actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <Button 
            variant={period === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('week')}
          >
            Semaine
          </Button>
          <Button 
            variant={period === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('month')}
          >
            Mois
          </Button>
          <Button 
            variant={period === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('year')}
          >
            Année
          </Button>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" className="border-slate-300">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-blue-600 mb-1">87%</div>
                <div className="text-sm text-slate-600">Taux présence</div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                +5% ce mois
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-green-600 mb-1">78</div>
                <div className="text-sm text-slate-600">Membres actifs</div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                +12 nouveaux
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-purple-600 mb-1">24</div>
                <div className="text-sm text-slate-600">Séances ce mois</div>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                Planning respecté
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-orange-600 mb-1">16</div>
                <div className="text-sm text-slate-600">Discipolat actif</div>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                68% taux suivi
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Évolution de la présence */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Évolution de la présence</CardTitle>
            <CardDescription>Taux de présence mensuel aux séances</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par âge */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Répartition par âge</CardTitle>
            <CardDescription>Distribution des membres par tranche d'âge</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={membersByAge}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {membersByAge.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques secondaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Suivi du discipolat */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Suivi du discipolat</CardTitle>
            <CardDescription>Évolution des suivis spirituels actifs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={discipleshipProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="active" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance des événements */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Performance des événements</CardTitle>
            <CardDescription>Contacts et conversions par type d'événement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="contacts" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights et recommandations */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Insights & Recommandations
          </CardTitle>
          <CardDescription>Analyses automatiques basées sur vos données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">📈 Croissance positive</h4>
              <p className="text-sm text-green-800">
                Le taux de présence a augmenté de 5% ce mois. Les séances du dimanche après-midi semblent plus populaires.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">👥 Engagement fort</h4>
              <p className="text-sm text-blue-800">
                68% des membres participent activement au discipolat, ce qui est excellent pour l'accompagnement spirituel.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 mb-2">🎯 Opportunité</h4>
              <p className="text-sm text-orange-800">
                Les événements "Retraites" ont le meilleur taux de conversion (80%). Envisagez d'en organiser plus.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">⚡ Point d'attention</h4>
              <p className="text-sm text-purple-800">
                La tranche 18-25 ans est moins représentée. Considérez des activités adaptées aux jeunes adultes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
