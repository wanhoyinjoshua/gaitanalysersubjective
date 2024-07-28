'use client'
import React, { useState } from 'react'
import { jsonprops } from '@/app/components/analyser/interface'
import { consumeExcel,consumeJson } from './utils/excelReadOut'
import { useEffect,useContext } from 'react'
import { kDReducer ,KDActionKind,initilKDstate} from './utils/reducers/kdReducer'
import { ImpReducer,ImpActionKind,initilImpstate } from './utils/reducers/impReducer'
import { TxActionKind,initilTxstate,txReducer} from './utils/reducers/txReducer'
import { editorJsonfileContext } from '../Context'
import { useReducer } from 'react';
import Editor_KD from './components/KD/editor_KD'
import Editor_Imp from './components/Impairments/Editor_Imp'


import { KinDeviation } from '@/app/components/analyser/common/models/kinematic_deviation'
const page = () => {
    //I probably need to learn how to write a reducer here....
    const[view,setView]=useState(1)
    
    const [kd, dispatchKd] = useReducer(kDReducer, initilKDstate);
    const [imp, dispatchImp] = useReducer(ImpReducer, initilImpstate);

    const [tx, dispatchTx] = useReducer(txReducer, initilTxstate);


  
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
    dispatchImp:dispatchImp

    }

  return (
    <div>
      <button onClick={()=>setView(1)}>KD view </button>
      <button onClick={()=>setView(2)}>Impairment view </button>
      <button onClick={()=>setView(3)}>Treatment View </button>
        <input type="file" onChange={async (e)=>{
           var json=await consumeJson(e)
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

          
            }} 
            
            />
      
            
            <editorJsonfileContext.Provider value={context}>
              {view==1&&<Editor_KD
           KdIndexInitial={kd.length&&kd[0].id}
           ></Editor_KD>}

           {view==2&&<Editor_Imp
           ImpIndexInitial={imp.length&&imp[0].id}
           ></Editor_Imp>}
           



           
           
        
            

            </editorJsonfileContext.Provider>
    </div>
  )
}

export default page