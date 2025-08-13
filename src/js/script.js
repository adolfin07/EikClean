document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        sidebar.setAttribute('aria-hidden', 'false');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100', 'pointer-events-auto');
        btn.setAttribute('aria-expanded', 'true');
        openIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        sidebar.setAttribute('aria-hidden', 'true');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        overlay.classList.remove('opacity-100', 'pointer-events-auto');
        btn.setAttribute('aria-expanded', 'false');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }

    btn.addEventListener('click', () => {
        const isOpen = !sidebar.classList.contains('-translate-x-full');
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    overlay.addEventListener('click', () => {
        closeSidebar();
    });

    sidebar.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, '', `#${targetId}`);
                closeSidebar();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeSidebar();
        }
    });

    // Observer para #info (texto e imagen)
    const infoObserverOptions = { threshold: 0.3 };
    const infoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'info-text') {
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                }
                if (entry.target.id === 'info-img') {
                    entry.target.classList.remove('opacity-0', 'scale-90');
                    entry.target.classList.add('opacity-100', 'scale-100');
                }
                observer.unobserve(entry.target);
            }
        });
    }, infoObserverOptions);

    ['info-text', 'info-img'].forEach(id => {
        const el = document.getElementById(id);
        if (el) infoObserver.observe(el);
    });

    // Observer para #servicios (textos, cards, cta, testimonial)
    const serviciosObserverOptions = { threshold: 0.2 };
    const serviciosObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-10");
                entry.target.classList.add("opacity-100", "translate-y-0");
                observer.unobserve(entry.target);
            }
        });
    }, serviciosObserverOptions);

    const serviciosTargets = [
        document.getElementById("servicios-title"),
        document.getElementById("servicios-intro"),
        ...document.querySelectorAll(".service-card"),
        document.getElementById("servicios-cta"),
        document.getElementById("servicios-testimonial"),
    ];

    serviciosTargets.forEach(el => {
        if (el) serviciosObserver.observe(el);
    });

    const observerOptions = {
        threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-10");
                entry.target.classList.add("opacity-100", "translate-y-0");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targets = [
        document.getElementById("contacto-title"),
        document.getElementById("contacto-desc"),
        document.getElementById("contacto-social"),
        document.getElementById("contacto-medios"),
    ];

    targets.forEach((el) => {
        if (el) observer.observe(el);
    });
});
