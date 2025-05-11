export function createSearchContainer() {
    const container = document.createElement('div');
    container.className = 'search-container';

    // Search Header
    const header = document.createElement('div');
    header.className = 'search-header';
    
    const title = document.createElement('h2');
    title.textContent = 'Search';
    header.appendChild(title);
    
    // Search Input
    const searchForm = document.createElement('div');
    searchForm.className = 'search-form';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for users or communities...';
    searchInput.className = 'search-input';
    
    const searchBtn = document.createElement('button');
    searchBtn.className = 'btn btn-search';
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    
    searchForm.append(searchInput, searchBtn);
    header.appendChild(searchForm);
    container.appendChild(header);

    // Search Tabs
    const tabs = document.createElement('div');
    tabs.className = 'search-tabs';
    
    const usersTab = document.createElement('button');
    usersTab.className = 'search-tab active';
    usersTab.textContent = 'Users';
    usersTab.dataset.type = 'users';
    
    const communitiesTab = document.createElement('button');
    communitiesTab.className = 'search-tab';
    communitiesTab.textContent = 'Communities';
    communitiesTab.dataset.type = 'communities';
    
    tabs.append(usersTab, communitiesTab);
    container.appendChild(tabs);

    // Results Container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    container.appendChild(resultsContainer);

    // Sample data (replace with real API calls)
    const sampleData = {
        users: [
            {
                id: 1,
                name: 'John Doe',
                username: '@johndoe',
                avatar: 'https://via.placeholder.com/50',
                skills: ['JavaScript', 'React', 'Node.js']
            },
            {
                id: 2,
                name: 'Jane Smith',
                username: '@janesmith',
                avatar: 'https://via.placeholder.com/50',
                skills: ['UI/UX', 'Figma', 'CSS']
            }
        ],
        communities: [
            {
                id: 1,
                name: 'Web Developers',
                members: 1250,
                description: 'Community for web developers of all levels'
            },
            {
                id: 2,
                name: 'Design Thinkers',
                members: 842,
                description: 'For designers and creative thinkers'
            }
        ]
    };

    // Initial render
    renderResults(resultsContainer, sampleData.users, 'users');

    // Tab switching
    tabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('search-tab')) {
            document.querySelectorAll('.search-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            e.target.classList.add('active');
            
            const type = e.target.dataset.type;
            renderResults(resultsContainer, sampleData[type], type);
        }
    });

    // Search functionality
    searchBtn.addEventListener('click', () => performSearch());
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const activeTab = document.querySelector('.search-tab.active').dataset.type;
        
        if (!query) {
            renderResults(resultsContainer, sampleData[activeTab], activeTab);
            return;
        }

        const filteredResults = sampleData[activeTab].filter(item => {
            if (activeTab === 'users') {
                return item.name.toLowerCase().includes(query) || 
                       item.username.toLowerCase().includes(query) ||
                       item.skills.some(skill => skill.toLowerCase().includes(query));
            } else {
                return item.name.toLowerCase().includes(query) || 
                       item.description.toLowerCase().includes(query);
            }
        });

        renderResults(resultsContainer, filteredResults, activeTab);
    }

    return container;
}

function renderResults(container, results, type) {
    container.innerHTML = '';
    
    if (results.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No results found';
        container.appendChild(emptyMessage);
        return;
    }

    if (type === 'users') {
        results.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'result-card user-card';
            
            const userInfo = document.createElement('div');
            userInfo.className = 'user-info';
            
            const avatar = document.createElement('img');
            avatar.src = user.avatar;
            avatar.alt = user.name;
            avatar.className = 'user-avatar';
            
            const userDetails = document.createElement('div');
            userDetails.className = 'user-details';
            
            const name = document.createElement('h3');
            name.textContent = user.name;
            
            const username = document.createElement('p');
            username.className = 'username';
            username.textContent = user.username;
            
            const skills = document.createElement('div');
            skills.className = 'user-skills';
            user.skills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill;
                skills.appendChild(skillTag);
            });
            
            userDetails.append(name, username, skills);
            userInfo.append(avatar, userDetails);
            
            const actionBtn = document.createElement('button');
            actionBtn.className = 'btn btn-follow';
            actionBtn.textContent = 'Follow';
            
            userCard.append(userInfo, actionBtn);
            container.appendChild(userCard);
        });
    } else {
        results.forEach(community => {
            const communityCard = document.createElement('div');
            communityCard.className = 'result-card community-card';
            
            const communityInfo = document.createElement('div');
            communityInfo.className = 'community-info';
            
            const name = document.createElement('h3');
            name.textContent = community.name;
            
            const members = document.createElement('p');
            members.className = 'community-members';
            members.textContent = `${community.members} members`;
            
            const description = document.createElement('p');
            description.className = 'community-description';
            description.textContent = community.description;
            
            communityInfo.append(name, members, description);
            
            const actionBtn = document.createElement('button');
            actionBtn.className = 'btn btn-join';
            actionBtn.textContent = 'Join';
            
            communityCard.append(communityInfo, actionBtn);
            container.appendChild(communityCard);
        });
    }
}