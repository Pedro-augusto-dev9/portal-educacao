const links = document.querySelectorAll('.doc-link');
const contents = document.querySelectorAll('.doc-content');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const targetId = link.dataset.doc;

    links.forEach((item) => item.classList.toggle('active', item === link));

    contents.forEach((content) => {
      const isActive = content.id === targetId;
      content.classList.toggle('active', isActive);
      content.classList.toggle('hidden', !isActive);
    });
  });
});