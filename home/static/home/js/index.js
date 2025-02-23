let slideIndex = 1;

document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    // Auto advance slides every 5 seconds
    setInterval(() => changeSlide(1), 5000);
});

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].classList.add("active");
};

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    let currentIndex = 0;
    const cardsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 576 ? 2 : 1;
    const maxIndex = cards.length - cardsPerView;

    function updateTrackPosition() {
        const cardWidth = cards[0].offsetWidth + 20; // 20px is the gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateTrackPosition();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        updateTrackPosition();
    });

    // Update on window resize
    window.addEventListener('resize', updateTrackPosition);
});