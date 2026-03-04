// ===== НАСТРОЙКИ (ССЫЛКУ МЕНЯЙ ЗДЕСЬ) =====
const REPORT_URL = 'https://forum.blackrussia.online/threads/%D0%A4%D0%A1%D0%91-%D0%A0%D0%B0%D0%BF%D0%BE%D1%80%D1%82-%D0%BD%D0%B0-%D0%B2%D1%81%D1%82%D1%83%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%A6%D0%A1%D0%9D.14742722/page-2';   // ← СЮДА ВСТАВЛЯЕШЬ СВОЮ ССЫЛКУ
// ===========================================

// Проверка авторизации
//const currentUser = JSON.parse(localStorage.getItem('currentUser'));

//if (!currentUser) {
    //window.location.href = 'index.html';
//}
//else {
  //document.getElementById('user-name').textContent = currentUser.name;
   // document.getElementById('user-email').textContent = currentUser.email;
//}

// Выход
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Клик по кнопке "Подать рапорт" — открывает ссылку
document.getElementById('report-btn').addEventListener('click', () => {
    window.open(REPORT_URL, '_blank');
});

// Плавный скролл к тексту при клике на стрелку
document.getElementById('scroll-arrow').addEventListener('click', () => {
    document.getElementById('target-text').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

if (!currentUser) {
    window.location.href = 'index.html';
} else {
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
    
    // Новые поля (если есть — для старых пользователей может не быть)
    document.getElementById('user-nickname').textContent = 
        currentUser.nickname ? `Ник: ${currentUser.nickname}` : 'Ник не указан';
    document.getElementById('user-rank').textContent = 
        currentUser.rank ? `Ранг: ${currentUser.rank}` : 'Ранг не указан';

}


