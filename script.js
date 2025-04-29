document.addEventListener('DOMContentLoaded', function() {
    // Анімації при скролі
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-scroll');
        elements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    };

    // Запускаємо анімації при завантаженні та скролі
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Плавний скрол для посилань
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ініціалізація відео
    const videoIframe = document.querySelector('.video-container iframe');
    if (videoIframe) {
        // Можна додати додаткову логіку для відео
    }

    // Додаткові ефекти
    const elementsToHover = document.querySelectorAll('.card, .semantic-card');
    elementsToHover.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
});