
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  UserPlus
} from 'lucide-react';

const Events = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const events = [
    {
      id: 1,
      title: 'Journée portes ouvertes',
      date: '2024-02-15',
      time: '10:00',
      location: 'Centre communautaire',
      description: 'Accueil des nouvelles personnes intéressées par notre communauté',
      status: 'upcoming',
      contacts: 12
    },
    {
      id: 2,
      title: 'Conférence spirituelle',
      date: '2024-01-20',
      time: '19:00',
      location: 'Salle principale',
      description: 'Conférence sur les valeurs spirituelles modernes',
      status: 'completed',
      contacts: 8
    },
    {
      id: 3,
      title: 'Retraite spirituelle',
      date: '2024-03-01',
      time: '09:00',
      location: 'Monastère Saint-Paul',
      description: 'Weekend de méditation et de ressourcement',
      status: 'upcoming',
      contacts: 0
    }
  ];

  const contacts = [
    { id: 1, eventId: 1, name: 'Alice Martin', phone: '06 12 34 56 78', note: 'Très intéressée, souhaite participer régulièrement' },
    { id: 2, eventId: 1, name: 'Bob Johnson', phone: '06 98 76 54 32', note: 'Première visite, poser des questions sur les horaires' },
    { id: 3, eventId: 2, name: 'Claire Dubois', phone: '06 11 22 33 44', note: 'Ancienne pratiquante, souhaite reprendre' }
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
      case 'completed': return 'Terminé';
      case 'upcoming': return 'À venir';
      case 'cancelled': return 'Annulé';
      default: return 'Inconnu';
    }
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

      {/* Actions rapides */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Événement
        </Button>
        <Button
          onClick={() => setShowContactForm(!showContactForm)}
          variant="outline"
          className="border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter Contact
        </Button>
        <Button variant="outline" className="border-slate-300">
          <Filter className="w-4 h-4 mr-2" />
          Filtrer
        </Button>
      </div>

      {/* Formulaire de création d'événement */}
      {showCreateForm && (
        <Card className="mb-6 bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Créer un nouvel événement</CardTitle>
            <CardDescription>Planifiez votre prochain événement communautaire</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-slate-700">Titre de l'événement</Label>
              <Input id="title" placeholder="Ex: Journée portes ouvertes" className="bg-white border-slate-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="event-date" className="text-slate-700">Date</Label>
                <Input id="event-date" type="date" className="bg-white border-slate-300" />
              </div>
              <div>
                <Label htmlFor="event-time" className="text-slate-700">Heure</Label>
                <Input id="event-time" type="time" className="bg-white border-slate-300" />
              </div>
            </div>
            <div>
              <Label htmlFor="location" className="text-slate-700">Lieu</Label>
              <Input id="location" placeholder="Ex: Centre communautaire" className="bg-white border-slate-300" />
            </div>
            <div>
              <Label htmlFor="event-description" className="text-slate-700">Description</Label>
              <Textarea id="event-description" placeholder="Décrivez votre événement..." className="bg-white border-slate-300" />
            </div>
            <div className="flex gap-2">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Créer l'événement
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulaire d'ajout de contact */}
      {showContactForm && (
        <Card className="mb-6 bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Ajouter un nouveau contact</CardTitle>
            <CardDescription>Enregistrez les personnes rencontrées lors d'un événement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contact-event" className="text-slate-700">Événement</Label>
              <select id="contact-event" className="w-full h-10 px-3 py-2 border border-slate-300 rounded-md bg-white">
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.title} - {event.date}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-name" className="text-slate-700">Nom complet</Label>
                <Input id="contact-name" placeholder="Ex: Alice Martin" className="bg-white border-slate-300" />
              </div>
              <div>
                <Label htmlFor="contact-phone" className="text-slate-700">Téléphone</Label>
                <Input id="contact-phone" placeholder="Ex: 06 12 34 56 78" className="bg-white border-slate-300" />
              </div>
            </div>
            <div>
              <Label htmlFor="contact-note" className="text-slate-700">Remarques</Label>
              <Textarea id="contact-note" placeholder="Notes sur la personne, ses intérêts..." className="bg-white border-slate-300" />
            </div>
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Ajouter le contact
              </Button>
              <Button variant="outline" onClick={() => setShowContactForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{events.length}</div>
            <div className="text-sm text-slate-600">Événements total</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-blue-600 mb-1">
              {events.filter(e => e.status === 'upcoming').length}
            </div>
            <div className="text-sm text-slate-600">À venir</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-green-600 mb-1">{contacts.length}</div>
            <div className="text-sm text-slate-600">Contacts total</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-orange-600 mb-1">
              {Math.round(contacts.length / events.filter(e => e.status === 'completed').length) || 0}
            </div>
            <div className="text-sm text-slate-600">Contacts/événement</div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des événements */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-slate-900">Mes événements</h2>
        {events.map((event) => (
          <Card key={event.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-slate-900">{event.title}</h3>
                    <Badge className={`${getStatusColor(event.status)} text-xs`}>
                      {getStatusText(event.status)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} à {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.contacts} contacts
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    {event.description}
                  </p>
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
              
              {/* Contacts associés */}
              {contacts.filter(c => c.eventId === event.id).length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Contacts rencontrés :</h4>
                  <div className="space-y-2">
                    {contacts.filter(c => c.eventId === event.id).map(contact => (
                      <div key={contact.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <div>
                          <div className="font-medium text-sm text-slate-900">{contact.name}</div>
                          <div className="text-xs text-slate-600 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </div>
                        </div>
                        {contact.note && (
                          <div className="text-xs text-slate-600 max-w-xs truncate">
                            {contact.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
