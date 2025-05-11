export function getFileName(){

    let path = window.location.pathname;
    let fileName = path.split("/").pop();

    console.log(fileName)
}

export function getIdArr(query){

    let bodyItems = document.querySelectorAll(query);
    let res = [];
    let ele = []
    for(let each of bodyItems){

        if(each.id){ 
            
            res.push(each.id)
            
            ele.push(document.getElementById(each.id))
        }  
    }

    console.log(res)
    return ele;
}

export class DOMElement{
    constructor(element){
        return document.createElement(element)
    }
}