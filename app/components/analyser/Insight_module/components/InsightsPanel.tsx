import React from 'react'
import Radarplot from "./Radarplot"
import {Radardata} from "./radardata"
export const InsightsPanel = (props:Radardata) => {
    const stats = [
    { id: 1, name: 'Strength', value: `${0}` },
    { id: 2, name: 'Coordination', value: `${0}`},
    { id: 3, name: 'Others', value: `${0}` }
   
  ]
    return (
       
            <div className="">
              <Radarplot strength={props.strength} coor={props.coor} power={props.power} rom={props.rom} sensation={props.sensation} ex_mus_ac={props.ex_mus_ac}></Radarplot>
           
            
            </div>
       
      )
}

export default InsightsPanel