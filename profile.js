// ===== НАСТРОЙКИ (ССЫЛКУ МЕНЯЙ ЗДЕСЬ) =====
const REPORT_URL = 'https://forum.blackrussia.online/threads/%D0%A4%D0%A1%D0%91-%D0%A0%D0%B0%D0%BF%D0%BE%D1%80%D1%82-%D0%BD%D0%B0-%D0%B2%D1%81%D1%82%D1%83%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%A6%D0%A1%D0%9D.14742722/page-2';   // ← СЮДА ВСТАВЛЯЕШЬ СВОЮ ССЫЛКУ
// ===========================================
// ========== ЭЛЕМЕНТЫ ==========
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

// ========== НАСТРОЙКИ ==========
const STORAGE_KEY = 'users';
const REDIRECT_URL = 'profile.html'; // Или './profile.html' если нужно

// ========== ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ ==========
let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function saveUsers() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

window.hideToast = function() {
    toast.classList.remove('show');
};

// ========== ПЕРЕКЛЮЧЕНИЕ ПАНЕЛЕЙ ==========
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// ========== РЕГИСТРАЦИЯ ==========
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = signupForm.name.value.trim();
    const nickname = signupForm.nickname.value.trim();
    const rank = parseInt(signupForm.rank.value, 10);
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value.trim();

    // Проверка на существующего пользователя
    if (users.some(user => user.email === email)) {
        showToast('Пользователь с такой почтой уже существует!', 'error');
        return;
    }

    // Добавляем нового пользователя
    users.push({ name, nickname, rank, email, password });
    saveUsers();

    showToast('Регистрация прошла успешно! Теперь можно войти.', 'success');
    container.classList.remove("active");
    signupForm.reset();
});

// ========== ВХОД ==========
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signinForm.email.value.trim();
    const password = signinForm.password.value.trim();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Сохраняем текущего пользователя (без пароля, но можно и с ним)
        const { password: p, ...userWithoutPassword } = user; // убираем пароль из сохраняемых данных
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        // Перенаправляем на профиль
        window.location.href = REDIRECT_URL;
    } else {
        showToast('Неверная почта или пароль!', 'error');
    }
});

// ========== ЭКСПОРТ/ИМПОРТ ПОЛЬЗОВАТЕЛЕЙ ==========
document.getElementById('export-users')?.addEventListener('click', () => {
    const dataStr = JSON.stringify(users, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('import-users')?.addEventListener('click', () => {
    document.getElementById('import-file').click();
});

document.getElementById('import-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedUsers = JSON.parse(event.target.result);
            if (Array.isArray(importedUsers)) {
                // Заменяем или объединяем
                if (confirm('Заменить текущих пользователей импортированными? (OK — заменить, Отмена — добавить)')) {
                    users = importedUsers;
                } else {
                    importedUsers.forEach(newUser => {
                        if (!users.some(u => u.email === newUser.email)) {
                            users.push(newUser);
                        }
                    });
                }
                saveUsers();
                showToast('Пользователи импортированы!', 'success');
            } else {
                showToast('Неверный формат файла', 'error');
            }
        } catch {
            showToast('Ошибка чтения файла', 'error');
        }
        e.target.value = '';
    };
    reader.readAsText(file);
});



