document.addEventListener("DOMContentLoaded", function() {
    // Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.anim-title, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Language Switcher Logic
    const btnEn = document.getElementById('btn-en');
    const btnPt = document.getElementById('btn-pt');
    
    if (btnEn && btnPt) {
        btnEn.addEventListener('click', () => setLanguage('en'));
        btnPt.addEventListener('click', () => setLanguage('pt'));
    }

    function setLanguage(lang) {
        if(btnEn) {
            btnEn.classList.toggle('active', lang === 'en');
            btnPt.classList.toggle('active', lang === 'pt');
        }
        
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        });
    }

    // Carousels Logic
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.next-btn');
        const prevButton = carousel.querySelector('.prev-btn');
        let currentIndex = 0;

        function updateCarousel() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = 20; // Matches CSS gap
            // Move track
            track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
            
            // Update active class
            slides.forEach((s, i) => {
                s.classList.toggle('active', i === currentIndex);
            });
        }

        if(nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });
            // Initialize
            updateCarousel();
        }
    });
});
