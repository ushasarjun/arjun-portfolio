// Initialize AOS (Animate On Scroll)
AOS.init({
    once: true, // whether animation should happen only once - while scrolling down
    offset: 100, // offset (in px) from the original trigger point
});

// Update Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Navigation Bar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links li a');

burger.addEventListener('click', () => {
    // Toggle Nav
    mobileMenu.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Dynamic Particles Background
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 12000;
        
        if (numberOfParticles > 100) numberOfParticles = 100;

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(239, 35, 60, 0.5)'; // vibrant red, much more visible

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                    opacityValue = 1 - (distance / 15000);
                    if (opacityValue > 0) {
                        ctx.strokeStyle = `rgba(239, 35, 60, ${opacityValue * 0.4})`; // stronger network lines
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
    }

    initParticles();
    animateParticles();
}

// Progress Bar Animation Observer
const progressBars = document.querySelectorAll('.skill-progress-bar');
const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
            observer.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Number Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.innerText;
            const value = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            let current = 0;
            const increment = value / 40; // 40 frames of animation
            
            if (!isNaN(value) && value > 0) {
                const updateCount = () => {
                    current += increment;
                    if (current < value) {
                        target.innerText = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = value + suffix;
                    }
                };
                updateCount();
            }
            observer.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// Button Ripple Effect
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        
        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.classList.add('ripple');
        this.appendChild(ripples);
        
        setTimeout(() => {
            ripples.remove()
        }, 1000);
    });
});

// Magnetic Interactions
const magneticElements = document.querySelectorAll('.btn-primary, .magnetic-badge, .contact-links a');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const position = el.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transition = 'all 0.3s ease';
        el.style.transform = 'translate(0px, 0px)';
        setTimeout(() => {
            el.style.transition = '';
        }, 300);
    });
});

// Preloader Logic Removed

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollProgress.style.width = scroll;
});

// Hacker Scramble Effect on Hover
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
const scrambleTexts = document.querySelectorAll('.scramble');

scrambleTexts.forEach(el => {
    el.dataset.value = el.innerText;
    
    el.addEventListener('mouseover', event => {
        let iterations = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return event.target.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            
            if (iterations >= event.target.dataset.value.length) {
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    });
});





// Initialize RPA Bar Chart
const ctxBar = document.getElementById('rpaBarChart');
if (ctxBar) {
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Manual Hours Saved',
                data: [450, 600, 800, 1150],
                backgroundColor: 'rgba(239, 35, 60, 0.8)',
                borderRadius: 5
            }, {
                label: 'Bots Deployed',
                data: [2, 5, 8, 12],
                backgroundColor: 'rgba(43, 45, 66, 0.8)',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { font: { family: "'Poppins', sans-serif" } }
                }
            }
        }
    });
}

// Scroll Spy for Active Navbar State
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links li a');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - window.innerHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============= TYPEWRITER EFFECT =============
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    const phrases = [
        'Interactive Dashboards.',
        'Power Automate Flows.',
        'DAX Data Models.',
        'RPA Bots with UiPath.',
        'Enterprise Reports.',
        'Microsoft Fabric Pipelines.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWrite() {
        const current = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeWrite, typeSpeed);
    }
    
    setTimeout(typeWrite, 1000);
}

// ============= BACK TO TOP BUTTON =============
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============= SECTION TITLE UNDERLINE ANIMATION =============
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-line');
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// ============= PARALLAX MOUSE MOVE ON HERO =============
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const floatIcons = document.querySelectorAll('.float-icon');
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        floatIcons.forEach((icon, index) => {
            const speed = (index + 1) * 8;
            icon.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });

        // Subtle parallax on hero content
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        if (heroContent) {
            heroContent.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
        }
        if (heroImage) {
            heroImage.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
        }
    });
}

// ============= SMOOTH REVEAL ON SCROLL =============
const revealElements = document.querySelectorAll('.bento-card, .edu-card, .cert-item, .tab-panel, .radar-container');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
});

// ============= TILT EFFECT ON ALL BENTO CARDS =============
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.bento-card, .radar-container, .edu-card'), {
        max: 5,
        speed: 400,
        glare: true,
        'max-glare': 0.15,
    });
}


// ============= DARK MODE TOGGLE =============
const themeToggle = document.createElement('button');
themeToggle.classList.add('theme-toggle');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.setAttribute('aria-label', 'Toggle dark mode');
document.body.appendChild(themeToggle);

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// ============= PAGE TRANSITION =============
const pageTransition = document.createElement('div');
pageTransition.classList.add('page-transition');
document.body.appendChild(pageTransition);

// Intercept internal links for smooth page transition
document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('http')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            pageTransition.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    }
});

