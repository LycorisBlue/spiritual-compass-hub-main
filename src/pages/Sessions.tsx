import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Plus,
  Users,
  Clock,
  User,
  Search,
  Filter,
  Edit,
  Eye,
  MapPin,
  FileText,
  X
} from 'lucide-react';
import { sessionsData, Session, getSessionStats } from '@/data/sessions';
import { useToast } from '@/hooks/use-toast';

const Sessions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [speakerFilter, setSpeakerFilter] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessions, setSessions] = useState<Session[]>(sessionsData);

  const { toast } = useToast();

  // Formulaire pour nouvelle séance
  const [newSession, setNewSession] = useState({
    date: '',
    time: '',
    theme: '',
    speaker: '',
    description: '',
    location: 'Salle principale',
    duration: 90,
    maxCapacity: 30
  });

  // Calcul des statistiques
  const stats = getSessionStats();

  // Liste des orateurs uniques
  const speakers = useMemo(() => {
    const uniqueSpeakers = [...new Set(sessions.map(s => s.speaker))];
    return uniqueSpeakers.sort();
  }, [sessions]);

  // Sessions filtrées
  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      const matchesSearch = session.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
      const matchesSpeaker = speakerFilter === 'all' || session.speaker === speakerFilter;

      return matchesSearch && matchesStatus && matchesSpeaker;
    });
  }, [sessions, searchTerm, statusFilter, speakerFilter]);

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

  const handleCreateSession = () => {
    if (!newSession.date || !newSession.time || !newSession.theme || !newSession.speaker) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const session: Session = {
      id: Date.now().toString(),
      ...newSession,
      status: 'upcoming',
      attendees: 0,
      materials: ['Bible']
    };

    setSessions([...sessions, session]);
    setNewSession({
      date: '',
      time: '',
      theme: '',
      speaker: '',
      description: '',
      location: 'Salle principale',
      duration: 90,
      maxCapacity: 30
    });
    setShowCreateDialog(false);

    toast({
      title: "Séance créée",
      description: "La nouvelle séance a été ajoutée avec succès"
    });
  };

  const handleViewSession = (session: Session) => {
    setSelectedSession(session);
    setShowViewDialog(true);
  };

  const handleEditSession = (session: Session) => {
    setSelectedSession(session);
    setShowEditDialog(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSpeakerFilter('all');
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

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-sm text-slate-600">Total séances</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-green-600 mb-1">{stats.upcoming}</div>
            <div className="text-sm text-slate-600">À venir</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{stats.averageAttendance}</div>
            <div className="text-sm text-slate-600">Participants moy.</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-orange-600 mb-1">{stats.completed}</div>
            <div className="text-sm text-slate-600">Terminées</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6 bg-white border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par thème, orateur ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-slate-300"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="upcoming">À venir</SelectItem>
                <SelectItem value="completed">Terminées</SelectItem>
                <SelectItem value="cancelled">Annulées</SelectItem>
              </SelectContent>
            </Select>
            <Select value={speakerFilter} onValueChange={setSpeakerFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Orateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les orateurs</SelectItem>
                {speakers.map(speaker => (
                  <SelectItem key={speaker} value={speaker}>{speaker}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Effacer
            </Button>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle séance</DialogTitle>
                  <DialogDescription>
                    Ajoutez les détails de la prochaine séance spirituelle
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newSession.date}
                        onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Heure *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newSession.time}
                        onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="theme">Thème *</Label>
                    <Input
                      id="theme"
                      placeholder="Ex: Foi et Espérance"
                      value={newSession.theme}
                      onChange={(e) => setNewSession({ ...newSession, theme: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="speaker">Orateur *</Label>
                    <Input
                      id="speaker"
                      placeholder="Ex: Pasteur Martin"
                      value={newSession.speaker}
                      onChange={(e) => setNewSession({ ...newSession, speaker: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Lieu</Label>
                    <Input
                      id="location"
                      placeholder="Ex: Salle principale"
                      value={newSession.location}
                      onChange={(e) => setNewSession({ ...newSession, location: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Durée (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newSession.duration}
                        onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacité max</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={newSession.maxCapacity}
                        onChange={(e) => setNewSession({ ...newSession, maxCapacity: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez le contenu de la séance..."
                      value={newSession.description}
                      onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreateSession} className="bg-blue-600 hover:bg-blue-700">
                      Créer la séance
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {filteredSessions.length} séance{filteredSessions.length > 1 ? 's' : ''} trouvée{filteredSessions.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Liste des séances */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Aucune séance trouvée</h3>
              <p className="text-slate-600 mb-4">
                Aucune séance ne correspond à vos critères de recherche
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Effacer les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredSessions.map((session) => (
            <Card key={session.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-medium text-slate-900">{session.theme}</h3>
                      <Badge className={`${getStatusColor(session.status)} text-xs`}>
                        {getStatusText(session.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600 mb-3">
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
                        {session.time} ({session.duration}min)
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {session.speaker}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {session.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {session.status === 'upcoming'
                          ? `0/${session.maxCapacity} inscrits`
                          : `${session.attendees} participants`
                        }
                      </div>
                      {session.materials && (
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {session.materials.length} support{session.materials.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    {session.description && (
                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                        {session.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSession(session)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditSession(session)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialog de visualisation */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedSession && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedSession.theme}
                  <Badge className={`${getStatusColor(selectedSession.status)} text-xs`}>
                    {getStatusText(selectedSession.status)}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Détails complets de la séance
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Informations générales</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Date :</strong> {new Date(selectedSession.date).toLocaleDateString('fr-FR')}</div>
                      <div><strong>Heure :</strong> {selectedSession.time}</div>
                      <div><strong>Durée :</strong> {selectedSession.duration} minutes</div>
                      <div><strong>Lieu :</strong> {selectedSession.location}</div>
                      <div><strong>Orateur :</strong> {selectedSession.speaker}</div>
                      <div><strong>Capacité :</strong> {selectedSession.maxCapacity} personnes</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Participation</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Participants :</strong> {selectedSession.attendees}</div>
                      {selectedSession.status === 'completed' && (
                        <div><strong>Taux de remplissage :</strong> {Math.round((selectedSession.attendees / (selectedSession.maxCapacity || 1)) * 100)}%</div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedSession.description && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                      {selectedSession.description}
                    </p>
                  </div>
                )}

                {selectedSession.materials && selectedSession.materials.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Supports utilisés</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSession.materials.map((material, index) => (
                        <Badge key={index} variant="secondary">{material}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSession.summary && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Résumé de la séance</h4>
                    <p className="text-sm text-slate-600 bg-green-50 p-3 rounded-lg border border-green-200">
                      {selectedSession.summary}
                    </p>
                  </div>
                )}

                {selectedSession.notes && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Notes privées</h4>
                    <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      {selectedSession.notes}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier la séance</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la séance
            </DialogDescription>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                Fonctionnalité de modification en cours de développement
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sessions;