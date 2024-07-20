import React, { useContext } from 'react'
import { buttonpanel_props } from '@/app/interface/interface'
import { importedJsonfileContext } from '../../Context'
import { ButtonTesting } from '../utils/ButtonTesting'
const Concentric_ButtonPanel = (props:buttonpanel_props) => {
  var ButtonTest=new ButtonTesting()
const context = useContext(importedJsonfileContext)
const lasttest=props.impairmentcount+1==props.length_impairments

function next(){
    var newstage={
        "1":false,
        "2":false,
        "3":true
    }
    context.setStage({...newstage})
    //props.setObservationinparent({...newstage})

}


function util_include_coor(newlist:any,i:any){

    return newlist[i]["class"].includes("coor")

}
function util_same_physiomovement(newlist:any,i:any,impairmentcount:any){
//need to loop this for however many items in newlist[impairmentcount]["physio_movements"]
//keep a var to keep track 
var same_movement=false
//for an input of size 5 , it will run the for loop 5 times and in the loop only one operation.
//so it will be proportioanl to input size O(n)linear complexity
newlist[impairmentcount]["physio_movements"].forEach((physio_movement:any)=>{
  if(newlist[i]["physio_movements"].includes(physio_movement)){
    same_movement=true

  }
  else{

  }
})

    return same_movement

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
        //window.alert(`${JSON.stringify(props.impairmentcount)}/${props.length_impairments}`)
        props.setSelectedImpairment([...newlist])
        context.setSelectedImpairment([...newlist])
       // props.exportselectedimpairments([...newlist])
       context.setSkippedimpairments([...skipped])
       // props.exportskippedimpairments([...skipped])
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
   
    var elimlistindex:any=[]
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
        newlist[i]["skip_status"]=true
        elimlistindex.push(i)
      
        console.log("skipped")
        console.log(newlist[i])
        //newlist.splice(i,1)
        
      }
      
    }
    console.log(newlist)
    context.setSkippedimpairments([...skipped])
    //props.setSkippedimpairments([...skipped])

    //loop through the treatment stage:
    //for group 1,2 you want to find level 1 /2 
    //for 3 you want level 3 
    //for 4 you do not want strength impairments 
    for(let i = 0; i < newlist[props.impairmentcount]["treatment"].length; i++){
    //need to change here to be based on id 
    var treatment_id=newlist[props.impairmentcount]["treatment"][i]
    //var finalselectedimpairment=[]
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


    
    context.setSelectedImpairment([...newlist])
    //props.setSelectedImpairment([...newlist])
    var targetcount= ButtonTest.Find_display_index(newlist,props.impairmentcount)
    //window.alert(targetcount)


    function sethistory(index:any,elimindex:Number[]){
      var tempq=context.testingeliminatedhx
      if(elimindex.length==0){
        tempq[`${index}`]=[]
       
        context.setSkipperq(tempq)
        
      }else{
        tempq[`${index}`]=elimindex
       
        context.setSkipperq(tempq)
      }
      
     
          
  
   
  
  }

  sethistory(props.impairmentcount,elimlistindex)
    var newcount=props.backupcount
    if(props.impairmentcount==0){

    }else{
        newcount.push(props.impairmentcount)

    }
    props.setBackupcount([...newcount])
    props.setimpairmentcount(targetcount)

  }

  

   if(props.buttonstate.basic_muscle_testing){
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