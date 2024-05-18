const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const editBtn = document.getElementById('edit-btn');

let isEditing = false;

editBtn.addEventListener('click', () => {
  if (!isEditing) {
    nameInput.contentEditable = true;
    emailInput.contentEditable = true;
    ageInput.contentEditable = true;
    editBtn.textContent = 'Save';
  } else {
    nameInput.contentEditable = false;
    emailInput.contentEditable = false;
    ageInput.contentEditable = false;
    editBtn.textContent = 'Edit Profile';
  }
  isEditing = !isEditing;
});