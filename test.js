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

let currentScore = 0;
let totalQuestions = 0;

function initTest() {
  const form = document.getElementById("questions-form");
  form.innerHTML = "";
  
  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-group";
    questionDiv.innerHTML = `
      <span class="question-text">${index + 1}. ${question.text}</span>
    `;
    
    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = optionIndex;
      input.addEventListener("change", updateButtonState);
      
      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
    });
    
    form.appendChild(questionDiv);
  });
  
  totalQuestions = questions.length;
}

function updateButtonState() {
  const form = document.getElementById("questions-form");
  const allAnswered = questions.every((_, index) => {
    return form.querySelector(`input[name="question-${index}"]:checked`) !== null;
  });
  
  const submitBtn = document.getElementById("submit-test");
  submitBtn.style.display = allAnswered ? "inline-block" : "none";
}

function submitTest() {
  const form = document.getElementById("questions-form");
  let score = 0;
  
  questions.forEach((question, index) => {
    const selected = form.querySelector(`input[name="question-${index}"]:checked`);
    if (selected && parseInt(selected.value) === question.correct) {
      score += question.level;
    }
  });
  
  const maxScore = questions.reduce((sum, q) => sum + q.level, 0);
  const percentage = (score / maxScore) * 100;
  
  let level, description;
  
  if (percentage < 16.67) {
    level = "A1";
  } else if (percentage < 33.33) {
    level = "A2";
  } else if (percentage < 50) {
    level = "B1";
  } else if (percentage < 66.67) {
    level = "B2";
  } else if (percentage < 83.33) {
    level = "C1";
  } else {
    level = "C2";
  }
  
  description = levelDescriptions[level];
  
  document.getElementById("result-level").textContent = `Tu nivel: ${level}`;
  document.getElementById("result-description").textContent = description;
  
  document.getElementById("questions-form").style.display = "none";
  document.getElementById("submit-test").style.display = "none";
  document.getElementById("result-container").style.display = "block";
}

// Iniciar el test cuando la página carga
document.addEventListener("DOMContentLoaded", () => {
  initTest();
  
  document.getElementById("submit-test").addEventListener("click", submitTest);
  
  // Agregar event listener para mostrar botón cuando haya respuestas
  setTimeout(updateButtonState, 100);
});
