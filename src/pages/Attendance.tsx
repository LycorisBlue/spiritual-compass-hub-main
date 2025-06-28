
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  UserCheck, 
  Search, 
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Filter
} from 'lucide-react';

const Attendance = () => {
  const [selectedSession, setSelectedSession] = useState('2024-01-28');
  const [searchTerm, setSearchTerm] = useState('');

  const sessions = [
    { id: '2024-01-28', date: '28 janvier 2024', theme: 'Foi et Espérance', attendees: 24 },
    { id: '2024-01-21', date: '21 janvier 2024', theme: 'L\'amour du prochain', attendees: 28 },
    { id: '2024-01-14', date: '14 janvier 2024', theme: 'La prière', attendees: 22 }
  ];

  const members = [
    { id: 1, name: 'Marie Dubois', phone: '06 12 34 56 78', status: 'present', note: '' },
    { id: 2, name: 'Jean Martin', phone: '06 98 76 54 32', status: 'present', note: 'Arrivé en retard' },
    { id: 3, name: 'Sarah Johnson', phone: '06 11 22 33 44', status: 'absent', note: 'Prévenu' },
    { id: 4, name: 'Pierre Moreau', phone: '06 55 66 77 88', status: 'present', note: '' },
    { id: 5, name: 'Anne Claire', phone: '06 99 88 77 66', status: 'absent', note: 'Maladie' },
    { id: 6, name: 'David Wilson', phone: '06 33 44 55 66', status: 'present', note: '' },
    { id: 7, name: 'Sophie Bernard', phone: '06 77 88 99 00', status: 'present', note: 'Très participative' },
    { id: 8, name: 'Thomas Petit', phone: '06 22 33 44 55', status: 'absent', note: '' }
  ];

  const [attendance, setAttendance] = useState(() => {
    const initial: Record<number, { status: 'present' | 'absent', note: string }> = {};
    members.forEach(member => {
      initial[member.id] = { status: member.status as 'present' | 'absent', note: member.note };
    });
    return initial;
  });

  const toggleAttendance = (memberId: number) => {
    setAttendance(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        status: prev[memberId].status === 'present' ? 'absent' : 'present'
      }
    }));
  };

  const updateNote = (memberId: number, note: string) => {
    setAttendance(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        note
      }
    }));
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = Object.values(attendance).filter(a => a.status === 'present').length;
  const absentCount = Object.values(attendance).filter(a => a.status === 'absent').length;
  const attendanceRate = Math.round((presentCount / members.length) * 100);

  return (
    <div className="p-4 pb-20 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-green-600" />
          Gestion des Présences
        </h1>
        <p className="text-slate-600">
          Enregistrez et suivez la présence des membres à chaque séance
        </p>
      </div>

      {/* Sélecteur de séance */}
      <Card className="mb-6 bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Sélectionner une séance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sessions.map((session) => (
              <Button
                key={session.id}
                variant={selectedSession === session.id ? "default" : "outline"}
                className={`p-4 h-auto flex flex-col items-start ${
                  selectedSession === session.id 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => setSelectedSession(session.id)}
              >
                <div className="font-medium">{session.theme}</div>
                <div className="text-sm opacity-75">{session.date}</div>
                <div className="text-xs opacity-60">{session.attendees} participants</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-green-600 mb-1">{presentCount}</div>
            <div className="text-sm text-slate-600">Présents</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-red-600 mb-1">{absentCount}</div>
            <div className="text-sm text-slate-600">Absents</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{attendanceRate}%</div>
            <div className="text-sm text-slate-600">Taux présence</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{members.length}</div>
            <div className="text-sm text-slate-600">Total membres</div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-300"
          />
        </div>
        <Button variant="outline" className="border-slate-300">
          <Filter className="w-4 h-4 mr-2" />
          Filtrer
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Enregistrer les présences
        </Button>
      </div>

      {/* Liste des membres */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Liste des présences
          </CardTitle>
          <CardDescription>
            Cochez la présence des membres pour la séance sélectionnée
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200">
            {filteredMembers.map((member) => (
              <div key={member.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      {attendance[member.id]?.status === 'present' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <Switch
                        checked={attendance[member.id]?.status === 'present'}
                        onCheckedChange={() => toggleAttendance(member.id)}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{member.name}</div>
                      <div className="text-sm text-slate-600">{member.phone}</div>
                    </div>
                    <Badge 
                      className={
                        attendance[member.id]?.status === 'present'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {attendance[member.id]?.status === 'present' ? 'Présent' : 'Absent'}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3 ml-12">
                  <Input
                    placeholder="Ajouter une remarque..."
                    value={attendance[member.id]?.note || ''}
                    onChange={(e) => updateNote(member.id, e.target.value)}
                    className="bg-slate-50 border-slate-200 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
