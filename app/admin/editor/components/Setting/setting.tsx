import React from 'react'
import { useContext } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { downloadExcelWorkbook } from '../../utils/excelReadOut'
import { downloadJson } from '../../utils/excelReadOut'
import { consumeExcel } from '../../utils/excelReadOut'
const Setting = () => {
    const context= useContext(editorJsonfileContext)
    
  return (
    <div className='bg-cyan-100 p-5'>
      
       Please enter the unique identifier for this task. this will be used to retreive images from server.
        <input  value={context.settings.label}
        onChange={(e)=>{context.setSetting({"id":context.settings.id,"label":e.target.value})}}></input>

    <section>
      <button onClick={()=>{
        downloadExcelWorkbook(context.kinematic_deviations,context.impairments,context.treatments,context.settings,context.settings.label)
      }}>Download Excel not recommended</button>
      <br></br>
      <button
      onClick={()=>{
        downloadJson(context.kinematic_deviations,context.impairments,context.treatments,context.settings,context.settings.label)
      }}
      >Download JSON  recommended</button>
      
    </section>
    </div>
  )
}

export default Setting