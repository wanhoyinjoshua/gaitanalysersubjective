import React from 'react'
import { buttonpanel_props } from '../interface/interface'
const Concentric_ButtonPanel = (props:buttonpanel_props) => {

const lasttest=props.impairmentcount+1==props.length_impairments

console.log(props)
function next(){
    var newstage={
        "1":false,
        "2":false,
        "3":true
    }
    props.setObservationinparent({...newstage})

}
function generatefinallist(){

}

function util_include_coor(newlist:any,i:any){

    return newlist[i]["class"].includes("coor")

}
function util_same_physiomovement(newlist:any,i:any,impairmentcount:any){

    return newlist[i]["physio_movements"].includes(newlist[impairmentcount]["physio_movements"][0])

}
function isGroup(group:number){
    //number is he flag and will have differenr logic 
    var newlist=[...props.selectedimpairment]
    var skipped=[...props.skippedimpairments]
    var isImpaired_str=true
    if(group==4){
        isImpaired_str=false

    }
    //depends on the flag 
    //need to delete the all coor impairments from the impairment count onwards
    //and then from the current impairment dig into the treatment and set all difficulty to beginner  
    if(lasttest){
        window.alert(`${JSON.stringify(props.impairmentcount)}/${props.length_impairments}`)
        props.setSelectedImpairment([...newlist])
        props.exportselectedimpairments([...newlist])
        props.exportskippedimpairments([...skipped])
        next()
        
                 
        
        
        //sth related to finalist 
        return

    }
    //savebackup(selectedimpairment,skippedImpairments)
    
    newlist[props.impairmentcount]["status"]=isImpaired_str?true:false
    //
    newlist[props.impairmentcount]["str_lvl"]=group
    //

    console.log(newlist)
   
    
    for (let i = props.impairmentcount+1; i < newlist.length; i++) {
     var include_coord=util_include_coor(newlist,i)
     var same_physio_movement=util_same_physiomovement(newlist,i,props.impairmentcount)
      var coorcondition=include_coord&&same_physio_movement
      var eccen_str_condition=newlist[i]["class"].includes("eccentric_str")&&same_physio_movement
      //for group 1,2 you want to skip the coor / eccentric in future impairments
      //for 3 you want to skip only coor in future impairments
      //for 4 you do not want to skip any impairments
      var conditional
      if(group==1||group==2){
        conditional =coorcondition || eccen_str_condition

      }
      else if(group==3){
        conditional =coorcondition

      }
      else {
        conditional =false

      }

      if(conditional){

        //then set as false
        skipped.push(newlist[i])
        console.log("skipped")
        console.log(newlist[i])
        newlist.splice(i,1)
        
      }
      
    }
    props.setSkippedimpairments([...skipped])

    //loop through the treatment stage:
    //for group 1,2 you want to find level 1 /2 
    //for 3 you want level 3 
    //for 4 you do not want strength impairments 
    for(let i = 0; i < newlist[props.impairmentcount]["treatment"].length; i++){
    //need to change here to be based on id 
    var treatment_id=newlist[props.impairmentcount]["treatment"][i]
    var finalselectedimpairment=[]
      var treatmenttagret=props.treatmentlist.filter((x:any)=>x.id==treatment_id)
      //new implemntation
      if(treatmenttagret&&treatmenttagret["level"]==group && treatmenttagret["strength"]!=0){
        //include 
      }
      else{
        //ddo not include 
        newlist[props.impairmentcount]["treatment"].splice(treatment_id,1)
      }


      //end new implamentation
     

    }
    //problem is it is not updating, but replacing
    props.setSelectedImpairment([...newlist])
    props.setimpairmentcount((prev: number)=>{
        return prev+1
    })

  }

  

   if(props.isConcentric){
        return(
            <section className='flex flex-col'>
              
            <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" 
            onClick={()=>{isGroup(1)}}>Paralysed-MMT 0</button>
 <button  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{
  
   isGroup(2)
  

}}>Very weak-MMT 1-2</button>

<button  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{
 
   isGroup(3)
   

}}>Weak-MMT 3-4</button>

<button  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{
  
   isGroup(4)
   
  

}}>Strong-MMT 5</button>
          </section>
        )
    }
     
  
}

export default Concentric_ButtonPanel