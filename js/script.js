// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initHero();
    initProjects();
    initContactForm();
    initScrollAnimations();
    initParticles();
    initResumeDownload();
    ensureTextVisibility();
});

// Ensure text visibility
function ensureTextVisibility() {
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        setTimeout(() => {
            const style = window.getComputedStyle(gradientText);
            if (style.webkitTextFillColor === 'transparent') {
                gradientText.style.webkitTextFillColor = 'var(--primary-color)';
                gradientText.style.color = 'var(--primary-color)';
                gradientText.style.background = 'none';
            }
        }, 100);
    }
    const navLogo = document.querySelector('.nav-logo a');
    if (navLogo) { navLogo.style.visibility = 'visible'; navLogo.style.opacity = '1'; }
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) { heroTitle.style.visibility = 'visible'; heroTitle.style.opacity = '1'; }
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    const sections = document.querySelectorAll('section[id]');
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

// Hero
function initHero() {
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.onerror = function() {
            this.src = 'data:image/svg+xml;base64,...'; // fallback SVG
        };
    }
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        if (button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    });
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

// Projects
function initProjects() {
    const projectsData = [
        {
            title: "Card Game (BigCash)",
            description: "Multiplayer Android card game with scalable instances and real-time gameplay.",
            category: "game android",
            technologies: ["Java", "Kotlin", "LibGDX", "Android SDK"],
            liveUrl: "#",
            githubUrl: "#",
            icon: "🃏"
        },
        {
            title: "Casual Games (BigSports)",
            description: "Developed 12+ games like Car Race & Fruit Chop for BigSports flagship app.",
            category: "game android",
            technologies: ["Java", "Kotlin", "LibGDX", "Firebase"],
            liveUrl: "#",
            githubUrl: "#",
            icon: "🎮"
        },
        {
            title: "Todo App",
            description: "Full-stack task management application with CRUD operations and user authentication.",
            category: "web",
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            liveUrl: "#",
            githubUrl: "#",
            icon: "✅"
        },
        {
            title: "Simple Learning App",
            description: "Interactive educational platform with progress tracking and quiz functionality.",
            category: "web",
            technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
            liveUrl: "#",
            githubUrl: "#",
            icon: "📚"
        },
        {
            title: "Legal-Ease Website",
            description: "Dynamic law management platform built with PHP, MySQL, and Bootstrap.",
            category: "web",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            liveUrl: "#",
            githubUrl: "#",
            icon: "⚖️"
        },
        {
            title: "Portfolio Website",
            description: "Modern responsive portfolio site with animations and smooth UX.",
            category: "web",
            technologies: ["HTML5", "CSS3", "JavaScript"],
            liveUrl: "#",
            githubUrl: "https://github.com/ratneshsingh955/ratnesh-portfolio",
            icon: "💼"
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function createCard(p) {
        return `
        <div class="project-card glow-effect ${p.category}">
          <div class="project-image"><span>${p.icon}</span></div>
          <div class="project-content">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-description">${p.description}</p>
            <div class="project-tech">${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
            <div class="project-links">
              <a href="${p.liveUrl}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Details</a>

            </div>
          </div>
        </div>`;
}

    function renderProjects(list) {
        projectsGrid.innerHTML = list.map(createCard).join('');
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (filter === 'all') renderProjects(projectsData);
            else renderProjects(projectsData.filter(p => p.category.includes(filter)));
        });
    });

    renderProjects(projectsData);
}

// Resume Download Tracking
function initResumeDownload() {
    const resumeBtn = document.querySelector('a[download]');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function() {
            showNotification("Resume download started! ✨", "success");
        });
    }
}

// Contact Form with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        emailjs.sendForm("service_l6hug7e", "template_m9s2k9e", this) // 🔹 Replace
            .then(() => {
                showNotification("Message sent successfully! I'll reply soon.", "success");
                contactForm.reset();
            })
            .catch(() => {
                showNotification("Something went wrong. Please try again.", "error");
            });
    });
}

// Helpers
function showNotification(message, type="info") {
    const n = document.createElement('div');
    n.className = `notification-${type}`;
    n.style.cssText = `
      position:fixed;top:20px;right:20px;
      background:${type==="success"?"#10b981":type==="error"?"#ef4444":"#6366f1"};
      color:white;padding:1rem 1.5rem;border-radius:.5rem;
      z-index:9999;transform:translateX(100%);
      transition:transform .3s;max-width:300px;
    `;
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(()=>{n.style.transform="translateX(0)";},100);
    setTimeout(()=>{n.style.transform="translateX(100%)";setTimeout(()=>n.remove(),300);},5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
            if(e.isIntersecting){
                e.target.style.opacity="1";
                e.target.style.transform="translateY(0)";
            }
        });
    }, {threshold:0.1, rootMargin:'0px 0px -50px 0px'});
    const elements = document.querySelectorAll('.section-header, .about-text, .skill-category, .stat-item, .project-card, .timeline-item, .contact-info, .contact-form');
    elements.forEach(el=>{
        el.style.opacity="0";el.style.transform="translateY(30px)";
        el.style.transition="opacity .6s, transform .6s";observer.observe(el);
    });
}

// Particles
function initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;
    function createParticle() {
        const p=document.createElement('div');
        p.style.cssText=`position:absolute;width:4px;height:4px;background:rgba(255,255,255,0.6);border-radius:50%;animation:floatUp 15s linear infinite;`;
        p.style.left=Math.random()*100+"%";
        p.style.animationDelay=Math.random()*15+"s";
        return p;
    }
    for(let i=0;i<50;i++) container.appendChild(createParticle());
    if(!document.querySelector('#particle-style')){
        const s=document.createElement('style');s.id='particle-style';
        s.textContent=`@keyframes floatUp{0%{transform:translateY(100vh) scale(0);opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{transform:translateY(-100px) scale(1);opacity:0;}}`;
        document.head.appendChild(s);
    }
}

// Smooth Scroll for anchors
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    }
});

// Preload images
function preloadImages() {
    ['images/profile.jpeg'].forEach(src=>{const img=new Image();img.src=src;});
}
preloadImages();

// On load animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.querySelectorAll('.hero-title, .hero-subtitle').forEach((el,i)=>{
        setTimeout(()=>{el.style.opacity='1';el.style.transform='translateY(0)';}, i*200);
    });
});

// Error handling
window.addEventListener('error', e => {
    if (e.target.tagName === 'IMG') console.warn('Image failed to load:', e.target.src);
});

// Export API
window.PortfolioAPI = {
    showNotification,
    updateProjects: initProjects,
    scrollToSection: id => document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
};
