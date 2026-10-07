export interface EvaluationQuestion {
  id: string;
  sectionId: string;
  sectionTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reference: string;
}

export const EVALUATION_SECTIONS = [
  { id: 'sec-derechos', title: 'Derechos del Aprendiz (Capítulo II)' },
  { id: 'sec-deberes', title: 'Deberes del Aprendiz (Capítulo III)' },
  { id: 'sec-prohibiciones', title: 'Prohibiciones del Aprendiz (Capítulo III)' },
  { id: 'sec-permanencia', title: 'Permanencia y Novedades (Capítulo IV)' },
  { id: 'sec-faltas', title: 'Faltas, Medidas y Debido Proceso (Capítulo V)' }
];

export const EVALUATION_QUESTIONS: EvaluationQuestion[] = [
  // SECTION 1: DERECHOS (sec-derechos)
  {
    id: 'ev-q1',
    sectionId: 'sec-derechos',
    sectionTitle: 'Derechos del Aprendiz',
    question: 'Según el Artículo 5 del Acuerdo 0009 de 2024, ¿cuál es el plazo máximo obligatorio para que un instructor te entregue las notas e informes de evaluación?',
    options: [
      'Treinta (30) días calendario tras la entrega.',
      'Ocho (8) días hábiles siguientes a la entrega de la evidencia.',
      'Quince (15) días hábiles antes de finalizar el trimestre.',
      'No existe un plazo regulado, depende del volumen de trabajo del instructor.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 0009 de 2024 establece expresamente que el aprendiz tiene derecho a conocer las evaluaciones y sus calificaciones dentro de los ocho (8) días hábiles siguientes a la entrega de las evidencias de aprendizaje.',
    reference: 'Acuerdo 0009 de 2024, Artículo 5 (Derechos del Aprendiz)'
  },
  {
    id: 'ev-q2',
    sectionId: 'sec-derechos',
    sectionTitle: 'Derechos del Aprendiz',
    question: 'Si un aprendiz presenta o adquiere una condición de discapacidad intelectual, psicosocial o motriz, ¿qué derecho especial le ampara el reglamento?',
    options: [
      'Exención de realizar exámenes o entregar evidencias académicas de manera definitiva.',
      'Reconocimiento formal de la condición y aplicación de Ajustes Razonables tanto en metodologías como en infraestructura.',
      'El traslado obligatorio a un programa virtual que no requiera asistencia física.',
      'La reducción automática del 50% de las horas del programa de formación.'
    ],
    correctIndex: 1,
    explanation: 'El nuevo reglamento consagra el Enfoque Diferencial y de Inclusión. Ante la discapacidad calificada, el centro de formación tiene el deber de realizar ajustes razonables razonados y concertados para garantizar el aprendizaje pleno del aprendiz.',
    reference: 'Acuerdo 0009 de 2024, Artículo 5 (Derecho a Inclusión y Ajustes Razonables)'
  },
  {
    id: 'ev-q3',
    sectionId: 'sec-derechos',
    sectionTitle: 'Derechos del Aprendiz',
    question: '¿Cómo está estructurada la representatividad democrática de los aprendices en cada Centro de Formación bajo el Acuerdo 0009 de 2024?',
    options: [
      'Un único representante general para toda la sede nacional del SENA en Bogotá.',
      'Un Representante de Centro elegido por cada jornada (diurna, nocturna, madrugada, mixta, fin de semana, virtual/distancia) y Voceros de grupo que integran enfoques diferenciales (Indígena, NARP, Campesino, LGTBIQ+, etc.).',
      'El instructor designa a dedo al aprendiz con las mejores notas para que sea el representante único.',
      'Se elige democráticamente solo en modalidad presencial; los aprendices virtuales no tienen representación.'
    ],
    correctIndex: 1,
    explanation: 'El Artículo 7 amplía e innova en la representatividad democrática garantizando un representante por cada jornada (incluyendo virtual y fines de semana) y vocerías por fichas que contemplan representatividad con enfoques de diversidad territorial e inclusión diferencial.',
    reference: 'Acuerdo 0009 de 2024, Artículo 7 (Representación y Enfoque Diferencial)'
  },
  {
    id: 'ev-q4',
    sectionId: 'sec-derechos',
    sectionTitle: 'Derechos del Aprendiz',
    question: '¿Qué garantía constitucional y reglamentaria protege al aprendiz para ser escuchado y defenderse antes de que se le aplique cualquier medida disciplinaria?',
    options: [
      'La Ley del Silencio Administrativo.',
      'El derecho al Debido Proceso, a la presunción de inocencia y a la defensa y contradicción.',
      'La amnistía automática por ser la primera falta.',
      'La intervención de un abogado externo pagado por la institución.'
    ],
    correctIndex: 1,
    explanation: 'El debido proceso es un principio orientador y un derecho fundamental del aprendiz (Art. 5). Ningún aprendiz puede ser sancionado o desertado sin que se le garantice el derecho a la defensa, a ser oído en descargos y a controvertir las pruebas en su contra.',
    reference: 'Acuerdo 0009 de 2024, Artículos 1 y 5 (Debido Proceso y Defensa)'
  },
  {
    id: 'ev-q5',
    sectionId: 'sec-derechos',
    sectionTitle: 'Derechos del Aprendiz',
    question: 'Respecto a los ambientes industriales, de obras o laboratorios, ¿cuál es un derecho clave del aprendiz sobre la seguridad y salud en el trabajo?',
    options: [
      'Exigir que el SENA le compre ropa de calle de marcas reconocidas para asistir a la formación.',
      'Recibir oportunamente por parte del centro de formación los Elementos de Protección Personal (EPP) necesarios para realizar sus prácticas de riesgo de forma segura.',
      'Faltar a los talleres de riesgo argumentando temor a sufrir un accidente laboral.',
      'Manipular cualquier maquinaria industrial peligrosa sin recibir instrucción previa.'
    ],
    correctIndex: 1,
    explanation: 'El reglamento define como derecho recibir oportunamente la dotación de Elementos de Protección Personal (EPP) y la capacitación en bioseguridad y prevención del riesgo antes de ingresar a zonas de taller o laboratorios.',
    reference: 'Acuerdo 0009 de 2024, Artículo 5 (SST y Entrega de EPP)'
  },

  // SECTION 2: DEBERES (sec-deberes)
  {
    id: 'ev-q6',
    sectionId: 'sec-deberes',
    sectionTitle: 'Deberes del Aprendiz',
    question: 'Al perfeccionar su proceso de matrícula en el SENA, ¿qué compromiso oficial firma de forma obligatoria el aprendiz?',
    options: [
      'Un pagaré financiero de costos educativos.',
      'El Acta de Compromiso de Matrícula, donde promete cumplir el reglamento, las guías de comportamiento y el pacto ético institucional.',
      'Un contrato laboral a término indefinido con el centro.',
      'Una carta de renuncia anticipada por si incumple alguna norma formativa.'
    ],
    correctIndex: 1,
    explanation: 'El primer deber fundamental estipulado en el Artículo 8 es la firma del Acta de Compromiso de Matrícula, lo cual genera el deber ético y reglamentario de apropiarse del reglamento y cumplirlo en su totalidad.',
    reference: 'Acuerdo 0009 de 2024, Artículo 8 (Deberes Generales)'
  },
  {
    id: 'ev-q7',
    sectionId: 'sec-deberes',
    sectionTitle: 'Deberes del Aprendiz',
    question: '¿Cuál es el deber del aprendiz en relación con su información de contacto (correo, celular, dirección) registrada en las plataformas del SENA?',
    options: [
      'No es obligatorio suministrar datos reales, se pueden inventar por privacidad.',
      'Mantener los datos de contacto actualizados de manera permanente en los aplicativos institucionales (como SofiaPlus).',
      'Cambiar el número telefónico cada semana sin notificar al centro.',
      'Esperar a terminar la formación completa para registrar sus datos reales de contacto.'
    ],
    correctIndex: 1,
    explanation: 'Es un deber expreso (Art. 8, Numeral 2) mantener los datos personales de contacto actualizados de forma permanente en SofiaPlus, ya que de ello depende recibir citaciones oficiales, novedades de etapa productiva y ofertas de empleo.',
    reference: 'Acuerdo 0009 de 2024, Artículo 8 (Actualización de Datos)'
  },
  {
    id: 'ev-q8',
    sectionId: 'sec-deberes',
    sectionTitle: 'Deberes del Aprendiz',
    question: 'En los talleres, laboratorios y áreas técnicas de formación del SENA, ¿cuál es el deber del aprendiz con respecto a los Elementos de Protección Personal (EPP) y el uniforme?',
    options: [
      'Usarlos solo cuando el supervisor o instructor esté mirando fijamente.',
      'Usarlos permanentemente y de manera adecuada y obligatoria durante la manipulación de herramientas, equipos o sustancias de riesgo.',
      'Se pueden prestar entre compañeros de grupo sin importar la talla o el nivel de higiene.',
      'No portarlos si el aprendiz considera que no se acomodan a su estilo personal de vestimenta.'
    ],
    correctIndex: 1,
    explanation: 'El Artículo 8 establece el deber riguroso de portar permanentemente la indumentaria, uniforme (si aplica) y los EPP reglamentarios de bioseguridad y prevención de riesgos laborales durante el desarrollo de las prácticas.',
    reference: 'Acuerdo 0009 de 2024, Artículo 8 (Uso Obligatorio de EPP)'
  },
  {
    id: 'ev-q9',
    sectionId: 'sec-deberes',
    sectionTitle: 'Deberes del Aprendiz',
    question: 'Si un aprendiz presenta una inasistencia a sus sesiones de formación, ¿cuál es su deber inmediato según las normas?',
    options: [
      'No decir nada y esperar que el instructor olvide registrar la falta en el software Zajuna o asistencia.',
      'Justificar formalmente la inasistencia radicando los soportes válidos (médicos, calamidad calamitosa, laborales) dentro de los términos regulados por el centro de formación.',
      'Enviar a un amigo de otro curso a que asista y responda a su nombre en el llamado de lista.',
      'Solicitar que se le apruebe la inasistencia mediante una llamada telefónica informal de un familiar.'
    ],
    correctIndex: 1,
    explanation: 'Es deber fundamental justificar toda inasistencia mediante canales oficiales, radicando los comprobantes médicos, laborales o de fuerza mayor en los plazos fijados por la administración del Centro.',
    reference: 'Acuerdo 0009 de 2024, Artículo 8 (Justificación de Inasistencias)'
  },
  {
    id: 'ev-q10',
    sectionId: 'sec-deberes',
    sectionTitle: 'Deberes del Aprendiz',
    question: 'Respecto a la elaboración de trabajos, talleres y el proyecto formativo, ¿qué deber tiene el aprendiz sobre los derechos de autor?',
    options: [
      'Se permite copiar bloques enteros de internet siempre y cuando se cambie la tipografía del texto.',
      'Presentar siempre producciones propias, respetando el derecho de autor e intelectual, citando de manera técnica las fuentes consultadas bajo normas APA u oficiales.',
      'Pagar a un compañero para que redacte el proyecto a cambio de dinero o favores personales.',
      'Apropiarse de ideas de proyectos de exalumnos aduciendo que el software en el SENA es de dominio público.'
    ],
    correctIndex: 1,
    explanation: 'El Artículo 8 obliga al aprendiz a respetar la propiedad intelectual, derechos de autor y patentes en todas sus evidencias académicas, citando adecuadamente bajo normas técnicas aceptadas internacionalmente.',
    reference: 'Acuerdo 0009 de 2024, Artículo 8 (Propiedad Intelectual)'
  },

  // SECTION 3: PROHIBICIONES (sec-prohibiciones)
  {
    id: 'ev-q11',
    sectionId: 'sec-prohibiciones',
    sectionTitle: 'Prohibiciones del Aprendiz',
    question: '¿Qué conducta académica severa constituye una de las principales prohibiciones del Artículo 9 y se sanciona rigurosamente?',
    options: [
      'Tomar demasiados apuntes en la libreta física de formación.',
      'Copiar de forma parcial o total trabajos, exámenes, proyectos o evidencias académicas de otros aprendices o de internet sin citación, incurriendo en Plagio de información.',
      'Preguntar repetidamente dudas sobre el tema de clase al instructor técnico.',
      'Sugerir metodologías de estudio autónomo colaborativo al grupo de formación.'
    ],
    correctIndex: 1,
    explanation: 'El plagio y la suplantación académica están explícitamente tipificados como prohibiciones de alta gravedad en el Artículo 9. Vulnera los pilares del Saber Ser y Saber Hacer del modelo pedagógico del SENA.',
    reference: 'Acuerdo 0009 de 2024, Artículo 9 (Prohibición de Plagio)'
  },
  {
    id: 'ev-q12',
    sectionId: 'sec-prohibiciones',
    sectionTitle: 'Prohibiciones del Aprendiz',
    question: '¿Cuál es la prohibición absoluta referente al consumo y porte de sustancias dentro del centro de formación y ambientes del SENA?',
    options: [
      'Consumir bebidas hidratantes o café durante las jornadas de clase en ambientes de aula estándar.',
      'Ingresar, poseer, portar, comercializar, distribuir o consumir bebidas alcohólicas o sustancias psicoactivas en los ambientes de aprendizaje y áreas de la institución.',
      'Llevar medicamentos recetados por un médico oficial en su empaque original.',
      'Fumar tabaco convencional en zonas abiertas autorizadas fuera del perímetro de la sede formativa.'
    ],
    correctIndex: 1,
    explanation: 'Está terminantemente prohibido por el Artículo 9 ingresar, comercializar, portar o consumir licor o drogas alucinógenas en cualquier espacio institucional o durante actividades formativas externas patrocinadas por el SENA.',
    reference: 'Acuerdo 0009 de 2024, Artículo 9 (Licor y Sustancias Psicoactivas)'
  },
  {
    id: 'ev-q13',
    sectionId: 'sec-prohibiciones',
    sectionTitle: 'Prohibiciones del Aprendiz',
    question: 'Si un aprendiz firma la planilla de asistencia de un compañero ausente o falsifica una firma médica, ¿en qué falta incurre?',
    options: [
      'Una falta académica leve solucionable con una disculpa verbal al instructor.',
      'La violación de la prohibición de Suplantar Identidad, cometer fraude o alterar registros oficiales del SENA, tipificado como falta disciplinaria grave o gravísima.',
      'No constituye falta, ya que apoya solidariamente a un compañero en dificultades de asistencia.',
      'Una falta de convivencia familiar de carácter leve.'
    ],
    correctIndex: 1,
    explanation: 'El Artículo 9 prohíbe cometer fraude, alterar documentos oficiales, simular asistencia, suplantar la identidad de compañeros o instructores. Estas conductas atentan contra la fe pública e integridad y son faltas severas.',
    reference: 'Acuerdo 0009 de 2024, Artículo 9 (Fraude y Suplantación)'
  },
  {
    id: 'ev-q14',
    sectionId: 'sec-prohibiciones',
    sectionTitle: 'Prohibiciones del Aprendiz',
    question: 'Respecto a la tenencia de objetos peligrosos en los ambientes del SENA, ¿cuál de las siguientes acciones está terminantemente prohibida?',
    options: [
      'Llevar un destornillador en la caja de herramientas técnica autorizada para el laboratorio de sistemas.',
      'Portar armas de fuego, armas blancas, elementos cortopunzantes, sustancias inflamables o explosivos de cualquier tipo en las sedes o eventos formativos.',
      'Llevar un cortauñas personal en el morral estudiantil de uso cotidiano.',
      'Portar una regla metálica de dibujo técnico dentro de la carpeta académica.'
    ],
    correctIndex: 1,
    explanation: 'Es una prohibición capital portar armas, objetos punzocortantes, explosivos o inflamables en ambientes del SENA, excepto cuando sean herramientas explícitamente requeridas para el programa formativo bajo supervisión.',
    reference: 'Acuerdo 0009 de 2024, Artículo 9 (Porte de Armas y Objetos Peligrosos)'
  },
  {
    id: 'ev-q15',
    sectionId: 'sec-prohibiciones',
    sectionTitle: 'Prohibiciones del Aprendiz',
    question: '¿Qué prohibición del reglamento se orienta a erradicar el matoneo, el acoso y la violencia de género, tanto en entornos virtuales como físicos?',
    options: [
      'Prohibir el debate respetuoso de opiniones divergentes en los foros de SofiaPlus.',
      'Prohibir cualquier acto de discriminación, acoso, hostigamiento, bullying, ciberacoso, violencia sexual o agresión física/verbal hacia cualquier miembro del SENA.',
      'Restringir el uso de teléfonos celulares durante los descansos formativos o recreos.',
      'Obligar a todos los aprendices a opinar exactamente igual en todas las dinámicas grupales.'
    ],
    correctIndex: 1,
    explanation: 'En el Acuerdo 0009 de 2024, bajo principios de enfoque territorial y diversidad, se consagra como prohibición severa cometer actos de hostigamiento, discriminación (por raza, credo, orientación, género) o violencia en redes sociales y aulas.',
    reference: 'Acuerdo 0009 de 2024, Artículo 9 (Discriminación, Acoso y Violencia)'
  },

  // SECTION 4: PERMANENCIA (sec-permanencia)
  {
    id: 'ev-q16',
    sectionId: 'sec-permanencia',
    sectionTitle: 'Permanencia y Novedades',
    question: '¿Por cuánto tiempo se puede solicitar legalmente el Aplazamiento justificado de tu programa formativo en el SENA?',
    options: [
      'Por un período indefinido, hasta que el aprendiz decida regresar voluntariamente.',
      'Por un término acumulado de hasta tres (3) meses, prorrogables por escrito hasta tres (3) meses más por causas debidamente soportadas.',
      'Solo por un máximo de quince (15) días de corrido por año lectivo.',
      'No se puede solicitar aplazamiento; si un aprendiz se retira temporalmente es expulsado de inmediato.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 0009 de 2024 estipula que el aplazamiento por novedad académica debidamente sustentada se otorga por hasta 3 meses, pudiéndose prorrogar únicamente por 3 meses adicionales por fuerza mayor comprobable.',
    reference: 'Acuerdo 0009 de 2024, Artículos 16 - 25 (Novedades Académicas)'
  },
  {
    id: 'ev-q17',
    sectionId: 'sec-permanencia',
    sectionTitle: 'Permanencia y Novedades',
    question: 'Para tramitar formalmente una novedad de Traslado (ya sea de grupo, jornada, modalidad o de Centro de Formación), ¿qué requisito de tiempo exige el reglamento?',
    options: [
      'Se puede solicitar desde el primer día de clase sin haber asistido a ninguna sesión.',
      'Haber cursado, aprobado y estar al día académicamente en por lo menos el primer trimestre (tres meses) de formación del programa.',
      'Llevar mínimo el 80% de avance de la etapa lectiva completa del programa.',
      'El traslado se aprueba de forma automática y libre en cualquier momento del año sin requisitos.'
    ],
    correctIndex: 1,
    explanation: 'Para radicar un traslado, el aprendiz debe haber completado y aprobado el primer trimestre del programa (salvo fuerza mayor extrema o calamidad de salud que analice de urgencia la subdirección). Debe estar al día con las competencias.',
    reference: 'Acuerdo 0009 de 2024, Artículos 16 - 25 (Traslado)'
  },
  {
    id: 'ev-q18',
    sectionId: 'sec-permanencia',
    sectionTitle: 'Permanencia y Novedades',
    question: 'Si un aprendiz decide no continuar estudiando de manera definitiva, ¿qué trámite debe radicar formalmente para evitar una sanción de exclusión en SofiaPlus?',
    options: [
      'Simplemente dejar de asistir y bloquear el correo institucional de los instructores.',
      'Radicar formalmente la novedad de Retiro Voluntario, lo cual suspende la formación de forma sana y le permite reingresar posteriormente bajo términos legales.',
      'Solicitar que el vocero de ficha avise de forma verbal a la coordinación.',
      'Pagar una multa económica para desvincularse de la base de datos nacional.'
    ],
    correctIndex: 1,
    explanation: 'Radicar a tiempo el Retiro Voluntario de forma escrita o en SofiaPlus es el deber del aprendiz que no puede continuar. Evita que se le declare en deserción y le protege su historial de posibles sanciones prolongadas de reingreso.',
    reference: 'Acuerdo 0009 de 2024, Artículos 16 - 25 (Retiro Voluntario)'
  },
  {
    id: 'ev-q19',
    sectionId: 'sec-permanencia',
    sectionTitle: 'Permanencia y Novedades',
    question: 'En programas de formación presencial o mixta, ¿cuál de las siguientes inasistencias injustificadas activa formalmente la causal de deserción formativa?',
    options: [
      'Faltar a una sola sesión de clase de educación física al final del mes.',
      'Inasistencia injustificada de tres (3) días continuos de clase, o de cinco (5) días discontinuos en un trimestre formativo.',
      'Llegar tarde 15 minutos en tres ocasiones distintas debido al tráfico de la ciudad.',
      'Faltar una tarde presencial por asistir a una cita médica oficial programada previamente.'
    ],
    correctIndex: 1,
    explanation: 'El reglamento califica como causal de deserción (Art. 26-31) no asistir sin justificación durante tres (3) días consecutivos o cinco (5) días alternados o discontinuos a lo largo de un período trimestral.',
    reference: 'Acuerdo 0009 de 2024, Artículos 26 - 31 (Deserción Presencial)'
  },
  {
    id: 'ev-q20',
    sectionId: 'sec-permanencia',
    sectionTitle: 'Permanencia y Novedades',
    question: 'Para aprendices en modalidades virtuales o virtuales-distancia, ¿cuál es el plazo de inactividad injustificada que causa el trámite legal de deserción en Zajuna LMS?',
    options: [
      'No enviar una tarea opcional de un foro de discusión un fin de semana.',
      'No ingresar al ambiente virtual de aprendizaje (LMS Zajuna) ni realizar evidencias durante veinte (20) días calendarios consecutivos, sin justificación reportada.',
      'No asistir a una sesión sincrónica debido a fallas de energía local debidamente reportadas.',
      'Dejar de revisar la bandeja de entrada del correo SENA por más de tres días hábiles.'
    ],
    correctIndex: 1,
    explanation: 'La deserción en formación virtual opera oficialmente cuando el aprendiz se ausenta de ingresar a la plataforma LMS Zajuna por un lapso consecutivo de 20 días calendario sin reportar novedades justificables ante el instructor.',
    reference: 'Acuerdo 0009 de 2024, Artículos 26 - 31 (Deserción Virtual)'
  },

  // SECTION 5: FALTAS (sec-faltas)
  {
    id: 'ev-q21',
    sectionId: 'sec-faltas',
    sectionTitle: 'Faltas, Medidas y Debido Proceso',
    question: '¿En qué dos grandes clasificaciones se dividen las faltas que puede cometer un aprendiz en el SENA?',
    options: [
      'Faltas de Aula y Faltas de Taller.',
      'Faltas Académicas (afectan directamente el logro del aprendizaje) y Faltas Disciplinarias (afectan la convivencia y el pacto ético).',
      'Faltas del Instructor y Faltas de los Directivos.',
      'Faltas Administrativas y Faltas Familiares externas.'
    ],
    correctIndex: 1,
    explanation: 'Las faltas se dividen estrictamente en Académicas (ligadas a la apropiación de competencias, evidencias y desarrollo curricular) y Disciplinarias (ligadas al comportamiento, convivencia, bioseguridad e integridad).',
    reference: 'Acuerdo 0009 de 2024, Artículos 41 - 53 (Clasificación de Faltas)'
  },
  {
    id: 'ev-q22',
    sectionId: 'sec-faltas',
    sectionTitle: 'Faltas, Medidas y Debido Proceso',
    question: '¿Bajo qué tres criterios de severidad se tipifican las faltas cometidas por un aprendiz tras ser analizadas en comité?',
    options: [
      'Faltas Sencillas, Faltas Complejas y Faltas Críticas.',
      'Leves, Graves y Gravísimas.',
      'Opcionales, Obligatorias e Inmediatas.',
      'Faltas de Primer Grado, Segundo Grado y Tercer Grado.'
    ],
    correctIndex: 1,
    explanation: 'Toda falta académica o disciplinaria cometida será tipificada de manera objetiva como Leve, Grave o Gravísima, dependiendo de los atenuantes, agravantes y afectación institucional del hecho cometido.',
    reference: 'Acuerdo 0009 de 2024, Artículos 41 - 53 (Gravedad de las Faltas)'
  },
  {
    id: 'ev-q23',
    sectionId: 'sec-faltas',
    sectionTitle: 'Faltas, Medidas y Debido Proceso',
    question: '¿Qué es el Plan de Mejoramiento del Aprendiz y cuál es su duración máxima permitida en el nuevo reglamento para nivelar evidencias no aprobadas?',
    options: [
      'Una sanción monetaria obligatoria para evitar ser expulsado del centro.',
      'Una medida pedagógica de nivelación concertada, diseñada por el instructor, de hasta veinte (20) días calendario de duración máxima para superar deficiencias académicas o conductuales.',
      'Un examen escrito masivo de 500 preguntas aplicable a toda la ficha.',
      'Un período de suspensión de clases presenciales por hasta dos meses lectivos.'
    ],
    correctIndex: 1,
    explanation: 'El Plan de Mejoramiento es una medida formativa (no sancionatoria). Se concerta con el aprendiz para superar dificultades de resultados de aprendizaje no aprobados (D) o de comportamiento, por un término máximo de 20 días de calendario.',
    reference: 'Acuerdo 0009 de 2024, Artículos 41 - 53 (Medidas Formativas)'
  },
  {
    id: 'ev-q24',
    sectionId: 'sec-faltas',
    sectionTitle: 'Faltas, Medidas y Debido Proceso',
    question: 'Ante un proceso disciplinario formal y tras recibir la recomendación del Comité de Evaluación, ¿cuál es el cargo directivo facultado para expedir la resolución de primera instancia?',
    options: [
      'El Vocero de Ficha del grupo correspondiente.',
      'El Subdirector del Centro de Formación respectivo.',
      'El Director General del SENA en Bogotá.',
      'El Ministro de Educación Nacional o de Trabajo.'
    ],
    correctIndex: 1,
    explanation: 'El Subdirector de cada uno de los 118 Centros de Formación a nivel nacional es el funcionario legalmente facultado para firmar y sancionar resoluciones de primera instancia (condicionamiento o cancelación de matrícula).',
    reference: 'Acuerdo 0009 de 2024, Artículos 41 - 53 (Instancia Sancionatoria)'
  },
  {
    id: 'ev-q25',
    sectionId: 'sec-faltas',
    sectionTitle: 'Faltas, Medidas y Debido Proceso',
    question: 'Si un aprendiz es sancionado mediante resolución de primera instancia y considera que la medida es injusta, ¿qué recurso legal le ampara el debido proceso y ante quién apela?',
    options: [
      'Apelar verbalmente ante la portería de seguridad el día siguiente.',
      'El Recurso de Apelación en segunda instancia, radicado formalmente por escrito ante el Director Regional del SENA respectivo.',
      'Solicitar que su ficha completa realice un paro académico indefinido.',
      'No tiene ningún derecho de contradicción; las decisiones del Subdirector son inapelables.'
    ],
    correctIndex: 1,
    explanation: 'El debido proceso consagra el principio de doble instancia. Contra la resolución de sanción emitida por la subdirección procede el recurso de apelación, el cual es resuelto de fondo en segunda instancia por el Director Regional del SENA en la región.',
    reference: 'Acuerdo 0009 de 2024, Artículos 41 - 53 (Recurso de Apelación)'
  }
];
