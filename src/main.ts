//interface pra modelar as senhas

interface PasswordEntry {
    site: string;
    password: string;
}


const form = document.getElementById('password-form') as HTMLFormElement;
const siteInput = document.getElementById('site') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const passwordList = document.getElementById('password-list') as HTMLUListElement;


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

function addPasswordToList(entry: PasswordEntry) {
    const li = document.createElement('li');
    li.textContent = `${entry.site}: ${entry.password}`;
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

loadPasswords();