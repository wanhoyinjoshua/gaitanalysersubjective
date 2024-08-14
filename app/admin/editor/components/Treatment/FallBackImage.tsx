import React from 'react'
import { useState,useEffect } from 'react'
import Image from 'next/image'

const FallBackImage = (
    
       
       props:any
       
      
) => {
    const [error, setError] = useState(null)
    useEffect(() => {
        setError(null)
      }, [props.src])
    
  return (
    <Image
    alt={"no image"}
    onError={setError}
    src={error ? "/MAST_1.png" : props.src}
    {...props}
  />
  )
}

export default FallBackImage