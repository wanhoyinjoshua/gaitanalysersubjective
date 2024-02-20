import React from 'react'
import { useState,useEffect,useContext } from 'react'
import {insights_props} from"../interface/interface"
import Insights_renderer from './Insights_renderer'
import {importedJsonfileContext} from './analyser/Context'
const Insights = (props:any) => {
  const context = useContext(importedJsonfileContext);
    function getfinalist(){
        //have list of objects like this 
        //[{"id":.,"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"]}]
        //I need to find per kinematic deviation, what is the impairment list...
        //this time creating an object might make sense
        // use selected observation and then loop through it, then include the impairments 
        console.log(props)

        var finallist:any=[]

        context.selected_observations.forEach((element:any)=>{
            //element is the index of the original observation list 
            // need to find 
            var finalised_kinematic_deviation:any={"kinematic":context.json.kinematic_deviations.filter((x:any)=>x.id==element)}
           
            var allpossibleimpairments=finalised_kinematic_deviation["kinematic"][0]["possible_impairments"]
        
            var newselectedimpairment= context.selectedimpairment.concat(context.skippedimpairments)
          
            var deviation_impaairment:any=[]
            allpossibleimpairments.forEach((impairment_id:any)=>{
              var filtered= newselectedimpairment.filter((e:any)=>{
               
                
                return e["id"]==impairment_id


              })
           
              deviation_impaairment.push(filtered[0])
              

            })



            var identifiedimpairments:any=[]

           
            
            deviation_impaairment.forEach((impairment:any)=>{
               
                   
                    var treatmentideas:any=[]
                    if(impairment['treatment']){
                      impairment['treatment'].forEach((e:any)=>{
                        
                       
                        treatmentideas.push(context.json.treatments.filter((x:any)=>x.id==e)[0])

                    })
                      

                    }
                   
                    impairment["treatmentideas"]=treatmentideas

                    //impairment["treatment"]=impairment["treatment"].map((e)=>{return treatmentlist[e]})
                    
                    if(impairment["status"]==true){
                      identifiedimpairments.unshift(impairment,1)

                    }
                    
                    else{
                      identifiedimpairments.push(impairment)

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
        Analyse again
      </a>
      
    </div>
  </div>

    {finalist.map((insight:any)=>{

        return<div key={JSON.stringify(insight)}>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
  
</div>
        
          
            <Insights_renderer list={insight} ></Insights_renderer>

            </div>
    })}
    
    </div>
  )
}

export default Insights