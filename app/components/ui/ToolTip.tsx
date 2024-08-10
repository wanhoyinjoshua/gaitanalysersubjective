import React from 'react'

const ToolTip = (props:{text:string,label:string}) => {
  return (
    <div className="p-5 w-full group flex relative">
    <span className="w-full text-center bg-yellow-400 text-white px-2 py-1">{props.label}</span>
    <span className=" w-full group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute 
    left-full -translate-x-full  opacity-0 m-4 mx-auto z-50">{props.text}</span>
</div>
  )
}

export default ToolTip