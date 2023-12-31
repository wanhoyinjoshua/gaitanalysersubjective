import React from 'react'
import { buttonpanel_props } from '../interface/interface'
const ButtonPanel = (props:buttonpanel_props) => {

const lasttest=props.impairmentcount+1==props.length_impairments
window.alert(`${JSON.stringify(props.impairmentcount)}/${props.length_impairments}`)
console.log(props)
function next(){
    var newstage={
        "1":false,
        "2":false,
        "3":true
    }
    props.setObservationinparent({...newstage})

}
function handleyes(){
    var newlist=[...props.selectedimpairment]
    newlist[props.impairmentcount]["status"]=true
    if(lasttest){
        //return
        //convert selectedimpairment to a list of kinematic deviations with imapirments
        //setSelectedImpairment([...newlist])
        window.alert("hihi")
        next()

       // setFinalist([...getfinalist()])

        
        return
    }
    //savebackup(selectedimpairment,skippedImpairments)
    props.setSelectedImpairment([...newlist])
    props.setimpairmentcount((prev:any)=>{
        return prev+1
    })

}
function handleno(){
    if(lasttest){
        //return
        //convert selectedimpairment to a list of kinematic deviations with imapirments
        window.alert("hihi")
       
        next()
        //setFinalist([...getfinalist()])

        
        return
    }
    //savebackup(selectedimpairment,skippedImpairments)
    props.setimpairmentcount((prev:any)=>{
        return prev+1
    })

}


    if(props.isDefault){
        return (<section>
        <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" 
        onClick={()=>{
            handleyes()
             
    
         }}>Yes</button>
           <button  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{
             handleno()
    
         }}>No</button>
    
                     </section>)

    }
    else if(props.isEccentric){
        return(
        <section>
        <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" 
        onClick={()=>{
       handleyes()


        }}>Unable to control eccentric movements slowly</button>
        <button  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" 
        onClick={()=>{
            handleno()

        }}>Able to control eccentric movements slowly</button>

        </section>
        )
    }
    
     
  
}

export default ButtonPanel