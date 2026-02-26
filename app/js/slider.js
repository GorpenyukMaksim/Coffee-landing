// Слайдер для историй
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('storiesSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider) return;
    
    const slides = document.querySelectorAll('.story-card');
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Функция обновления позиции слайдера
    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Обновляем dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Обработчик для кнопки "Далее"
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });
    }
    
    // Обработчик для кнопки "Назад"
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Автоматическая смена слайдов (опционально)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % totalSlides;
    //     updateSlider();
    // }, 5000);
    
    // Обновляем при изменении размера окна
    window.addEventListener('resize', updateSlider);
});