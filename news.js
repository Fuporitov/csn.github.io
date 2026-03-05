// ===== НАСТРОЙКИ =====
const BIN_ID = 'твой_bin_id';                // Например: '65a1b2c3d4e5f6g7h8i9'
const READ_KEY = 'твой_ключ_только_для_чтения'; // Или X-Master-Key, но лучше создать read-only

async function loadNews() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Access-Key': READ_KEY }
        });
        const data = await response.json();
        const news = data.record; // массив новостей
        
        const container = document.getElementById('news-container');
        if (!container) return;
        
        if (news.length === 0) {
            container.innerHTML = '<p>Пока нет новостей</p>';
        } else {
            // Показываем последние 5 новостей (сначала новые)
            const newsList = news.slice(-5).reverse().map(item => `
                <div class="news-item">
                    <h3>${item.title}</h3>
                    <p>${item.content}</p>
                    <small>${item.date}</small>
                </div>
            `).join('');
            container.innerHTML = newsList;
        }
    } catch (error) {
        console.error('Ошибка загрузки новостей:', error);
        const container = document.getElementById('news-container');
        if (container) container.innerHTML = '<p>Не удалось загрузить новости</p>';
    }
}

// Загружаем новости при загрузке страницы
loadNews();