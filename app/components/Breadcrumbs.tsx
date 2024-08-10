import React from 'react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react';
import { importedJsonfileContext } from './analyser/Context';

const Breadcrumbs = (props:any) => {
    const context = useContext(importedJsonfileContext);
  function setstage(stage:string){
    var newstage:any={
        "1":false,
        "2":false,
        "3":false
    }
    newstage[stage]=true
    
    context.setStage({...newstage})
  }
    const pages = [
        {id:"1", name: 'Stage 1 ', href: setstage, current: props.stageController["2"]||props.stageController["3"]||props.stageController["1"] },
        {id:"2", name: 'Stage 2 ', href: setstage, current: props.stageController["2"]||props.stageController["3"] },
        { id:"3",name: 'Stage 3 ', href:setstage, current: props.stageController["3"] },
      ]
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex flex-wrap items-center space-x-4">
        <div>
        <li>
          <div>
            <a href="/activities" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        </div>
        <div className='flex flex-row'>
        {pages.map((page) => (
           
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <a
                onClick={()=>{
                    if(page.current){
                        page.href(page.id)


                    }
                    else{
                        window.alert("Please complete previous stages before moving forwards.")
                    }
                }}
                
                className={`ml-4 text-sm font-medium ${page.current?"text-mq-lightred":"text-gray-400 "} ${page.current?"hover:text-white cursor-pointer":"hover:text-white cursor-pointer cursor-not-allowed"} `}
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
        </div>
        
      </ol>
    </nav>
  )
}

export default Breadcrumbs