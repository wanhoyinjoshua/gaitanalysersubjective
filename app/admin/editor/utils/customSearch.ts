export function customSearch(userWord:string,texttosearch:string){
    const lowerCaseuserword=userWord.toLowerCase()
    const lowerCasetexttosearch=texttosearch.toLowerCase()
    if(lowerCaseuserword==""){
        return true
        

    }
    else if(lowerCasetexttosearch.includes(lowerCaseuserword)==true){
        return true
    }

    else{
    return false
}
}