document.addEventListener('DOMContentLoaded', function() {
    // Загрузка переводов
    async function loadLanguage(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            return await response.json();
        } catch (error) {
            console.error('Error loading language:', error);
            return null;
        }
    }

    // Применение перевода
    async function applyTranslation(lang) {
        const translations = await loadLanguage(lang);
        if (!translations) return;

        // Основные тексты
        document.title = translations.title;
        document.querySelector('h1').textContent = translations.title;
        document.querySelector('.hero p').textContent = translations.subtitle;

        // Секции
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        // Динамическое содержимое
        renderTimeline(translations.timeline);
        renderFeatures(translations.features);
        renderFooterLinks(translations.footer_links);
    }

    // Рендер временной шкалы
    function renderTimeline(items) {
        const container = document.querySelector('.timeline');
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="timeline-item">
                <div class="year">${item.year}</div>
                <div class="event">${item.event}</div>
            </div>
        `).join('');
    }

    // Рендер карточек возможностей
    function renderFeatures(features) {
        const container = document.querySelector('.features-grid');
        if (!container) return;
        
        container.innerHTML = features.map(feat => `
            <div class="feature-card">
                <h3>${feat.title}</h3>
                <p>${feat.content}</p>
            </div>
        `).join('');
    }

    // Рендер ссылок в футере
    function renderFooterLinks(links) {
        const container = document.querySelector('.footer-links');
        if (!container) return;
        
        container.innerHTML = links.map(link => `
            <a href="${link.url}" target="_blank">${link.text}</a>
        `).join('');
    }

    // Инициализация языка по умолчанию (US English)
    applyTranslation('en');

    // Переключение языков
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            applyTranslation(lang);
        });
        
        // Подсказка для US English
        if(btn.dataset.lang === 'en') {
            btn.addEventListener('mouseover', () => {
                btn.title = "American English version";
            });
        }
    });

    // Анимации при скролле
    window.addEventListener('scroll', animateOnScroll);
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    animateOnScroll(); // Инициализация при загрузке
});