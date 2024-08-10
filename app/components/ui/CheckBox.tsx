import React from 'react'

const CheckBox = (props:{text:string, booleanval:boolean}) => {
  return (
    <div className='cursor-pointer'><input type="checkbox" checked={props.booleanval}/> {props.text}</div>
  )
}

export default CheckBox