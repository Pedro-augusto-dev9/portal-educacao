// Navegaçao das Abas
const links = document.querySelectorAll('.doc-link');
const contents = document.querySelectorAll('.doc-content');

function setActiveDocument(targetId) {
  links.forEach((item) => {
    const isActive = item.dataset.doc === targetId;
    item.classList.toggle('active', isActive);

    if (isActive) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });

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

// opções corretas do Quiz Estático
const correctAnswers = [1, 2, 0, 1, 1];

const resultText = document.getElementById('quiz-resultado');
const verifyButton = document.getElementById('btn-verificar');

verifyButton.addEventListener('click', () => {
  let hits = 0;

  correctAnswers.forEach((correctIndex, index) => {
    const selected = document.querySelector(`input[name="q-${index}"]:checked`);
    if (selected && Number(selected.value) === correctIndex) {
      hits += 1;
    }
  });

  resultText.textContent = `Você acertou ${hits} de ${correctAnswers.length} questões.`;
  resultText.style.color = hits >= 3 ? '#0a7a3a' : '#a11313';
});

// Leitor de Upload de Arquivos HTML
document.querySelectorAll('.html-file-input').forEach((fileInput) => {
  const uploadSection = fileInput.closest('.html-upload');
  const previewContainer = uploadSection.querySelector('.html-preview');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;

    if (!/\.html?$/i.test(file.name)) {
      previewContainer.textContent = 'Selecione um arquivo .html ou .htm.';
      fileInput.value = '';
      return;
    }

    previewContainer.textContent = 'Carregando documento...';

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        previewContainer.textContent = 'Não foi possível ler o arquivo HTML.';
        return;
      }

      const preview = document.createElement('iframe');
      preview.title = `Pré-visualização de ${file.name}`;
      preview.setAttribute('sandbox', '');
      preview.srcdoc = reader.result;
      previewContainer.replaceChildren(preview);
    };

    reader.onerror = () => {
      previewContainer.textContent = 'Erro ao abrir o documento.';
    };

    reader.readAsText(file);
  });
});