// Nivel de dificultad del 1 al 20 (A1-C2)
const questions = [
  {
    level: 1,
    text: "What is your name?",
    options: [
      "Soy María",
      "I am María",
      "María am I",
      "Am I María"
    ],
    correct: 1
  },
  {
    level: 1,
    text: "She ___ a student.",
    options: ["are", "is", "am", "be"],
    correct: 1
  },
  {
    level: 2,
    text: "How often do you go to the gym?",
    options: [
      "I go at the gym",
      "I goes to gym",
      "I go to the gym three times a week",
      "I am going gym"
    ],
    correct: 2
  },
  {
    level: 2,
    text: "They ___ been friends since 2010.",
    options: ["have", "has", "are", "is"],
    correct: 0
  },
  {
    level: 3,
    text: "If I ___ you were coming, I would have prepared dinner.",
    options: ["knew", "had known", "know", "would know"],
    correct: 1
  },
  {
    level: 3,
    text: "The project was completed ___ the deadline.",
    options: ["before", "during", "since", "while"],
    correct: 0
  },
  {
    level: 4,
    text: "Despite ___ the warnings, he proceeded with his plan.",
    options: ["heard", "hearing", "have heard", "being heard"],
    correct: 1
  },
  {
    level: 4,
    text: "The committee unanimously agreed to ___ the proposal.",
    options: ["ratify", "amplify", "certify", "stratify"],
    correct: 0
  },
  {
    level: 5,
    text: "The economist's analysis ___ the fundamental flaws in the current fiscal policy.",
    options: [
      "elucidated",
      "obfuscated",
      "ameliorated",
      "exacerbated"
    ],
    correct: 0
  },
  {
    level: 5,
    text: "Having ___ extensive research, the team formulated a comprehensive strategy.",
    options: ["conducted", "to conduct", "conducting", "being conducted"],
    correct: 0
  },
  {
    level: 6,
    text: "The politician's rhetoric was replete with ___ and equivocation.",
    options: ["platitudes", "verisimilitude", "perspicacity", "magnanimity"],
    correct: 0
  },
  {
    level: 6,
    text: "The author's ___ for linguistic precision is evident throughout the manuscript.",
    options: ["predilection", "aberration", "oblivion", "brevity"],
    correct: 0
  },
  {
    level: 7,
    text: "The dialectical relationship between form and content has been ___.",
    options: ["elucidated", "subordinated", "extolled", "obfuscated"],
    correct: 0
  },
  {
    level: 7,
    text: "His propensity for ___ discourse often alienated potential allies.",
    options: ["pellucid", "abstruse", "salubrious", "perspicacious"],
    correct: 1
  },
  {
    level: 8,
    text: "The phenomenological approach to epistemology ___ the limitations of empirical positivism.",
    options: ["obviates", "exacerbates", "corroborates", "circumscribes"],
    correct: 3
  },
  {
    level: 8,
    text: "The protagonist's existential ___ precipitated a profound metamorphosis in consciousness.",
    options: ["malaise", "exiguity", "felicity", "superfluity"],
    correct: 0
  },
  {
    level: 9,
    text: "The hermeneutical framework elucidates the ___ interstices of textual interpretation.",
    options: ["pellucid", "recondite", "quotidian", "sempiternal"],
    correct: 1
  },
  {
    level: 9,
    text: "Post-structuralist discourse has fundamentally ___ traditional canonical hierarchies.",
    options: ["valorized", "invalidated", "problematized", "sanctified"],
    correct: 2
  },
  {
    level: 10,
    text: "The author's deployment of ___ semantics subverts conventional signification.",
    options: ["univocal", "equivocal", "perspicuous", "pellucid"],
    correct: 1
  },
  {
    level: 10,
    text: "The philosophical implications of quantum indeterminacy ___ classical metaphysics.",
    options: ["corroborate", "vitiate", "bolster", "vindicate"],
    correct: 1
  }
];

const levelDescriptions = {
  "A1": "Principiante. Entiendes y usas expresiones cotidianas básicas. Te presentas y haces preguntas simples.",
  "A2": "Pre-intermedio. Puedes comunicarte en situaciones cotidianas. Hablas sobre temas familiares y cercanos.",
  "B1": "Intermedio. Entiendes los puntos principales de textos claros. Produces textos simples sobre temas que conoces.",
  "B2": "Intermedio-alto. Entiendes argumentos complejos. Te expresas con soltura y espontaneidad.",
  "C1": "Avanzado. Entiendes textos largos y exigentes. Te expresas sin buscar palabras. Usas el idioma flexiblemente.",
  "C2": "Dominio pleno. Comprendes sin esfuerzo. Te expresas con precisión. Distingues matices de significado."
};

let currentQuestionIndex = 0;
const totalQuestions = questions.length;

function initTest() {
  const form = document.getElementById("questions-form");
  form.innerHTML = "";

  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-group";
    questionDiv.id = `q-group-${index}`;
    questionDiv.style.display = index === 0 ? "block" : "none";
    questionDiv.style.opacity = index === 0 ? "1" : "0";
    questionDiv.style.transition = "opacity 0.4s ease";

    questionDiv.innerHTML = `
      <span class="question-text" style="color: var(--accent-yellow); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; display: block;">Pregunta ${index + 1} de ${totalQuestions}</span>
      <span class="question-text" style="font-size: 1.4rem; margin-bottom: 25px;">${question.text}</span>
    `;

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "option-label";
      label.innerHTML = `
        <input type="radio" name="question-${index}" value="${optionIndex}">
        <span class="option-text">${option}</span>
      `;

      const input = label.querySelector('input');
      input.addEventListener("change", () => {
        // Auto-advance after small delay for better UX
        setTimeout(nextQuestion, 400);
      });

      questionDiv.appendChild(label);
    });

    form.appendChild(questionDiv);
  });

  updateNavigation();
  updateProgressBar();
}

function updateProgressBar() {
  const progressBar = document.getElementById("test-progress-bar");
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
}

function showQuestion(index) {
  const groups = document.querySelectorAll(".question-group");
  groups.forEach((group, i) => {
    if (i === index) {
      group.style.display = "block";
      setTimeout(() => group.style.opacity = "1", 10);
    } else {
      group.style.opacity = "0";
      group.style.display = "none";
    }
  });

  currentQuestionIndex = index;
  updateNavigation();
  updateProgressBar();
}

function nextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    showQuestion(currentQuestionIndex + 1);
  } else {
    updateNavigation(); // To show submit button if it's the last one
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    showQuestion(currentQuestionIndex - 1);
  }
}

function updateNavigation() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-test");

  // Show/hide Prev button
  prevBtn.style.display = currentQuestionIndex > 0 ? "inline-block" : "none";

  // Is current question answered?
  const currentAnswered = document.querySelector(`input[name="question-${currentQuestionIndex}"]:checked`) !== null;
  const allAnswered = questions.every((_, index) => {
    return document.querySelector(`input[name="question-${index}"]:checked`) !== null;
  });

  if (currentQuestionIndex === totalQuestions - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = allAnswered ? "inline-block" : "none";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
    nextBtn.disabled = !currentAnswered;
    nextBtn.style.opacity = currentAnswered ? "1" : "0.5";
  }
}

function submitTest() {
  let score = 0;

  questions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);
    if (selected && parseInt(selected.value) === question.correct) {
      score += question.level;
    }
  });

  const maxScore = questions.reduce((sum, q) => sum + q.level, 0);
  const percentage = (score / maxScore) * 100;

  let level;
  if (percentage < 16.67) level = "A1";
  else if (percentage < 33.33) level = "A2";
  else if (percentage < 50) level = "B1";
  else if (percentage < 66.67) level = "B2";
  else if (percentage < 83.33) level = "C1";
  else level = "C2";

  const description = levelDescriptions[level];

  document.getElementById("result-level").textContent = `Tu nivel: ${level}`;
  document.getElementById("result-description").textContent = description;

  const messages = {
    "A1": `Hola 👋 Acabo de realizar el test de nivelación y obtuve nivel ${level}. Me gustaría conocer más sobre los cursos para principiantes.`,
    "A2": `Hola 👋 Realicé tu test de nivelación y obtuve nivel ${level}. Estoy interesado en mejorar mi inglés con clases adaptadas a mi nivel.`,
    "B1": `Hola 👋 Completé el test de nivelación con resultado ${level}. Busco un curso para consolidar mis conocimientos de inglés intermedio.`,
    "B2": `Hola 👋 Acabo de hacer el test y mi nivel es ${level}. Me interesaría explorar opciones de cursos avanzados o preparación para exámenes.`,
    "C1": `Hola 👋 Mi resultado en el test es ${level}. Me gustaría consultar sobre cursos especializados o preparación para certificaciones avanzadas.`,
    "C2": `Hola 👋 Obtuve nivel ${level} en el test. Me interesa conocer opciones de cursos de especialización o coaching ejecutivo en inglés.`
  };

  const whatsappLink = `https://wa.me/5491130861066?text=${encodeURIComponent(messages[level])}`;
  document.getElementById("whatsapp-btn").href = whatsappLink;

  document.getElementById("test-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  // Smooth scroll to result
  document.getElementById("test").scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
  initTest();
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
  document.getElementById("prev-btn").addEventListener("click", prevQuestion);
  document.getElementById("submit-test").addEventListener("click", submitTest);
});
