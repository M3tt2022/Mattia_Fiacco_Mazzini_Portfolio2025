document.addEventListener('DOMContentLoaded', function() {
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
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
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
