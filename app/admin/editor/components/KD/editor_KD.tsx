import { KinDeviation } from '@/app/components/analyser/common/models/kinematic_deviation'
import { KDaction } from '../../utils/reducers/kdReducer'
import { useContext, useState } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { findIndexfromId } from '../../utils/findIndexfromid'
import React from 'react'

import { useEffect } from 'react'
import { text } from 'stream/consumers'

const editor_KD = (props:any) => {
 
  const context=useContext(editorJsonfileContext)
  const [KdIndex,setKdindex]=useState<any|number>(null)
  const [newKD,setNewKd]=useState("")
 function current(){
  return context.kinematic_deviations[findIndexfromId(context.kinematic_deviations,KdIndex)]
 }
  return (
    <div className='flex'>
      <div className='w-1/2 '>
      <input type='text' value={newKD} onChange={(e)=>{setNewKd(e.target.value)}}></input>
      <button onClick={()=>{
        context.dispatchKd({
          type:"add",
          text:newKD
          
          

        })

      }}>
        Add KD
      </button>
      {context.kinematic_deviations.map((kd)=>{
        return (
          <section key={kd.id}>
        <div 
          >
            
            {kd.label}
          
          
          </div>
          <button onClick={()=>{setKdindex(kd.id)}}>
            Edit
          </button>
          <button onClick={()=>{
            
            context.dispatchKd({
              type:"delete",
              id:kd.id
              
              
    
            })
    


          }}>
            Delete
          </button>
          </section>)
      })}
      </div>

      {context.kinematic_deviations.length>0&&findIndexfromId(context.kinematic_deviations,KdIndex)!=-1&&


<div className='w-1/2 '>
        Panel
        <br></br>
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Kinematic Deviation
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="username" type="text" placeholder="Username"
      value={context.kinematic_deviations[findIndexfromId(context.kinematic_deviations,KdIndex)].label}
      onChange={(e)=>{
        var text=e.target.value
        console.log(text)
        
        context.dispatchKd({
          type:"change",
          id:KdIndex,
          text:text
          

        })

      }}
      />

      <div>
        {context.impairments.map((imp)=>{
           if(current().possible_impairments.includes(imp.id)){
            return <div 
            className='bg-green-100'
            onClick={()=>{
              context.dispatchKd({
                type:"removeimp",
                id:KdIndex,
                imp_index:imp.id
                
      
              })

            }}
            
            
            >{imp.impairment}</div>
          }
})}
      

      </div>

      <div>
        {context.impairments.map((imp)=>{
          if(current().possible_impairments.includes(imp.id)==false){
            return <div
            onClick={()=>{
              context.dispatchKd({
                type:"addimp",
                id:KdIndex,
                imp_index:imp.id
                
      
              })

            }}
            >{imp.impairment}
            
            </div>
          }
          
})}
      

      </div>





      


    </div>
      </div>
      
      
      
      }
      {KdIndex==null?<div>Nothing is selected</div>:null}
      {findIndexfromId(context.kinematic_deviations,KdIndex)==-1?<div>wrong index</div>:null}
      
    </div>
  )
}

export default editor_KD