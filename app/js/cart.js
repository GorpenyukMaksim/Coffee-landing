// Корзина - полностью переписанная версия
document.addEventListener('DOMContentLoaded', function() {
    console.log('Корзина инициализирована');
    
    // Элементы DOM
    const cartCount = document.getElementById('cartCount');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const addSetToCartButton = document.getElementById('addSetToCart');
    
    // Ключ для localStorage
    const CART_STORAGE_KEY = 'hora_coffee_cart';
    
    // Загружаем корзину или создаем пустую
    let cart = [];
    
    // Функция загрузки корзины
    function loadCart() {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                cart = JSON.parse(savedCart);
                console.log('Загружена корзина:', cart);
            } else {
                cart = [];
                console.log('Корзина пуста');
            }
        } catch (e) {
            console.error('Ошибка загрузки корзины:', e);
            cart = [];
        }
        updateCartDisplay();
    }
    
    // Загружаем сразу
    loadCart();
    
    // Функция сохранения корзины
    function saveCart() {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            console.log('Корзина сохранена:', cart);
        } catch (e) {
            console.error('Ошибка сохранения корзины:', e);
        }
        updateCartDisplay();
    }
    
    // Функция обновления отображения
    function updateCartDisplay() {
        // Обновляем счетчик
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
        
        // Обновляем список товаров
        if (cartItemsContainer) {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="cart-empty">Корзина пуста</p>';
                if (cartTotalPrice) cartTotalPrice.textContent = '0 ₽';
                return;
            }
            
            let html = '';
            let total = 0;
            
            cart.forEach((item, index) => {
                total += item.price;
                html += `
                    <div class="cart-item" data-index="${index}">
                        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">${item.price} ₽</div>
                        </div>
                        <div class="cart-item-remove" onclick="removeCartItem(${index})">✕</div>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = html;
            if (cartTotalPrice) cartTotalPrice.textContent = total + ' ₽';
        }
    }
    
    // Функция добавления товара
    window.addToCart = function(product) {
        cart.push(product);
        saveCart();
        showNotification('✅ Товар добавлен в корзину');
    };
    
    // Функция удаления товара по индексу
    window.removeCartItem = function(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            saveCart();
            showNotification('🗑️ Товар удален из корзины');
        }
    };
    
    // Функция полной очистки корзины
    window.clearCart = function() {
        cart = [];
        localStorage.removeItem(CART_STORAGE_KEY);
        updateCartDisplay();
        console.log('Корзина полностью очищена');
    };
    
    // Обработчики для кнопок добавления отдельных товаров
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseInt(productCard.dataset.price);
            const productImg = productCard.querySelector('.product-img').src;
            
            // Добавляем только ОДИН товар
            cart.push({
                name: productName,
                price: productPrice,
                img: productImg
            });
            
            saveCart();
            
            // Анимация
            this.classList.add('added');
            setTimeout(() => {
                this.classList.remove('added');
            }, 300);
        });
    });
    
    // Обработчик для добавления всего набора
    if (addSetToCartButton) {
        addSetToCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const products = [
                { name: 'Вьетнам, Далат', price: 448, img: 'images/products/menu-1.png' },
                { name: 'Эфиопия, Йргачеффе', price: 448, img: 'images/products/menu-2.png' },
                { name: 'Колумбия, Уила', price: 448, img: 'images/products/menu-3.png' },
                { name: 'Индонезия, Суматра', price: 448, img: 'images/products/menu-4.png' }
            ];
            
            // Добавляем все товары набора
            products.forEach(product => {
                cart.push(product);
            });
            
            saveCart();
            showNotification('🎁 Набор добавлен в корзину');
        });
    }
    
    // Функция показа уведомления
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--coffee-medium);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
    
    // Добавляем стили для уведомлений, если их нет
    if (!document.querySelector('#cart-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'cart-notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .cart-notification {
                font-weight: 500;
            }
            
            .btn.added {
                transform: scale(0.95);
                background-color: var(--coffee-dark) !important;
            }
        `;
        document.head.appendChild(style);
    }
});