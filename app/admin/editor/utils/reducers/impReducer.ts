import { KinDeviation } from "@/app/components/analyser/common/models/kinematic_deviation"
import { findIndexfromId } from "../findIndexfromid"
import { util_same_physiomovement } from "@/app/components/analyser/Testing_module/utils/util_same_physiomovement"
import { impairment } from "@/app/components/analyser/common/models/impairments"
export enum ImpActionKind {
    ADD = 'add',
    CHANGE = 'change',
    DELETE = 'delete',
    SET='set',
    TESTINGCHANGE='testingchange',
    PHYSIOMOVEMENTadd="physiomovementadd",
    PHYSIOMOVEMENTremove="physiomovementremove",
    SETCLASSES="setClasses",
    ADDTX="addTx",
    REMOVETX="removeTx",
   PURGE="purge"


  }
export const initilImpstate:impairment[]=[{
    impairment: "First impairment",
   
    testing: "",
    
    treatment: [],
    
    physio_movements: [],
    class: [],
    id: 1
}]
export interface Impaction{
type:ImpActionKind,
text?:string,
id?:number,
entirelist?:impairment[],
tx_index?:number

}

export  function ImpReducer(imp:impairment[],action:Impaction):impairment[] {
    switch (action.type) {  
      case 'add': {
        //need to find the id first, cannot change existing id
        const existingId=imp.map((kd)=>{return kd.id})
        const maxId=existingId.reduce((a,b)=>{return (a > b) ? a : b})
        const newid=maxId+1
        const label=action.text?action.text:"Error"
        return [
          ...imp,
          {
              impairment: label,
             
              testing: "",
             
              treatment: [],
          
              physio_movements: [],
              class: [],
              id: newid
          },
        ];
      }
      case 'delete': {
        //need to find the id first, cannot change existing id
        console.log(action.id)
        if(imp.length==1){
          window.alert("unabel to delete at least one is required")
          return [...imp]
        }else{
          return [
            ...imp.filter((imp)=>{
              return imp.id!=action.id
            })
          ];

        }
     
      }

      case 'change':{
        var originalstate=imp
        if(action.id!=null&&action.text!=null){
          var index=findIndexfromId(imp,action.id)
          console.log(index)
          
          originalstate[index].impairment=action.text
          return [...originalstate]
          
        }
        
       

      }
      case 'testingchange':{
        var originalstate=imp
        if(action.id!=null&&action.text!=null){
          var index=findIndexfromId(imp,action.id)
          console.log(index)
          
          originalstate[index].testing=action.text
          return [...originalstate]
          
        }

      }

      case 'physiomovementadd':{

        var originalstate=imp
        if(action.id!=null&&action.text!=null){
          var index=findIndexfromId(imp,action.id)
          console.log(index)
          var tempmovements=originalstate[index].physio_movements
          if(tempmovements.includes(action.text)){
           
            return[...originalstate]

          }else{
            originalstate[index].physio_movements.push(action.text)
            return [...originalstate]

            

          }
          
          
          
        }


      }

      case 'physiomovementremove':{

        var originalstate=imp
        if(action.id!=null&&action.text!=null){
          var index=findIndexfromId(imp,action.id)
          console.log(index)
          var tempmovements=originalstate[index].physio_movements
    
            var filteredmovement=tempmovements.filter((e)=>e!=action.text)
            originalstate[index].physio_movements=filteredmovement
            return[...originalstate]

        
          
          
          
        }


      }

      case'setClasses':{

        var originalstate=imp
        if(action.id!=null&&action.text!=null){
          var index=findIndexfromId(imp,action.id)
          if(action.text.includes("power")){
           
        
            var movement= originalstate[index].physio_movements
            var hasCoor=false
            var hasStr=false
            originalstate.forEach((e)=>{
              if(util_same_physiomovement(e.physio_movements,movement)&&e.class.includes("coor")){
                hasCoor=true

              }
              else if(util_same_physiomovement(e.physio_movements,movement)&&e.class.includes("concentric_str")){
                hasStr=true
              }

            })

            if(hasCoor&&hasStr){
              originalstate[index].class=[action.text]
              return [...originalstate]

            }else{
              window.alert("unable to create power impairment as you do not have str and coordination for the same physiological movement")
              return [...originalstate]

            }
            
          }
          else{

            console.log(index)
            originalstate[index].class=[action.text]

          }
          
        
         
         return [...originalstate]
        }

      }
      
      case 'set':{
        if(action.entirelist!=null){
          return [
            ...action.entirelist
          ]

        }
        
      }

      case 'addTx':{
        var originalstate=imp
        if(action.id!=null&&action.tx_index!=null){
          var indexofKd=findIndexfromId(imp,action.id)
         var origin=originalstate[indexofKd].treatment
         if(origin.includes(action.tx_index)==false){
          origin.push(action.tx_index)

         }
        
         originalstate[indexofKd].treatment=origin
         console.log("added")
     
         return [...originalstate]

        }
        

      }

      case 'removeTx':{
        var originalstate=imp
        if(action.id!=null&&action.tx_index!=null){
          var indexofKd=findIndexfromId(imp,action.id)
         var possimp= originalstate[indexofKd].treatment
         var filtered= possimp.filter((imp_id)=>{return imp_id!=action.tx_index})
      
         originalstate[indexofKd].treatment=filtered
         return [...originalstate]

        }
        

      }

      
      case 'purge':{
        var originalstate=imp
        if(action.id!=null){
         var changed= originalstate.map((imp)=>{
          var filt=imp.treatment.filter((tx)=>{return action.id!=tx})
          var full=imp
          full.treatment=filt
          return full
         })
         return [...changed]


        }else{
          return [...originalstate]
        }


      }


      
     
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }