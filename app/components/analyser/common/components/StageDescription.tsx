import React from 'react'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { importedJsonfileContext } from '../../Context'
import { StageDescriptionprops } from '../../interface'
import { useContext } from 'react'
const StageDescription = (props:StageDescriptionprops) => {
    const context=useContext(importedJsonfileContext)
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap bg-mq-lightgrey p-3 mb-5 ">
    
    <div className="mt-4">
      <Breadcrumbs stageController={context.stageController}></Breadcrumbs>
      <h3 className="text-base font-semibold leading-6 text-white">Step {props.stageno} </h3>
      <p className="mt-1 text-sm text-white">
        {props.header}
        <br></br>
       {props.description}
        
      </p>
    </div>

{props.buttonMode&&
    <div className="ml-4 mt-4 flex-shrink-0">
    <button
    
      type="button"
      onClick={()=>{props.buttonFunction&&props.buttonFunction()}}
      className="relative inline-flex items-center rounded-md bg-mq-lightred px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mq-darkred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mq-darkred"
    >
      {props.buttonText}
    </button>
  </div>

}



  </div>

  )
}

export default StageDescription