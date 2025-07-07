interface PasswordEntry {
  site: string;
  password: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('password-form') as HTMLFormElement;
  const siteInput = document.getElementById('site') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const passwordList = document.getElementById('password-list') as HTMLUListElement;
  const clearPasswordsBtn = document.getElementById('clear-passwords') as HTMLButtonElement;

  function loadPasswords() {
    const saved = localStorage.getItem('passwords');
    if (saved) {
      const passwords: PasswordEntry[] = JSON.parse(saved);
      passwords.forEach(addPasswordToList);
    }
  }

  function savePassword(entry: PasswordEntry) {
    const saved = localStorage.getItem('passwords');
    const passwords: PasswordEntry[] = saved ? JSON.parse(saved) : [];
    passwords.push(entry);
    localStorage.setItem('passwords', JSON.stringify(passwords));
  }

  function removePasswordFromStorage(entryToDelete: PasswordEntry) {
    const saved = localStorage.getItem('passwords');
    if (!saved) return;
    let passwords: PasswordEntry[] = JSON.parse(saved);
    passwords = passwords.filter(
      (entry) => !(entry.site === entryToDelete.site && entry.password === entryToDelete.password)
    );
    localStorage.setItem('passwords', JSON.stringify(passwords));
  }

  function addPasswordToList(entry: PasswordEntry) {
    const li = document.createElement('li');

    const siteElement = document.createElement('strong');
    siteElement.textContent = entry.site;

    const passwordElement = document.createElement('div');
    passwordElement.classList.add('password-text');
    passwordElement.textContent = entry.password;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.title = 'Excluir senha';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
      li.remove();
      removePasswordFromStorage(entry);
    });

    li.appendChild(siteElement);
    li.appendChild(passwordElement);
    li.appendChild(deleteBtn);

    passwordList.appendChild(li);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const site = siteInput.value.trim();
    const password = passwordInput.value.trim();

    if (!site || !password) return;

    const entry: PasswordEntry = { site, password };

    savePassword(entry);
    addPasswordToList(entry);

    form.reset();
  });

  clearPasswordsBtn.addEventListener('click', () => {
    localStorage.removeItem('passwords');
    passwordList.innerHTML = '';
  });

  loadPasswords();
});
