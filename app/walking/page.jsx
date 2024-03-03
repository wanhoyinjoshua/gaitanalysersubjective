'use client'
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react';
import Analyser from '../components/analyser/Analyser';
import Analyser2 from "../components/analyser/Analyser copy"
import json from "../jsonfiles/jsonstore.json"
import stancejson from "../jsonfiles/stance_walking.json"
import jsonstore from '../jsonfiles/jsonstore.json'
import test_swing from '../jsonfiles/test_swing.json'
import revised_test_swing_17_02_2024 from "../jsonfiles/revised_test_swing_17_02_2024.json"
import test_stance from "../jsonfiles/test_stance.json"
import * as icon from '@coreui/icons';



const Page = () => {
  const [view,setView]=useState([
    { name: 'Stance', href: '#', current: true },
    { name: 'Swing', href: '#', current: false },
   
  ])
  
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <div className='relative'>
      <section className="fixed top-0 left-0 right-0 z-50 ">
      <div>
      
      <div className="block">
        <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
          {view.map((tab, tabIdx) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === view.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
              onClick={()=>{
                if(tab.name=="Swing"){
                  var newview=[
                    { name: 'Stance', href: '#', current: false },
                    { name: 'Swing', href: '#', current: true },
                   
                  ]
                  setView([...newview])

                }
                else{
                  var newview=[
                    { name: 'Stance', href: '#', current: true },
                    { name: 'Swing', href: '#', current: false },
                   
                  ]
                  setView([...newview])

                }
              }}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'bg-mq-lightred' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-3'
                )}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
      </section>
       <div className={view[0].current==true?"pt-12":"hidden"}>
       <Analyser  key="component1" json={stancejson}></Analyser>

       </div>
   
       <div className={view[0].current==false?"pt-12":"hidden"}>
       
       <Analyser2   key="componen1" json={revised_test_swing_17_02_2024}></Analyser2 >

       </div>
    

    </div>
  )
}

export default Page