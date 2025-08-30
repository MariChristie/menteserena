document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    if (!carouselTrack) return;

    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const carouselDotsContainer = document.querySelector('.carousel-dots');
    const cards = Array.from(carouselTrack.children);
    let cardWidth;
    let cardsPerPage;
    let currentIndex = 0;

    const getCarouselMetrics = () => {
        const carouselContainer = document.querySelector('.carousel-container');
        const containerWidth = carouselContainer.offsetWidth;
        const gap = parseFloat(getComputedStyle(carouselTrack).gap);

        if (window.innerWidth <= 768) {
            cardsPerPage = 1;
            cardWidth = containerWidth;
        } else if (window.innerWidth <= 1200) {
            cardsPerPage = 2;
            cardWidth = (containerWidth - gap) / 2;
        } else {
            cardsPerPage = 3;
            cardWidth = (containerWidth - (gap * 2)) / 3;
        }
        cards.forEach(card => {
            card.style.minWidth = `${cardWidth}px`;
        });
    };

    const updateCarousel = () => {
        const offset = -currentIndex * (cardWidth + parseFloat(getComputedStyle(carouselTrack).gap));
        carouselTrack.style.transform = `translateX(${offset}px)`;
        updateDots();
    };

    const createDots = () => {
        carouselDotsContainer.innerHTML = '';
        const totalPages = Math.ceil(cards.length / cardsPerPage);
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentIndex = i * cardsPerPage;
                if (currentIndex > cards.length - cardsPerPage) {
                    currentIndex = cards.length - cardsPerPage;
                }
                updateCarousel();
            });
            carouselDotsContainer.appendChild(dot);
        }
        updateDots();
    };

    const updateDots = () => {
        const dots = Array.from(carouselDotsContainer.children);
        dots.forEach((dot, index) => {
            const activePage = Math.floor(currentIndex / cardsPerPage);
            dot.classList.toggle('active', index === activePage);
        });
    };

    prevButton.addEventListener('click', () => {
        const maxIndex = cards.length - cardsPerPage;
        currentIndex = Math.max(0, currentIndex - cardsPerPage);
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        const maxIndex = cards.length - cardsPerPage;
        if (currentIndex < maxIndex) {
            currentIndex = Math.min(maxIndex, currentIndex + cardsPerPage);
        } else {
            currentIndex = 0; 
        }
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        getCarouselMetrics();
        createDots();
        updateCarousel();
    });

    getCarouselMetrics();
    createDots();
    updateCarousel();

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    };

    const touchStart = (index) => (event) => {
        startPos = getPositionX(event);
        isDragging = true;
        carouselTrack.style.transition = 'none';
    };

    const touchMove = (event) => {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
            carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
        }
    };

    const touchEnd = () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < cards.length - cardsPerPage) {
            currentIndex += cardsPerPage;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= cardsPerPage;
        }
        
        currentIndex = Math.max(0, Math.min(currentIndex, cards.length - cardsPerPage));

        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        const gap = parseFloat(getComputedStyle(carouselTrack).gap);
        prevTranslate = -currentIndex * (cardWidth + gap);
        carouselTrack.style.transform = `translateX(${prevTranslate}px)`;
        
        updateDots();
    };

    cards.forEach((card, index) => {
        card.addEventListener('dragstart', (e) => e.preventDefault());
        card.addEventListener('touchstart', touchStart(index));
        card.addEventListener('touchend', touchEnd);
        card.addEventListener('touchmove', touchMove);
        card.addEventListener('mousedown', touchStart(index));
        card.addEventListener('mouseup', touchEnd);
        card.addEventListener('mouseleave', () => {
            if(isDragging) touchEnd();
        });
        card.addEventListener('mousemove', touchMove);
    });
});