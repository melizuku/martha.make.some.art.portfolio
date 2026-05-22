document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle System
    const btnEn = document.getElementById('btn-en');
    const btnPt = document.getElementById('btn-pt');
    
    function setLanguage(lang) {
        localStorage.setItem('portfolio-lang', lang);
        
        if (lang === 'en') {
            btnEn.classList.add('active');
            btnPt.classList.remove('active');
        } else {
            btnPt.classList.add('active');
            btnEn.classList.remove('active');
        }
        
        // Translate elements with explicit data-en/data-pt attributes
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        });
    }

    if (btnEn && btnPt) {
        btnEn.addEventListener('click', () => setLanguage('en'));
        btnPt.addEventListener('click', () => setLanguage('pt'));
        
        // Load preference
        const savedLang = localStorage.getItem('portfolio-lang') || 'en';
        setLanguage(savedLang);
    }

    // 2. Intersection Observer for premium fade-in effects
    const fadeEls = document.querySelectorAll('.fade-in, .anim-title');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeEls.forEach(el => observer.observe(el));

    // 3. Carousel Component logic
    document.querySelectorAll('.carousel-container').forEach(container => {
        const track = container.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextBtn = container.querySelector('.next-btn');
        const prevBtn = container.querySelector('.prev-btn');
        let currentIndex = 0;

        function updateCarousel() {
            slides.forEach((slide, idx) => {
                slide.classList.toggle('active', idx === currentIndex);
            });
            if(slides.length > 0) {
                const slideWidth = slides[0].getBoundingClientRect().width;
                const offset = currentIndex * (slideWidth + 30);
                track.style.transform = `translateX(-${offset}px)`;
            }
        }

        if(slides.length > 0) {
            slides[0].classList.add('active');
        }

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }
        
        window.addEventListener('resize', updateCarousel);
    });
});
