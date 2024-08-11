export function util_same_physiomovement(newlist:any,oldlist:any){
    //need to loop this for however many items in newlist[impairmentcount]["physio_movements"]
    //keep a var to keep track 
    var same_movement=false
    //for an input of size 5 , it will run the for loop 5 times and in the loop only one operation.
    //so it will be proportioanl to input size O(n)linear complexity
    newlist.forEach((physio_movement:any)=>{
      if(oldlist.includes(physio_movement)){
        same_movement=true
    
      }
      else{
    
      }
    })
    
        return same_movement
    
    }