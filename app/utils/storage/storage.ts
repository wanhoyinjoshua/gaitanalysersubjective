'use client'
export function setWindow(key:any,value:any){

    localStorage.setItem(key, JSON.stringify(value));


}

export function retreiveWindow(key:any){
    const result= localStorage.getItem(key)
    return result
    

}

export function isConsent(){
    const value=retreiveWindow("consent")//O(1)
    if(value!=null){

        var consent= JSON.parse(value)//O(1)
        if(consent==true){
            return true//o1

        }else{
            return false//O1
        }

        

    }else{
        return false
    }
   

}