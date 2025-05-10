

export function createProfileContainer(fullName, username, skills,contacts) {


    // homePageContainer.innerHTML = '';

    // Create main container
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile-container';
    
    // Create header section
    const header = document.createElement('div');
    header.className = 'profile-header';
    
    // Profile image
    const profileImage = document.createElement('img');
    profileImage.className = 'profile-image';
    // profileImage.src = '';
    profileImage.alt = 'Profile';
    
    // Profile info
    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';
    
    const profileName = document.createElement('h3');
    profileName.className = 'profile-name';
    profileName.textContent = fullName;
    
    const profileUsername = document.createElement('p');
    profileUsername.className = 'profile-username';
    profileUsername.textContent = `@${username}`;
    
    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'profile-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-edit';
    editBtn.textContent = 'Edit Profile';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-save hidden';
    saveBtn.textContent = 'Save Profile';
    
    // Assemble header
    profileInfo.append(profileName, profileUsername);
    actions.append(editBtn, saveBtn);
    header.append(profileImage, profileInfo, actions);
    
    // Create details section
    const details = document.createElement('div');
    details.className = 'profile-details';
    
    // Skills section
    const skillsSection = document.createElement('div');
    skillsSection.className = 'profile-skills';
    
    const skillsTitle = document.createElement('h4');
    skillsTitle.className = 'section-title';
    skillsTitle.textContent = 'Skills';
    
    const skillsList = document.createElement('ul');
    skillsList.className = 'skills-list';
    
    // Add sample skills

    function addskills (skillsArr){

        skillsList.innerHTML="";

        skillsArr.forEach((skill,idx) => {
            const skillItem = document.createElement('li');
            skillItem.className = 'skill-item';
            
            const skillSpan = document.createElement('span');
            skillSpan.textContent = skill;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete-skill hidden';
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

            skillItem.append(skillSpan, deleteBtn);
            skillsList.append(skillItem);


            deleteBtn.addEventListener("click",(e)=>{
                e.stopPropagation()

                skills.splice(idx,1)
                skillsList.removeChild(skillItem)

            })
        });

        return;
    }

    addskills(skills)


    // ['JavaScript', 'HTML', 'CSS'].forEach(skill => {
    //     const skillItem = document.createElement('li');
    //     skillItem.className = 'skill-item';
        
    //     const skillSpan = document.createElement('span');
    //     skillSpan.textContent = skill;
        
    //     const deleteBtn = document.createElement('button');
    //     deleteBtn.className = 'btn-delete-skill hidden';
    //     deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        
    //     skillItem.append(skillSpan, deleteBtn);
    //     skillsList.append(skillItem);
    // });
    
    // Add skill controls
    const addSkillContainer = document.createElement('div');
    addSkillContainer.className = 'add-skill-container';
    
    const addSkillInput = document.createElement('input');
    addSkillInput.className = 'add-skill-input hidden';
    addSkillInput.type = 'text';
    addSkillInput.placeholder = 'Add new skill';
    
    const addSkillBtn = document.createElement('button');
    addSkillBtn.className = 'btn btn-add-skill hidden';
    addSkillBtn.textContent = 'Add Skill';
    
    addSkillBtn.addEventListener("click",()=>{

        let newSkill = addSkillInput.value;
        newSkill = newSkill.trim();
        skills.push(newSkill)
        let skill = newSkill;
        let idx = skills.length-1;
        const skillItem = document.createElement('li');
        skillItem.className = 'skill-item';
        
        const skillSpan = document.createElement('span');
        skillSpan.textContent = skill;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete-skill hidden';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

        skillItem.append(skillSpan, deleteBtn);
        skillsList.append(skillItem);


        deleteBtn.addEventListener("click",(e)=>{
            e.stopPropagation()

            skills.splice(idx,1)
            skillsList.removeChild(skillItem)

        })

        addSkillInput.value = "";
    })

    addSkillContainer.append(addSkillInput, addSkillBtn);
    
    // Assemble skills section
    skillsSection.append(skillsTitle, skillsList, addSkillContainer);
    
    // Contact section
    const contactSection = document.createElement('div');
    contactSection.className = 'profile-contact';
    
    const contactTitle = document.createElement('h4');
    contactTitle.className = 'section-title';
    contactTitle.textContent = 'Contact Info';
    
    const contactList = document.createElement('ul');
    contactList.className = 'contact-list';
    
    // Add contact items
    [
        { icon: 'fas fa-envelope', text: contacts.email, id: "userEmail" },
        { icon: 'fas fa-globe', text: contacts.portfolio, id: "userPortfolio" },
        { icon: 'fab fa-linkedin', text: contacts.linkedIn, id: "userLinkedIn" }
    ].forEach(contact => {
        const contactItem = document.createElement('li');
        contactItem.className = 'contact-item';
        
        const icon = document.createElement('i');
        icon.className = contact.icon;
        
        
        const textInput = document.createElement('input');
        textInput.setAttribute("id", contact.id)
        textInput.type = 'text';
        textInput.className = 'hidden';
        textInput.value = contact.text;

        const textSpan = document.createElement('span');
        textSpan.setAttribute("id", contact.id+"Span")
        textSpan.textContent = contact.text;
        

        contactItem.append(icon, textSpan, textInput);
        contactList.append(contactItem);
    });
    
    // Assemble contact section
    contactSection.append(contactTitle, contactList);
    
    // Assemble details section
    details.append(skillsSection, contactSection);
    
    // Final assembly
    profileContainer.append(header, details);
    

        // Add logout button at the end
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn btn-logout';
        logoutBtn.textContent = 'Log Out';
        profileContainer.append(logoutBtn);
    
        // Create confirmation modal (hidden by default)
        const modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'modal-backdrop hidden';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const modalText = document.createElement('p');
        modalText.textContent = 'Are you sure you want to log out?';
        
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'btn btn-confirm';
        confirmBtn.textContent = 'Yes, Log Out';
        confirmBtn.addEventListener("click",async()=>{

            let {logOutUser} = await import("../../features/auth/auth.js")
            logOutUser()
            .then(()=>{
                window.location.href = "./index.html"
            })
        })
        
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn-cancel';
        cancelBtn.textContent = 'Cancel';
        
        const modalActions = document.createElement('div');
        modalActions.className = 'modal-actions';
        modalActions.append(confirmBtn, cancelBtn);
        
        modalContent.append(modalText, modalActions);
        modalBackdrop.append(modalContent);
        document.body.append(modalBackdrop);
    
        // Event listeners
        logoutBtn.addEventListener('click', () => {
            modalBackdrop.classList.remove('hidden');
        });
    
        cancelBtn.addEventListener('click', () => {
            modalBackdrop.classList.add('hidden');
        });
    
        confirmBtn.addEventListener('click', () => {
            // Add your logout logic here
            console.log('User logged out');
            modalBackdrop.classList.add('hidden');

        });
    
        // // Setup event listeners for edit/save
        // const editBtn = profileContainer.querySelector('.btn-edit');
        // const saveBtn = profileContainer.querySelector('.btn-save');

        saveBtn.addEventListener('click', () =>{
            
            [contacts.email, contacts.portfolio, contacts.linkedIn] = [document.getElementById("userEmail").value, document.getElementById("userPortfolio").value, document.getElementById("userLinkedIn").value]
            console.log(contacts)
            // [document.getElementById("userEmailSpan").innerText,document.getElementById("userPortfolioSpan").innerText,document.getElementById("userLinkedInSpan").innerText] = [document.getElementById("userEmail").value, document.getElementById("userPortfolio").value, document.getElementById("userLinkedIn").value]
            
            toggleEditMode(profileContainer, false);


            // homePageContainer.innerHTML=""
            createProfileContainer(fullName, username, skills,contacts)

        });
        // saveBtn.addEventListener('click', () => toggleEditMode(profileContainer, false));
    
    

    // Setup event listeners
    editBtn.addEventListener('click', () => toggleEditMode(profileContainer, true));
    // saveBtn.addEventListener('click', () => toggleEditMode(profileContainer, false));
    
    // saveBtn.addEventListener('click', () => createProfileContainer(fullName, username, skills,contacts));
    
    return profileContainer;
}

function toggleEditMode(container, editMode) {
    // Toggle buttons
    container.querySelector('.btn-edit').classList.toggle('hidden', editMode);
    container.querySelector('.btn-save').classList.toggle('hidden', !editMode);
    
    // Toggle skill delete buttons
    container.querySelectorAll('.btn-delete-skill').forEach(btn => {
        btn.classList.toggle('hidden', !editMode);
    });
    
    // Toggle skill add controls
    container.querySelector('.add-skill-input').classList.toggle('hidden', !editMode);
    container.querySelector('.btn-add-skill').classList.toggle('hidden', !editMode);
    
    // Toggle contact info edit
    container.querySelectorAll('.contact-item').forEach(item => {
        const span = item.querySelector('span');
        const input = item.querySelector('input');
        
        span.classList.toggle('hidden', editMode);
        input.classList.toggle('hidden', !editMode);
    });
}