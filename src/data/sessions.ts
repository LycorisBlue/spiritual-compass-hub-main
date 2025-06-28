export interface Session {
  id: string;
  date: string;
  time: string;
  theme: string;
  speaker: string;
  description?: string;
  status: "upcoming" | "completed" | "cancelled";
  attendees: number;
  summary?: string;
  location?: string;
  duration?: number; // en minutes
  materials?: string[]; // supports utilisés
  notes?: string; // notes privées
  maxCapacity?: number;
}

export const sessionsData: Session[] = [
  {
    id: "1",
    date: "2024-01-28",
    time: "14:00",
    theme: "Foi et Espérance",
    speaker: "Pasteur Martin",
    description:
      "Une réflexion profonde sur la foi qui nous guide dans les moments difficiles de la vie.",
    status: "completed",
    attendees: 24,
    summary:
      "Session enrichissante sur la foi qui nous guide dans les moments difficiles. Les participants ont été très engagés dans les discussions.",
    location: "Salle principale",
    duration: 90,
    materials: ["Bible", "Cantiques", "Support PDF"],
    notes:
      "Très bonne participation, prévoir plus de temps pour les questions la prochaine fois",
    maxCapacity: 30,
  },
  {
    id: "2",
    date: "2024-01-21",
    time: "14:00",
    theme: "L'amour du prochain",
    speaker: "Sœur Marie",
    description:
      "Méditation sur l'importance de l'amour fraternel dans notre communauté.",
    status: "completed",
    attendees: 28,
    summary:
      "Méditation profonde sur l'importance de l'amour fraternel. Beaucoup de témoignages touchants.",
    location: "Salle principale",
    duration: 85,
    materials: ["Bible", "Livret de méditation"],
    notes:
      "Session très émouvante, plusieurs personnes ont demandé un suivi individuel",
    maxCapacity: 30,
  },
  {
    id: "3",
    date: "2024-02-04",
    time: "14:00",
    theme: "La patience divine",
    speaker: "Pasteur Martin",
    description:
      "Comprendre la patience de Dieu envers nous et développer notre propre patience.",
    status: "upcoming",
    attendees: 0,
    location: "Salle principale",
    duration: 90,
    materials: ["Bible", "Cantiques"],
    maxCapacity: 30,
  },
  {
    id: "4",
    date: "2024-02-11",
    time: "14:00",
    theme: "Le pardon",
    speaker: "Pasteur André",
    description:
      "L'art du pardon : se pardonner à soi-même et pardonner aux autres.",
    status: "upcoming",
    attendees: 0,
    location: "Salle principale",
    duration: 90,
    materials: ["Bible", "Support vidéo"],
    maxCapacity: 30,
  },
  {
    id: "5",
    date: "2024-02-18",
    time: "14:00",
    theme: "La prière contemplative",
    speaker: "Sœur Marie",
    description:
      "Initiation aux différentes formes de prière et à la méditation silencieuse.",
    status: "upcoming",
    attendees: 0,
    location: "Chapelle",
    duration: 120,
    materials: ["Guide de prière", "Coussins de méditation"],
    maxCapacity: 20,
  },
  {
    id: "6",
    date: "2024-01-14",
    time: "14:00",
    theme: "La gratitude",
    speaker: "Diacre Paul",
    description:
      "Cultiver un cœur reconnaissant dans toutes les circonstances de la vie.",
    status: "completed",
    attendees: 22,
    summary:
      "Session inspirante sur la gratitude. Les exercices pratiques ont été très appréciés.",
    location: "Salle principale",
    duration: 80,
    materials: ["Bible", "Journal de gratitude"],
    notes: "Distribuer plus de journaux de gratitude la prochaine fois",
    maxCapacity: 30,
  },
  {
    id: "7",
    date: "2024-01-07",
    time: "14:00",
    theme: "Nouvelle année, nouveau départ",
    speaker: "Pasteur Martin",
    description:
      "Réflexions spirituelles pour bien commencer l'année avec foi et espérance.",
    status: "completed",
    attendees: 32,
    summary:
      "Excellente session de début d'année. Salle comble, beaucoup d'enthousiasme.",
    location: "Grande salle",
    duration: 95,
    materials: ["Bible", "Cartes de résolutions spirituelles"],
    notes:
      "Capacité dépassée, prévoir une plus grande salle pour les sessions spéciales",
    maxCapacity: 30,
  },
];

// Fonctions utilitaires pour manipuler les données
export const getSessionById = (id: string): Session | undefined => {
  return sessionsData.find((session) => session.id === id);
};

export const getSessionsByStatus = (status: Session["status"]): Session[] => {
  return sessionsData.filter((session) => session.status === status);
};

export const getSessionsBySpeaker = (speaker: string): Session[] => {
  return sessionsData.filter((session) => session.speaker === speaker);
};

export const getUpcomingSessions = (): Session[] => {
  return sessionsData
    .filter((session) => session.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getRecentSessions = (limit: number = 5): Session[] => {
  return sessionsData
    .filter((session) => session.status === "completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getSessionStats = () => {
  const total = sessionsData.length;
  const completed = sessionsData.filter((s) => s.status === "completed").length;
  const upcoming = sessionsData.filter((s) => s.status === "upcoming").length;
  const cancelled = sessionsData.filter((s) => s.status === "cancelled").length;

  const totalAttendees = sessionsData
    .filter((s) => s.status === "completed")
    .reduce((sum, session) => sum + session.attendees, 0);

  const averageAttendance =
    completed > 0 ? Math.round(totalAttendees / completed) : 0;

  return {
    total,
    completed,
    upcoming,
    cancelled,
    averageAttendance,
    totalAttendees,
  };
};
