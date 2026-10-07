import { InductionModule, RegulationCase, GlossaryItem, Badge, LearnerProfile } from '../types/induction';

export const DEFAULT_PROFILE: LearnerProfile = {
  fullName: 'Carlos Andrés Montoya',
  documentNumber: '1098234567',
  programName: 'Análisis y Desarrollo de Software (ADSO)',
  programType: 'Tecnólogo',
  fichaNumber: '2874192',
  centerName: 'Centro de Servicios y Gestión Empresarial',
  regional: 'Regional Antioquia',
  startedAt: new Date().toISOString().split('T')[0],
};

export const REGIONAL_LIST = [
  'Regional Amazonas', 'Regional Antioquia', 'Regional Arauca', 'Regional Atlántico',
  'Regional Bolívar', 'Regional Boyacá', 'Regional Caldas', 'Regional Caquetá',
  'Regional Casanare', 'Regional Cauca', 'Regional Cesar', 'Regional Chocó',
  'Regional Córdoba', 'Regional Cundinamarca', 'Regional Distrito Capital', 'Regional Guainía',
  'Regional Guaviare', 'Regional Huila', 'Regional La Guajira', 'Regional Magdalena',
  'Regional Meta', 'Regional Nariño', 'Regional Norte de Santander', 'Regional Putumayo',
  'Regional Quindío', 'Regional Risaralda', 'Regional San Andrés y Providencia',
  'Regional Santander', 'Regional Sucre', 'Regional Tolima', 'Regional Valle',
  'Regional Vaupés', 'Regional Vichada'
];

export const INDUCTION_MODULES: InductionModule[] = [
  {
    id: 'modulo-1',
    number: '01',
    title: 'Identidad Institucional, Raíces y Símbolos',
    shortTitle: 'Identidad & Símbolos',
    tagline: 'El corazón y la historia de la institución más querida de Colombia',
    description: 'Conoce los orígenes del SENA fundado en 1957 por Rodolfo Martínez Tono, su misión constitucional, visión de futuro y el profundo significado de sus símbolos patrios e institucionales.',
    badgeId: 'badge-identidad',
    badgeName: 'Orgullo e Identidad SENA',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'historia-mision',
        title: 'Origen, Misión y Visión Institucional',
        content: [
          'El Servicio Nacional de Aprendizaje (SENA) nació el 21 de junio de 1957 mediante el Decreto Ley 118, bajo la iniciativa visionaria del economista cartagenero Rodolfo Martínez Tono, con el apoyo de la Iglesia Católica, organizaciones sindicales y la Asociación Nacional de Industriales (ANDI).',
          'Misión Institucional: El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la Formación Profesional Integral gratuita para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
          'Visión Institucional: El SENA será una entidad de clase mundial en formación profesional integral y en el uso y apropiación de tecnología e innovación al servicio de personas y empresas; habrá contribuido decisivamente a incrementar la competitividad de Colombia.'
        ],
        keyTakeaway: 'El SENA es 100% gratuito y patrimonio público de todos los colombianos, diseñado para democratizar las oportunidades laborales y productivas.'
      },
      {
        id: 'simbolos-patrios',
        title: 'Los Tres Símbolos Institucionales',
        content: [
          'El Escudo: Diseñado en los albores de la institución, conjuga tres elementos esenciales: la rueda dentada (representa el sector industrial y de la construcción), el caduceo con alas (simboliza el sector comercial y de servicios) y las ramas de café/trigo con espigas (representa el sector agropecuario y extractivo). Juntos engloban los tres pilares de la economía colombiana.',
          'La Bandera: De color blanco impecable, simboliza la paz, la tranquilidad, la libertad y el compromiso social con la reconciliación nacional. En el centro porta el escudo institucional en verde y dorado.',
          'El Logotipo / Isotipo: Representa gráficamente a un aprendiz que camina erguido y con los brazos abiertos sobre un sendero que se proyecta hacia el futuro. Simboliza al ser humano en constante evolución, superación personal y contribución a la patria.'
        ],
        keyTakeaway: 'Cada elemento visual del SENA coloca al aprendiz humano en el centro del desarrollo productivo y moral de la nación.'
      },
      {
        id: 'himno-institucional',
        title: 'El Himno del SENA: Filosofía en Verso',
        content: [
          'Con letra del poeta Luis Alfredo Sánchez y música del maestro Daniel Marlez, el himno del SENA es un canto marcial de optimismo y dignidad por el trabajo honesto.',
          'Coro: "Estudiantes del SENA adelante / por Colombia luchad con amor / con el ánimo noble y radiante / transformemos el mundo en mejor."',
          'Sus estrofas recuerdan que en el aula y en el taller se forja el porvenir de la patria, combatiendo la ignorancia y exaltando el valor del trabajo técnico y humano.'
        ],
        keyTakeaway: 'El himno se entona con respeto en actos cívicos, ceremonias de certificación y eventos formativos solemnes.'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: '¿En qué año y bajo el liderazgo de qué personaje fue fundado el SENA?',
        options: [
          '1948 por Jorge Eliécer Gaitán',
          '1957 por Rodolfo Martínez Tono',
          '1965 por Alfonso López Pumarejo',
          '1972 por Belisario Betancur'
        ],
        correctIndex: 1,
        explanation: 'El SENA fue fundado el 21 de junio de 1957 por iniciativa del cartagenero Rodolfo Martínez Tono, respaldado por el Decreto Ley 118 de 1957.'
      },
      {
        id: 'q1-2',
        question: '¿Qué representan los tres elementos icónicos en el Escudo del SENA?',
        options: [
          'Los tres poderes del Estado colombiano (Ejecutivo, Legislativo y Judicial)',
          'Los sectores productivos: Industria, Comercio y Servicios, y Agropecuario',
          'Las tres cordilleras de la geografía nacional',
          'Los niveles de formación: Auxiliar, Técnico y Tecnólogo'
        ],
        correctIndex: 1,
        explanation: 'La rueda dentada representa la Industria y Construcción; el caduceo al Comercio y Servicios; y las ramas al sector Primario/Agropecuario.'
      },
      {
        id: 'q1-3',
        question: '¿Qué figura humana se plasma en el logotipo/isotipo característico del SENA?',
        options: [
          'Un instructor con una pizarra de tiza',
          'Un aprendiz avanzando por un camino hacia el futuro con los brazos abiertos',
          'Un científico mirando a través de un microscopio',
          'Un operario ajustando una máquina industrial'
        ],
        correctIndex: 1,
        explanation: 'El logotipo sintetiza la silueta del aprendiz caminando con paso firme y visión de futuro por un sendero de progreso individual y colectivo.'
      }
    ]
  },
  {
    id: 'modulo-2',
    number: '02',
    title: 'Formación Profesional Integral (FPI) y Ruta Formativa',
    shortTitle: 'Modelo Pedagógico FPI',
    tagline: 'Cómo aprendemos en el SENA: Competencias, Proyectos y Etapas',
    description: 'Descubre el modelo educativo diferencial del SENA basado en competencias laborales, desarrollo humano integral y las dos fases clave de tu programa: la Etapa Lectiva y la Etapa Productiva.',
    badgeId: 'badge-fpi',
    badgeName: 'Estratega del Aprendizaje FPI',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'que-es-fpi',
        title: 'Los Cuatro Saberes del Enfoque FPI',
        content: [
          'La Formación Profesional Integral (FPI) es un proceso educativo teórico-práctico permanente, orientado al desarrollo de conocimientos técnicos, habilidades operativas, actitudes y valores para el desempeño productivo.',
          'Se cimenta en cuatro saberes esenciales: 1) Saber (Conocimiento científico y técnico); 2) Saber Hacer (Destrezas prácticas y dominio del oficio en ambientes reales o simulados); 3) Saber Ser (Ética, integridad, empatía y responsabilidad); 4) Saber Convivir (Trabajo colaborativo, ciudadanía y resolución pacífica de conflictos).',
          'En el SENA no eres un simple "estudiante pasivo", eres un Aprendiz Activo, protagonista autónomo de tu propia construcción cognitiva.'
        ],
        keyTakeaway: 'La formación integral une la excelencia técnica con la calidez y el compromiso ético ciudadano.'
      },
      {
        id: 'etapas-formativas',
        title: 'Etapa Lectiva vs. Etapa Productiva',
        content: [
          'Etapa Lectiva: Período en el cual desarrollas las competencias mediante guías de aprendizaje, proyectos formativos, talleres y laboratorios orientados por instructores expertos.',
          'Etapa Productiva: Momento cumbre donde aplicas y consolidas lo aprendido en un entorno productivo real. Tiene una duración formal de 6 meses (para técnicos y tecnólogos).',
          'Modalidades avaladas de Etapa Productiva: a) Contrato de Aprendizaje (patrocinio empresarial con apoyo de sostenimiento y ARL/EPS); b) Vinculación Laboral o contractual; c) Proyecto Productivo institucional o de emprendimiento; d) Pasantía en entidad pública o privada; e) Monitorías en el centro de formación; f) Apoyo a unidades productivas familiares.'
        ],
        keyTakeaway: 'Para titularte y certificarte debes haber alcanzado el 100% de los Resultados de Aprendizaje (RAP) de ambas etapas.'
      },
      {
        id: 'evaluacion-rap',
        title: 'Evaluación del Aprendizaje: Aprobado (A) vs Por Mejorar (D)',
        content: [
          'El SENA evalúa mediante Resultados de Aprendizaje (RAP) y juicios de evaluación cualitativos. En SofiaPlus las calificaciones oficiales son:',
          '"A" (Aprobado): Demuestraste el dominio de la competencia según los criterios establecidos.',
          '"D" (No Aprobado / Deficiente): Aún no alcanzas el estándar requerido y debes concertar de inmediato un Plan de Mejoramiento con tu instructor para nivelar la evidencia.',
          'Todo aprendiz tiene derecho a concertar su plan de mejoramiento pedagógico antes de que se adopten medidas disciplinarias o comités evaluativos.'
        ],
        keyTakeaway: 'La evaluación en el SENA es formativa, orientadora y busca que nadie se quede atrás si demuestra compromiso.'
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: '¿Cuáles son los cuatro pilares o saberes de la Formación Profesional Integral (FPI)?',
        options: [
          'Memorizar, Repetir, Competir y Calificar',
          'Saber, Saber Hacer, Saber Ser y Saber Convivir',
          'Inscribir, Asistir, Examinar y Graduar',
          'Teoría, Práctica, Industria y Salario'
        ],
        correctIndex: 1,
        explanation: 'La FPI fundamenta el desarrollo humano en cuatro saberes complementarios: el Saber (cognitivo), Saber Hacer (destreza), Saber Ser (ética) y Saber Convivir (social).'
      },
      {
        id: 'q2-2',
        question: '¿Cuál de las siguientes NO es una modalidad oficial para realizar la Etapa Productiva?',
        options: [
          'Contrato de Aprendizaje con patrocinio empresarial',
          'Pasantía o proyecto productivo con asesoría del SENA',
          'Monitoría en centros de formación o apoyo a unidad productiva',
          'Pagar una tarifa monetaria para homologar las horas de práctica'
        ],
        correctIndex: 3,
        explanation: 'Bajo ninguna circunstancia se puede pagar dinero para homologar la etapa productiva. Debe ejecutarse mediante experiencias reales de aplicación técnica.'
      },
      {
        id: 'q2-3',
        question: 'Si un aprendiz recibe una calificación "D" en un Resultado de Aprendizaje, ¿cuál es el paso a seguir?',
        options: [
          'Es expulsado automáticamente de la institución sin derecho a defensa',
          'Concertar y ejecutar un Plan de Mejoramiento formativo con su instructor',
          'Reiniciar todo el programa técnico desde cero',
          'Pagar una multa en la administración del centro'
        ],
        correctIndex: 1,
        explanation: 'El juicio "D" activa el derecho formativo a un Plan de Mejoramiento pedagógico pactado con el instructor para nivelar las evidencias pendientes.'
      }
    ]
  },
  {
    id: 'modulo-3',
    number: '03',
    title: 'Ecosistema Tecnológico y Plataformas del Aprendiz',
    shortTitle: 'Ecosistema Sofia & Zajuna',
    tagline: 'Las herramientas virtuales donde gestionarás tu vida formativa',
    description: 'Domina los portales esenciales del SENA: SofiaPlus para matrículas y certificados, Zajuna (LMS) para clases y evidencias, la Biblioteca Digital, SENNOVA y la Agencia Pública de Empleo.',
    badgeId: 'badge-digital',
    badgeName: 'Navegante Tecnológico SENA',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'sofiaplus',
        title: 'SofiaPlus: El Cerebro Administrativo',
        content: [
          'SofiaPlus (Sistema Optimizado para la Formación Integral del Aprendizaje Activo) es el sistema donde reposa tu historial académico oficial.',
          'En el rol de "Aprendiz" puedes: consultar la ficha de caracterización, descargar constancias de estudio gratuitas e inmediatas con código de verificación, consultar juicios evaluativos (notas A o D), actualizar datos personales de contacto y postularte a ofertas de contrato de aprendizaje.',
          'Importante: Mantén siempre al día tu correo electrónico y celular en SofiaPlus, pues allí llegarán las citaciones oficiales y ofertas laborales.'
        ],
        keyTakeaway: 'SofiaPlus es tu expediente legal y administrativo desde el primer día hasta tu graduación.'
      },
      {
        id: 'zajuna-lms',
        title: 'Zajuna: Tu Campus Virtual de Aprendizaje',
        content: [
          'Zajuna es la plataforma LMS (Learning Management System) moderna del SENA basada en estándares abiertos.',
          'Aquí accedes a: Materiales interactivos de formación, guías de aprendizaje semanales, foros de dudas e inquietudes técnicas, buzones para entrega de evidencias y sesiones sincrónicas en línea.',
          'Consejo de oro: Revisa la retroalimentación de los instructores en cada evidencia antes de que expire la fecha límite de entrega.'
        ],
        keyTakeaway: 'Zajuna es tu salón de clases digital 24/7, accesible desde cualquier dispositivo.'
      },
      {
        id: 'servicios-extension',
        title: 'Biblioteca Virtual, APE y Fondo Emprender',
        content: [
          'Sistema de Bibliotecas SENA: Acceso 100% gratuito a más de 30 bases de datos científicas internacionales (Scopus, eLibro, IEEE, ScienceDirect) y catálogo físico nacional.',
          'Agencia Pública de Empleo (APE): Bolsa de empleo pública que conecta a aprendices y egresados con vacantes laborales formales en todo el territorio nacional y convocatorias en el exterior.',
          'Fondo Emprender & SENNOVA: Ecosistema que otorga capital semilla no reembolsable para planes de negocio innovadores y centros Tecnoparque donde prototipar proyectos de base tecnológica.'
        ],
        keyTakeaway: 'El SENA no solo te enseña una técnica: te apoya con investigación aplicada, empleo formal y capital para crear empresa.'
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: '¿En qué plataforma oficial del SENA descargas tus constancias de estudio y consultas los juicios evaluativos oficiales?',
        options: [
          'En una red social de la institución',
          'En SofiaPlus, bajo el rol Aprendiz',
          'En el portal de la Registraduría Nacional',
          'Únicamente solicitándolas en ventanilla física'
        ],
        correctIndex: 1,
        explanation: 'En el portal SofiaPlus (senasofiaplus.edu.co), los aprendices descargan certificados oficiales digitales con código seguro de verificación de forma inmediata.'
      },
      {
        id: 'q3-2',
        question: '¿Cuál es la función primordial de la plataforma Zajuna en el SENA?',
        options: [
          'Es el aula virtual de aprendizaje donde se consultan contenidos, guías y se suben evidencias',
          'Comprar libros impresos y uniformes',
          'Pagar servicios públicos de la sede',
          'Solicitar préstamos bancarios personales'
        ],
        correctIndex: 0,
        explanation: 'Zajuna es el LMS (sistema de gestión de aprendizaje) donde los instructores publican las guías, foros, sesiones virtuales y los aprendices entregan sus tareas y evidencias.'
      },
      {
        id: 'q3-3',
        question: '¿Qué es el Fondo Emprender del SENA?',
        options: [
          'Un banco privado de préstamos con intereses altos',
          'Un fondo estatal que otorga capital semilla no reembolsable para planes de negocio viables',
          'Una rifa mensual de herramientas para aprendices',
          'Un impuesto obligatorio que pagan los estudiantes'
        ],
        correctIndex: 1,
        explanation: 'El Fondo Emprender financia iniciativas empresariales creadas por aprendices y colombianos con capital semilla condonable si se cumplen las metas pactadas.'
      }
    ]
  },
  {
    id: 'modulo-4',
    number: '04',
    title: 'Reglamento del Aprendiz y Convivencia Institucional',
    shortTitle: 'Reglamento & Ciudadanía (Acuerdo 0009 de 2024)',
    tagline: 'Derechos con enfoque diferencial, deberes, permanencia, novedades y debido proceso',
    description: 'Aprende las disposiciones del nuevo Reglamento del Aprendiz (Acuerdo 0009 del 5 de noviembre de 2024, expedido por el Consejo Directivo Nacional), el cual deroga el Acuerdo 07 de 2012 y moderniza los derechos, la representación y la convivencia formativa.',
    badgeId: 'badge-reglamento',
    badgeName: 'Defensor de la Ética y Reglamento 2024',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'principios-derechos',
        title: 'Principios Orientadores y Derechos del Aprendiz (Arts. 1 - 7)',
        content: [
          'El Acuerdo 0009 de 2024 (aprobado el 5 de noviembre de 2024 por el Consejo Directivo Nacional) rige para todos los aprendices y deroga los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.',
          'Principios Orientadores: Autonomía, Dignidad, Inclusión, Enfoque Diferencial, Enfoque Territorial, Participación, Desarrollo Sostenible y Solidaridad.',
          'Derechos Destacados (Art. 5): 1) Recibir inducción integral y formación de calidad; 2) Uso oportuno de infraestructura, maquinaria y conectividad; 3) Recibir Elementos de Protección Personal (EPP) oportunamente; 4) Reconocimiento de discapacidad y realización de ajustes razonables; 5) Conocer los resultados de sus evaluaciones en un plazo máximo de ocho (8) días hábiles; 6) Debido proceso, defensa y contradicción; 7) Beneficios del Plan Nacional de Bienestar al Aprendiz y centros de convivencia.',
          'Representatividad Innovadora (Art. 7): Representantes de Centro por cada jornada (diurna, nocturna, madrugada, mixta, fin de semana, virtual y a distancia), y Voceros por grupo sumando vocerías con enfoque diferencial (Indígena, NARP - Afrocolombiano/Raizal/Palenquero, Campesino, Mujer, LGTBIQ+ y Aprendices con Discapacidad).'
        ],
        keyTakeaway: 'El nuevo reglamento garantiza enfoque diferencial, territorial y el derecho a conocer calificaciones en máximo 8 días hábiles.'
      },
      {
        id: 'deberes-prohibiciones',
        title: 'Deberes, Prohibiciones y Convivencia (Arts. 8 y 9)',
        content: [
          'Deberes Fundamentales (Art. 8): 1) Suscribir el acta de compromiso de matrícula; 2) Mantener actualizados sus datos de contacto en las plataformas institucionales; 3) Asistir puntualmente y entregar evidencias en los plazos fijados; 4) Justificar inasistencias en los términos establecidos; 5) Cuidar los bienes y responder por daños patrimoniales; 6) Usar permanentemente la indumentaria y los EPP reglamentarios; 7) Respetar la propiedad intelectual y derechos de autor.',
          'Prohibiciones Clave (Art. 9): 1) Plagiar trabajos, exámenes o proyectos; 2) Suplantar identidad o alterar documentos públicos o privados; 3) Portar, comercializar o consumir alcohol o sustancias psicoactivas en ambientes formativos; 4) Portar armas o elementos cortopunzantes; 5) Cometer o ser cómplice de actos delictivos; 6) Realizar actos de discriminación, hostigamiento o acoso de cualquier índole.'
        ],
        keyTakeaway: 'La honestidad académica y el respeto por la diversidad humana son compromisos irrenunciables al firmar la matrícula SENA.'
      },
      {
        id: 'permanencia-novedades-desercion',
        title: 'Novedades Académicas, Deserción y Debido Proceso (Arts. 10 - 53)',
        content: [
          'Novedades Académicas (Arts. 16 - 25): 1) Traslado de grupo, centro o modalidad (tras cursar el 1er trimestre); 2) Aplazamiento justificado por un periodo de hasta tres (3) meses, prorrogables por tres (3) meses más; 3) Reintegro formal tras el aplazamiento; 4) Retiro voluntario y Reingreso.',
          'Causales de Deserción (Arts. 26 - 31): 1) Inasistencia injustificada de tres (3) días continuos o cinco (5) días discontinuos en presencial; 2) No ingresar al ambiente virtual (LMS Zajuna) durante veinte (20) días consecutivos o no asistir a tres (3) citaciones; 3) Inasistencia de tres (3) días seguidos en la empresa durante etapa productiva; 4) Inasistencia superior al 10% en cursos complementarios.',
          'Faltas y Sanciones (Arts. 41 - 53): Se tipifican en Académicas y Disciplinarias (Leves, Graves o Gravísimas). Las Medidas Formativas son el llamado de atención escrito (máx. 2 por fase) y el Plan de Mejoramiento (hasta 20 días calendario, máx. 2 por fase). Las Medidas Sancionatorias son el condicionamiento y la cancelación de matrícula.',
          'Instancias Procesales: Primera instancia ante la Subdirección del Centro de Formación; Segunda instancia mediante recurso de apelación ante la Dirección Regional respectiva.'
        ],
        keyTakeaway: 'En el Acuerdo 0009 de 2024, el aplazamiento es por máximo 3 meses prorrogables a 3 más, y la deserción virtual opera tras 20 días sin ingresar al LMS.'
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: '¿Qué norma rige actualmente como Reglamento del Aprendiz SENA tras derogar el Acuerdo 07 de 2012 y posteriores?',
        options: [
          'El Acuerdo 0009 de 2024 (aprobado por el Consejo Directivo Nacional)',
          'El Código de Comercio de 1971',
          'La Ley 100 de Seguridad Social',
          'El Decreto 118 de 1957 exclusivamente'
        ],
        correctIndex: 0,
        explanation: 'El Acuerdo 0009 del 5 de noviembre de 2024 es el actual Reglamento del Aprendiz SENA, que unificó y modernizó la normativa derogando el Acuerdo 07 de 2012.'
      },
      {
        id: 'q4-2',
        question: 'Según el Acuerdo 0009 de 2024 (Art. 5), ¿cuál es el plazo máximo para que el instructor informe los resultados de las evaluaciones al aprendiz?',
        options: [
          'Máximo ocho (8) días hábiles siguientes a la entrega',
          'Treinta (30) días calendario',
          'Al finalizar el año lectivo',
          'No existe ningún plazo obligatorio'
        ],
        correctIndex: 0,
        explanation: 'El Artículo 5 consagra el derecho a ser evaluado objetivamente y a conocer los resultados en un plazo máximo de ocho (8) días hábiles.'
      },
      {
        id: 'q4-3',
        question: 'En formación virtual, ¿cuál es la causal de deserción establecida en el Acuerdo 0009 de 2024?',
        options: [
          'No ingresar a la plataforma LMS (Zajuna) durante veinte (20) días consecutivos o desatender tres citaciones',
          'Faltar a una sola clase sincrónica',
          'Olvidar la contraseña del correo institucional un fin de semana',
          'Enviar una evidencia con 10 minutos de retraso'
        ],
        correctIndex: 0,
        explanation: 'El Artículo 26 a 31 tipifica deserción virtual cuando el aprendiz no ingresa al ambiente virtual de aprendizaje durante 20 días consecutivos sin justificación o falta a 3 citaciones.'
      }
    ]
  },
  {
    id: 'modulo-5',
    number: '05',
    title: 'Bienestar al Aprendiz y Desarrollo Integral',
    shortTitle: 'Bienestar & Oportunidades',
    tagline: 'Salud, deporte, cultura, liderazgo y apoyos de sostenimiento',
    description: 'Explora las 7 dimensiones del Plan Nacional de Bienestar al Aprendiz, diseñado para acompañarte socioemocionalmente, prevenir la deserción y potenciar tus talentos.',
    badgeId: 'badge-bienestar',
    badgeName: 'Líder Integral y Embajador SENA',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'dimensiones-bienestar',
        title: 'Las Siete Dimensiones de Bienestar',
        content: [
          'El área de Bienestar al Aprendiz no es un simple departamento administrativo: es una red de apoyo humano que te acompaña durante todo tu tránsito formativo.',
          '1. Salud y Prevención: Jornadas de vacunación, ergonomía, primeros auxilios y campañas de autocuidado.',
          '2. Deporte y Recreación: Torneos intercentros de fútbol, voleibol, atletismo, ajedrez y los Juegos Nacionales de la Confraternidad de Aprendices.',
          '3. Arte y Cultura: Grupos de danzas folclóricas, teatro, ensambles musicales, pintura y festivales de la canción.',
          '4. Liderazgo y Participación: Elección democrática de Voceros de Ficha y Representantes de Centro ante el Consejo Directivo.',
          '5. Habilidades Socioemocionales: Talleres de manejo del estrés, comunicación asertiva, resolución de conflictos y proyecto de vida.',
          '6. Acompañamiento Pedagógico: Orientación psicosocial y tutorías personalizadas para evitar la deserción.',
          '7. Apoyos Socioeconómicos: Convocatorias públicas de auxilio monetario para aprendices de estratos 1 y 2 en situación de vulnerabilidad.'
        ],
        keyTakeaway: 'En el SENA creces como profesional, como artista, como deportista y como ser humano integral.'
      },
      {
        id: 'apoyos-sostenimiento',
        title: 'Apoyos de Sostenimiento y Monitorías',
        content: [
          'Apoyo de Sostenimiento Regular: Subsidio económico mensual otorgado por el SENA mediante convocatoria pública a aprendices que cumplan con los requisitos socioeconómicos y mantengan excelente rendimiento académico.',
          'Apoyo FIC (Fondo de la Industria de la Construcción): Específico para aprendices de programas vinculados a obras civiles, albañilería, estructuras y construcción.',
          'Monitorías Académicas y Administrativas: Oportunidad de apoyar a instructores o áreas tecnológicas de tu centro, recibiendo un incentivo económico mensual y enriqueciendo tu hoja de vida.',
          'Requisitos clave: No tener contrato de aprendizaje vigente ni otro subsidio similar, no haber tenido sanciones y estar al día con los Resultados de Aprendizaje.'
        ],
        keyTakeaway: 'El SENA apoya con recursos tangibles para que la falta de dinero no sea una barrera que interrumpa tu sueño de graduarte.'
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: '¿Cuál de las siguientes actividades forma parte del Plan de Bienestar al Aprendiz en el SENA?',
        options: [
          'Cobro de mensualidades a los estudiantes destacados',
          'Torneos deportivos, grupos de danza, orientación psicosocial y apoyos de sostenimiento',
          'Venta obligatoria de boletas para rifas del centro',
          'Sanciones económicas a los aprendices tímidos'
        ],
        correctIndex: 1,
        explanation: 'Bienestar al Aprendiz fomenta la cultura, salud mental, recreación, torneos y auxilio socioeconómico para el desarrollo pleno de cada aprendiz.'
      },
      {
        id: 'q5-2',
        question: '¿Qué es una Monitoría en el centro de formación del SENA?',
        options: [
          'Una labor de espionaje hacia los compañeros de clase',
          'Una práctica formativa donde un aprendiz destacado apoya labores técnicas o pedagógicas recibiendo un estímulo',
          'Un castigo disciplinario para aprendices con bajo rendimiento',
          'Un examen sorpresa sin previo aviso'
        ],
        correctIndex: 1,
        explanation: 'Las monitorías son oportunidades para aprendices sobresalientes que apoyan laboratorios, bibliotecas o proyectos recibiendo un incentivo económico.'
      },
      {
        id: 'q5-3',
        question: '¿Quién es el Vocero de Ficha y cómo es elegido?',
        options: [
          'Es nombrado por el presidente de la república',
          'Es un aprendiz elegido democráticamente por sus compañeros de grupo para representarlos ante instructores y comités',
          'Es el aprendiz de mayor edad en el salón de clase',
          'Es el encargado exclusivo de hacer el aseo del aula'
        ],
        correctIndex: 1,
        explanation: 'El Vocero de Ficha es elegido democráticamente por sus compañeros para ser el puente de comunicación constructiva con el equipo ejecutor de la formación.'
      }
    ]
  }
];

export const REGULATION_CASES: RegulationCase[] = [
  {
    id: 'caso-1',
    title: 'Dilema de Evidencias y Plagio en Proyecto Formativo',
    situation: 'Santiago y Valeria deben entregar la arquitectura de base de datos de su proyecto de software. Por falta de tiempo, Santiago descargó un repositorio completo de internet sin citar autor y colocó únicamente sus nombres en la portada para subirlo a Zajuna. Valeria se dio cuenta justo antes del cierre.',
    category: 'Falta Académica',
    severity: 'Grave',
    normativeReference: 'Acuerdo 0009 de 2024, Artículos 8 (Deber de honestidad académica) y 9 (Prohibición expresa de plagio)',
    options: [
      {
        text: 'Subir el proyecto descargado fingiendo que lo desarrollaron juntos, total el instructor no siempre revisa el código fuente.',
        isCorrect: false,
        feedback: 'Incorrecto. El Artículo 9 prohíbe el plagio y la suplantación. Es una falta académica grave que amerita llamado de atención escrito o plan de mejoramiento, y en caso de reincidencia, condicionamiento de matrícula.'
      },
      {
        text: 'Explicarle a Santiago que el Acuerdo 0009 de 2024 prohíbe el plagio, solicitar una asesoría pedagógica o prórroga justificada con el instructor para entregar avances propios y citar adecuadamente las fuentes consultadas.',
        isCorrect: true,
        feedback: '¡Excelente decisión! La honestidad académica es un deber explícito del Artículo 8 del nuevo reglamento. Acudir al instructor con transparencia permite acordar alternativas pedagógicas éticas.'
      },
      {
        text: 'Borrar el nombre de Valeria para que solo Santiago asuma el riesgo y desentenderse de la situación.',
        isCorrect: false,
        feedback: 'Inadecuado. El principio de solidaridad y el deber de corresponsabilidad orientan a los compañeros a prevenir faltas y actuar con integridad.'
      }
    ]
  },
  {
    id: 'caso-2',
    title: 'Incumplimiento de Normas de Seguridad en Ambientes Técnicos',
    situation: 'Durante una práctica de laboratorio de redes y electricidad, Mateo decide ingresar con sandalias abiertas y sin gafas de protección porque "hace mucho calor", ignorando las advertencias de la señalización y del instructor técnico.',
    category: 'Falta Disciplinaria',
    severity: 'Grave',
    normativeReference: 'Acuerdo 0009 de 2024, Artículo 5 (Derecho a recibir EPP) y Artículo 8 (Deber de uso adecuado de EPP y bioseguridad)',
    options: [
      {
        text: 'Permitirle continuar porque cada quien es libre de arriesgar su propia integridad personal.',
        isCorrect: false,
        feedback: 'Incorrecto. La seguridad en talleres del SENA es de estricto cumplimiento para proteger la vida de todos los aprendices y evitar accidentes graves.'
      },
      {
        text: 'Suspender de inmediato su ingreso al taller técnico hasta que porte sus Elementos de Protección Personal (EPP), recordando que el Artículo 8 exige su uso obligatorio en áreas técnicas.',
        isCorrect: true,
        feedback: '¡Correcto! El Acuerdo 0009 de 2024 consagra el derecho a recibir los EPP oportunamente y el deber correlativo de portarlos de forma obligatoria antes de manipular maquinaria o redes eléctricas.'
      },
      {
        text: 'Prestarle unas medias gruesas y esperar que no ocurra ningún corto circuito.',
        isCorrect: false,
        feedback: 'Peligroso e incorrecto. Las medidas de bioseguridad y SST nunca se improvisan en los ambientes de aprendizaje del SENA.'
      }
    ]
  },
  {
    id: 'caso-3',
    title: 'Inasistencias, Caso Fortuito y Debido Proceso en Deserción',
    situation: 'Camila ha faltado 4 días continuos a sus clases presenciales sin avisar ni presentar excusa. El instructor está a punto de tramitar la deserción. Sin embargo, Camila tuvo una emergencia médica grave en una vereda rural sin conectividad telefónica.',
    category: 'Derecho Vulnerado',
    severity: 'No Constituye Falta',
    normativeReference: 'Acuerdo 0009 de 2024, Artículos 8, 26 a 31 (Justificación de inasistencias y causales de deserción formativa)',
    options: [
      {
        text: 'Declarar la cancelación de matrícula y deserción inmediata sin escuchar sus descargos ni revisar soportes médicos.',
        isCorrect: false,
        feedback: 'Incorrecto. El Artículo 5 y el debido proceso exigen verificar si existió caso fortuito o fuerza mayor antes de declarar deserción formal.'
      },
      {
        text: 'Camila debe presentarse con los soportes de la emergencia médica dentro de los términos reglamentarios para radicar la justificación formal y concertar un plan de mejoramiento con su equipo ejecutor.',
        isCorrect: true,
        feedback: '¡Exacto! El nuevo reglamento protege al aprendiz ante calamidades comprobadas. Radicar los comprobantes de fuerza mayor desvirtúa la deserción y permite acordar un plan pedagógico de nivelación.'
      },
      {
        text: 'Abandonar el programa pensando que ya no hay nada que hacer en el SENA.',
        isCorrect: false,
        feedback: 'Falso. Las áreas de Bienestar al Aprendiz y Coordinación Académica están diseñadas precisamente para orientar al aprendiz ante dificultades imprevistas.'
      }
    ]
  },
  {
    id: 'caso-4',
    title: 'Uso del Carné, Acreditación y Prohibición de Suplantación',
    situation: 'En la entrada de la sede, un vigilante le solicita el carné a Felipe. Felipe se enoja, discute acaloradamente y le presta su carné a un amigo que no estudia en el SENA para que ingrese a las instalaciones sin registrarse.',
    category: 'Falta Disciplinaria',
    severity: 'Gravísima',
    normativeReference: 'Acuerdo 0009 de 2024, Artículos 5, 8 y 9 (Acreditación del aprendiz, deber de cuidado patrimonial y prohibición de suplantación o alteración de identidad)',
    options: [
      {
        text: 'Considerar normal la conducta, ya que las instalaciones públicas pueden ser visitadas sin control de acceso.',
        isCorrect: false,
        feedback: 'Incorrecto. Prestar el carné a personas ajenas vulnera la seguridad del centro y el Artículo 9 prohíbe la suplantación de identidad.'
      },
      {
        text: 'El carné institucional es personal e intransferible. Felipe debe portarlo con orgullo y respeto, y su amigo debe registrarse formalmente en la portería con su documento de identidad si desea ingresar a trámites.',
        isCorrect: true,
        feedback: '¡Totalmente acertado! El carné acredita la calidad de aprendiz SENA (Art. 5) y salvaguarda la seguridad de la comunidad educativa. Nunca debe ser prestado ni alterado.'
      },
      {
        text: 'Romper el carné para no tener que mostrarlo nuevamente en las porterías.',
        isCorrect: false,
        feedback: 'Inadecuado. Destruir bienes o identificaciones institucionales agrava la falta disciplinaria.'
      }
    ]
  },
  {
    id: 'caso-5',
    title: 'Solicitud de Novedad Académica de Aplazamiento',
    situation: 'Mariana debe trasladarse temporalmente de ciudad para cuidar a su madre enferma durante dos meses. Teme perder su cupo como tecnóloga en el SENA.',
    category: 'Novedad Académica',
    severity: 'Trámite Reglamentario',
    normativeReference: 'Acuerdo 0009 de 2024, Artículos 16 a 25 (Novedades académicas: Aplazamiento y Reintegro)',
    options: [
      {
        text: 'Dejar de asistir sin avisar y esperar que nadie se dé cuenta en las planillas de evaluación.',
        isCorrect: false,
        feedback: 'Incorrecto. Dejar de asistir genera causal de deserción formativa y pérdida del cupo con posible sanción de reingreso.'
      },
      {
        text: 'Radicar formalmente la solicitud de Aplazamiento por escrito o en la plataforma institucional con soportes justificados, sabiendo que el reglamento autoriza hasta tres (3) meses prorrogables por tres (3) meses más.',
        isCorrect: true,
        feedback: '¡Excelente! Los Artículos 16 a 25 del Acuerdo 0009 de 2024 contemplan el aplazamiento justificado por hasta 3 meses prorrogables a 3 más, garantizando la reserva del cupo para su posterior reintegro.'
      },
      {
        text: 'Pedirle a un compañero que firme las listas de asistencia en su lugar durante los dos meses.',
        isCorrect: false,
        feedback: 'Grave falta. La suplantación de firmas en registros de asistencia está tipificada como falta gravísima en el Artículo 9 del reglamento.'
      }
    ]
  },
  {
    id: 'caso-6',
    title: 'Representatividad con Enfoque Diferencial y Territorial',
    situation: 'En la jornada nocturna de un Centro de Formación, se abre la convocatoria democrática para elegir representantes y voceros. Varios aprendices debaten sobre cómo se estructura la representatividad en el nuevo reglamento.',
    category: 'Participación Democrática',
    severity: 'Derecho de Representación',
    normativeReference: 'Acuerdo 0009 de 2024, Artículo 7 (Representatividad de los aprendices y enfoque diferencial)',
    options: [
      {
        text: 'Elegir a un solo representante para todo el centro sin importar la jornada ni los grupos.',
        isCorrect: false,
        feedback: 'Incorrecto. El nuevo reglamento garantiza representación por cada jornada (diurna, nocturna, madrugada, mixta, fin de semana, virtual y a distancia).'
      },
      {
        text: 'Elegir un representante por jornada y voceros por grupo, promoviendo vocerías con enfoque diferencial (Indígena, NARP, Campesino, Mujer, LGTBIQ+ y Discapacidad) como consagra el Artículo 7.',
        isCorrect: true,
        feedback: '¡Totalmente acertado! El Artículo 7 del Acuerdo 0009 de 2024 amplió la representatividad incluyendo voceros de grupos con enfoque diferencial para garantizar una comunidad diversa y plural.'
      },
      {
        text: 'Prohibir la elección de aprendices de modalidades virtuales.',
        isCorrect: false,
        feedback: 'Falso. Las modalidades virtual y a distancia tienen derecho expreso a contar con su propio Representante de Centro.'
      }
    ]
  }
];

export const SENA_GLOSSARY: GlossaryItem[] = [
  {
    term: 'Acuerdo 0009 de 2024',
    acronym: 'Reglamento 2024',
    category: 'Reglamento',
    definition: 'Nuevo Reglamento del Aprendiz SENA aprobado el 5 de noviembre de 2024 por el Consejo Directivo Nacional. Deroga expresamente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024, consagrando principios de dignidad, inclusión y enfoque diferencial.'
  },
  {
    term: 'Plan de Mejoramiento',
    acronym: 'PM',
    category: 'Reglamento',
    definition: 'Medida formativa pedagógica concertada entre instructor y aprendiz (hasta por 20 días calendario, máximo 2 por fase) para superar dificultades en resultados de aprendizaje o convivencia.'
  },
  {
    term: 'Deserción Formativa',
    acronym: 'Deserción',
    category: 'Reglamento',
    definition: 'Causal de desvinculación formal tipificada en los Artículos 26 a 31 del Acuerdo 0009 de 2024 (ej. 3 días continuos o 5 discontinuos en presencial, o 20 días consecutivos sin ingresar a Zajuna LMS en formación virtual).'
  },
  {
    term: 'Enfoque Diferencial y Territorial',
    acronym: 'EDT',
    category: 'Institucional',
    definition: 'Principio orientador del Acuerdo 0009 de 2024 que reconoce las particularidades de poblaciones indígenas, NARP (afrocolombianos, raizales, palenqueros), campesinos, mujeres, personas con discapacidad y sector LGTBIQ+.'
  },
  {
    term: 'FPI (Formación Profesional Integral)',
    acronym: 'FPI',
    category: 'Pedagógico',
    definition: 'Proceso educativo teórico-práctico del SENA de carácter gratuito, permanente y flexible, orientado al desarrollo de conocimientos técnicos, tecnológicos, actitudes y valores para el trabajo digno.'
  },
  {
    term: 'Resultado de Aprendizaje (RAP)',
    acronym: 'RAP',
    category: 'Pedagógico',
    definition: 'Indicadores observables y medibles que evidencian lo que el aprendiz sabe, comprende y es capaz de hacer al culminar una unidad formativa.'
  },
  {
    term: 'SofiaPlus',
    acronym: 'SOFIA',
    category: 'Plataformas',
    definition: 'Sistema Optimizado para la Formación Integral del Aprendizaje Activo. Plataforma misional para inscripciones, matrículas, certificados y seguimiento académico.'
  },
  {
    term: 'Zajuna',
    category: 'Plataformas',
    definition: 'Ambiente Virtual de Aprendizaje (LMS oficial del SENA) donde se interactúa con instructores, se descargan guías y se envían evidencias formativas.'
  },
  {
    term: 'Ficha de Caracterización',
    category: 'Institucional',
    definition: 'Código numérico único nacional (ej. Ficha 2874192) que identifica a un grupo específico de aprendices matriculados en un programa de formación.'
  },
  {
    term: 'Vocero de Ficha',
    category: 'Reglamento',
    definition: 'Aprendiz elegido democráticamente por sus pares para representar al grupo, dinamizar la convivencia y participar en los comités evaluativos.'
  },
  {
    term: 'Etapa Lectiva',
    category: 'Pedagógico',
    definition: 'Fase de fundamentación teórica, conceptual y práctica en talleres y aulas donde se desarrollan las competencias técnicas y transversales.'
  },
  {
    term: 'Etapa Productiva',
    category: 'Pedagógico',
    definition: 'Fase de aplicación práctica de 6 meses en el sector productivo real (Contrato de aprendizaje, pasantía, monitoría o proyecto propio).'
  },
  {
    term: 'Comité de Evaluación y Seguimiento',
    category: 'Reglamento',
    definition: 'Instancia colegiada del centro encargada de analizar el rendimiento académico y las situaciones disciplinarias, garantizando el debido proceso formativo.'
  },
  {
    term: 'SENNOVA',
    category: 'Institucional',
    definition: 'Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA, que impulsa la ciencia aplicada, la robótica, la bioeconomía y los Tecnoparques.'
  },
  {
    term: 'APE (Agencia Pública de Empleo)',
    acronym: 'APE',
    category: 'Institucional',
    definition: 'Operador público gratuito y sin intermediarios que conecta vacantes laborales de empresas con aprendices y profesionales calificados.'
  },
  {
    term: 'Fondo Emprender',
    category: 'Institucional',
    definition: 'Fondo creado por el Gobierno Nacional y administrado por el SENA que otorga capital semilla no reembolsable para empresas creadas por aprendices.'
  },
  {
    term: 'Plan de Mejoramiento',
    category: 'Reglamento',
    definition: 'Acuerdo pedagógico entre instructor y aprendiz con actividades específicas y fechas para superar juicios no aprobados (D) o corregir conductas.'
  },
  {
    term: 'Apoyo de Sostenimiento',
    category: 'Bienestar',
    definition: 'Auxilio económico mensual adjudicado mediante convocatoria pública a aprendices en condiciones de vulnerabilidad económica para evitar la deserción.'
  },
  {
    term: 'Subdirector de Centro',
    category: 'Institucional',
    definition: 'Máxima autoridad administrativa y misional en cada uno de los más de 118 centros de formación que el SENA tiene en las 33 regionales de Colombia.'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-identidad',
    name: 'Orgullo e Identidad SENA',
    description: 'Completaste el Módulo 1 sobre historia, símbolos y misión institucional.',
    moduleNumber: '01',
    iconName: 'ShieldCheck'
  },
  {
    id: 'badge-fpi',
    name: 'Estratega del Aprendizaje FPI',
    description: 'Dominaste los cuatro saberes y las etapas lectiva y productiva del SENA.',
    moduleNumber: '02',
    iconName: 'Compass'
  },
  {
    id: 'badge-digital',
    name: 'Navegante Tecnológico SENA',
    description: 'Exploraste SofiaPlus, Zajuna LMS, la Biblioteca Virtual y el Fondo Emprender.',
    moduleNumber: '03',
    iconName: 'Laptop'
  },
  {
    id: 'badge-reglamento',
    name: 'Defensor de la Ética y Reglamento',
    description: 'Resolviste los dilemas formativos con apego al Acuerdo 007 de 2012.',
    moduleNumber: '04',
    iconName: 'Scale'
  },
  {
    id: 'badge-bienestar',
    name: 'Líder Integral y Embajador SENA',
    description: 'Conociste las 7 dimensiones de bienestar y los apoyos al aprendiz.',
    moduleNumber: '05',
    iconName: 'Award'
  }
];

export const ANTHEM_STANZA_DATA = [
  {
    type: 'CORO',
    lyrics: [
      'Estudiantes del SENA adelante,',
      'por Colombia luchad con amor,',
      'con el ánimo noble y radiante,',
      'transformemos el mundo en mejor.'
    ],
    meaning: 'Llamado vibrante a la juventud colombiana para transformar el país mediante el trabajo digno, el conocimiento y el amor patrio.'
  },
  {
    type: 'ESTROFA I',
    lyrics: [
      'De la patria el futuro destino,',
      'en las manos del joven está,',
      'el trabajo es seguro camino,',
      'que la paz y el progreso nos da.'
    ],
    meaning: 'Reafirma que la paz verdadera y el desarrollo social se construyen a través de la educación técnica de calidad y la labor creadora.'
  },
  {
    type: 'ESTROFA II',
    lyrics: [
      'En la forja, en el taller y en el campo,',
      'con tesón y con fe siempre viva,',
      'haremos que la ciencia sea un manto,',
      'de justicia que al pueblo redima.'
    ],
    meaning: 'Homenaje a los tres grandes sectores de la nación: la industria, los servicios y el campo campesino, unidos bajo el manto del saber.'
  }
];
