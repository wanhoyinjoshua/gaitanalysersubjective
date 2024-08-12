import React from 'react'
import { useState,useEffect } from 'react'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { switchStages } from '../services/switch_stages';
import StageDescription from '../common/components/StageDescription';
import KdItem from './components/KdItem';

import { useContext } from 'react';

import { importedJsonfileContext } from '../Context';
import { json } from 'stream/consumers';

import Breadcrumbs from '../../Breadcrumbs';
import { useInView } from "react-intersection-observer";
import { PlusIcon,CheckIcon } from '@heroicons/react/20/solid';


const Observation = () => {
  const context = useContext(importedJsonfileContext);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  
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
   const [selected_observations,setObservations]=useState<number[]>(context.selected_observations)
   
   function finshObservation(){
    context.setObservations([...selected_observations])
    context.setStage2Hx([0])
    
    
    context.setStage({...switchStages(2)})
   
    //I can commit this to localstorage and have it persist and use useeffect to retreive the state


   }


  return (
    <div className="rounded-md  ">
       

    <fieldset>
    

  <StageDescription 
  stageno={'1'} 
  header={'Observations'} 
  description={'Select the kinematic deviations identified during the gait cycle, you can select as many as you like.'} 
  buttonFunction={finshObservation } 
  buttonText={'Complete'} 
  buttonMode={true}
  
  
  />


  <div className=" mt-4 divide-y divide-gray-200 border-b border-t border-gray-200 ">
  {inView?<div></div>:
  <div className="fixed bottom-0 right-0 h-16 w-16 z-50 ">
    <button
    ref={ref}
     onClick={()=>{finshObservation()}}
        type="button"
        className="rounded-full bg-mq-lightred p-2 text-white shadow-sm hover:bg-mq-darkred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mq-lightred"
      >
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
      </button>
  </div>
}

{context.json.kinematic_deviations.map((deviation:any,index:any)=>(


<KdItem
key={index}
index={index}
deviation={deviation}
selected_observations={selected_observations}
setObservations={setObservations}
/>

))}


  </div>
 
</fieldset>


   
     
   
  </div>
  )
}

export default Observation