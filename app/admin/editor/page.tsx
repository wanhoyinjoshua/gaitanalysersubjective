'use client'
import React, { useState } from 'react'
import { jsonprops } from '@/app/components/analyser/interface'
import { consumeExcel,consumeJson } from './utils/excelReadOut'
import { useEffect,useContext } from 'react'
import { kDReducer ,KDActionKind,initilKDstate} from './utils/reducers/kdReducer'
import { ImpReducer,ImpActionKind,initilImpstate } from './utils/reducers/impReducer'
import { editorJsonfileContext } from '../Context'
import { useReducer } from 'react';
import Editor_KD from './components/KD/editor_KD'

import { KinDeviation } from '@/app/components/analyser/common/models/kinematic_deviation'
const page = () => {
    //I probably need to learn how to write a reducer here....
    
    const [kd, dispatchKd] = useReducer(kDReducer, initilKDstate);
    const [imp, dispatchImp] = useReducer(ImpReducer, initilImpstate);


  
    //thr context here will have to be the state...
    //I will still need event handlers
   

    var context={
    treatments:[],
    dispatchKd:dispatchKd,
    kinematic_deviations:kd,
    impairments:imp,
    dispatchImp:dispatchImp

    }

  return (
    <div>
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
            }} />
      
            
            <editorJsonfileContext.Provider value={context}>
              
           <Editor_KD
           KdIndexInitial={kd[0].id}
           ></Editor_KD>



           {JSON.stringify(kd)}
        
            

            </editorJsonfileContext.Provider>
    </div>
  )
}

export default page