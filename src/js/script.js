document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        sidebar.setAttribute('aria-hidden', 'false');
        if (overlay) {
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'pointer-events-auto');
        }
        btn.setAttribute('aria-expanded', 'true');
        openIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        sidebar.setAttribute('aria-hidden', 'true');
        if (overlay) {
            overlay.classList.add('opacity-0', 'pointer-events-none');
            overlay.classList.remove('opacity-100', 'pointer-events-auto');
        }
        btn.setAttribute('aria-expanded', 'false');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }

    // Toggle sidebar
    btn.addEventListener('click', () => {
        const isOpen = !sidebar.classList.contains('-translate-x-full');
        isOpen ? closeSidebar() : openSidebar();
    });

    // Cierra al hacer clic fuera (si hay overlay)
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Cierra menú al hacer clic en un enlace y hace scroll
    sidebar.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, '', `#${targetId}`);
            }

            closeSidebar();
        });
    });

    // Cierra si se redimensiona a escritorio
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeSidebar();
    });

    // Animaciones con IntersectionObserver
    const animateOnScroll = (targets, options, animations) => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animations(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, options);
        targets.forEach(el => el && observer.observe(el));
    };

    // Info section
    animateOnScroll(
        ['info-text', 'info-img'].map(id => document.getElementById(id)),
        { threshold: 0.3 },
        el => {
            if (el.id === 'info-text') {
                el.classList.remove('opacity-0', 'translate-y-10');
                el.classList.add('opacity-100', 'translate-y-0');
            }
            if (el.id === 'info-img') {
                el.classList.remove('opacity-0', 'scale-90');
                el.classList.add('opacity-100', 'scale-100');
            }
        }
    );

    // Servicios section
    animateOnScroll(
        [
            document.getElementById("servicios-title"),
            document.getElementById("servicios-intro"),
            ...document.querySelectorAll(".service-card"),
            document.getElementById("servicios-cta"),
            document.getElementById("servicios-testimonial"),
        ],
        { threshold: 0.2 },
        el => {
            el.classList.remove("opacity-0", "translate-y-10");
            el.classList.add("opacity-100", "translate-y-0");
        }
    );

    // Contacto section
    animateOnScroll(
        [
            document.getElementById("contacto-title"),
            document.getElementById("contacto-desc"),
            document.getElementById("contacto-social"),
            document.getElementById("contacto-medios"),
        ],
        { threshold: 0.2 },
        el => {
            el.classList.remove("opacity-0", "translate-y-10");
            el.classList.add("opacity-100", "translate-y-0");
        }
    );
});
