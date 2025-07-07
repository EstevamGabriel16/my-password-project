"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-form');
    const siteInput = document.getElementById('site');
    const passwordInput = document.getElementById('password');
    const passwordList = document.getElementById('password-list');
    const clearPasswordsBtn = document.getElementById('clear-passwords');
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
    function removePasswordFromStorage(entryToDelete) {
        const saved = localStorage.getItem('passwords');
        if (!saved)
            return;
        let passwords = JSON.parse(saved);
        passwords = passwords.filter((entry) => !(entry.site === entryToDelete.site && entry.password === entryToDelete.password));
        localStorage.setItem('passwords', JSON.stringify(passwords));
    }
    function addPasswordToList(entry) {
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
        if (!site || !password)
            return;
        const entry = { site, password };
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
