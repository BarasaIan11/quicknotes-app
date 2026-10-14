const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');

let notes = [];

function categoryClass(category) {
  return `category-${category.toLowerCase()}`;
}

function render() {
  notesList.replaceChildren();

  notes.forEach((note) => {
    const noteItem = document.createElement('li');
    noteItem.className = `note-card ${categoryClass(note.category)}`;

    const noteText = document.createElement('p');
    noteText.textContent = note.text;

    const categoryLabel = document.createElement('span');
    categoryLabel.className = 'note-category-label';
    categoryLabel.textContent = note.category;

    const date = document.createElement('p');
    date.className = 'note-date';
    date.textContent = `Created: ${note.createdAt}`;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';

    noteItem.append(noteText, categoryLabel, date, deleteButton);
    notesList.append(noteItem);
  });
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  noteInput.value = '';
  render();
});

render();
