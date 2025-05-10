
import { getFileName } from "../../utils/collection.js";
import{db,app} from "../../database/dbConfig.js"
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getIdArr } from "../../utils/collection.js";
import {doc, getDoc, addDoc, setDoc, collection, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const auth = getAuth(app)



let[test, signUpContainer, signUpMessage, signUpUsername, signUpEmail, signUpPassword, signUpBtn, logInContainer, logInUpMessage, logInEmail, logInPassword, logInBtn] = getIdArr();



async function createNewUser(email, password){

    try{


        let req = await createUserWithEmailAndPassword(auth, email, password);
        
        console.log(req)

    }catch(error){

        console.log(error)
    }
}

signUpBtn.addEventListener("click", async()=>{

    let req = await createNewUser(signUpEmail.value, signUpPassword.value)
})



async function logInUser(email, password){

    try{


        let req = await signInWithEmailAndPassword(auth, email, password);
        
        console.log(req)

    }catch(error){

        console.log(error)
    }
}

logInBtn.addEventListener("click", async()=>{

    let req = await logInUser(logInEmail.value, logInPassword.value)
})


test.addEventListener("click",()=>{

    console.log(auth)
})