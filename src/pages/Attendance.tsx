import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  UserCheck,
  Search,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Download,
  Eye,
  X
} from 'lucide-react';
import {
  membersData,
  sessionsAttendanceData,
  getAttendanceStats,
  getMemberAttendanceRate,
  getSessionAttendanceBySessionId,
  getMembersWithLowAttendance
} from '@/data/members';
import { sessionsData } from '@/data/sessions';
import { useToast } from '@/hooks/use-toast';

const Attendance = () => {
  const [selectedSessionId, setSelectedSessionId] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const { toast } = useToast();

  // État pour les présences (copie modifiable des données)
  const [attendance, setAttendance] = useState(() => {
    const sessionData = sessionsAttendanceData.find(s => s.sessionId === selectedSessionId);
    const initial: Record<string, { status: 'present' | 'absent', note: string }> = {};

    if (sessionData) {
      sessionData.attendances.forEach(att => {
        initial[att.memberId] = {
          status: att.status as 'present' | 'absent',
          note: att.note || ''
        };
      });
    }
    return initial;
  });

  // Données de la session sélectionnée
  const selectedSession = useMemo(() => {
    return sessionsData.find(s => s.id === selectedSessionId);
  }, [selectedSessionId]);

  // Statistiques globales
  const globalStats = getAttendanceStats();

  // Statistiques de la session sélectionnée
  const sessionStats = useMemo(() => {
    const presentCount = Object.values(attendance).filter(a => a.status === 'present').length;
    const absentCount = Object.values(attendance).filter(a => a.status === 'absent').length;
    const totalMembers = membersData.filter(m => m.isActive).length;
    const attendanceRate = totalMembers > 0 ? Math.round((presentCount / totalMembers) * 100) : 0;

    return {
      present: presentCount,
      absent: absentCount,
      total: totalMembers,
      rate: attendanceRate
    };
  }, [attendance]);

  // Membres filtrés
  const filteredMembers = useMemo(() => {
    return membersData.filter(member => {
      if (!member.isActive) return false;

      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
      const memberAttendance = attendance[member.id];

      let matchesStatus = true;
      if (statusFilter === 'present') {
        matchesStatus = memberAttendance?.status === 'present';
      } else if (statusFilter === 'absent') {
        matchesStatus = memberAttendance?.status === 'absent';
      }

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, attendance]);

  // Membres avec faible assiduité
  const lowAttendanceMembers = getMembersWithLowAttendance(60);

  // Gestion du changement de session
  const handleSessionChange = (sessionId: string) => {
    setSelectedSessionId(sessionId);

    // Réinitialiser les présences pour la nouvelle session
    const sessionData = sessionsAttendanceData.find(s => s.sessionId === sessionId);
    const newAttendance: Record<string, { status: 'present' | 'absent', note: string }> = {};

    if (sessionData) {
      sessionData.attendances.forEach(att => {
        newAttendance[att.memberId] = {
          status: att.status as 'present' | 'absent',
          note: att.note || ''
        };
      });
    } else {
      // Nouvelle session - tous absents par défaut
      membersData.forEach(member => {
        if (member.isActive) {
          newAttendance[member.id] = { status: 'absent', note: '' };
        }
      });
    }

    setAttendance(newAttendance);
  };

  const toggleAttendance = (memberId: string) => {
    setAttendance(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        status: prev[memberId]?.status === 'present' ? 'absent' : 'present'
      }
    }));
  };

  const updateNote = (memberId: string, note: string) => {
    setAttendance(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId] || { status: 'absent', note: '' },
        note
      }
    }));
  };

  const saveAttendance = () => {
    // Ici vous pourriez sauvegarder les données dans une base de données
    toast({
      title: "Présences enregistrées",
      description: `Les présences pour la séance "${selectedSession?.theme}" ont été sauvegardées.`
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

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
          <CardDescription>
            Choisissez la séance pour laquelle enregistrer les présences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedSessionId} onValueChange={handleSessionChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sessionsData.map((session) => (
                <SelectItem key={session.id} value={session.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{session.theme}</span>
                    <span className="text-sm text-slate-500">
                      {new Date(session.date).toLocaleDateString('fr-FR')} - {session.speaker}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedSession && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">{selectedSession.theme}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                <div>
                  <strong>Date:</strong> {new Date(selectedSession.date).toLocaleDateString('fr-FR')}
                </div>
                <div>
                  <strong>Heure:</strong> {selectedSession.time}
                </div>
                <div>
                  <strong>Orateur:</strong> {selectedSession.speaker}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-green-600 mb-1">{sessionStats.present}</div>
            <div className="text-sm text-slate-600">Présents</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-red-600 mb-1">{sessionStats.absent}</div>
            <div className="text-sm text-slate-600">Absents</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-blue-600 mb-1">{sessionStats.rate}%</div>
            <div className="text-sm text-slate-600">Taux présence</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-semibold text-purple-600 mb-1">{globalStats.activeMembers}</div>
            <div className="text-sm text-slate-600">Membres actifs</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions et filtres */}
      <Card className="mb-6 bg-white border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un membre..."
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
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="present">Présents</SelectItem>
                <SelectItem value="absent">Absents</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Effacer
            </Button>
            <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Statistiques
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Statistiques de présence</DialogTitle>
                  <DialogDescription>
                    Vue d'ensemble de l'assiduité des membres
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-semibold text-green-600">{globalStats.averageAttendanceRate}%</div>
                      <div className="text-sm text-green-800">Taux moyen global</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-semibold text-blue-600">{globalStats.perfectAttendance}</div>
                      <div className="text-sm text-blue-800">Assiduité parfaite</div>
                    </div>
                  </div>

                  {lowAttendanceMembers.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        Membres à faible assiduité (moins de 60%)
                      </h4>
                      <div className="space-y-2">
                        {lowAttendanceMembers.map(member => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-200">
                            <span className="text-sm text-orange-900">{member.name}</span>
                            <Badge className="bg-orange-100 text-orange-800">
                              {getMemberAttendanceRate(member.id)}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={saveAttendance} className="bg-green-600 hover:bg-green-700 text-white">
              Enregistrer les présences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {filteredMembers.length} membre{filteredMembers.length > 1 ? 's' : ''} affiché{filteredMembers.length > 1 ? 's' : ''}
        </p>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exporter
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
          {filteredMembers.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun membre trouvé</h3>
              <p className="text-slate-600 mb-4">
                Aucun membre ne correspond à vos critères de recherche
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Effacer les filtres
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredMembers.map((member) => {
                const memberAttendance = attendance[member.id] || { status: 'absent', note: '' };
                const memberRate = getMemberAttendanceRate(member.id);

                return (
                  <div key={member.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-3">
                          {memberAttendance.status === 'present' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <Switch
                            checked={memberAttendance.status === 'present'}
                            onCheckedChange={() => toggleAttendance(member.id)}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="font-medium text-slate-900">{member.name}</div>
                            <Badge
                              className={`text-xs ${memberRate >= 80 ? 'bg-green-100 text-green-800' :
                                  memberRate >= 60 ? 'bg-orange-100 text-orange-800' :
                                    'bg-red-100 text-red-800'
                                }`}
                            >
                              {memberRate}% assiduité
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600">
                            {member.phone} • {member.gender === 'M' ? 'Homme' : 'Femme'}
                          </div>
                        </div>
                        <Badge
                          className={
                            memberAttendance.status === 'present'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-red-100 text-red-800 border-red-200'
                          }
                        >
                          {memberAttendance.status === 'present' ? 'Présent' : 'Absent'}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3 ml-12">
                      <Input
                        placeholder="Ajouter une remarque..."
                        value={memberAttendance.note}
                        onChange={(e) => updateNote(member.id, e.target.value)}
                        className="bg-slate-50 border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;