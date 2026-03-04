// ========== НАСТРОЙКИ ==========
const REPORT_URL = 'https://forum.blackrussia.online/threads/%D0%A4%D0%A1%D0%91-%D0%A0%D0%B0%D0%BF%D0%BE%D1%80%D1%82-%D0%BD%D0%B0-%D0%B2%D1%81%D1%82%D1%83%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%A6%D0%A1%D0%9D.14742722/page-2'; // ← ВСТАВЬ СВОЮ ССЫЛКУ

// ========== ПРОВЕРКА АВТОРИЗАЦИИ ==========
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Если пользователь не авторизован, перенаправляем на страницу входа
if (!currentUser) {
    window.location.href = 'index.html';
} else {
    // Отображаем данные пользователя
    document.getElementById('user-name').textContent = currentUser.name || 'Не указано';
    document.getElementById('user-email').textContent = currentUser.email || 'Не указано';
    document.getElementById('user-nickname').textContent = 
        currentUser.nickname ? `Ник: ${currentUser.nickname}` : 'Ник не указан';
    document.getElementById('user-rank').textContent = 
        currentUser.rank ? `Ранг: ${currentUser.rank}` : 'Ранг не указан';
}

// ========== ВЫХОД ==========
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// ========== КНОПКА РАПОРТА ==========
document.getElementById('report-btn').addEventListener('click', () => {
    window.open(REPORT_URL, '_blank');
});
