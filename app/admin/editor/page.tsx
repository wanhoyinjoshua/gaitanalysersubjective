'use client'
import React, { useState } from 'react'
import { Dialog} from '@headlessui/react'
import { jsonprops } from '@/app/components/analyser/interface'
import { Disclosure } from '@headlessui/react'
import { consumeExcel,consumeJson } from './utils/excelReadOut'
import { useEffect,useContext } from 'react'
import { kDReducer ,KDActionKind,initilKDstate} from './utils/reducers/kdReducer'
import { ImpReducer,ImpActionKind,initilImpstate } from './utils/reducers/impReducer'
import { TxActionKind,initilTxstate,txReducer} from './utils/reducers/txReducer'
import { editorJsonfileContext } from '../Context'
import { useReducer } from 'react';
import Editor_KD from './components/KD/editor_KD'
import Editor_Imp from './components/Impairments/Editor_Imp'
import Editor_Tx from './components/Treatment/editor_tx'
import { jsondatacheck } from '@/app/utils/datacheck'
import Analyser2 from '@/app/components/analyser/Analyser copy'
import { KinDeviation } from '@/app/components/analyser/common/models/kinematic_deviation'
import Setting from './components/Setting/setting'
const page = () => {
    //I probably need to learn how to write a reducer here....
    const[view,setView]=useState(1)
    
    const [kd, dispatchKd] = useReducer(kDReducer, initilKDstate);
    const [imp, dispatchImp] = useReducer(ImpReducer, initilImpstate);

    const [tx, dispatchTx] = useReducer(txReducer, initilTxstate);
    const [settings,setSetting]=useState({"id":0,"label":"testing"})
    let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  
    //thr context here will have to be the state...
    //I will still need event handlers
   

    var context={
      view:1,
      setView:setView,
    treatments:tx,
    dispatchTx:dispatchTx,
    dispatchKd:dispatchKd,
    kinematic_deviations:kd,
    impairments:imp,
    dispatchImp:dispatchImp,
    setting:settings,
    setSetting:setSetting

    }

  return (
    <div>
      <section className='h-[10vh]'>
      <span className="isolate inline-flex rounded-md shadow-sm">
     
      <button
      onClick={()=>setView(1)}
        type="button"
        className={`relative inline-flex items-center rounded-l-md ${view==1?"bg-green-100":"bg-white"} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-green-50 focus:z-10`}
      >
        KD view
      </button>
      <button
      onClick={()=>setView(2)}
        type="button"
        className={`relative -ml-px inline-flex items-center ${view==2?"bg-green-100":"bg-white"} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-green-50 focus:z-10`}
      >
        Impairment view 
      </button>
      <button
      onClick={()=>setView(3)}
        type="button"
        className={`relative -ml-px inline-flex items-center rounded-r-md ${view==3?"bg-green-100":"bg-white"} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-green-50 focus:z-10`}
      >
        Treatment View
      </button>
      <button
      onClick={()=>setView(4)}
        type="button"
        className={`relative -ml-px inline-flex items-center rounded-r-md ${view==4?"bg-green-100":"bg-white"} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-green-50 focus:z-10`}
      >
        Settings page
      </button>
      <button
      onClick={()=>setView(5)}
        type="button"
        className={`relative -ml-px inline-flex items-center rounded-r-md ${view==4?"bg-green-100":"bg-white"} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-green-50 focus:z-10`}
      >
        Playground
      </button>
    </span>
    <br></br>
    JSON import - recommended
        <input type="file" 
        
        accept='.json'
        onChange={async (e)=>{
          
           var json= await consumeJson(e)
           if(jsondatacheck(json)){
            setSetting(json.setting)
            dispatchKd(
             // "action" object:
             {
                 type: KDActionKind.SET,
                 entirelist: json.kinematic_deviations
             }
           );
           dispatchImp({
             type:ImpActionKind.SET,
             entirelist: json.impairments
 
           })
           dispatchTx({
             type: TxActionKind.SET,
             entirelist: json.treatments,
             
           })

           }else{
            window.alert("data file is not valid")
            return
           }
          

          
            }} 
            
            />
    <br></br>
    {/* <Disclosure>
      <Disclosure.Button className="py-2">
        Upload data file with json-recommended or excel, click to expand
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">
        <section>
  

            Excel import- legacy

            <input type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={async (e)=>{

              const data= await consumeExcel(e)
              dispatchKd(
                // "action" object:
                {
                    type: KDActionKind.SET,
                    entirelist: data.kinematic_deviations
                }
              );
              dispatchImp({
                type:ImpActionKind.SET,
                entirelist: data.impairments
    
              })
              dispatchTx({
                type: TxActionKind.SET,
                entirelist: data.treatments,
                
              })

              console.log(data.setting)
              console.log("shit")

              setSetting(data.setting)

            }}    />  
        </section>
      </Disclosure.Panel>
    </Disclosure> */}
    
     
    </section>
 
      <section className='h-[90vh]'>
            <editorJsonfileContext.Provider value={context}>
              {view==1&&<Editor_KD
           KdIndexInitial={kd.length&&kd[0].id}
           ></Editor_KD>}

           {view==2&&<Editor_Imp
           ImpIndexInitial={imp.length&&imp[0].id}
           ></Editor_Imp>}


          {view==3&&<Editor_Tx></Editor_Tx>}

          {view==4 &&<Setting></Setting>}
          {view==5 &&<Analyser2 key="hi" 
          json={
            {
            treatments:tx,
            kinematic_deviations:kd,
            impairments:imp,
            setting:settings,
            }
            

          }></Analyser2>}


           



           
           
        
            

            </editorJsonfileContext.Provider>
            </section>
    </div>
  )
}

export default page