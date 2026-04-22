/**
 * Fraz Anwer Portfolio Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar Logic
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Update active nav link based on scroll position
        updateActiveLink();
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Navigation Active State
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }

    // 4. Smooth Anchor Scrolling (Fallback for older browsers)
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetContent = document.querySelector(targetId);
            
            if (targetContent) {
                window.scrollTo({
                    top: targetContent.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Hero Text Animation on Load
    const heroH1 = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    const heroBtns = document.querySelector('.hero-btns');

    if (heroH1) {
        heroH1.style.opacity = '0';
        heroH1.style.transform = 'translateY(20px)';
        heroH1.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroH1.style.opacity = '1';
            heroH1.style.transform = 'translateY(0)';
        }, 300);
    }

    // 6. Custom Mouse Cursor Implementation
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const interactiveElements = document.querySelectorAll('a, button, .btn');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            cursor.style.transform = 'translate(-50%, -50%)';
        }

        if (follower) {
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;
            follower.style.transform = 'translate(-50%, -50%)';
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects for cursor
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(4)';
            cursor.style.background = 'rgba(129, 140, 248, 0.1)';
            cursor.style.border = '1px solid var(--primary)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'var(--primary)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'var(--primary)';
            cursor.style.border = 'none';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'rgba(129, 140, 248, 0.3)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if(cursor) cursor.style.opacity = '0';
        if(follower) follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        if(cursor) cursor.style.opacity = '1';
        if(follower) follower.style.opacity = '1';
    });
});
