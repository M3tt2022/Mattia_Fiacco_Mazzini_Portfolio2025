document.addEventListener('DOMContentLoaded', function() {
    // Animate only the name "Mattia" on page load with enhanced effect
    const animateName = () => {
        // Get the span containing "Mattia"
        const nameSpan = document.querySelector('.hero .bicolor-title span');
        
        if (nameSpan) {
            const name = nameSpan.textContent;
            nameSpan.textContent = ''; // Clear the original text
            
            // Create a span for each letter and add it to the DOM
            for (let i = 0; i < name.length; i++) {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'animated-letter';
                letterSpan.textContent = name[i];
                nameSpan.appendChild(letterSpan);
            }
            
            // Animate each letter with a delay
            const letters = nameSpan.querySelectorAll('.animated-letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('animate');
                }, 150 * index); // 150ms delay between each letter
            });
        }
    };
    
    // Animate hero section elements (except education info and button)
    const animateHero = () => {
        // Animate only the job title (h2)
        setTimeout(() => {
            const heroH2 = document.querySelector('.hero h2');
            if (heroH2) {
                heroH2.classList.add('fade-in-up');
                heroH2.classList.add('animate');
            }
            
            // Add floating animation to hero image
            setTimeout(() => {
                const heroImage = document.querySelector('.hero-image');
                if (heroImage) {
                    heroImage.classList.add('float');
                }
            }, 500);
        }, 1000); // Start after name animation has begun
    };
    
    // Animate project cards when they come into view
    const animateProjectCards = () => {
        const projectCards = document.querySelectorAll('.project-card');
        
        if (projectCards.length > 0) {
            projectCards.forEach((card, index) => {
                // Initially set opacity to 0
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                // Add a delay based on the card index
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 300 + (index * 150));
            });
        }
    };
    
    // Animate section titles when they come into view
    const animateSectionTitles = () => {
        const titles = document.querySelectorAll('section h2');
        
        titles.forEach(title => {
            // Check if the title is already in the viewport
            const rect = title.getBoundingClientRect();
            const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
            
            if (isInViewport) {
                title.classList.add('scale-in');
                title.classList.add('animate');
            } else {
                // Set up the intersection observer for titles not yet in view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('scale-in');
                            entry.target.classList.add('animate');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });
                
                observer.observe(title);
            }
        });
    };
    
    // Run all animations
    animateName();
    animateHero();
    animateProjectCards();
    animateSectionTitles();
    
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            // Toggle Nav
            nav.classList.toggle('active');
            
            // Toggle Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href="#' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-links a[href="#' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Enhanced reveal animations on scroll with IntersectionObserver
    function setupScrollAnimations() {
        // Elements to animate on scroll
        const aboutSection = document.querySelector('.about-preview');
        const aboutContent = document.querySelector('.about-content');
        const projectCards = document.querySelectorAll('.project-card');
        const footerSections = document.querySelectorAll('.footer-info, .footer-contact, .footer-credits');
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Different animations based on element type
                    if (entry.target.classList.contains('about-content')) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(30px)';
                        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                    } 
                    else if (entry.target.classList.contains('footer-info') || 
                             entry.target.classList.contains('footer-contact') ||
                             entry.target.classList.contains('footer-credits')) {
                        entry.target.classList.add('fade-in-up');
                        entry.target.classList.add('animate');
                    }
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe elements
        if (aboutContent) observer.observe(aboutContent);
        footerSections.forEach(section => observer.observe(section));
        
        // Add parallax effect to about section background
        if (aboutSection) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                const aboutSectionTop = aboutSection.offsetTop;
                const distance = scrollPosition - aboutSectionTop;
                
                if (distance > -window.innerHeight && distance < aboutSection.offsetHeight) {
                    // Move the pseudo-elements for parallax effect
                    const moveAmount = distance * 0.05;
                    aboutSection.style.setProperty('--parallax-offset', `${moveAmount}px`);
                }
            });
        }
    }
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Initialize any sliders or carousels if needed
    // This is a placeholder for future functionality
    
    // Project filtering functionality (for projects page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        // Add category counters to filter buttons
        filterButtons.forEach(button => {
            const filterValue = button.getAttribute('data-filter');
            let count = 0;
            
            if (filterValue === 'all') {
                count = projectItems.length;
            } else {
                projectItems.forEach(item => {
                    if (item.classList.contains(filterValue)) {
                        count++;
                    }
                });
            }
            
            // Add count badge to button
            const badge = document.createElement('span');
            badge.textContent = count;
            badge.style.marginLeft = '5px';
            badge.style.backgroundColor = 'var(--accent-color)';
            badge.style.color = 'var(--text-color)';
            badge.style.borderRadius = '50%';
            badge.style.padding = '2px 6px';
            badge.style.fontSize = '0.7rem';
            badge.style.fontWeight = 'bold';
            button.appendChild(badge);
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter with animation
                projectItems.forEach((item, index) => {
                    // Remove any existing animation classes
                    item.classList.remove('fade-in', 'fade-out');
                    
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        // First ensure it's visible
                        item.style.display = 'block';
                        
                        // Remove any existing animation end listeners
                        const newItem = item.cloneNode(true);
                        item.parentNode.replaceChild(newItem, item);
                        
                        // Add fade-in with delay based on index for staggered effect
                        setTimeout(() => {
                            newItem.classList.add('fade-in');
                        }, index * 100); // Staggered delay based on item index
                    } else {
                        // Add fade-out animation
                        item.classList.add('fade-out');
                        
                        // Listen for animation end to hide the element
                        item.addEventListener('animationend', function() {
                            if (item.classList.contains('fade-out')) {
                                item.style.display = 'none';
                            }
                        }, { once: true }); // Use once option to ensure it only fires once
                    }
                });
            });
        });
    }
});
