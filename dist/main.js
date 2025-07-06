"use strict";
//interface pra modelar as senhas
const form = document.getElementById('password-form');
const siteInput = document.getElementById('site');
const passwordInput = document.getElementById('password');
const passwordList = document.getElementById('password-list');
function loadPasswords() {
    const saved = localStorage.getItem('passwords');
    if (saved) {
        const passwords = JSON.parse(saved);
        passwords.forEach(addPasswordToList);
    }
}
function savePassword(entry) {
    const saved = localStorage.getItem('passwords');
    const passwords = saved ? JSON.parse(saved) : [];
    passwords.push(entry);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}
function addPasswordToList(entry) {
    const li = document.createElement('li');
    li.textContent = `${entry.site}: ${entry.password}`;
    passwordList.appendChild(li);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const site = siteInput.value.trim();
    const password = passwordInput.value.trim();
    if (!site || !password)
        return;
    const entry = { site, password };
    savePassword(entry);
    addPasswordToList(entry);
    form.reset();
});
loadPasswords();
