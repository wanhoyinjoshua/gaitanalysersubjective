import React from 'react'
import { useState,useEffect,useContext } from 'react'
import {insights_props} from"../interface/interface"
import Insights_renderer from './Insights_renderer'
import {importedJsonfileContext} from './analyser/Context'
import { useGetInsight } from './Insights/hooks/useGetInsight'
const Insights = (props:any) => {
  const finalist= useGetInsight()

    
    

  return (
    <div>
    <div className="p-10 ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
    <div className="ml-4 mt-4">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Step 3 </h3>
      <p className="mt-1 text-sm text-gray-500">
        insights
      </p>
      
    </div>
    <div className="ml-4 mt-4 flex-shrink-0">
   
<br></br>
      <a
      href='/version'
        
        onClick={()=>{

        }}
        className=""
      >
        Analyse again
      </a>
      
    </div>
  </div>

    {finalist&&finalist.map((insight:any)=>{

        return<div key={JSON.stringify(insight)}>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
  
</div>
        
          
            <Insights_renderer list={insight} ></Insights_renderer>

            </div>
    })}
    
    </div>
  )
}

export default Insights