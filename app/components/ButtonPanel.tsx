import React from 'react'
import { useContext } from 'react'
import { buttonpanel_props } from '../interface/interface'
import {importedJsonfileContext} from './analyser/Context'
import {  ButtonTesting } from '../utils/ButtonTesting'
const ButtonPanel = (props:buttonpanel_props) => {
var ButtonTest=new ButtonTesting()
const context= useContext(importedJsonfileContext)
const lasttest=props.impairmentcount+1==props.length_impairments
const buttontype=props.selectedimpairment[props.impairmentcount]["class"][0]
const dict={
    "coor":
    {
        "yes":" coor yes",
        "no":" coor no"
    },

    "sensation":
    {
        "yes":"sensation eyes",
        "no":"sensation no"
    },

    "rom":
    {
        "yes":"rom tees",
        "no":"rom no"
    },

    "eccentric_str":
    {
        "yes":"ecentrci es",
        "no":"eccentric no"
    },

    "ex_mus_ac":
    {
        "yes":"ex yes",
        "no":"ex no"
    },
    


}
const message=dict[buttontype as keyof typeof dict]

console.log(props)
function next(){
    var newstage={
        "1":false,
        "2":false,
        "3":true
    }
    context.setStage({...newstage})
    //props.setObservationinparent({...newstage})

}



function handleyes(){
    var newlist=[...props.selectedimpairment]
    newlist[props.impairmentcount]["status"]=true
    if(lasttest){
        //return
        //convert selectedimpairment to a list of kinematic deviations with imapirments
        //setSelectedImpairment([...newlist])
       
        props.setSelectedImpairment([...newlist])
        context.setSelectedImpairment([...newlist])
        //props.exportselectedimpairments()
        context.setSkippedimpairments([...props.skippedimpairments])
        //props.exportskippedimpairments([...props.skippedimpairments])
        
        next()

        //need to set the selected impairments in the parent testing component...
        
       // setFinalist([...getfinalist()])

        
        return
    }
    //savebackup(selectedimpairment,skippedImpairments)
    context.setSelectedImpairment([...newlist])
    props.setSelectedImpairment([...newlist])

    var targetcount= ButtonTest.Find_display_index(newlist,props.impairmentcount)
    var newcount=props.backupcount
    if(props.impairmentcount==0){
        

    }else{
        newcount.push(props.impairmentcount)

    }
    
    props.setBackupcount([...newcount])
    props.setimpairmentcount(targetcount)
   


}
function handleno(){
    var newlist=[...props.selectedimpairment]
    if(lasttest){
        
        //props.exportskippedimpairments([...props.skippedimpairments])
        context.setSkippedimpairments([...props.skippedimpairments])
        next()
        
        //setFinalist([...getfinalist()])

        
        return
    }
    //savebackup(selectedimpairment,skippedImpairments)
    var targetcount= ButtonTest.Find_display_index(newlist,props.impairmentcount)
    var newcount=props.backupcount
    if(props.impairmentcount==0){
        

    }else{
        newcount.push(props.impairmentcount)

    }
    
    props.setBackupcount([...newcount])
    props.setimpairmentcount(targetcount)

}


   
        return (<section>
           
        <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" 
        onClick={()=>{
            handleyes()
             
    
         }}>
           {message.yes}</button>
           <button  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{
             handleno()
    
         }}>  {message.no}</button>
    
                     </section>)

    
   

    
     
  
}

export default ButtonPanel