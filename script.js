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
    
    orbs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    if(orbs[1]) {
        orbs[1].style.transform = `translate(-${x * 40}px, -${y * 40}px)`;
    }
});
