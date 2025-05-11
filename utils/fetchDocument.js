import {db} from "../database/dbConfig.js";
import { doc,getDoc, collection, getDocs} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// async function documentCollection(documentName){

//     let req = await getDoc(collection(db, documentName))
// }

export async function getDocItem(documentName, itemId){

    

    let req = await getDoc(doc(db, documentName, itemId))
    
    if(req.exists()){

        
        console.log(
            `data fetched successfully
             document name: ${documentName}
             document object id : ${itemId}
             document data :
             
             ${req.data()}`
        )

    }else{

        console.log(
            `no data found 
            document name: ${documentName}
            document object id: ${itemId}`
        )
    }
}