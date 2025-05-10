import { createProfileContainer } from "../features/profile/profile.js";
import { getFileName, getIdArr, DOMElement } from "../utils/collection.js";
import {signOut, getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import{db,app} from "../../database/dbConfig.js"
import {doc, getDoc, addDoc, setDoc, collection, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
// import { userCred } from "../features/auth/auth.js";



document.addEventListener('DOMContentLoaded', function() {
    
    // let [homePageBtn, searchPageBtn, newEventPageBtn, inboxPageBtn, notificationPageBtn, profilePageBtn] = 
    
    getIdArr("#navBarContainer>li")
    
    // Navigation elements
    const navItems = document.querySelectorAll('.nav-item');
    const homePageContainer = document.getElementById('homePageContainer');
    
    // Set initial active page
    let currentActive = document.querySelector('.nav-item.active');
    
    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {


            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            currentActive = this;
        });
    });



    let profilePageBtn = document.getElementById("profilePageBtn")

    profilePageBtn.addEventListener('click',async()=>{


        try{

            
            homePageContainer.innerHTML=''

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `../styles/profile.css`;
            document.head.appendChild(link);
            // let { userCred } = await import("../features/auth/auth.js") ;
            // console.log(userCred)
            let {createProfileContainer } = await import(`../features/profile/profile.js`)

            let req = await getAuth(app)
            let user = await req.currentUser.uid
            console.log(user)
            let req2 = await getDoc(doc(db,"users",req.currentUser.uid));
            let res = await req2.data();
            // console.log(res.email)
            console.log(res)
            const profileContainer = createProfileContainer(res.fullname,res.username, ["javascript","html","css"], {email:"sample", portfolio:"sample@home.com",linkedIn:"linkedIn"});
            
            // const profileContainer = createProfileContainer("bhuvan chavan","bhuvanleopard", ["javascript","html","css"], {email:"sample", portfolio:"sample@home.com",linkedIn:"linkedIn"});
            homePageContainer.appendChild(profileContainer)

        }catch(error){
            console.log(error)
        }
    })

    let newEventPageBtn = document.getElementById("newEventPageBtn")
    newEventPageBtn.addEventListener("click",async()=>{
        
        try{


            homePageContainer.innerHTML = '';

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `../styles/newEvent.css`;
            document.head.appendChild(link);

            
            let {createNewEventContainer } = await import(`../features/newEvent/newEvent.js`)
            const newEvent = createNewEventContainer()
            homePageContainer.appendChild(newEvent)

        }catch(error){
            console.log(error)
        }

    })

    let searchPageBtn = document.getElementById("searchPageBtn")
    searchPageBtn.addEventListener("click", async()=>{

        try{


            homePageContainer.innerHTML = '';

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `../styles/search.css`;
            document.head.appendChild(link);

            
            let {createNewEventContainer } = await import(`../features/search/search.js`)
            const newEvent = createNewEventContainer()
            homePageContainer.appendChild(newEvent)

        }catch(error){
            console.log(error)
        }

    })

    let notificationPageBtn = document.getElementById("notificationPageBtn")
    notificationPageBtn.addEventListener("click", async()=>{

        try{


            homePageContainer.innerHTML = '';
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `../styles/notifications.css`;
            document.head.appendChild(link);

            
            let {createNewEventContainer } = await import(`../features/notifications/notifications.js`)
            const newEvent = createNewEventContainer()
            homePageContainer.appendChild(newEvent)

        }catch(error){
            console.log(error)
        }

    })

    
});
