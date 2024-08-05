import { KinDeviation } from "@/app/components/analyser/common/models/kinematic_deviation"
import { findIndexfromId } from "../findIndexfromid"
export enum KDActionKind {
    ADD = 'add',
    CHANGE = 'change',
    DELETE = 'delete',
    SET='set',
    ADDIMP='addimp',
    DELETEIMP='deleteimp',
    removeimp='removeimp',
    purge='purge'

  }
export const initilKDstate:KinDeviation[]=[{
    id:1,
  label:"First Kinematic deviation",
  possible_impairments:[],
  }]
export interface KDaction{
type:KDActionKind,
text?:string,
id?:number,
entirelist?:KinDeviation[],
imp_index?:number

}
export interface  EditorKd{
  kd:KinDeviation[],action:KDaction

}
export  function kDReducer(kd:KinDeviation[],action:KDaction):KinDeviation[] {
    switch (action.type) {  
      case 'add': {
        //need to find the id first, cannot change existing id
        const existingId=kd.map((kd)=>{return kd.id})
        const maxId=existingId.reduce((a,b)=>{return (a > b) ? a : b})
        const newid=maxId+1
        const label=action.text?action.text:"Error"
        return [
          ...kd,
          {
            id: newid,
            label: label,
            possible_impairments:[]
 
          },
        ];
      }

      case 'delete': {
        //need to find the id first, cannot change existing id
        console.log(action.id)
        if(kd.length==1){
          window.alert("unabel to delete at least one is required")
          return [...kd]
        }else{
          return [
            ...kd.filter((kd)=>{
              return kd.id!=action.id
            })
          ];

        }
     
      }

      case 'change':{
        var originalstate=kd
        if(action.id!=null&&action.text!=null){
          var index=findIndexfromId(kd,action.id)
          console.log(index)

          originalstate[index].label=action.text
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

      case 'addimp':{
        var originalstate=kd
        if(action.id!=null&&action.imp_index!=null){
          var indexofKd=findIndexfromId(kd,action.id)
         var origin=originalstate[indexofKd].possible_impairments
         if(origin.includes(action.imp_index)==false){
          origin.push(action.imp_index)

         }
        
         originalstate[indexofKd].possible_impairments=origin
         console.log("added")
         console.log(action.imp_index)
         return [...originalstate]

        }
        

      }

      case 'removeimp':{
        var originalstate=kd
        if(action.id!=null&&action.imp_index!=null){
          var indexofKd=findIndexfromId(kd,action.id)
         var possimp= originalstate[indexofKd].possible_impairments
         var filtered= possimp.filter((imp_id)=>{return imp_id!=action.imp_index})
      
         originalstate[indexofKd].possible_impairments=filtered
         return [...originalstate]

        }
        

      }

      case 'purge':{
        var originalstate=kd
        if(action.id!=null){
         var changed= originalstate.map((kd)=>{
          var filt=kd.possible_impairments.filter((imp)=>{return action.id!=imp})
          var full=kd
          full.possible_impairments=filt
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