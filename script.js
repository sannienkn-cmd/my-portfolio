document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE NAVIGATION TOGGLE
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. PROJECT FILTERING (Only runs if on projects page)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'block';
                        // Add a small animation effect
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. CONTACT FORM VALIDATION (Only runs if form exists)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission
            
            let isValid = true;
            
            // Get values
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const statusMsg = document.getElementById('formStatus');
            
            // Reset errors
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            name.style.borderColor = '';
            email.style.borderColor = '';
            message.style.borderColor = '';
            statusMsg.textContent = '';
            statusMsg.className = 'form-status';

            // Validate Name
            if (name.value.trim() === '') {
                document.getElementById('nameError').style.display = 'block';
                name.style.borderColor = 'red';
                isValid = false;
            }

            // Validate Email (Regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                document.getElementById('emailError').style.display = 'block';
                email.style.borderColor = 'red';
                isValid = false;
            }

            // Validate Message
            if (message.value.trim() === '') {
                document.getElementById('messageError').style.display = 'block';
                message.style.borderColor = 'red';
                isValid = false;
            }

            // Success
            if (isValid) {
                statusMsg.textContent = 'Message sent successfully! (Demo only)';
                statusMsg.style.color = 'green';
                contactForm.reset();
            }
        });
    }
});