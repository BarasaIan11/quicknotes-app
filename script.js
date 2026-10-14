const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const errorMessage = document.querySelector('#error-message');
const noteCount = document.querySelector('#note-count');

let notes = [];

function categoryClass(category) {
  return `category-${category.toLowerCase()}`;
}

function render() {
  notesList.replaceChildren();

  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }

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
    deleteButton.addEventListener('click', () => {
      notes = notes.filter((savedNote) => savedNote.id !== note.id);
      render();
    });

    noteItem.append(noteText, categoryLabel, date, deleteButton);
    notesList.append(noteItem);
  });
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  const note = {
    id: Date.now(),
    text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  noteInput.value = '';
  errorMessage.textContent = '';
  render();
});

render();
