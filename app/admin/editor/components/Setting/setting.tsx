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
       
        <input  value={context.setting.label}
        onChange={(e)=>{context.setSetting({"id":context.setting.id,"label":e.target.value})}}></input>

    <section>
      <button onClick={()=>{
        downloadExcelWorkbook(context.kinematic_deviations,context.impairments,context.treatments,context.setting,context.setting.label)
      }}>Download Excel not recommended</button>
      <br></br>
      <button
      onClick={()=>{
        downloadJson(context.kinematic_deviations,context.impairments,context.treatments,context.setting,context.setting.label)
      }}
      >Download JSON  recommended</button>

      <button onClick={async ()=>{

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