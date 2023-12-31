import React from 'react'
import { useState,useEffect } from 'react'
import {insights_props} from"../interface/interface"
import Insights_renderer from './Insights_renderer'
const Insights = (props:insights_props) => {
    function getfinalist(){
        //have list of objects like this 
        //[{"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"]}]
        //I need to find per kinematic deviation, what is the impairment list...
        //this time creating an object might make sense
        // use selected observation and then loop through it, then include the impairments 
        var finallist:any=[]
        props.selected_observations.forEach((element:any)=>{
            //element is the index of the original observation list 
            var finalised_kinematic_deviation:any={"kinematic":props.kinematic_deviation.filter((x:any)=>x.id==element)}
            var identifiedimpairments:any=[]
            var newselectedimpairment= props.selectedimpairment.concat(props.skippedImpairments)
            newselectedimpairment.forEach((impairment:any)=>{
                if(impairment["kinematic_deviations"].includes(element)){
                    console.log(impairment["treatment"])
                    var treatmentideas:any=[]
                    impairment['treatment'].forEach((e:any)=>{
                        
                       
                        treatmentideas.push(props.treatmentlist.filter((x:any)=>x.id==element))

                    })
                    impairment["treatmentideas"]=treatmentideas

                    //impairment["treatment"]=impairment["treatment"].map((e)=>{return treatmentlist[e]})
                    
                    if(impairment["status"]==true){
                      identifiedimpairments.unshift(impairment,1)

                    }
                    
                    else{
                      identifiedimpairments.push(impairment)

                    }
                    



                }

            })

            
            finalised_kinematic_deviation["impairments"]=identifiedimpairments
            
            finallist.push(finalised_kinematic_deviation)
        })
        
       
        return finallist
        }
    
    var finalist=getfinalist()

  return (
    <div>
    <div className="p-10 ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
    <div className="ml-4 mt-4">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Step 3 </h3>
      <p className="mt-1 text-sm text-gray-500">
        insights
      </p>
    </div>
    <div className="ml-4 mt-4 flex-shrink-0">
   
<br></br>
      <a
      href='/version'
        
        onClick={()=>{

        }}
        className=""
      >
        Analyse again hhh
      </a>
      
    </div>
  </div>

    {finalist.map((insight:any)=>{

        return<div key={JSON.stringify(insight)}>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
  
</div>
        {JSON.stringify(insight)}
          
            <Insights_renderer list={insight} ></Insights_renderer>

            </div>
    })}
    
    </div>
  )
}

export default Insights