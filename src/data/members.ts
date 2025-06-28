export interface Member {
  id: string;
  name: string;
  gender: "M" | "F";
  phone?: string;
  email?: string;
  joinDate?: string;
  isActive: boolean;
  attendanceHistory: AttendanceRecord[];
}

export interface AttendanceRecord {
  sessionId: string;
  sessionDate: string;
  status: "present" | "absent" | "excused";
  note?: string;
}

export interface SessionAttendance {
  sessionId: string;
  sessionDate: string;
  sessionTheme: string;
  attendances: {
    memberId: string;
    status: "present" | "absent" | "excused";
    note?: string;
    arrivedLate?: boolean;
    leftEarly?: boolean;
  }[];
}

export const membersData: Member[] = [
  {
    id: "1",
    name: "Ouaraga Azie zahui johan",
    gender: "M",
    phone: "07 12 34 56 78",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "2",
    name: "Bayou kogore ange emmanuel",
    gender: "M",
    phone: "07 23 45 67 89",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "3",
    name: "Ahibe Daniella Ghyslaine",
    gender: "F",
    phone: "07 34 56 78 90",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "4",
    name: "Yao Andrea Christelle",
    gender: "F",
    phone: "07 45 67 89 01",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "5",
    name: "Konaté Saïd Ange Ibrahim",
    gender: "M",
    phone: "07 56 78 90 12",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "absent" },
    ],
  },
  {
    id: "6",
    name: "Kouakou ange emmanuel",
    gender: "M",
    phone: "07 67 89 01 23",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "absent" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "7",
    name: "Kouassi Kouakou Lucien",
    gender: "M",
    phone: "07 78 90 12 34",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "absent" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "absent" },
    ],
  },
  {
    id: "8",
    name: "Kouassi Ruth Nahomie",
    gender: "F",
    phone: "07 89 01 23 45",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "absent" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "9",
    name: "Landry Diagone",
    gender: "M",
    phone: "07 90 12 34 56",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "10",
    name: "Aka Carelle",
    gender: "F",
    phone: "07 01 23 45 67",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "11",
    name: "N'guéssan KOUASSI ISAAC LEROY DAVID",
    gender: "M",
    phone: "07 12 35 47 89",
    isActive: false,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "absent" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "absent" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "absent" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "absent" },
    ],
  },
  {
    id: "12",
    name: "Kouassi Marthe",
    gender: "F",
    phone: "07 23 46 58 90",
    isActive: false,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "absent" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "absent" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "absent" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "absent" },
    ],
  },
  {
    id: "13",
    name: "Kouakou Akoua Fiedin Prunelle Esther",
    gender: "F",
    phone: "07 34 57 69 01",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "14",
    name: "N'guessan Emilia",
    gender: "F",
    phone: "07 45 68 70 12",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "15",
    name: "Lesly",
    gender: "F",
    phone: "07 56 79 81 23",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "absent" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "16",
    name: "Victoire",
    gender: "F",
    phone: "07 67 80 92 34",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "absent" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "absent" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "absent" },
    ],
  },
  {
    id: "17",
    name: "Kelly",
    gender: "F",
    phone: "07 78 91 03 45",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "absent" },
    ],
  },
  {
    id: "18",
    name: "Ello",
    gender: "F",
    phone: "07 89 02 14 56",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "19",
    name: "Flora",
    gender: "F",
    phone: "07 90 13 25 67",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "absent" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "20",
    name: "Oka Christelle",
    gender: "F",
    phone: "07 01 24 36 78",
    isActive: false,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "absent" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "absent" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "absent" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "absent" },
    ],
  },
  {
    id: "21",
    name: "Ella",
    gender: "F",
    phone: "07 12 25 37 89",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "22",
    name: "Boniface",
    gender: "M",
    phone: "07 23 26 38 90",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
  {
    id: "23",
    name: "Rosalie",
    gender: "F",
    phone: "07 34 27 39 01",
    isActive: true,
    attendanceHistory: [
      { sessionId: "1", sessionDate: "2024-01-28", status: "present" },
      { sessionId: "2", sessionDate: "2024-01-21", status: "present" },
      { sessionId: "6", sessionDate: "2024-01-14", status: "present" },
      { sessionId: "7", sessionDate: "2024-01-07", status: "present" },
    ],
  },
];

// Fonctions utilitaires
export const getMemberById = (id: string): Member | undefined => {
  return membersData.find((member) => member.id === id);
};

export const getActiveMembersCount = (): number => {
  return membersData.filter((member) => member.isActive).length;
};

export const getMemberAttendanceRate = (memberId: string): number => {
  const member = getMemberById(memberId);
  if (!member || member.attendanceHistory.length === 0) return 0;

  const presentCount = member.attendanceHistory.filter(
    (record) => record.status === "present"
  ).length;
  return Math.round((presentCount / member.attendanceHistory.length) * 100);
};

export const getSessionAttendanceBySessionId = (
  sessionId: string
): { present: number; absent: number; rate: number } => {
  const present = membersData.filter((member) =>
    member.attendanceHistory.some(
      (record) => record.sessionId === sessionId && record.status === "present"
    )
  ).length;

  const absent = membersData.filter((member) =>
    member.attendanceHistory.some(
      (record) => record.sessionId === sessionId && record.status === "absent"
    )
  ).length;

  const total = present + absent;
  const rate = total > 0 ? Math.round((present / total) * 100) : 0;

  return { present, absent, rate };
};

export const getMembersWithLowAttendance = (
  threshold: number = 50
): Member[] => {
  return membersData.filter((member) => {
    const rate = getMemberAttendanceRate(member.id);
    return rate < threshold && member.isActive;
  });
};

export const getAttendanceStats = () => {
  const totalMembers = membersData.length;
  const activeMembers = getActiveMembersCount();
  const inactiveMembers = totalMembers - activeMembers;

  const averageAttendanceRate = Math.round(
    membersData.reduce(
      (sum, member) => sum + getMemberAttendanceRate(member.id),
      0
    ) / totalMembers
  );

  const perfectAttendance = membersData.filter(
    (member) => getMemberAttendanceRate(member.id) === 100
  ).length;
  const lowAttendance = getMembersWithLowAttendance().length;

  return {
    totalMembers,
    activeMembers,
    inactiveMembers,
    averageAttendanceRate,
    perfectAttendance,
    lowAttendance,
  };
};

// Sessions pré-définies pour l'attendance (correspond aux sessions existantes)
export const sessionsAttendanceData: SessionAttendance[] = [
  {
    sessionId: "1",
    sessionDate: "2024-01-28",
    sessionTheme: "Foi et Espérance",
    attendances: membersData.map((member) => {
      const record = member.attendanceHistory.find((r) => r.sessionId === "1");
      return {
        memberId: member.id,
        status: record?.status || "absent",
        note: record?.note || "",
      };
    }),
  },
  {
    sessionId: "2",
    sessionDate: "2024-01-21",
    sessionTheme: "L'amour du prochain",
    attendances: membersData.map((member) => {
      const record = member.attendanceHistory.find((r) => r.sessionId === "2");
      return {
        memberId: member.id,
        status: record?.status || "absent",
        note: record?.note || "",
      };
    }),
  },
  {
    sessionId: "6",
    sessionDate: "2024-01-14",
    sessionTheme: "La gratitude",
    attendances: membersData.map((member) => {
      const record = member.attendanceHistory.find((r) => r.sessionId === "6");
      return {
        memberId: member.id,
        status: record?.status || "absent",
        note: record?.note || "",
      };
    }),
  },
  {
    sessionId: "7",
    sessionDate: "2024-01-07",
    sessionTheme: "Nouvelle année, nouveau départ",
    attendances: membersData.map((member) => {
      const record = member.attendanceHistory.find((r) => r.sessionId === "7");
      return {
        memberId: member.id,
        status: record?.status || "absent",
        note: record?.note || "",
      };
    }),
  },
];
