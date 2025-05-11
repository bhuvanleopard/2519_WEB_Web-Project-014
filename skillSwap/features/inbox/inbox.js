export function createInboxContainer() {
    const container = document.createElement('div');
    container.className = 'inbox-container';

    // Header
    const header = document.createElement('div');
    header.className = 'inbox-header';
    
    const title = document.createElement('h2');
    title.textContent = 'Your Event Invitations';
    header.appendChild(title);
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'inbox-filters';
    
    const upcomingFilter = document.createElement('button');
    upcomingFilter.className = 'btn btn-filter active';
    upcomingFilter.textContent = 'Upcoming';
    
    const pastFilter = document.createElement('button');
    pastFilter.className = 'btn btn-filter';
    pastFilter.textContent = 'Past';
    
    filterContainer.append(upcomingFilter, pastFilter);
    header.append(title, filterContainer);
    container.appendChild(header);

    // Events List
    const eventsList = document.createElement('div');
    eventsList.className = 'events-list';
    container.appendChild(eventsList);

    // Sample events data (in a real app, this would come from an API)
    const sampleEvents = [
        {
            id: 1,
            title: "Team Meeting",
            organizer: "John Doe",
            date: "2023-12-15T14:00:00",
            duration: 60,
            description: "Quarterly team planning session",
            status: "upcoming"
        },
        {
            id: 2,
            title: "Product Launch",
            organizer: "Jane Smith",
            date: "2023-12-20T10:30:00",
            duration: 90,
            description: "Launch of our new product line",
            status: "upcoming"
        },
        {
            id: 3,
            title: "Project Retrospective",
            organizer: "Mike Johnson",
            date: "2023-11-30T09:00:00",
            duration: 120,
            description: "Review of completed project",
            status: "past"
        }
    ];

    // Render events
    renderEvents(eventsList, sampleEvents);

    // Filter functionality
    upcomingFilter.addEventListener('click', () => {
        upcomingFilter.classList.add('active');
        pastFilter.classList.remove('active');
        renderEvents(eventsList, sampleEvents.filter(event => event.status === 'upcoming'));
    });

    pastFilter.addEventListener('click', () => {
        pastFilter.classList.add('active');
        upcomingFilter.classList.remove('active');
        renderEvents(eventsList, sampleEvents.filter(event => event.status === 'past'));
    });

    return container;
}

function renderEvents(container, events) {
    container.innerHTML = '';
    
    if (events.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No events found';
        container.appendChild(emptyMessage);
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        const eventHeader = document.createElement('div');
        eventHeader.className = 'event-header';
        
        const eventTitle = document.createElement('h3');
        eventTitle.className = 'event-title';
        eventTitle.textContent = event.title;
        
        const eventOrganizer = document.createElement('p');
        eventOrganizer.className = 'event-organizer';
        eventOrganizer.textContent = `Organizer: ${event.organizer}`;
        
        const eventTime = document.createElement('p');
        eventTime.className = 'event-time';
        eventTime.textContent = formatEventTime(event.date, event.duration);
        
        const eventDescription = document.createElement('p');
        eventDescription.className = 'event-description';
        eventDescription.textContent = event.description;
        
        const eventActions = document.createElement('div');
        eventActions.className = 'event-actions';
        
        if (event.status === 'upcoming') {
            const acceptBtn = document.createElement('button');
            acceptBtn.className = 'btn btn-accept';
            acceptBtn.textContent = 'Accept';
            
            const declineBtn = document.createElement('button');
            declineBtn.className = 'btn btn-decline';
            declineBtn.textContent = 'Decline';
            
            eventActions.append(acceptBtn, declineBtn);
        }
        
        eventHeader.append(eventTitle, eventOrganizer);
        eventCard.append(eventHeader, eventTime, eventDescription, eventActions);
        container.appendChild(eventCard);
    });
}

function formatEventTime(dateString, duration) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return `${date.toLocaleDateString('en-US', options)} • ${duration} minutes`;
}