// Загрузка переводов
async function setLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    const data = await response.json();
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = data[key];
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // По умолчанию русский
    setLanguage('ru');
    
    // Переключение языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
});