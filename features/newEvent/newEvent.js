export function createNewEventContainer() {
    const container = document.createElement('div');
    container.className = 'new-event-container';

    // Title
    const title = document.createElement('h2');
    title.textContent = 'Create New Event';
    container.appendChild(title);

    // Form element
    const form = document.createElement('form');
    form.addEventListener('submit', (e) => e.preventDefault());
    container.appendChild(form);

    // Error message container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message hidden';
    form.appendChild(errorContainer);

    // Invite Field (Tag Input)
    const inviteLabel = document.createElement('label');
    inviteLabel.textContent = 'Invite Participants';
    inviteLabel.htmlFor = 'inviteInput';
    form.appendChild(inviteLabel);

    const inviteContainer = document.createElement('div');
    inviteContainer.className = 'tag-input-container';
    
    const inviteInput = document.createElement('input');
    inviteInput.type = 'text';
    inviteInput.id = 'inviteInput';
    inviteInput.placeholder = 'Enter emails separated by space or comma';
    
    const inviteTagsContainer = document.createElement('div');
    inviteTagsContainer.className = 'tags-container';
    
    inviteContainer.append(inviteTagsContainer, inviteInput);
    form.appendChild(inviteContainer);

    // Event Link
    const linkLabel = document.createElement('label');
    linkLabel.textContent = 'Event Link';
    linkLabel.htmlFor = 'eventLink';
    form.appendChild(linkLabel);
    
    const eventLink = document.createElement('input');
    eventLink.type = 'url';
    eventLink.id = 'eventLink';
    eventLink.required = true;
    eventLink.placeholder = 'https://';
    form.appendChild(eventLink);

    // Event Duration
    const durationContainer = document.createElement('div');
    durationContainer.className = 'duration-container';
    
    const startLabel = document.createElement('label');
    startLabel.textContent = 'Start Time';
    startLabel.htmlFor = 'startTime';
    
    const startTime = document.createElement('input');
    startTime.type = 'datetime-local';
    startTime.id = 'startTime';
    startTime.required = true;
    
    const durationLabel = document.createElement('label');
    durationLabel.textContent = 'Duration (minutes)';
    durationLabel.htmlFor = 'eventDuration';
    
    const eventDuration = document.createElement('input');
    eventDuration.type = 'number';
    eventDuration.id = 'eventDuration';
    eventDuration.min = '15';
    eventDuration.value = '60';
    eventDuration.required = true;
    
    durationContainer.append(startLabel, startTime, durationLabel, eventDuration);
    form.appendChild(durationContainer);

    // Topic (Skills Tags)
    const topicLabel = document.createElement('label');
    topicLabel.textContent = 'Topics/Skills';
    topicLabel.htmlFor = 'topicInput';
    form.appendChild(topicLabel);

    const topicContainer = document.createElement('div');
    topicContainer.className = 'tag-input-container';
    
    const topicInput = document.createElement('input');
    topicInput.type = 'text';
    topicInput.id = 'topicInput';
    topicInput.placeholder = 'Enter topics separated by space or comma';
    
    const topicTagsContainer = document.createElement('div');
    topicTagsContainer.className = 'tags-container';
    
    topicContainer.append(topicTagsContainer, topicInput);
    form.appendChild(topicContainer);

    // Description
    const descLabel = document.createElement('label');
    descLabel.textContent = 'Event Description';
    descLabel.htmlFor = 'eventDescription';
    form.appendChild(descLabel);
    
    const eventDescription = document.createElement('textarea');
    eventDescription.id = 'eventDescription';
    eventDescription.rows = '5';
    eventDescription.required = true;
    eventDescription.placeholder = 'Describe your event...';
    form.appendChild(eventDescription);

    // Submit Button
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-submit';
    submitBtn.textContent = 'Create Event';
    submitBtn.type = 'submit';
    form.appendChild(submitBtn);

    // Setup tag input functionality
    setupTagInput(inviteInput, inviteTagsContainer);
    setupTagInput(topicInput, topicTagsContainer);

    // Form validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(inviteTagsContainer, topicTagsContainer, errorContainer)) {
            // Form is valid - proceed with submission
            console.log('Form submitted successfully');
            // Add your form submission logic here
            console.log(startTime.value)
        }
    });

    return container;
}

function validateForm(inviteTagsContainer, topicTagsContainer, errorContainer) {
    let isValid = true;
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');

    // Validate invite tags
    if (inviteTagsContainer.children.length === 0) {
        showError(errorContainer, 'Please add at least one participant');
        isValid = false;
    }

    // Validate topic tags
    if (topicTagsContainer.children.length === 0) {
        showError(errorContainer, 'Please add at least one topic/skill');
        isValid = false;
    }

    // Validate URL
    const urlInput = document.getElementById('eventLink');
    if (!urlInput.checkValidity()) {
        showError(errorContainer, 'Please enter a valid URL');
        isValid = false;
    }

    // Validate start time
    const startTime = document.getElementById('startTime');
    if (!startTime.value) {
        showError(errorContainer, 'Please select a start time');
        isValid = false;
    }

    // Validate duration
    const duration = document.getElementById('eventDuration');
    if (!duration.value || parseInt(duration.value) < 15) {
        showError(errorContainer, 'Duration must be at least 15 minutes');
        isValid = false;
    }

    // Validate description
    const description = document.getElementById('eventDescription');
    if (!description.value.trim()) {
        showError(errorContainer, 'Please enter a description');
        isValid = false;
    }

    return isValid;
}

function showError(container, message) {
    container.textContent = message;
    container.classList.remove('hidden');
}

function setupTagInput(inputElement, tagsContainer) {
    inputElement.addEventListener('keydown', (e) => {
        if (['Enter', ' ', ','].includes(e.key)) {
            e.preventDefault();
            const value = inputElement.value.trim();
            if (value) {
                createTag(value, tagsContainer);
                inputElement.value = '';
            }
        }
    });

    inputElement.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        const tags = pasteData.split(/[\s,]+/).filter(tag => tag.trim());
        tags.forEach(tag => createTag(tag, tagsContainer));
    });
}

function createTag(value, container) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    
    const tagText = document.createElement('span');
    tagText.textContent = value;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'tag-remove';
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', () => tag.remove());
    
    tag.append(tagText, removeBtn);
    container.appendChild(tag);
}