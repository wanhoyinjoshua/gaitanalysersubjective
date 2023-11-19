import React from 'react'

const Box = (props:any) => {
  return (
    <div

  className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

  <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
        {props.title}
      </h3>

      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
  <dl className="-my-3 divide-y divide-gray-100 text-sm">
    <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-1 sm:gap-4"
    >
      <dt className="font-medium text-gray-900">Impairments</dt>
      {props.list['impairments'].map((e:any)=>{
        if(e.status==true){
          return <dd key={e[0]}className="font-medium text-gray-900">{JSON.stringify(e.impairment)}</dd>


        }else{
          return <dd key={e[0]}className="font-medium text-red-500 line-through ">{JSON.stringify(e.impairment)}</dd>

        }
       
      })}
     
    </div>
    </dl>
    </div>

      
    </div>

    
  </div>

  

  
</div>
  )
}

export default Box