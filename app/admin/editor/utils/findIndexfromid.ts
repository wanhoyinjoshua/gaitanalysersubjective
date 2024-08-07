export function findIndexfromId(list:any[],id:number){
    if(list.length>0){
        console.log(list)
        var indexarray=list.map((item)=>{return item.id})
        console.log(indexarray)
        const isID = (element:number) => element ==id;
        const index=indexarray.findIndex(isID)
        console.log(id)
        console.log(index)
        
        return index

    }else{
        return -1
    }
   

}