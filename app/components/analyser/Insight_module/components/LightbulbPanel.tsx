import React from 'react'
import { ExclamationTriangleIcon,LightBulbIcon } from '@heroicons/react/20/solid'
const LightbulbPanel = (props:any) => {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <LightBulbIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="w-full flex flex-column flex-wrap  justify-between  sm:flex-row ml-3">
          <p className="text-sm text-yellow-700">
            {props.content}
            
          </p>
          <button onClick={()=>{props.setToggleopen(true)}} className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Treatment ideas</button>
        </div>
      </div>
    </div>
  )
}

export default LightbulbPanel