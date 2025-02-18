// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('eventForm');
    const eventType = document.getElementsByName('eventType');
    const ticketType = document.getElementsByName('ticketType');
    const physicalLocation = document.getElementById('physicalLocation');
    const virtualLocation = document.getElementById('virtualLocation');
    const paidTicketOptions = document.getElementById('paidTicketOptions');

    // Location type toggle
    eventType.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'physical') {
                physicalLocation.style.display = 'block';
                virtualLocation.style.display = 'none';
            } else {
                physicalLocation.style.display = 'none';
                virtualLocation.style.display = 'block';
            }
        });
    });

    // Ticket type toggle
    ticketType.forEach(radio => {
        radio.addEventListener('change', function() {
            paidTicketOptions.style.display = this.value === 'paid' ? 'block' : 'none';
        });
    });

    // Form validation
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            // Show success message
            showSuccessMessage();
        }
        form.classList.add('was-validated');
    });

    // Success message function
    function showSuccessMessage() {
        const formContent = form.innerHTML;
        form.innerHTML = `
            <div class="text-center">
                <div class="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4e54c8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 class="mb-4">Event Created Successfully!</h3>
                <p class="text-muted mb-4">Your event has been created and is now live. You can manage it from your dashboard.</p>
                <button type="button" class="btn btn-primary" onclick="location.reload()">Create Another Event</button>
            </div>
        `;
    }

    // Date validation
    const startDate = document.getElementById('startDate');
    startDate.min = new Date().toISOString().split('T')[0];
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.feature-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});