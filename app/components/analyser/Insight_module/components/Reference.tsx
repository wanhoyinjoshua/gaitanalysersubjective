import { redirect } from 'next/dist/server/api-utils'
import React from 'react'

const Reference = (props:{ref:any}) => {
        window.alert(JSON.stringify(props))
        return (props.ref.map((ref:any,index:any)=>{
            return <span  style={{ verticalAlign: 'super', fontSize: 'small' }} id="sub"><a target='_blank' href={ref}>{index+1}</a></span>
    
        })
       
      )

    
   
}

export default Reference