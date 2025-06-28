
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Plus, 
  Users, 
  Clock, 
  User, 
  Search,
  Filter,
  Edit,
  Eye
} from 'lucide-react';

const Sessions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const sessions = [
    {
      id: 1,
      date: '2024-01-28',
      time: '14:00',
      theme: 'Foi et Espérance',
      speaker: 'Pasteur Martin',
      attendees: 24,
      status: 'completed',
      summary: 'Session enrichissante sur la foi qui nous guide dans les moments difficiles.'
    },
    {
      id: 2,
      date: '2024-01-21',
      time: '14:00',
      theme: 'L\'amour du prochain',
      speaker: 'Sœur Marie',
      attendees: 28,
      status: 'completed',
      summary: 'Méditation profonde sur l\'importance de l\'amour fraternel.'
    },
    {
      id: 3,
      date: '2024-02-04',
      time: '14:00',
      theme: 'La patience divine',
      speaker: 'Pasteur Martin',
      attendees: 0,
      status: 'upcoming',
      summary: ''
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminée';
      case 'upcoming': return 'À venir';
      case 'cancelled': return 'Annulée';
      default: return 'Inconnue';
    }
  };

  return (
    <div className="p-4 pb-20 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          Gestion des Séances
        </h1>
        <p className="text-slate-600">
          Organisez et suivez les séances spirituelles de votre communauté
        </p>
      </div>

      {/* Actions rapides */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Rechercher une séance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-300"
          />
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Séance
        </Button>
        <Button variant="outline" className="border-slate-300">
          <Filter className="w-4 h-4 mr-2" />
          Filtrer
        </Button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <Card className="mb-6 bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Créer une nouvelle séance</CardTitle>
            <CardDescription>Ajoutez les détails de la prochaine séance spirituelle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-slate-700">Date</Label>
                <Input id="date" type="date" className="bg-white border-slate-300" />
              </div>
              <div>
                <Label htmlFor="time" className="text-slate-700">Heure</Label>
                <Input id="time" type="time" className="bg-white border-slate-300" />
              </div>
            </div>
            <div>
              <Label htmlFor="theme" className="text-slate-700">Thème de la séance</Label>
              <Input id="theme" placeholder="Ex: Foi et Espérance" className="bg-white border-slate-300" />
            </div>
            <div>
              <Label htmlFor="speaker" className="text-slate-700">Orateur</Label>
              <Input id="speaker" placeholder="Ex: Pasteur Martin" className="bg-white border-slate-300" />
            </div>
            <div>
              <Label htmlFor="description" className="text-slate-700">Description (optionnel)</Label>
              <Textarea id="description" placeholder="Ajoutez une description de la séance..." className="bg-white border-slate-300" />
            </div>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Créer la séance
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-blue-600 mb-1">12</div>
            <div className="text-sm text-slate-600">Séances ce mois</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-green-600 mb-1">85%</div>
            <div className="text-sm text-slate-600">Taux présence</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-purple-600 mb-1">26</div>
            <div className="text-sm text-slate-600">Participants moy.</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-orange-600 mb-1">3</div>
            <div className="text-sm text-slate-600">À venir</div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des séances */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-slate-900">Historique des séances</h2>
        {sessions.map((session) => (
          <Card key={session.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-slate-900">{session.theme}</h3>
                    <Badge className={`${getStatusColor(session.status)} text-xs`}>
                      {getStatusText(session.status)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(session.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {session.speaker}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.status === 'upcoming' ? 'Inscriptions ouvertes' : `${session.attendees} participants`}
                    </div>
                  </div>
                  {session.summary && (
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                      {session.summary}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
