export const SerializeForm = (form) =>{
    const formData = new FormData(form);
    
    const completeObj = {};

    console.log(formData);
    /*desestructurado*/
    for(let [name, value] of formData){
        completeObj[name] = value;
    }
    /*
    estructura normal
    for(let data of formData){
        
    }
    */
    return completeObj;
}