import { KinDeviation } from '@/app/components/analyser/common/models/kinematic_deviation'
import { KDaction } from '../../utils/reducers/kdReducer'
import { useContext, useState } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { findIndexfromId } from '../../utils/findIndexfromid'
import LeftPanel from '../common/LeftPanel'
import React from 'react'
import { customSearch } from '../../utils/customSearch'
import { useEffect } from 'react'
import { text } from 'stream/consumers'
import ToolTip from '@/app/components/ui/ToolTip'
import CheckBox from '@/app/components/ui/CheckBox'

const Editor_KD = (props:any) => {
 
  const context=useContext(editorJsonfileContext)
  const [KdIndex,setKdindex]=useState<any|number>(context.kinematic_deviations[0].id)
  const [newKD,setNewKd]=useState("")
  const [userWord,setUserword]=useState("")
 function current(){
  return context.kinematic_deviations[findIndexfromId(context.kinematic_deviations,KdIndex)]
 }

 function inSearch(word:string){
  if(customSearch(userWord,word)){
    
  }

 }

  return (
    <div className='flex h-[90vh]'>
      <LeftPanel 
      activeIndex={KdIndex}
      newItem={newKD} 
      setNewItem={setNewKd} 
      dispatchItemadd={ context.dispatchKd} 
      addLabeltext={'KD'} 
      itemList={context.kinematic_deviations} 
      itemLabelName={'label'} 
      setViewItem={setKdindex} 
      dispatchdeleteItem={context.dispatchKd}
      purge={null}
      reorderFunction={context.dispatchKd}
      >
        
      </LeftPanel>
  

      {context.kinematic_deviations.length>0&&current()&&current().id!=null&&findIndexfromId(context.kinematic_deviations,KdIndex)!=-1&&


<div className='w-1/2 max-h-screen overflow-y-scroll '>
       
        
        <div className="mb-4">
          <section className='bg-cyan-100 p-5'>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        You can edit the words of your selected kinematic Deviation below
      </label>
      <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
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
      </section> 

<section className='bg-pink-100'>
<ToolTip text={'You assign the imp to the KD by clicking on it,(if it is highlighted in green, it is assigned, vice versa. You can also search and filter for imp by typing in the search box.'} label={'Select impairments related to your kinematic deviation here,hover for more'}></ToolTip>

<input className=" sticky top-0 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  placeholder='Search for impairments by keyword' onChange={(e)=>setUserword(e.target.value)}></input>
      <div className=' p-5 bg-slate-50'>
     
      
        {context.impairments.map((imp)=>{
           if(current().possible_impairments.includes(imp.id) ){
            return <div 
            key={imp.id}
            className='bg-green-100 mt-5 cursor-pointer'
            onClick={()=>{
              context.dispatchKd({
                type:"removeimp",
                id:KdIndex,
                imp_index:imp.id
                
      
              })

            }}
            
            
            >
              <CheckBox text={imp.impairment} booleanval={true}></CheckBox>
            
            </div>
          }
})}

      </div>

      <div className='overflow-y-scroll p-5 bg-slate-50'>
        {context.impairments.map((imp)=>{
          if(current().possible_impairments.includes(imp.id)==false && customSearch(userWord,imp.impairment)){
            return <div
            key={imp.id}
            className='mt-5 cursor-pointer'
            onClick={()=>{
              context.dispatchKd({
                type:"addimp",
                id:KdIndex,
                imp_index:imp.id
                
      
              })

            }}
            >
              <CheckBox text={imp.impairment} booleanval={false}></CheckBox>
              
            
            </div>
          }
          
})}
      

      </div>


      {JSON.stringify(context.kinematic_deviations)}


</section>

      


    </div>
      </div>
      
      
      
      }
     
    </div>
  )
}

export default Editor_KD