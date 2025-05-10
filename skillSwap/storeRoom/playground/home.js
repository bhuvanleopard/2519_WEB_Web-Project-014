document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navBarContainer = document.getElementById('navBarContainer');

    mobileMenuToggle.addEventListener('click', function() {
        navBarContainer.classList.toggle('active');
    });

    // Navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                navBarContainer.classList.remove('active');
            }
        });
    });

    // Load featured events
    const featuredEventsGrid = document.getElementById('featuredEventsGrid');
    
    const featuredEvents = [
        {
            id: 1,
            title: "Summer Music Festival",
            date: "June 15, 2023",
            location: "Central Park, New York",
            image: "assets/event1.jpg"
        },
        {
            id: 2,
            title: "Tech Conference 2023",
            date: "July 22, 2023",
            location: "Convention Center, San Francisco",
            image: "assets/event2.jpg"
        },
        {
            id: 3,
            title: "Food & Wine Expo",
            date: "August 5, 2023",
            location: "Downtown, Chicago",
            image: "assets/event3.jpg"
        },
        {
            id: 4,
            title: "Yoga Retreat Weekend",
            date: "September 10, 2023",
            location: "Mountain Resort, Colorado",
            image: "assets/event4.jpg"
        }
    ];

    function loadFeaturedEvents() {
        featuredEventsGrid.innerHTML = '';
        
        featuredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-info">
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-date"><i class="far fa-calendar-alt"></i> ${event.date}</p>
                    <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                </div>
            `;
            featuredEventsGrid.appendChild(eventCard);
        });
    }

    // Initialize
    loadFeaturedEvents();

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navBarContainer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navBarContainer.classList.remove('active');
        }
    });
});