
import React, { useState} from 'react';
import { importedJsonfileContext} from './Context';

import Observation from './Observation_module/Observation';
import Testing from './Testing_module/Testing';

import Insights from './Insight_module/Insights';
import { props } from './interface';



const Analyser2 = (props:props) => {
  //creating the context i need with the props.
  //this  component houses all the states
  //really need to thnk about what needs to be in the global state
  //the context defines what I can do across all three stages of analysis 
  //
    const [stagesController,setStage]=useState({
      "1":true,
      "2":false,
      "3":false
    })

    const [selectedimpairment,setSelectedImpairment]=useState([])
  
    const [selected_observations,setObservations]=useState([])

    const [impairmenthx,setImpairmentHx]=useState([0])
    

    const [skippedImpairments,setSkippedimpairments]=useState<any>([])
  
    const [skipperq,setSkipperq]=useState({})
    //ankle =0
    //genere = 0 is strength 1 is coordination, 2 is part task , 3 is whole task 

var context={
  json:props.json,
  selected_observations:selected_observations,
  selectedimpairment:selectedimpairment,
  skippedimpairments:skippedImpairments,
  setSelectedImpairment:setSelectedImpairment,
  setSkippedimpairments:setSkippedimpairments,
  setObservations:setObservations,
  setStage:setStage,
  testingeliminatedhx:skipperq,
  setSkipperq:setSkipperq,
  stageController:stagesController,
  stage2history:impairmenthx,
    setStage2Hx:setImpairmentHx,
    
}
  return (
    <div className='mt-3 md:mt-6 lg:mt-6  px-0 md:px-20 lg:px-28 '>

    {props.json&&
        <importedJsonfileContext.Provider value={context}>
          
        {stagesController["1"]&&<Observation/>}

        {stagesController["2"]&&<Testing/>}
    
        {stagesController["3"]&&<Insights/>}
    
        </importedJsonfileContext.Provider>}
    </div>
  )
}

export default Analyser2