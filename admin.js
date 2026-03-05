// ===== НАСТРОЙКИ =====
const BIN_ID = '69a89f5743b1c97be9b3dae1 ';
const MASTER_KEY = 'твой_X-Master-Key'; // Мастер-ключ для записи

// Проверка, что пользователь админ (замени 'leader@csn.ru' на email лидера)
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.email !== 'leader@csn.ru') {
    window.location.href = 'index.html'; // редирект на вход, если не лидер
}

// Загрузка списка новостей для админки
async function loadNews() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Master-Key': MASTER_KEY }
        });
        const data = await response.json();
        const news = data.record || [];
        
        const list = document.getElementById('admin-news-list');
        if (news.length === 0) {
            list.innerHTML = '<p>Новостей нет</p>';
        } else {
            list.innerHTML = news.map((item, index) => `
                <div class="news-item" style="border:1px solid #ddd; padding:10px; margin-bottom:10px;">
                    <h3>${item.title}</h3>
                    <p>${item.content}</p>
                    <small>${item.date}</small>
                    <button onclick="deleteNews(${index})" style="background:#f44336; color:white; border:none; padding:5px 10px; margin-top:5px;">Удалить</button>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Ошибка загрузки новостей:', error);
    }
}

// Добавление новости
document.getElementById('news-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const date = new Date().toLocaleString();
    
    // Получаем текущие новости
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': MASTER_KEY }
    });
    const data = await response.json();
    const news = data.record || [];
    
    // Добавляем новую
    news.push({ title, content, date });

    console.log('MASTER_KEY (length):', MASTER_KEY.length);
console.log('MASTER_KEY (raw):', JSON.stringify(MASTER_KEY));
console.log('BIN_ID:', JSON.stringify(BIN_ID));
    
    // Обновляем бин
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY
        },
        body: JSON.stringify(news)
    });
    
    document.getElementById('news-form').reset();
    loadNews();
});

// Удаление новости
window.deleteNews = async function(index) {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': MASTER_KEY }
    });
    const data = await response.json();
    const news = data.record || [];
    news.splice(index, 1);
    
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY
        },
        body: JSON.stringify(news)
    });
    
    loadNews();
};

// Выход
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Загружаем новости при открытии страницы

loadNews();

