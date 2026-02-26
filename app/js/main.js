// Основные скрипты
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Мобильное меню =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // ===== Анимация появления блоков при скролле =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми секциями
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// ===== Функции для модальных окон =====

// Показать окно "Спасибо"
window.showThankYouModal = function() {
    // Закрываем корзину
    window.location.href = '#';
    
    // Полностью очищаем корзину через нашу функцию
    if (typeof window.clearCart === 'function') {
        window.clearCart();
    } else {
        // Запасной вариант
        localStorage.removeItem('hora_coffee_cart');
        const cartCount = document.getElementById('cartCount');
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalPrice = document.getElementById('cartTotalPrice');
        
        if (cartCount) cartCount.textContent = '0';
        if (cartItemsContainer) cartItemsContainer.innerHTML = '<p class="cart-empty">Корзина пуста</p>';
        if (cartTotalPrice) cartTotalPrice.textContent = '0 ₽';
    }
    
    // Показываем модальное окно
    const modal = document.getElementById('thankYouModal');
    modal.classList.add('active');
}

// Закрыть окно "Спасибо"
window.closeThankYouModal = function() {
    const modal = document.getElementById('thankYouModal');
    modal.classList.remove('active');
}

// Перейти к клубу
window.goToClub = function() {
    closeThankYouModal();
    
    // Плавный скролл к блоку клуба
    const clubSection = document.getElementById('club');
    if (clubSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = clubSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Подсветка блока клуба
        clubSection.style.transition = 'background-color 0.5s ease';
        clubSection.style.backgroundColor = 'rgba(139, 111, 76, 0.1)';
        setTimeout(() => {
            clubSection.style.backgroundColor = '';
        }, 1000);
    }
}

// Закрыть модальное окно по клику вне его
window.addEventListener('click', function(event) {
    const thankYouModal = document.getElementById('thankYouModal');
    const cartModal = document.getElementById('cart');
    
    if (event.target === thankYouModal) {
        thankYouModal.classList.remove('active');
    }
    
    if (event.target === cartModal) {
        window.location.href = '#';
    }
});