import React from 'react'
import { useState,useEffect,useContext } from 'react'
import {insights_props} from"../interface/interface"
import Insights_renderer from './Insights_renderer'
import {importedJsonfileContext} from './analyser/Context'
import { useGetInsight } from './Insights/hooks/useGetInsight'

import Breadcrumbs from './Breadcrumbs'
import Sideoverlay from './SideOverlay/Sideoverlay'
const Insights = (props:any) => {
  const finalist= useGetInsight()

  console.log(finalist)


    
    

  return (
    <div>
    <div className="">
    <div className="border-b border-gray-200   py-5 ">
  <div className=" mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap bg-mq-lightgrey p-3 ">
    <div className="mt-4">
      <Breadcrumbs stageController={props.stageController}></Breadcrumbs>
      <h3 className="text-base font-semibold leading-6 text-white">Step 3 </h3>
      <p className="mt-1 text-sm text-white">
        Insights
        <br></br>
        
      </p>
    </div>


    <div className="ml-4 mt-4 flex-shrink-0">
      <button
      
        type="button"
        onClick={()=>{window.location.href="activities"}}
        className="relative inline-flex items-center rounded-md bg-mq-lightred px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mq-darkred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mq-darkred"
      >
        Analyse Again
      </button>
    </div>


  </div>
</div>
    
  </div>
  

    {finalist&&finalist.map((insight:any)=>{

        return<div className='mb-4' key={JSON.stringify(insight)}>
           
        
          
            <Insights_renderer list={insight} ></Insights_renderer>

            </div>
    })}

    
    </div>
  )
}

export default Insights