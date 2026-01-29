document.addEventListener('DOMContentLoaded', () => {



    // Generic Fade/Slide Animations (for sub-pages like details)
    if (document.querySelector('.animate-fade-in')) {
        gsap.from('.animate-fade-in', { opacity: 0, scale: 0.95, duration: 1.2, delay: 0.2, ease: 'power3.out' });
    }
    if (document.querySelector('.animate-slide-right')) {
        gsap.from('.animate-slide-right', { x: 50, opacity: 0, duration: 1.2, delay: 0.4, ease: 'power2.out' });
    }

    // Hero Animations (Home & Inner Pages)
    if (document.querySelector('.main-hero, .inner-hero')) {
        const heroClass = document.querySelector('.inner-hero') ? '.inner-hero' : '.main-hero';
        const mainTl = gsap.timeline({ delay: 0.2 });
        mainTl.from(`${heroClass} .hero-bg-img`, { scale: 1.3, duration: 2.5, ease: 'power2.out' })
            .from(`${heroClass} .hero-badge`, { y: 40, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1.8')
            .from(`${heroClass} .breadcrumb-custom`, { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=1.6')
            .from(`${heroClass} .hero-title`, { y: 60, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=1.5')
            .from(`${heroClass} .hero-subtitle`, { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1.2')
            .from(`${heroClass} .hero-cta`, { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
            .from('.f-stat-item', { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=1.0')
            .from('.scroll-indicator-down', { opacity: 0, duration: 1.5 }, '-=0.5');

        gsap.to(`${heroClass} .hero-bg-img`, {
            y: '20%',
            scrollTrigger: {
                trigger: heroClass,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    const initScrollAnimations = () => {
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: { trigger: title, start: 'top 90%', toggleActions: 'play none none none' },
                y: 40, opacity: 0, duration: 1, ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.car-grid').forEach(grid => {
            const cards = grid.querySelectorAll('.car-card');
            gsap.from(cards, {
                scrollTrigger: { trigger: grid, start: 'top 90%' },
                y: 60, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                clearProps: 'all'
            });
        });

        const aboutStats = document.querySelector('.stat-group-elegant');
        if (aboutStats) {
            gsap.from('.stat-item-elegant', {
                scrollTrigger: { trigger: aboutStats, start: 'top 90%' },
                y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
            });
        }

        // Bento Testimonials reveal
        gsap.from('.testimonials-bento .bento-item', {
            scrollTrigger: { trigger: '.testimonials-bento', start: 'top 85%' },
            scale: 0.9, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
            clearProps: 'all'
        });

        // Bento Features reveal
        const featuresBento = document.querySelector('.features-bento');
        if (featuresBento) {
            gsap.from('.features-bento .bento-item', {
                scrollTrigger: { trigger: featuresBento, start: 'top 85%' },
                y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out',
                clearProps: 'all'
            });
        }

        // About Page: Story Image Reveal
        if (document.querySelector('.story-image-reveal')) {
            gsap.from('.story-image-reveal', {
                scrollTrigger: { trigger: '.story-image-reveal', start: 'top 80%' },
                x: -100, opacity: 0, scale: 0.9, duration: 1.5, ease: 'power4.out'
            });
        }

        // Philosophy Cards Reveal
        if (document.querySelector('.philosophies-grid')) {
            gsap.from('.philosophy-card', {
                scrollTrigger: { trigger: '.philosophies-grid', start: 'top 85%' },
                y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
                clearProps: 'all'
            });
        }

        // Showroom Parallax
        if (document.querySelector('.showroom-section')) {
            gsap.to('.showroom-bg', {
                y: '20%',
                scrollTrigger: {
                    trigger: '.showroom-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        ScrollTrigger.refresh();

    };

    // Initialize Animations
    const initApp = () => {
        document.body.classList.remove('loading');

        initScrollAnimations();
    };

    window.addEventListener('load', initApp);
    if (document.readyState === 'complete') initApp();

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);



    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav-overlay');
    const navClose = document.getElementById('mobile-nav-close');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose && mobileNav) {
        navClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile nav on link click
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Inquire Booking Alert
    const inquireBtn = document.querySelector('.btn-primary.w-100');
    if (inquireBtn) {
        inquireBtn.addEventListener('click', (e) => {
            if (inquireBtn.tagName === 'A' && inquireBtn.getAttribute('href') === 'contact.html') return;
            e.preventDefault();
            const carName = document.getElementById('car-name')?.innerText || 'this car';
            alert(`Thank you for your interest in ${carName}! Your concierge will contact you shortly to finalize your VIP booking.`);
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! Our concierge team will get back to you within 24 hours.');
            contactForm.reset();
        });
    }

    // Car Search & Filter Logic
    const searchInput = document.getElementById('carSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carItems = document.querySelectorAll('.car-item');
    const carGrid = document.querySelector('.car-grid');

    const filterCars = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        let visibleCount = 0;

        carItems.forEach(item => {
            const carTitle = item.querySelector('h3').innerText.toLowerCase();
            const carCategory = item.getAttribute('data-category');

            const matchesSearch = carTitle.includes(searchTerm);
            const matchesCategory = activeFilter === 'all' || carCategory === activeFilter;

            if (matchesSearch && matchesCategory) {
                if (item.classList.contains('hide')) {
                    item.classList.remove('hide');
                    gsap.fromTo(item,
                        { opacity: 0, scale: 0.9, y: 20 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
                    );
                }
                visibleCount++;
            } else {
                item.classList.add('hide');
            }
        });

        // Handle empty results
        let emptyMsg = document.getElementById('no-results-msg');
        if (visibleCount === 0) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.id = 'no-results-msg';
                emptyMsg.className = 'col-12 text-center py-5 animate-fade-in';
                emptyMsg.innerHTML = `
                    <i class="ri-search-eye-line" style="font-size: 3rem; color: var(--primary); opacity: 0.5;"></i>
                    <h3 class="mt-3">No vehicles found</h3>
                    <p class="text-muted">Try adjusting your search or category filters.</p>
                `;
                carGrid.appendChild(emptyMsg);
            }
        } else if (emptyMsg) {
            emptyMsg.remove();
        }

        ScrollTrigger.refresh();
    };

    if (searchInput) {
        searchInput.addEventListener('input', filterCars);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const indicator = document.querySelector('.filter-indicator');
            if (indicator) {
                indicator.style.width = `${btn.offsetWidth}px`;
                indicator.style.left = `${btn.offsetLeft}px`;
            }

            filterCars();
        });
    });

    // Handle window resize for indicator
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.filter-btn.active');
        if (currentActive) updateFilterIndicator(currentActive);
    });

    // --- Car Details Population ---
    // (Moved to details.html for specific page optimization)
});
