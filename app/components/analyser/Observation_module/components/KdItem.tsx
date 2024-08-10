import React from 'react'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { KdItemprops } from '../../interface';
const KdItem = (props:KdItemprops) => {
  return (
    <div>
    <label key={props.index} htmlFor= {`${props.deviation.label}_${props.index}`}>
    <div key={props.index} className="relative flex items-start py-4">
      <div className={` min-w-0 flex-1 text-sm leading-6`}>
        <div className={`p-5 ${props.selected_observations.includes(props.deviation.id)?"bg-mq-lightred/10":"bg-white"} cursor-pointer  select-none font-medium text-gray-900 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
       {props.selected_observations.includes(props.deviation.id)?<CIcon icon={icon.cilCheckCircle} size="xxl" className="h-6 w-6"/>:null}
          {props.deviation.label} 
          
        </div>
      </div>
      <div className="ml-3 flex h-6 items-center">
     
        <input
        id={`${props.deviation.label}_${props.index}`}
        name={`${props.deviation.label}_${props.index}`}
          onChange={(event)=>{
              const isChecked = event.target.checked;
              console.log(props.index)
              if(isChecked && props.selected_observations.indexOf(props.deviation.id)==-1){
                  //SET TO STATE
                  var newselect= [...props.selected_observations]
                  newselect.push(props.deviation.id)
                  
                  props.setObservations([...newselect])
            


              }
              else if (isChecked==false){
                  if(props.selected_observations.indexOf(props.deviation.id)!=-1){
                      var newlist=[]
                      newlist=[...props.selected_observations]
                      newlist.splice(props.selected_observations.indexOf(props.deviation.id),1)
                      props.setObservations([...newlist])


                  }

              }
              
          }}
         
          type="checkbox"
          className="sr-only h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
    </div>
    </label>
    </div>
  )
}

export default KdItem