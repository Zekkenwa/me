// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    navLinks.classList.remove('active');
}));

// Go To Top Button
const goToTopBtn = document.getElementById('go-to-top');
if (goToTopBtn) {
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (scrollPercent > 0.25) {
            goToTopBtn.classList.add('visible');
        } else {
            goToTopBtn.classList.remove('visible');
        }
    });
    goToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Experience Sticker Bomb
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("experience-stickers");
    if (!container) return;
    
    // Spawn between 15 and 45 stickers
    const spawnCount = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
    
    for (let i = 0; i < spawnCount; i++) {
        const sticker = document.createElement("img");
        sticker.src = "assets/me lying down and do 'v' pose with 2 hands with shirt.png";
        
        // Random sizing between 40px and 100px
        const size = Math.floor(Math.random() * 60) + 40; 
        
        // Random rotations between -45deg and 45deg
        const rotation = Math.floor(Math.random() * 90) - 45; 
        
        // Random positions constrained within 90% of the section to prevent scroll clipping
        const leftPercent = Math.floor(Math.random() * 90) + 5;
        const topPercent = Math.floor(Math.random() * 95);
        
        // Styles
        sticker.style.position = "absolute";
        sticker.style.left = `${leftPercent}%`;
        sticker.style.top = `${topPercent}%`;
        sticker.style.width = `${size}px`;
        sticker.style.transform = `rotate(${rotation}deg)`;
        sticker.style.border = "4px solid #fff";
        sticker.style.borderRadius = "20px";
        sticker.style.boxShadow = "0 5px 0 rgba(0,0,0,0.05)";
        sticker.style.opacity = "0.8"; // Slightly transparent so timeline stays readable
        
        // Floating animation
        sticker.style.animation = `bob ${Math.random() * 4 + 3}s infinite ease-in-out`;
        
        container.appendChild(sticker);
    }
});

// Contact Image (red suit) – slide-in on mobile, and on desktop when covered by cards
document.addEventListener("DOMContentLoaded", () => {
    const contactSection = document.getElementById("contact");
    const peekImg = document.querySelector(".peek-img");
    let ghostTimeout;
    
    if (!contactSection || !peekImg) return;

    // Detect if peek-img would overlap the contact-box on desktop and apply mobile behavior
    function checkPeekCoverage() {
        if (window.innerWidth <= 900) {
            peekImg.classList.remove('peek-img-covered');
            return;
        }
        const contactBox = document.querySelector('.contact-box');
        if (!contactBox) return;

        // peek-img CSS: position absolute; right: 5%; width: 250px
        const PEEK_RIGHT_RATIO = 0.05; // matches CSS `right: 5%`
        const sectionWidth = contactSection.offsetWidth;
        const peekWidth = peekImg.offsetWidth || 250; // compute from element; fallback matches CSS width
        const peekLeft = sectionWidth * (1 - PEEK_RIGHT_RATIO) - peekWidth;

        // Contact-box right edge relative to section left
        const sectionRect = contactSection.getBoundingClientRect();
        const boxRect = contactBox.getBoundingClientRect();
        const boxRightInSection = boxRect.right - sectionRect.left;

        if (peekLeft < boxRightInSection) {
            peekImg.classList.add('peek-img-covered');
        } else {
            peekImg.classList.remove('peek-img-covered');
            peekImg.classList.remove('slide-in-active');
            peekImg.classList.remove('ghost-mode');
            clearTimeout(ghostTimeout);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const isMobile = window.innerWidth <= 900;
            const isCovered = peekImg.classList.contains('peek-img-covered');

            if (entry.isIntersecting && (isMobile || isCovered)) {
                peekImg.classList.add("slide-in-active");
                peekImg.classList.remove("ghost-mode");

                clearTimeout(ghostTimeout);
                ghostTimeout = setTimeout(() => {
                    peekImg.classList.add("ghost-mode");
                }, 2000);
            } else if (!entry.isIntersecting) {
                peekImg.classList.remove("slide-in-active");
                peekImg.classList.remove("ghost-mode");
                clearTimeout(ghostTimeout);
            }
        });
    }, {
        threshold: 0.25
    });

    observer.observe(contactSection);

    checkPeekCoverage();
    window.addEventListener('resize', checkPeekCoverage, { passive: true });
});
