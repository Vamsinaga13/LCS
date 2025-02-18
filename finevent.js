document.addEventListener('DOMContentLoaded', function() {
    const eventList = document.getElementById('eventList');
    const pastEventList = document.getElementById('pastEventList');
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const currentTime = new Date(); // Get current time

    if (events.length === 0) {
        eventList.innerHTML = '<p>No events found. Create an event to see it here!</p>';
    } else {
        events.forEach(event => {
            const eventDate = new Date(`${event.date} ${event.time}`); // Assuming event.date and event.time are in the format "YYYY-MM-DD HH:mm"
            let eventStatus = '';
            let eventCard = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                        <p><strong>Date:</strong> ${event.date} | <strong>Time:</strong> ${event.time}</p>
                        <p><strong>Type:</strong> ${event.type}</p>
                        ${event.type === 'physical' ? `<p><strong>Venue:</strong> ${event.venue}</p><p><strong>Address:</strong> ${event.address}</p>` : ''}
                        ${event.type === 'virtual' ? `<p><strong>Link:</strong> <a href="${event.link}" target="_blank">${event.link}</a></p>` : ''}
                        <p><strong>Tickets:</strong> ${event.ticketType} ${event.ticketPrice !== 'Free' ? `- $${event.ticketPrice}` : ''}</p>
            `;

            // Check event time
            if (eventDate > currentTime) {
                eventStatus = 'Upcoming'; // Event is in the future
            } else if (eventDate <= currentTime && currentTime <= new Date(eventDate.getTime() + 60 * 60 * 1000)) { // Event is ongoing within an hour
                eventStatus = 'STARTED';
                eventCard += `<p class="status"><strong>Status:</strong> STARTED</p>`;
            } else {
                eventStatus = 'Past'; // Event has ended
                eventCard += `<p class="status"><strong>Status:</strong> Completed</p>`;
            }

            // Add the event to either active or past events
            eventCard += `</div></div>`;

            if (eventStatus === 'STARTED') {
                eventList.innerHTML += eventCard; // Show active events
            } else if (eventStatus === 'Past') {
                pastEventList.innerHTML += eventCard; // Move completed events to the past section
            }
        });
    }
});
