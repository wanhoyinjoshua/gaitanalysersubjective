import React from 'react'
import { LightBulbIcon } from '@heroicons/react/20/solid'
const TopTip = (props:{text:string}) => {
    //I need to process the string 
    if(props.text.includes("TOP TIP:")){
      
        //now run a for loop and then 
        var temparr=props.text.split("TOP TIP:")
       return temparr.map((e,index)=>{
            if(index==0){
                return <span>{e}</span>
            }else{
                return <span>
                    
                    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <LightBulbIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div className="w-full flex flex-column flex-wrap  justify-between  sm:flex-row ml-3">
        <p className="text-sm text-yellow-700">
          TOP TIP:
        </p>
        <p>{e}</p>
      
      </div>
    </div>
  </div>


                </span>
            }

        })
        
       
      

    }
    else{
        return <span>{props.text}</span>
    }
 
}

export default TopTip