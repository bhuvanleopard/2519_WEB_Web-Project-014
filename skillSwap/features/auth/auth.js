
import { getFileName } from "../../utils/collection.js";
import{db,app} from "../../database/dbConfig.js"
import {signOut, getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getIdArr } from "../../utils/collection.js";
import {doc, getDoc, addDoc, setDoc, collection, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const auth = getAuth(app)

export var userCred = "dummy";
    
// document.addEventListener('DOMContentLoaded', function(){

    
// let [signUpContainer, signUpMessage, signUpForm, signUpUsername, signUpEmail, signUpPassword, signUpBtn, showLogin, logInContainer, logInMessage, loginForm, logInEmail, logInPassword, logInBtn,showSignup] = getIdArr();
    
//     // check if user was already logged In
    
// });
export async function logOutUser(){

    await signOut(auth)
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const signUpContainer = document.getElementById('signUpContainer');
    const signUpMessage = document.getElementById('signUpMessage');
    const signUpUsername = document.getElementById('signUpUsername');
    const signUpUserFullName = document.getElementById('signUpUserFullName')
    const signUpEmail = document.getElementById('signUpEmail');
    const signUpPassword = document.getElementById('signUpPassword');
    const signUpBtn = document.getElementById('signUpBtn');
    const signUpForm = document.getElementById('signUpForm');
    
    const logInContainer = document.getElementById('logInContainer');
    const logInMessage = document.getElementById('logInMessage');
    const logInEmail = document.getElementById('logInEmail');
    const logInPassword = document.getElementById('logInPassword');
    const logInBtn = document.getElementById('logInBtn');
    const loginForm = document.getElementById('loginForm');
    
    const showLogin = document.getElementById('showLogin');
    const showSignup = document.getElementById('showSignup');
    

    async function getUserAuth(){

        onAuthStateChanged(auth,async(user)=>{

            
            if(user){
                

                // console.log(user.uid)
                // userCred= user.uid    
                console.log(userCred)
                // window.location.href="./home.html"
            }else{
            
                console.log(userCred)
            }
        })
    }
    getUserAuth()




    async function createNewUser(email, password, name, fullname){
    
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{

            // userCred=userCredential.user.uid;

            setDoc(doc(db,"users",userCredential.user.uid),{
                email: email,
                username: name,
                fullname: fullname
            })
            // Simulate successful signup
            showMessage(signUpMessage, 'account created successfully!', 'success');
            signUpForm.reset();

            userCred = userCredential.user.uid
            
        })
        .then(()=>{

        
            setTimeout(()=>{

                clearMessages();
                window.location.href = "./home.html"
            },2000)
        })
        .catch(error=>{
            console.log(error.message)
            console.log(error.code)
            showMessage(signUpMessage,error.code,"error")
        })
            
    }
    
    signUpBtn.addEventListener("click",async()=>{

        await createNewUser(signUpEmail.value, signUpPassword.value, signUpUsername.value, signUpUserFullName.value)
    })



    async function logInUser(email, password){
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCred)=>{

            userCred = userCred.user.uid;
            // console.log(userCred);

            showMessage(logInMessage, 'login successful!', 'success');
            loginForm.reset();

        })
        .then(()=>{


            setTimeout(()=>{

                clearMessages();
                window.location.href = "./home.html"
            },2000)

        })
        .catch(error=>{
            console.log(error.message);
            console.log(error.code)
            showMessage(logInMessage,"invalid email or password","error")
        })

    }

    logInBtn.addEventListener("click", async()=>{

        await logInUser(logInEmail.value, logInPassword.value)
    })

    // Toggle between forms
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signUpContainer.classList.remove('active');
        logInContainer.classList.add('active');
        clearMessages();
    });
    
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        logInContainer.classList.remove('active');
        signUpContainer.classList.add('active');
        clearMessages();
    });
    
    // Password visibility toggle
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Form validation and submission
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearMessages();
        
        // Validate email
        if (!validateEmail(signUpEmail.value)) {
            showMessage(signUpMessage, 'Please enter a valid email address', 'error');
            return;
        }
        
        // Validate password length
        if (signUpPassword.value.length < 6) {
            showMessage(signUpMessage, 'Password must be at least 6 characters', 'error');
            return;
        }
        
        // Simulate successful signup
        // showMessage(signUpMessage, 'Account created successfully!', 'success');
        signUpForm.reset();
        
        // Auto switch to login after successful signup
        setTimeout(() => {
            signUpContainer.classList.remove('active');
            logInContainer.classList.add('active');
            clearMessages();
        }, 1500);
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearMessages();
        
        // Validate email
        if (!validateEmail(logInEmail.value)) {
            showMessage(logInMessage, 'Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate successful login
        // showMessage(logInMessage, 'Login successful!', 'success');
        loginForm.reset();
    });
    
    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = 'message ' + type;
    }
    
    function clearMessages() {
        signUpMessage.textContent = '';
        signUpMessage.className = 'message';
        logInMessage.textContent = '';
        logInMessage.className = 'message';
    }
});