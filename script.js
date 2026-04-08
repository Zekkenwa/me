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

// Add glowing cursor effect (optional subtile interactivity)
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.glass-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    if (orbs.length > 0) orbs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    if(orbs.length > 1) {
        orbs[1].style.transform = `translate(-${x * 40}px, -${y * 40}px)`;
    }
});

// Experience Sticker Bomb
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("experience-stickers");
    if (!container) return;
    
    // Spawn between 15 and 45 stickers
    const spawnCount = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
    
    for (let i = 0; i < spawnCount; i++) {
        const sticker = document.createElement("img");
        sticker.src = "assets/me lying down and do 'v' pose with 2 hands with shirt.jpg";
        
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

// Contact Mobile Waitstaff Slide-In
document.addEventListener("DOMContentLoaded", () => {
    // Only fire logic if we are running in mobile dimensions or viewport resizes to mobile
    const contactSection = document.getElementById("contact");
    const peekImg = document.querySelector(".peek-img");
    let ghostTimeout;
    
    if (!contactSection || !peekImg) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if user is actively passing over the contact section bounds
            if (entry.isIntersecting && window.innerWidth <= 900) {
                peekImg.classList.add("slide-in-active");
                peekImg.classList.remove("ghost-mode"); // Reset back to opaque
                
                // Set the 2 second clock before fading and unlocking clicks
                clearTimeout(ghostTimeout);
                ghostTimeout = setTimeout(() => {
                    peekImg.classList.add("ghost-mode");
                }, 2000);
            } else {
                peekImg.classList.remove("slide-in-active");
                peekImg.classList.remove("ghost-mode");
                clearTimeout(ghostTimeout);
            }
        });
    }, {
        threshold: 0.25 // Trigger when at least 25% of contact section is visible
    });
    
    observer.observe(contactSection);
});
