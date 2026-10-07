export interface LearnerProfile {
  fullName: string;
  documentNumber: string;
  programName: string;
  programType: 'Técnico' | 'Tecnólogo' | 'Especialización Tecnológica' | 'Operario' | 'Auxiliar';
  fichaNumber: string;
  centerName: string;
  regional: string;
  startedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InductionModule {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  badgeId: string;
  badgeName: string;
  estimatedMinutes: number;
  sections: {
    id: string;
    title: string;
    content: string[];
    keyTakeaway: string;
  }[];
  quiz: QuizQuestion[];
}

export interface RegulationCase {
  id: string;
  title: string;
  situation: string;
  category: 'Falta Académica' | 'Falta Disciplinaria' | 'Derecho Vulnerado' | 'Conducta Ejemplar' | 'Novedad Académica' | 'Participación Democrática';
  severity: 'Leve' | 'Grave' | 'Gravísima' | 'No Constituye Falta' | 'Trámite Reglamentario' | 'Derecho de Representación';
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  normativeReference: string;
}

export interface GlossaryItem {
  term: string;
  acronym?: string;
  definition: string;
  category: 'Pedagógico' | 'Institucional' | 'Plataformas' | 'Reglamento' | 'Bienestar';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  moduleNumber: string;
  iconName: string;
  unlockedAt?: string;
}
