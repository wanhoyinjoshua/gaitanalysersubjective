import { KinDeviation } from "@/app/components/analyser/common/models/kinematic_deviation"
import { findIndexfromId } from "../findIndexfromid"
import { impairment } from "@/app/interface/interface"
import { treatment } from "@/app/components/analyser/common/models/treatment"
export enum TxActionKind {
    ADD = 'add',
    CHANGE = 'change',
    DELETE = 'delete',
    SET='set',
    TESTINGCHANGE='testingchange',
    PHYSIOMOVEMENTadd="physiomovementadd",
    PHYSIOMOVEMENTremove="physiomovementremove",
    SETCLASSES="setClasses",
    ADDTX="addTx",
    REMOVETX="removeTx"


  }
export const initilTxstate:treatment[]=[{
    id: 1,
    label: "First Treatment",
    level: 1,
    strength: 1,
    coordination: 0,
    part: true,
    whole: false,
    rom: false,
    reference: [],
    image: "",
    display: true
}]
export interface Txaction{
type:TxActionKind,
text?:string,
id?:number,
entirelist?:treatment[],
payload?:any,
subtype?:string,
tx_index?:number

}

export  function txReducer(tx:treatment[],action:Txaction):treatment[] {
    
    switch (action.type) {  
      case 'add': {
        //need to find the id first, cannot change existing id
        const existingId=tx.map((kd)=>{return kd.id})
        const maxId=existingId.reduce((a,b)=>{return (a > b) ? a : b})
        const newid=maxId+1
        const label=action.text?action.text:"Error"
        return [
          ...tx,
          {
            id: newid,
            label: label,
            level: 0,
            strength: 0,
            coordination: 0,
            part: false,
            whole: false,
            rom: false,
            reference: [],
            image: "",
            display: true
          },
        ];
      }
      case 'delete': {
        //need to find the id first, cannot change existing id
        console.log(action.id)
        
        if(tx.length==1){
          window.alert("Unable to delete, must have at least one")
          return [...tx]
        }else{
          return [
            ...tx.filter((imp)=>{
              return imp.id!=action.id
            })
          ];

        }
     
      }

      case 'change':{
        var originalstate=tx
        if(action.id!=null&&action.text!=null){
          var index=findIndexfromId(tx,action.id)
          console.log(index)
          
          originalstate[index].label=action.text
          return [...originalstate]
          
        }
        
       

      }
    

      case'setClasses':{

        
        
        var originalstate=tx
        if(action.id!=null){
            
          var index=findIndexfromId(tx,action.id)
          console.log(index)
          if(action.subtype=="level"){
            originalstate[index].level=action.payload
         
         return [...originalstate]

          }
          if(action.subtype=="image"){
            originalstate[index].image=action.payload
         
         return [...originalstate]

          }
          if(action.subtype=="strength"){
            
            originalstate[index].strength=action.payload
         
         return [...originalstate]

          }
          if(action.subtype=="coordination"){
            originalstate[index].coordination=action.payload
         
         return [...originalstate]

          }
          if(action.subtype=="part"){
            originalstate[index].part=action.payload
         
         return [...originalstate]

          }
          if(action.subtype=="whole"){
            originalstate[index].whole=action.payload
         
         return [...originalstate]

          }
          if(action.subtype=="rom"){
            originalstate[index].rom=action.payload
         
         return [...originalstate]

          }
         
        }

      }


    
      
      case 'set':{
        if(action.entirelist!=null){
          return [
            ...action.entirelist
          ]

        }
        
      }

      
     
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }