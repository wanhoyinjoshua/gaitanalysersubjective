import React from 'react'
import { useState,useEffect } from 'react'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { obervation_props } from '../interface/interface';
import { useContext } from 'react';
import {importedJsonfileContext} from './analyser/Context'
import { json } from 'stream/consumers';



const Observation = (props:obervation_props) => {
  const context = useContext(importedJsonfileContext);
  
    /*
    This component is responsible for 
    1,displaying the observation selection screen
    2,handle the states of selection
    3,inform the parent component when to proceed to stage 2 

    @Input is the kinematic deviation list loaded from an external source and accept as prop
    There are two outputs
    @Output is a list of selected observations with the following interface
    type OutputList= number[]
    @Another output is the signaler for parent component to know when to display second stage


    @@Testing:
    check if output is a list with numbers / or is it correctly selecting the lists.

    */
   const [selected_observations,setObservations]=useState<number[]>([])
   
   function finshObservation(){
  
    props.setSelectedDeviation_id([...selected_observations])
    var newstage={
        "1":false,
        "2":true,
        "3":false
    }
    props.setObservationinparent({...newstage})
    //I can commit this to localstorage and have it persist and use useeffect to retreive the state


   }


  return (
    <div className="-space-y-px rounded-md bg-white px-5">

    <fieldset>
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
  <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
    <div className="ml-4 mt-4">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Step 1 </h3>
      <p className="mt-1 text-sm text-gray-500">
        Observations
        
      </p>
    </div>
    <div className="ml-4 mt-4 flex-shrink-0">
      <button
        type="button"
        onClick={()=>{finshObservation()}}
        className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Done!
      </button>
    </div>
  </div>
</div>
  <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
    {context.json.kinematic_deviations.map((deviation:any,index:any)=>(
         <label key={index} htmlFor= {`${deviation.label}_${index}`}>
      <div key={index} className="relative flex items-start py-4">
        <div className={` min-w-0 flex-1 text-sm leading-6`}>
          <div className={`p-5 ${selected_observations.includes(deviation.id)?"bg-green-50":""} cursor-pointer  select-none font-medium text-gray-900 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
         {selected_observations.includes(deviation.id)?<CIcon icon={icon.cilCheckCircle} size="xxl" className="h-6 w-6"/>:null}
            {deviation.label} 
            {deviation.id}
          </div>
        </div>
        <div className="ml-3 flex h-6 items-center">
       
          <input
          id={`${deviation.label}_${index}`}
          name={`${deviation.label}_${index}`}
            onChange={(event)=>{
                const isChecked = event.target.checked;
                console.log(index)
                if(isChecked && selected_observations.indexOf(deviation.id)==-1){
                    //SET TO STATE
                    var newselect= [...selected_observations]
                    newselect.push(deviation.id)
                    
                    setObservations([...newselect])
                    console.log(selected_observations)


                }
                else if (isChecked==false){
                    if(selected_observations.indexOf(deviation.id)!=-1){
                        var newlist=[]
                        newlist=[...selected_observations]
                        newlist.splice(selected_observations.indexOf(deviation.id),1)
                        setObservations([...newlist])


                    }

                }
                
            }}
           
            type="checkbox"
            className="sr-only h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
      </div>
      </label>
    ))}
  </div>
</fieldset>
   
     
   
  </div>
  )
}

export default Observation