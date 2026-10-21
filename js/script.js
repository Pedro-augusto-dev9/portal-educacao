const links = document.querySelectorAll('.doc-link');
const contents = document.querySelectorAll('.doc-content');

function setActiveDocument(targetId) {
  links.forEach((item) => item.classList.toggle('active', item.dataset.doc === targetId));

  contents.forEach((content) => {
    const isActive = content.id === targetId;
    content.classList.toggle('active', isActive);
    content.classList.toggle('hidden', !isActive);
  });
}

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveDocument(link.dataset.doc);
  });
});

const quizData = [
  {
    question: 'Qual lei afirma que a soma das correntes que entram em um nó é igual à soma das correntes que saem?',
    options: ['Lei de Ohm', 'Lei das Correntes de Kirchhoff', 'Lei das Tensões de Kirchhoff', 'Lei da Conservação de Energia'],
    correct: 1
  },
  {
    question: 'Em uma malha fechada, qual é o valor da soma algébrica das tensões?',
    options: ['Igual à corrente total', 'Maior que zero', 'Igual a zero', 'Igual à potência'],
    correct: 2
  },
  {
    question: 'Quem formulou as leis que levam o nome de Kirchhoff?',
    options: ['Gustav Robert Kirchhoff', 'Isaac Newton', 'James Clerk Maxwell', 'Nikola Tesla'],
    correct: 0
  },
  {
    question: 'A soma das correntes que entram em um nó é igual à soma das correntes que saem. Isso está relacionado à:',
    options: ['Lei da Conservação de Energia', 'Lei das Correntes de Kirchhoff', 'Lei das Tensões de Kirchhoff', 'Lei de Ohm'],
    correct: 1
  },
  {
    question: 'Em uma malha fechada, a soma algébrica das tensões é:',
    options: ['Maior que zero', 'Igual a zero', 'Menor que zero', 'Igual à corrente total'],
    correct: 1
  }
];

const quizContainer = document.getElementById('quiz');
const resultText = document.getElementById('quiz-resultado');
const verifyButton = document.getElementById('btn-verificar');

quizData.forEach((item, index) => {
  const questionWrapper = document.createElement('div');
  questionWrapper.className = 'quiz-question';

  const questionTitle = document.createElement('h4');
  questionTitle.textContent = `${index + 1}. ${item.question}`;
  questionWrapper.appendChild(questionTitle);

  item.options.forEach((option, optionIndex) => {
    const label = document.createElement('label');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = `q-${index}`;
    radio.value = String(optionIndex);

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    questionWrapper.appendChild(label);
  });

  quizContainer.appendChild(questionWrapper);
});

verifyButton.addEventListener('click', () => {
  let hits = 0;

  quizData.forEach((item, index) => {
    const selected = document.querySelector(`input[name="q-${index}"]:checked`);
    if (selected && Number(selected.value) === item.correct) {
      hits += 1;
    }
  });

  resultText.textContent = `Você acertou ${hits} de ${quizData.length} questões.`;
  resultText.style.color = hits >= 2 ? '#0a7a3a' : '#a11313';
});