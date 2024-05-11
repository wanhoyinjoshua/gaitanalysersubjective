import React from 'react'

export const InsightsPanel = (props:any) => {
    const stats = [
    { id: 1, name: 'Strength', value: `${props.str}` },
    { id: 2, name: 'Coordination', value: `${props.coor}`},
    { id: 3, name: 'Others', value: `${props.others}` }
   
  ]
    return (
       
            <div className="mx-auto max-w-2xl lg:max-w-none">
            <dl className="mt-8 mb-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}%</dd>
                  </div>
                ))}
              </dl>
            
            </div>
       
      )
}

export default InsightsPanel