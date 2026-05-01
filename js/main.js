document.addEventListener('DOMContentLoaded', () => {
    console.log('Pierza Studio initialized');
    
    // Load saved preferences immediately (Global)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.dir = savedDir;

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                const isMenu = icon.getAttribute('data-lucide') === 'menu';
                icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
    }

    // Theme toggle logic (Supports buttons, switches, and dashboard toggles)
    const themeElements = document.querySelectorAll('.theme-toggle, #theme-toggle-mobile, #theme-toggle-check');
    
    if (themeElements.length > 0) {
        syncThemeUI(savedTheme);

        themeElements.forEach(el => {
            const eventType = el.type === 'checkbox' ? 'change' : 'click';
            el.addEventListener(eventType, () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                syncThemeUI(newTheme);
            });
        });
    }

    function syncThemeUI(theme) {
        themeElements.forEach(el => {
            if (el.tagName === 'INPUT' && el.type === 'checkbox') {
                el.checked = theme === 'dark';
            } else if (el.tagName !== 'INPUT') {
                const hasSpan = el.querySelector('span');
                el.innerHTML = `<i data-lucide="${theme === 'light' ? 'moon' : 'sun'}"></i> ${hasSpan ? '<span>Switch Theme</span>' : ''}`;
            }
        });
        if (window.lucide) lucide.createIcons();
    }

    // RTL toggle logic (Supports buttons, switches, and dashboard toggles)
    const rtlElements = document.querySelectorAll('.rtl-toggle, #rtl-toggle-mobile, #rtl-toggle-check');
    
    if (rtlElements.length > 0) {
        syncRtlUI(savedDir);
        
        rtlElements.forEach(el => {
            const eventType = el.tagName === 'INPUT' ? 'change' : 'click';
            el.addEventListener(eventType, () => {
                const isRtl = document.documentElement.dir === 'rtl';
                const newDir = isRtl ? 'ltr' : 'rtl';
                
                document.documentElement.dir = newDir;
                localStorage.setItem('dir', newDir);
                syncRtlUI(newDir);
            });
        });
    }

    function syncRtlUI(dir) {
        rtlElements.forEach(el => {
            if (el.tagName === 'INPUT' && el.type === 'checkbox') {
                el.checked = dir === 'rtl';
            } else if (el.tagName !== 'INPUT') {
                const hasSpan = el.querySelector('span');
                if (hasSpan) {
                    el.innerHTML = `<span>${dir === 'rtl' ? 'LTR View' : 'RTL View'}</span>`;
                } else {
                    el.innerText = dir === 'rtl' ? 'LTR' : 'RTL';
                }
            }
        });
    }

    // Intersection Observer for Reveal Animations
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => revealObserver.observe(el));

    // Global FAQ Toggle Logic
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const btn = card.querySelector('.faq-toggle-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                faqCards.forEach(otherCard => {
                    if (otherCard !== card) otherCard.classList.remove('active');
                });
                card.classList.toggle('active');
            });
        }
    });

    // Finalize Lucide
    lucide.createIcons();
});

