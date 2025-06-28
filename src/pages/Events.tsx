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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CalendarDays,
  Plus,
  MapPin,
  Users,
  Phone,
  Search,
  Filter,
  Edit,
  Eye,
  UserPlus,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  X,
  Download
} from 'lucide-react';
import {
  eventsData,
  Event,
  EventContact,
  getEventStats,
  eventTypes,
  contactInterestLevels,
  followUpStatuses,
  getContactsByEvent,
  getParticipantsByEvent
} from '@/data/events';
import { useToast } from '@/hooks/use-toast';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(eventsData);

  const { toast } = useToast();

  // Formulaire pour nouvel événement
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'evangelization' as Event['type'],
    date: '',
    time: '',
    endTime: '',
    location: '',
    description: '',
    organizer: '',
    maxParticipants: 20,
    budget: 0
  });

  // Formulaire pour nouveau contact
  const [newContact, setNewContact] = useState({
    eventId: '',
    name: '',
    phone: '',
    age: '',
    profession: '',
    interestLevel: 'medium' as EventContact['interestLevel'],
    notes: '',
    contactedBy: ''
  });

  // Statistiques
  const stats = getEventStats();

  // Événements filtrés
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, searchTerm, typeFilter, statusFilter]);

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
      case 'completed': return 'Terminé';
      case 'upcoming': return 'À venir';
      case 'cancelled': return 'Annulé';
      default: return 'Inconnu';
    }
  };

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'evangelization': return 'bg-purple-100 text-purple-800';
      case 'conference': return 'bg-blue-100 text-blue-800';
      case 'retreat': return 'bg-green-100 text-green-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      case 'outreach': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInterestLevelColor = (level: EventContact['interestLevel']) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      status: 'upcoming',
      registeredParticipants: [],
      contacts: [],
      expenses: [],
      materials: []
    };

    setEvents([...events, event]);
    setNewEvent({
      title: '',
      type: 'evangelization',
      date: '',
      time: '',
      endTime: '',
      location: '',
      description: '',
      organizer: '',
      maxParticipants: 20,
      budget: 0
    });
    setShowCreateDialog(false);

    toast({
      title: "Événement créé",
      description: "Le nouvel événement a été ajouté avec succès"
    });
  };

  const handleCreateContact = () => {
    if (!newContact.eventId || !newContact.name || !newContact.phone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const contact: EventContact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      age: newContact.age ? parseInt(newContact.age) : undefined,
      profession: newContact.profession || undefined,
      contactMethod: 'direct',
      interestLevel: newContact.interestLevel,
      followUpStatus: 'pending',
      notes: newContact.notes,
      contactedBy: newContact.contactedBy
    };

    setEvents(prev => prev.map(event =>
      event.id === newContact.eventId
        ? { ...event, contacts: [...event.contacts, contact] }
        : event
    ));

    setNewContact({
      eventId: '',
      name: '',
      phone: '',
      age: '',
      profession: '',
      interestLevel: 'medium',
      notes: '',
      contactedBy: ''
    });
    setShowContactDialog(false);

    toast({
      title: "Contact ajouté",
      description: "Le nouveau contact a été enregistré avec succès"
    });
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowViewDialog(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="p-4 pb-20 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-purple-600" />
          Gestion des Événements
        </h1>
        <p className="text-slate-600">
          Organisez vos événements et gérez les contacts rencontrés
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-purple-600 mb-1">{stats.total}</div>
                <div className="text-sm text-slate-600">Événements total</div>
              </div>
              <CalendarDays className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-green-600 mb-1">{stats.totalContacts}</div>
                <div className="text-sm text-slate-600">Contacts total</div>
              </div>
              <Users className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-blue-600 mb-1">{stats.conversions}</div>
                <div className="text-sm text-slate-600">Conversions</div>
              </div>
              <Target className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-orange-600 mb-1">{stats.conversionRate}%</div>
                <div className="text-sm text-slate-600">Taux conversion</div>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et actions */}
      <Card className="mb-6 bg-white border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par titre, lieu ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-slate-300"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {Object.entries(eventTypes).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="upcoming">À venir</SelectItem>
                <SelectItem value="completed">Terminés</SelectItem>
                <SelectItem value="cancelled">Annulés</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Effacer
            </Button>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel Événement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer un nouvel événement</DialogTitle>
                  <DialogDescription>Planifiez votre prochain événement communautaire</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Évangélisation à Cocody Riviera"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type d'événement</Label>
                      <Select value={newEvent.type} onValueChange={(value: Event['type']) => setNewEvent({ ...newEvent, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(eventTypes).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="organizer">Organisateur</Label>
                      <Input
                        id="organizer"
                        placeholder="Nom de l'organisateur"
                        value={newEvent.organizer}
                        onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="event-date">Date *</Label>
                      <Input
                        id="event-date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-time">Heure début</Label>
                      <Input
                        id="event-time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-end-time">Heure fin</Label>
                      <Input
                        id="event-end-time"
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Lieu *</Label>
                    <Input
                      id="location"
                      placeholder="Ex: Quartier Riviera, Cocody"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxParticipants">Nb max participants</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        value={newEvent.maxParticipants}
                        onChange={(e) => setNewEvent({ ...newEvent, maxParticipants: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget (FCFA)</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={newEvent.budget}
                        onChange={(e) => setNewEvent({ ...newEvent, budget: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      placeholder="Décrivez votre événement..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreateEvent} className="bg-purple-600 hover:bg-purple-700">
                      Créer l'événement
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Ajouter Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau contact</DialogTitle>
                  <DialogDescription>Enregistrez une personne rencontrée lors d'un événement</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-event">Événement *</Label>
                    <Select value={newContact.eventId} onValueChange={(value) => setNewContact({ ...newContact, eventId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un événement" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map(event => (
                          <SelectItem key={event.id} value={event.id}>
                            {event.title} - {new Date(event.date).toLocaleDateString('fr-FR')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Nom complet *</Label>
                      <Input
                        id="contact-name"
                        placeholder="Ex: Konan Marie-Claire"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Téléphone *</Label>
                      <Input
                        id="contact-phone"
                        placeholder="Ex: 07 45 67 89 12"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-age">Âge</Label>
                      <Input
                        id="contact-age"
                        type="number"
                        placeholder="Ex: 34"
                        value={newContact.age}
                        onChange={(e) => setNewContact({ ...newContact, age: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-profession">Profession</Label>
                      <Input
                        id="contact-profession"
                        placeholder="Ex: Commerçante"
                        value={newContact.profession}
                        onChange={(e) => setNewContact({ ...newContact, profession: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="interest-level">Niveau d'intérêt</Label>
                      <Select value={newContact.interestLevel} onValueChange={(value: EventContact['interestLevel']) => setNewContact({ ...newContact, interestLevel: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(contactInterestLevels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contacted-by">Contacté par</Label>
                      <Input
                        id="contacted-by"
                        placeholder="Nom du membre"
                        value={newContact.contactedBy}
                        onChange={(e) => setNewContact({ ...newContact, contactedBy: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-notes">Remarques</Label>
                    <Textarea
                      id="contact-notes"
                      placeholder="Notes sur la personne, ses intérêts, contexte de la rencontre..."
                      value={newContact.notes}
                      onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreateContact} className="bg-green-600 hover:bg-green-700">
                      Ajouter le contact
                    </Button>
                    <Button variant="outline" onClick={() => setShowContactDialog(false)}>
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
          {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
        </p>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Liste des événements */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-8 text-center">
              <CalendarDays className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun événement trouvé</h3>
              <p className="text-slate-600 mb-4">
                Aucun événement ne correspond à vos critères de recherche
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Effacer les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <Card key={event.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-medium text-slate-900">{event.title}</h3>
                      <Badge className={`${getTypeColor(event.type)} text-xs`}>
                        {eventTypes[event.type]}
                      </Badge>
                      <Badge className={`${getStatusColor(event.status)} text-xs`}>
                        {getStatusText(event.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time} {event.endTime && `- ${event.endTime}`}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.registeredParticipants.length}{event.maxParticipants && `/${event.maxParticipants}`} participants
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {event.contacts.length} contact{event.contacts.length > 1 ? 's' : ''}
                      </div>
                      {event.budget && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {event.budget.toLocaleString()} FCFA
                        </div>
                      )}
                      {event.results && (
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {event.results.conversions} conversion{event.results.conversions > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewEvent(event)}
                    >
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
          ))
        )}
      </div>

      {/* Dialog de visualisation */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedEvent.title}
                  <Badge className={`${getTypeColor(selectedEvent.type)} text-xs`}>
                    {eventTypes[selectedEvent.type]}
                  </Badge>
                  <Badge className={`${getStatusColor(selectedEvent.status)} text-xs`}>
                    {getStatusText(selectedEvent.status)}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Détails complets de l'événement
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="participants">Participants ({selectedEvent.registeredParticipants.length})</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts ({selectedEvent.contacts.length})</TabsTrigger>
                  <TabsTrigger value="budget">Budget</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Informations générales</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Date :</strong> {new Date(selectedEvent.date).toLocaleDateString('fr-FR')}</div>
                        <div><strong>Heure :</strong> {selectedEvent.time} {selectedEvent.endTime && `- ${selectedEvent.endTime}`}</div>
                        <div><strong>Lieu :</strong> {selectedEvent.location}</div>
                        <div><strong>Organisateur :</strong> {selectedEvent.organizer}</div>
                        <div><strong>Capacité max :</strong> {selectedEvent.maxParticipants} personnes</div>
                        <div><strong>Type :</strong> {eventTypes[selectedEvent.type]}</div>
                      </div>
                    </div>

                    {selectedEvent.results && (
                      <div>
                        <h4 className="font-medium text-slate-900 mb-3">Résultats</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Participants :</strong> {selectedEvent.results.attendees}</div>
                          <div><strong>Nouveaux contacts :</strong> {selectedEvent.results.newContacts}</div>
                          <div><strong>Conversions :</strong> {selectedEvent.results.conversions}</div>
                          <div><strong>Suivis en cours :</strong> {selectedEvent.results.followUps}</div>
                          <div><strong>Satisfaction :</strong> {selectedEvent.results.satisfaction}/5</div>
                          <div><strong>Impact :</strong> {selectedEvent.results.impact}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Description</h4>
                    <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {selectedEvent.materials && selectedEvent.materials.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Matériel utilisé</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.materials.map((material, index) => (
                          <Badge key={index} variant="secondary">{material}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEvent.summary && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Résumé</h4>
                      <p className="text-sm text-slate-600 bg-green-50 p-4 rounded-lg border border-green-200">
                        {selectedEvent.summary}
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="participants" className="space-y-4">
                  <div className="space-y-3">
                    {selectedEvent.registeredParticipants.length === 0 ? (
                      <p className="text-center text-slate-500 py-8">Aucun participant inscrit</p>
                    ) : (
                      selectedEvent.registeredParticipants.map(participant => (
                        <div key={participant.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <div className="font-medium text-slate-900">{participant.name}</div>
                            <div className="text-sm text-slate-600">
                              {participant.phone} • {participant.role}
                              {participant.registrationDate && (
                                <span> • Inscrit le {new Date(participant.registrationDate).toLocaleDateString('fr-FR')}</span>
                              )}
                            </div>
                            {participant.notes && (
                              <div className="text-xs text-slate-500 mt-1">{participant.notes}</div>
                            )}
                          </div>
                          <Badge className={participant.confirmed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                            {participant.confirmed ? 'Confirmé' : 'En attente'}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-4">
                  <div className="space-y-3">
                    {selectedEvent.contacts.length === 0 ? (
                      <p className="text-center text-slate-500 py-8">Aucun contact enregistré</p>
                    ) : (
                      selectedEvent.contacts.map(contact => (
                        <div key={contact.id} className="p-4 bg-slate-50 rounded-lg border">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-medium text-slate-900">{contact.name}</div>
                              <div className="text-sm text-slate-600">
                                {contact.phone}
                                {contact.age && ` • ${contact.age} ans`}
                                {contact.profession && ` • ${contact.profession}`}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getInterestLevelColor(contact.interestLevel)}>
                                {contactInterestLevels[contact.interestLevel]}
                              </Badge>
                              <Badge variant="outline">
                                {followUpStatuses[contact.followUpStatus]}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-sm text-slate-600 mb-2">
                            <strong>Contacté par :</strong> {contact.contactedBy}
                            {contact.followUpDate && (
                              <span> • <strong>Suivi le :</strong> {new Date(contact.followUpDate).toLocaleDateString('fr-FR')}</span>
                            )}
                          </div>

                          {contact.notes && (
                            <div className="text-sm text-slate-600 bg-white p-3 rounded border">
                              <strong>Notes :</strong> {contact.notes}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="budget" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-semibold text-blue-600 mb-1">
                          {selectedEvent.budget?.toLocaleString() || 0} FCFA
                        </div>
                        <div className="text-sm text-slate-600">Budget prévu</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-semibold text-red-600 mb-1">
                          {selectedEvent.expenses?.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString() || 0} FCFA
                        </div>
                        <div className="text-sm text-slate-600">Dépenses réelles</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-semibold text-green-600 mb-1">
                          {((selectedEvent.budget || 0) - (selectedEvent.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0)).toLocaleString()} FCFA
                        </div>
                        <div className="text-sm text-slate-600">Reste disponible</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Détail des dépenses</h4>
                    <div className="space-y-2">
                      {selectedEvent.expenses && selectedEvent.expenses.length > 0 ? (
                        selectedEvent.expenses.map(expense => (
                          <div key={expense.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <div className="font-medium text-slate-900">{expense.description}</div>
                              <div className="text-sm text-slate-600">
                                {expense.category} • {new Date(expense.date).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                            <div className="text-lg font-semibold text-red-600">
                              {expense.amount.toLocaleString()} FCFA
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-slate-500 py-8">Aucune dépense enregistrée</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;