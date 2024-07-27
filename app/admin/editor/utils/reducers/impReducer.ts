import { KinDeviation } from "@/app/components/analyser/common/models/kinematic_deviation"
import { findIndexfromId } from "../findIndexfromid"
import { impairment } from "@/app/interface/interface"
export enum ImpActionKind {
    ADD = 'add',
    CHANGE = 'change',
    DELETE = 'delete',
    SET='set'

  }
export const initilImpstate:impairment[]=[{
    impairment: "",
    kinematic_deviations: [],
    testing: "",
    category: 0,
    treatment: [],
    body: 0,
    physio_movements: [],
    class: [],
    id: 0
}]
export interface Impaction{
type:ImpActionKind,
text?:string,
id?:number,
entirelist?:impairment[]

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
              impairment: "",
              kinematic_deviations: [],
              testing: "",
              category: 0,
              treatment: [],
              body: 0,
              physio_movements: [],
              class: [],
              id: newid
          },
        ];
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