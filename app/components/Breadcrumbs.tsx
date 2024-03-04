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
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="/version" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
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
                        window.alert("unable")
                    }
                }}
                
                className={`ml-4 text-sm font-medium ${page.current?"text-mq-lightred":"text-gray-400"} ${page.current?"hover:text-white":"hover:text-gray-700"} `}
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs