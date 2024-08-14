import React, { useState } from 'react'
import { useContext } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { downloadExcelWorkbook } from '../../utils/excelReadOut'
import { downloadJson } from '../../utils/excelReadOut'
import { consumeExcel } from '../../utils/excelReadOut'
import { tableGenerator } from '../../utils/tableGenerator'
const Setting = () => {
    const context= useContext(editorJsonfileContext)
    const [table,setTableHtml]=useState({__html:`<div>Click generate to see table</div>`})

    
  return (
    <div className='bg-cyan-100 p-5'>
      
       Please enter the unique identifier for this task. this will be used to retreive images from server.
       
        <input 
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         value={context.setting.label}
        onChange={(e)=>{context.setSetting({"id":context.setting.id,"label":e.target.value})}}></input>

    <section>
      <button onClick={()=>{
        downloadExcelWorkbook(context.kinematic_deviations,context.impairments,context.treatments,context.setting,context.setting.label)
      }}>Download Excel not recommended</button>
      <br></br>
      <button

      className='mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={()=>{
        downloadJson(context.kinematic_deviations,context.impairments,context.treatments,context.setting,context.setting.label)
      }}
      >Download JSON  recommended</button>
      <br></br>

      <button className='mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={async ()=>{

        await window.navigator.clipboard.write(
[
          new ClipboardItem({
           
            "text/html": new Blob([tableGenerator(context.kinematic_deviations,context.impairments,context.treatments)
            ], { type: "text/html" }),
          })
        ]
          
        
        
        );
        window.alert("Copied to Clipboard, you can now copy to word")
        setTableHtml(
          {__html:tableGenerator(context.kinematic_deviations,context.impairments,context.treatments)


          })
        
        }
        
        }>Generate table</button>
      <div dangerouslySetInnerHTML={table}></div>
    </section>
    </div>
  )
}

export default Setting