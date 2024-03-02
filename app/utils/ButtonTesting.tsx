export class ButtonTesting{


    constructor() {
        
      }

      yes(){

      }

      no(){

      }

      Find_display_index(imp_list:any,current_count:any){
        var index = -1
        // find the first index in the array where status=false from current count onwards, excluding it 
        //if all imp followinf current count  is skip true , then need to call next function here.
        //if nil then return -1, then next()
        for (let i = current_count+1; i < imp_list.length; i++) {
            if(imp_list[i]["skip_status"]==true){

            }else{
                index=i
                return index

            }
            
          }

        return index 


      }
}