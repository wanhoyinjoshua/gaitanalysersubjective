export function findIndexfromId(list:any[],id:number){
    if(list.length>0){
        
        var indexarray=list.map((item)=>{return item.id})
        
        const isID = (element:number) => element ==id;
        const index=indexarray.findIndex(isID)
       
        
        return index

    }else{
        return -1
    }
   

}