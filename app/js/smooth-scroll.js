// Плавный скролл для якорных ссылок
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню после клика
            const nav = document.querySelector('.nav');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
            // Debounce функция для оптимизации
            function debounce(func, wait) {
            let timeout;
                return function executedFunction(...args) {
            const later = () => {
            clearTimeout(timeout);
            func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
                };
            }

            // Используем для скролла
            window.addEventListener('scroll', debounce(() => {
                // Ваш код для скролла
                console.log('Скролл обработан с задержкой');
            }, 100));
        });
    });
});
