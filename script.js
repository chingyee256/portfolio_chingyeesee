// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all experience items, education items, and other sections
document.querySelectorAll('.experience-item, .education-item, .award-item, .skill-category, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Certificates Slider
const certificatesSlider = () => {
    const track = document.querySelector('.certificates-track');
    const slides = document.querySelectorAll('.certificate-slide');
    const prevBtn = document.querySelector('.certificates-prev');
    const nextBtn = document.querySelector('.certificates-next');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    
    const getSlideWidth = () => {
        const gap = window.innerWidth <= 768 ? 12 : 24;
        return slides[0].offsetWidth + gap;
    };
    
    // Update button states
    const updateButtons = () => {
        const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= slides.length - visibleSlides;
    };
    
    // Set position
    const setPosition = () => {
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateButtons();
    };
    
    // Touch events
    track.addEventListener('touchstart', (e) => {
        startPos = e.touches[0].clientX;
        isDragging = true;
        animationID = requestAnimationFrame(animation);
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    });
    
    track.addEventListener('touchend', () => {
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        
        if (movedBy < -100 && currentIndex < slides.length - visibleSlides) {
            currentIndex++;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        
        setPosition();
        prevTranslate = currentTranslate;
    });
    
    // Mouse events
    track.addEventListener('mousedown', (e) => {
        startPos = e.clientX;
        isDragging = true;
        track.style.cursor = 'grabbing';
        animationID = requestAnimationFrame(animation);
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentPosition = e.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    });
    
    track.addEventListener('mouseup', () => {
        cancelAnimationFrame(animationID);
        isDragging = false;
        track.style.cursor = 'grab';
        const movedBy = currentTranslate - prevTranslate;
        const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        
        if (movedBy < -100 && currentIndex < slides.length - visibleSlides) {
            currentIndex++;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        
        setPosition();
        prevTranslate = currentTranslate;
    });
    
    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            cancelAnimationFrame(animationID);
            isDragging = false;
            track.style.cursor = 'grab';
            setPosition();
            prevTranslate = currentTranslate;
        }
    });
    
    // Animation
    const animation = () => {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    };
    
    // Button controls
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            setPosition();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        if (currentIndex < slides.length - visibleSlides) {
            currentIndex++;
            setPosition();
        }
    });
    
    // Initialize
    updateButtons();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setPosition();
    });
};

// Initialize slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', certificatesSlider);
} else {
    certificatesSlider();
}

// Activities Slider
const activitiesSlider = () => {
    const track = document.querySelector('.activities-track');
    const slides = document.querySelectorAll('.activity-slide');
    const prevBtn = document.querySelector('.activities-prev');
    const nextBtn = document.querySelector('.activities-next');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    
    const getSlideWidth = () => {
        const gap = window.innerWidth <= 768 ? 12 : 24;
        return slides[0].offsetWidth + gap;
    };
    
    // Update button states
    const updateButtons = () => {
        const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= slides.length - visibleSlides;
    };
    
    // Set position
    const setPosition = () => {
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateButtons();
    };
    
    // Touch events
    track.addEventListener('touchstart', (e) => {
        startPos = e.touches[0].clientX;
        isDragging = true;
        animationID = requestAnimationFrame(animation);
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    });
    
    track.addEventListener('touchend', () => {
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        
        if (movedBy < -100 && currentIndex < slides.length - visibleSlides) {
            currentIndex++;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        
        setPosition();
        prevTranslate = currentTranslate;
    });
    
    // Mouse events
    track.addEventListener('mousedown', (e) => {
        startPos = e.clientX;
        isDragging = true;
        track.style.cursor = 'grabbing';
        animationID = requestAnimationFrame(animation);
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentPosition = e.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    });
    
    track.addEventListener('mouseup', () => {
        cancelAnimationFrame(animationID);
        isDragging = false;
        track.style.cursor = 'grab';
        const movedBy = currentTranslate - prevTranslate;
        const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        
        if (movedBy < -100 && currentIndex < slides.length - visibleSlides) {
            currentIndex++;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        
        setPosition();
        prevTranslate = currentTranslate;
    });
    
    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            cancelAnimationFrame(animationID);
            isDragging = false;
            track.style.cursor = 'grab';
            setPosition();
            prevTranslate = currentTranslate;
        }
    });
    
    // Animation
    const animation = () => {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    };
    
    // Button controls
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            setPosition();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const visibleSlides = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
        if (currentIndex < slides.length - visibleSlides) {
            currentIndex++;
            setPosition();
        }
    });
    
    // Initialize
    updateButtons();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setPosition();
    });
};

// Initialize activities slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', activitiesSlider);
} else {
    activitiesSlider();
}

// Image Modal Functions
function openImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    modal.classList.add('active');
    modalImg.src = src;
    caption.textContent = alt;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (event.target === modal && !modalImg.contains(event.target)) {
        closeImageModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});
