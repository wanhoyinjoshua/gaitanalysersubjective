import React from 'react'
import { useContext } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
const Setting = () => {
    const context= useContext(editorJsonfileContext)
  return (
    <div>
       
        <input value={context.settings.label}
        onChange={(e)=>{context.setSetting({"id":context.settings.id,"label":e.target.value})}}></input>

    </div>
  )
}

export default Setting