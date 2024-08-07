import React from 'react'
import { useContext } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
const Setting = () => {
    const context= useContext(editorJsonfileContext)
  return (
    <div className='bg-cyan-100 p-5'>
       Please enter the unique identifier for this task. this will be used to retreive images from server.
        <input  value={context.settings.label}
        onChange={(e)=>{context.setSetting({"id":context.settings.id,"label":e.target.value})}}></input>

    </div>
  )
}

export default Setting