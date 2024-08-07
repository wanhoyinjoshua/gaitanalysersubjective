'use client'
import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react';
import Analyser2 from "../components/analyser/Analyser copy"
import { isConsent } from '../utils/storage/storage';
import Modal from "../components/modal/Modal"
import stance_final_15042024 from "../jsonfiles/stance_final_15042024.json"
import swing_json from "../jsonfiles/swing_data.json"
import play_dummy from "../jsonfiles/play_dummy.json"
import stance_json from "../jsonfiles/stance_data.json"



const Page = () => {
  const [view,setView]=useState([
    { name: 'Stance', href: '#', current: true },
    { name: 'Swing', href: '#', current: false },
   
  ])
  const [consentform,setForm]=useState(false)

  useEffect(()=>{
   var consent= window.localStorage.getItem("consent")
   console.log(consent)
   if(consent){
   
    setForm(true)
   }else{
  
    setForm(false)
   }

  },[consentform])


  const [open,setOpen]=useState(true)
  
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <div>
       {consentform==false&&<Modal open={open} setOpen={setOpen} link={"#"}></Modal>}
      



   
    <div className='relative bg-mq-rice'>

      <section className="fixed top-0 left-0 right-0 z-10 ">
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
       <Analyser2  key="component1" json={play_dummy}></Analyser2>

       </div>
   
       <div className={view[0].current==false?"pt-12":"hidden"}>
       
       <Analyser2  key="component1" json={swing_json}></Analyser2>

       </div>
    

    </div>
    </div>
  )
}

export default Page