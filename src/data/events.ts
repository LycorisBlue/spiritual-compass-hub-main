export interface Event {
  id: string;
  title: string;
  type: "evangelization" | "conference" | "retreat" | "workshop" | "outreach";
  date: string;
  time: string;
  endTime?: string;
  location: string;
  description: string;
  organizer: string;
  status: "upcoming" | "completed" | "cancelled";
  maxParticipants?: number;
  registeredParticipants: EventParticipant[];
  contacts: EventContact[];
  budget?: number;
  expenses?: EventExpense[];
  materials?: string[];
  photos?: string[];
  summary?: string;
  results?: EventResults;
}

export interface EventParticipant {
  id: string;
  memberId?: string; // Si c'est un membre existant
  name: string;
  phone?: string;
  role: "organizer" | "participant" | "speaker" | "volunteer";
  confirmed: boolean;
  registrationDate: string;
  notes?: string;
}

export interface EventContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  age?: number;
  profession?: string;
  address?: string;
  contactMethod: "phone" | "direct" | "referral";
  interestLevel: "low" | "medium" | "high";
  followUpDate?: string;
  followUpStatus: "pending" | "contacted" | "converted" | "not_interested";
  notes: string;
  contactedBy: string;
  source?: string; // Comment il a été contacté
}

export interface EventExpense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  receipt?: string;
}

export interface EventResults {
  attendees: number;
  newContacts: number;
  conversions: number;
  followUps: number;
  satisfaction: number; // 1-5
  impact: string;
}

export const eventsData: Event[] = [
  {
    id: "1",
    title: "Évangélisation à Cocody Riviera",
    type: "evangelization",
    date: "2024-01-20",
    time: "09:00",
    endTime: "17:00",
    location: "Quartier Riviera, Cocody",
    description:
      "Sortie d'évangélisation de rue dans le quartier Riviera. Distribution de tracts, témoignages et prières avec les habitants.",
    organizer: "Pasteur Martin",
    status: "completed",
    maxParticipants: 15,
    registeredParticipants: [
      {
        id: "1",
        memberId: "1",
        name: "Ouaraga Azie zahui johan",
        phone: "07 12 34 56 78",
        role: "participant",
        confirmed: true,
        registrationDate: "2024-01-15",
      },
      {
        id: "2",
        memberId: "2",
        name: "Bayou kogore ange emmanuel",
        phone: "07 23 45 67 89",
        role: "participant",
        confirmed: true,
        registrationDate: "2024-01-15",
      },
      {
        id: "3",
        memberId: "22",
        name: "Boniface",
        phone: "07 23 26 38 90",
        role: "organizer",
        confirmed: true,
        registrationDate: "2024-01-10",
      },
      {
        id: "4",
        memberId: "18",
        name: "Ello",
        phone: "07 89 02 14 56",
        role: "volunteer",
        confirmed: true,
        registrationDate: "2024-01-16",
      },
    ],
    contacts: [
      {
        id: "1",
        name: "Konan Marie-Claire",
        phone: "07 45 67 89 12",
        age: 34,
        profession: "Commerçante",
        contactMethod: "direct",
        interestLevel: "high",
        followUpStatus: "contacted",
        notes:
          "Très intéressée par nos activités. A demandé l'adresse de notre église. Souhaite venir dimanche prochain.",
        contactedBy: "Boniface",
        source: "Rencontrée sur son lieu de travail",
      },
      {
        id: "2",
        name: "Adama Ouattara",
        phone: "07 56 78 90 23",
        age: 28,
        profession: "Étudiant",
        contactMethod: "direct",
        interestLevel: "medium",
        followUpStatus: "pending",
        notes:
          "Étudiant en sociologie. Curieux sur la spiritualité moderne. A pris notre brochure.",
        contactedBy: "Ello",
        source: "Abordé près de l'université",
      },
      {
        id: "3",
        name: "Fatou Diallo",
        phone: "07 67 89 01 34",
        age: 42,
        profession: "Infirmière",
        contactMethod: "direct",
        interestLevel: "high",
        followUpStatus: "converted",
        followUpDate: "2024-01-25",
        notes:
          "Traversait une période difficile. Très touchée par notre témoignage. A participé à notre séance suivante.",
        contactedBy: "Ouaraga Azie",
        source: "Rencontrée dans la rue",
      },
      {
        id: "4",
        name: "Jean-Baptiste Kone",
        phone: "07 78 90 12 45",
        age: 55,
        profession: "Chauffeur",
        contactMethod: "direct",
        interestLevel: "low",
        followUpStatus: "not_interested",
        notes: "Poli mais pas intéressé. A respectueusement décliné.",
        contactedBy: "Bayou kogore",
        source: "Station de taxi",
      },
    ],
    budget: 25000,
    expenses: [
      {
        id: "1",
        category: "Transport",
        description: "Frais de transport aller-retour",
        amount: 8000,
        date: "2024-01-20",
      },
      {
        id: "2",
        category: "Matériel",
        description: "Tracts et brochures",
        amount: 12000,
        date: "2024-01-18",
      },
      {
        id: "3",
        category: "Rafraîchissements",
        description: "Eau et collations pour l'équipe",
        amount: 5000,
        date: "2024-01-20",
      },
    ],
    materials: ["Tracts", "Brochures", "Bibles de poche", "Cartes de visite"],
    summary:
      "Excellente journée d'évangélisation. Bonne réception de la part des habitants. 4 contacts significatifs établis avec 1 conversion immédiate.",
    results: {
      attendees: 4,
      newContacts: 4,
      conversions: 1,
      followUps: 3,
      satisfaction: 5,
      impact: "Très positif - Zone à revisiter",
    },
  },
  {
    id: "2",
    title: "Évangélisation à Cocody Angré",
    type: "evangelization",
    date: "2024-02-03",
    time: "14:00",
    endTime: "18:00",
    location: "Quartier Angré, Cocody",
    description:
      "Sortie d'évangélisation dans les quartiers résidentiels d'Angré. Focus sur les familles et les jeunes.",
    organizer: "Sœur Marie",
    status: "completed",
    maxParticipants: 12,
    registeredParticipants: [
      {
        id: "5",
        memberId: "3",
        name: "Ahibe Daniella Ghyslaine",
        phone: "07 34 56 78 90",
        role: "organizer",
        confirmed: true,
        registrationDate: "2024-01-28",
      },
      {
        id: "6",
        memberId: "4",
        name: "Yao Andrea Christelle",
        phone: "07 45 67 89 01",
        role: "participant",
        confirmed: true,
        registrationDate: "2024-01-30",
      },
      {
        id: "7",
        memberId: "17",
        name: "Kelly",
        phone: "07 78 91 03 45",
        role: "participant",
        confirmed: true,
        registrationDate: "2024-01-29",
      },
    ],
    contacts: [
      {
        id: "5",
        name: "Adjoua Bénédicte",
        phone: "07 89 12 34 56",
        age: 29,
        profession: "Banquière",
        contactMethod: "direct",
        interestLevel: "medium",
        followUpStatus: "contacted",
        notes:
          "Jeune professionnelle stressée. Intéressée par la méditation et la paix intérieure.",
        contactedBy: "Daniella",
        source: "Devant son domicile",
      },
      {
        id: "6",
        name: "Kouame Paul",
        phone: "07 90 23 45 67",
        age: 38,
        profession: "Ingénieur",
        contactMethod: "direct",
        interestLevel: "high",
        followUpStatus: "pending",
        notes:
          "Père de famille cherchant du sens. Questions profondes sur la foi et la famille.",
        contactedBy: "Kelly",
        source: "Parc avec ses enfants",
      },
    ],
    budget: 20000,
    expenses: [
      {
        id: "4",
        category: "Transport",
        description: "Transport collectif",
        amount: 6000,
        date: "2024-02-03",
      },
      {
        id: "5",
        category: "Matériel",
        description: "Supports pour enfants",
        amount: 10000,
        date: "2024-02-01",
      },
    ],
    materials: ["Livres pour enfants", "Tracts familiaux", "Cartes postales"],
    results: {
      attendees: 3,
      newContacts: 2,
      conversions: 0,
      followUps: 2,
      satisfaction: 4,
      impact: "Bon accueil dans les familles",
    },
  },
  {
    id: "3",
    title: "Évangélisation à Cocody Danga",
    type: "evangelization",
    date: "2024-02-17",
    time: "08:00",
    endTime: "16:00",
    location: "Quartier Danga, Cocody",
    description:
      "Grande sortie d'évangélisation dans le marché de Danga et les rues avoisinantes. Action coordonnée avec distribution de vivres.",
    organizer: "Pasteur Martin",
    status: "upcoming",
    maxParticipants: 20,
    registeredParticipants: [
      {
        id: "8",
        memberId: "1",
        name: "Ouaraga Azie zahui johan",
        phone: "07 12 34 56 78",
        role: "participant",
        confirmed: true,
        registrationDate: "2024-02-10",
      },
      {
        id: "9",
        memberId: "9",
        name: "Landry Diagone",
        phone: "07 90 12 34 56",
        role: "participant",
        confirmed: true,
        registrationDate: "2024-02-10",
      },
      {
        id: "10",
        memberId: "21",
        name: "Ella",
        phone: "07 12 25 37 89",
        role: "volunteer",
        confirmed: true,
        registrationDate: "2024-02-12",
      },
    ],
    contacts: [],
    budget: 50000,
    expenses: [],
    materials: ["Vivres", "Tracts", "Bibles", "Médicaments de base"],
  },
  {
    id: "4",
    title: "Conférence spirituelle publique",
    type: "conference",
    date: "2024-01-15",
    time: "18:00",
    endTime: "21:00",
    location: "Centre culturel de Cocody",
    description:
      'Conférence ouverte au public sur le thème "Trouver la paix dans un monde agité". Entrée libre.',
    organizer: "Pasteur André",
    status: "completed",
    maxParticipants: 100,
    registeredParticipants: [
      {
        id: "11",
        name: "Public général",
        role: "participant",
        confirmed: true,
        registrationDate: "2024-01-15",
      },
    ],
    contacts: [
      {
        id: "7",
        name: "Assouman Rebecca",
        phone: "07 01 34 67 89",
        age: 45,
        profession: "Enseignante",
        contactMethod: "direct",
        interestLevel: "high",
        followUpStatus: "converted",
        followUpDate: "2024-01-20",
        notes:
          "Très impressionnée par la conférence. A rejoint notre communauté la semaine suivante.",
        contactedBy: "Pasteur André",
        source: "Venue seule à la conférence",
      },
      {
        id: "8",
        name: "N'Goran Michel",
        phone: "07 12 45 78 90",
        age: 32,
        profession: "Développeur",
        contactMethod: "direct",
        interestLevel: "medium",
        followUpStatus: "contacted",
        notes:
          "Jeune professionnel en questionnement. Apprécie l'approche moderne de la spiritualité.",
        contactedBy: "Pasteur André",
        source: "Venu avec un ami",
      },
    ],
    budget: 75000,
    expenses: [
      {
        id: "6",
        category: "Location",
        description: "Location salle de conférence",
        amount: 40000,
        date: "2024-01-15",
      },
      {
        id: "7",
        category: "Sonorisation",
        description: "Matériel audio-visuel",
        amount: 25000,
        date: "2024-01-15",
      },
      {
        id: "8",
        category: "Communication",
        description: "Affiches et promotion",
        amount: 10000,
        date: "2024-01-10",
      },
    ],
    results: {
      attendees: 85,
      newContacts: 12,
      conversions: 3,
      followUps: 8,
      satisfaction: 5,
      impact: "Excellente visibilité pour la communauté",
    },
  },
  {
    id: "5",
    title: "Retraite spirituelle jeunes",
    type: "retreat",
    date: "2024-03-02",
    time: "07:00",
    endTime: "2024-03-03 18:00",
    location: "Centre de retraite Bingerville",
    description:
      'Weekend de retraite spirituelle destiné aux jeunes de 18-35 ans. Thème: "Ma vocation dans le monde moderne".',
    organizer: "Sœur Marie",
    status: "upcoming",
    maxParticipants: 25,
    registeredParticipants: [
      {
        id: "12",
        memberId: "15",
        name: "Lesly",
        phone: "07 56 79 81 23",
        role: "participant",
        confirmed: true,
        registrationDate: "2024-02-15",
      },
      {
        id: "13",
        memberId: "5",
        name: "Konaté Saïd Ange Ibrahim",
        phone: "07 56 78 90 12",
        role: "participant",
        confirmed: false,
        registrationDate: "2024-02-18",
      },
    ],
    contacts: [],
    budget: 150000,
    expenses: [],
    materials: [
      "Livrets de méditation",
      "Carnets personnels",
      "Matériel créatif",
    ],
  },
];

// Fonctions utilitaires
export const getEventById = (id: string): Event | undefined => {
  return eventsData.find((event) => event.id === id);
};

export const getEventsByType = (type: Event["type"]): Event[] => {
  return eventsData.filter((event) => event.type === type);
};

export const getEventsByStatus = (status: Event["status"]): Event[] => {
  return eventsData.filter((event) => event.status === status);
};

export const getUpcomingEvents = (): Event[] => {
  return eventsData
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getRecentEvents = (limit: number = 5): Event[] => {
  return eventsData
    .filter((event) => event.status === "completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getAllContacts = (): EventContact[] => {
  return eventsData.flatMap((event) => event.contacts);
};

export const getContactsByStatus = (
  status: EventContact["followUpStatus"]
): EventContact[] => {
  return getAllContacts().filter(
    (contact) => contact.followUpStatus === status
  );
};

export const getEventStats = () => {
  const total = eventsData.length;
  const completed = eventsData.filter((e) => e.status === "completed").length;
  const upcoming = eventsData.filter((e) => e.status === "upcoming").length;

  const totalContacts = getAllContacts().length;
  const conversions = getContactsByStatus("converted").length;
  const pendingFollowUps = getContactsByStatus("pending").length;

  const completedEvents = eventsData.filter(
    (e) => e.status === "completed" && e.results
  );
  const totalBudget = eventsData.reduce(
    (sum, event) => sum + (event.budget || 0),
    0
  );
  const totalExpenses = eventsData.reduce(
    (sum, event) =>
      sum +
      (event.expenses?.reduce((expSum, exp) => expSum + exp.amount, 0) || 0),
    0
  );

  const averageAttendees =
    completedEvents.length > 0
      ? Math.round(
          completedEvents.reduce(
            (sum, event) => sum + (event.results?.attendees || 0),
            0
          ) / completedEvents.length
        )
      : 0;

  const conversionRate =
    totalContacts > 0 ? Math.round((conversions / totalContacts) * 100) : 0;

  return {
    total,
    completed,
    upcoming,
    totalContacts,
    conversions,
    pendingFollowUps,
    conversionRate,
    averageAttendees,
    totalBudget,
    totalExpenses,
    budgetUtilization:
      totalBudget > 0 ? Math.round((totalExpenses / totalBudget) * 100) : 0,
  };
};

export const getContactsByEvent = (eventId: string): EventContact[] => {
  const event = getEventById(eventId);
  return event ? event.contacts : [];
};

export const getParticipantsByEvent = (eventId: string): EventParticipant[] => {
  const event = getEventById(eventId);
  return event ? event.registeredParticipants : [];
};

// Types d'événements avec leurs libellés
export const eventTypes = {
  evangelization: "Évangélisation",
  conference: "Conférence",
  retreat: "Retraite",
  workshop: "Atelier",
  outreach: "Action sociale",
} as const;

export const contactInterestLevels = {
  low: "Faible",
  medium: "Moyen",
  high: "Élevé",
} as const;

export const followUpStatuses = {
  pending: "En attente",
  contacted: "Contacté",
  converted: "Converti",
  not_interested: "Pas intéressé",
} as const;
