
import React, { useState, useEffect } from 'react';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import Box from '../Box'

const Analyser = (props) => {
    const [kinematic_deviation,setKinematic]=useState([])
    const [impairmentlist,setImpairmentlist]=useState([])
    const [selectedimpairment,setSelectedImpairment]=useState([])
    const [impairmentcount,Setimpairmentcount]=useState(0)
    const [treatmentlist,setTreatmentlist]=useState([])
    const [selected_observations,setObservations]=useState([])
    const [observation_phase,setObservationphase]=useState(true)
    const [testingphase,setTestingPhase]=useState(false)
    const [insightsphase,setInsightsPhase]=useState(false)
    const[finalist,setFinalist]=useState([])
    //ankle =0
    //genere = 0 is strength 1 is coordination, 2 is part task , 3 is whole task 

    useEffect(()=>{
        setKinematic(props.json["kinematic_deviations"])
        setImpairmentlist(props.json["impairments"])
        setTreatmentlist(props.json["treatments"])

       

    },[props])

 

    function getpotentialimpairments(){
        var selectedimpairment=[]
        impairmentlist.forEach((element,index) =>{
            const values = element["kinematic_deviations"];
            console.log(values)
            if (values){
                const filteredValues = values.filter(value => selected_observations.includes(value));
        
                if (filteredValues.length > 0) {
                    selectedimpairment.push({"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"]})
                }
            }
        }
        
        );

        setSelectedImpairment([...selectedimpairment])
        console.log([...selectedimpairment])


        //need to filter the impairment list
        setObservationphase(false)
        setTestingPhase(true)


    }

    function getfinalist(){
        //have list of objects like this 
        //[{"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"]}]
        //I need to find per kinematic deviation, what is the impairment list...
        //this time creating an object might make sense
        // use selected observation and then loop through it, then include the impairments 
        var finallist=[]
        selected_observations.forEach((element)=>{
            //element is the index of the original observation list 
            var finalised_kinematic_deviation={"kinematic":kinematic_deviation[element]}
            var identifiedimpairments=[]
            selectedimpairment.forEach((impairment)=>{
                if(impairment["kinematic_deviations"].includes(element)){
                    console.log(impairment["treatment"])
                    var treatmentideas=[]
                    impairment['treatment'].forEach((e,index)=>{
                        
                        console.log(treatmentlist[e])
                        treatmentideas.push(treatmentlist[e])

                    })
                    impairment["treatmentideas"]=treatmentideas
                    //impairment["treatment"]=impairment["treatment"].map((e)=>{return treatmentlist[e]})
                    identifiedimpairments.push(impairment)



                }

            })
            finalised_kinematic_deviation["impairments"]=identifiedimpairments
            
            finallist.push(finalised_kinematic_deviation)
        })
        
        setTestingPhase(false)
        setInsightsPhase(true)
        return finallist
        }
    
    
    
        function classNames(...classes) {
            return classes.filter(Boolean).join(' ')
          }

          

  return (
    <div>
         {observation_phase&&
        <div className="-space-y-px rounded-md bg-white px-5">

        <fieldset>
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Step 1 </h3>
          <p className="mt-1 text-sm text-gray-500">
            Observations
          </p>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          <button
            type="button"
            onClick={getpotentialimpairments}
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Done!
          </button>
        </div>
      </div>
    </div>
      <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        {kinematic_deviation.map((e,index)=>(
             <label key={e} htmlFor= {`${e.label}_${index}`}>
          <div key={e} className="relative flex items-start py-4">
            <div className={` min-w-0 flex-1 text-sm leading-6`}>
              <div className={`p-5 ${selected_observations.includes(index)?"bg-green-50":""} cursor-pointer  select-none font-medium text-gray-900 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
             {selected_observations.includes(index)?<CIcon icon={icon.cilCheckCircle} size="xxl" className="h-6 w-6"/>:null}
                {e.label}
              </div>
            </div>
            <div className="ml-3 flex h-6 items-center">
           
              <input
              id={`${e.label}_${index}`}
              name={`${e.label}_${index}`}
                onChange={(e)=>{
                    const isChecked = e.target.checked;
                    console.log(index)
                    if(isChecked && selected_observations.indexOf(index)==-1){
                        //SET TO STATE
                        var newselect= [...selected_observations]
                        newselect.push(index)
                        
                        setObservations([...newselect])
                        console.log(selected_observations)
   
   
                    }
                    else if (isChecked==false){
                        if(selected_observations.indexOf(index)!=-1){
                            var newlist=[]
                            newlist=[...selected_observations]
                            newlist.splice(selected_observations.indexOf(index),1)
                            setObservations([...newlist])
   
   
                        }
   
                    }
                    
                }}
               
                type="checkbox"
                className="sr-only h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
          </label>
        ))}
      </div>
    </fieldset>
       
         
       
      </div>
}
       
        
       
        {testingphase&&selectedimpairment&&selectedimpairment[impairmentcount]&&
        <section className=' '>
            <div>
            <div className="-space-y-px rounded-md bg-white px-5">

<fieldset>
<div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
<div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
<div className="ml-4 mt-4">
  <h3 className="text-base font-semibold leading-6 text-gray-900">Step 2 </h3>
  <p className="mt-1 text-sm text-gray-500">
    Testing
    
  </p>
  
  
  
</div>


</div>
</div>
<div className=''>
<div className="overflow-hidden rounded-full bg-gray-200">
 
          <div className="h-2 rounded-full bg-indigo-600 transition-width duration-300 ease-in-out" style={{ width: `${Math.round((impairmentcount/selectedimpairment.length)*100)}%` }} />
</div>
</div>
<div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">

</div>
</fieldset>
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-lg sm:p-6">
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                        <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        
                        >
                            <span className="sr-only">Close</span>
                           
                        </button>
                        </div>
                        <div className="sm:flex sm:items-start">
                        
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {selectedimpairment[impairmentcount]["key"]}
                            </h3>
                            <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Testing Stragety:<br></br>
                            {selectedimpairment[impairmentcount]["testing"]}
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button className="inline-flex w-full justify-center rounded-md bg-blue-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={()=>{
                if(impairmentcount+1==selectedimpairment.length){
                    //return
                    //convert selectedimpairment to a list of kinematic deviations with imapirments
                    console.log("hi")
                    setTestingPhase(false)
                    console.log(getfinalist())
                    setInsightsPhase(true)
                    setFinalist([...getfinalist()])

                    
                    return
                }
                var newlist=[...selectedimpairment]
                newlist[impairmentcount]["status"]=true
                console.log(newlist)
                setSelectedImpairment([...newlist])
                Setimpairmentcount((prev)=>{
                    return prev+1
                })

            }}>Yes</button>
              <button  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{
                if(impairmentcount+1==selectedimpairment.length){
                    //return
                    //convert selectedimpairment to a list of kinematic deviations with imapirments
                    console.log("hi")
                    setTestingPhase(false)
                    console.log(getfinalist())
                    setInsightsPhase(true)
                    setFinalist([...getfinalist()])

                    
                    return
                }
                Setimpairmentcount((prev)=>{
                    return prev+1
                })

            }}>No</button>
                        
                        
                        </div>
                    </div>

 

</div>
        <div>
           
           
           
          
             <button onClick={()=>{
                Setimpairmentcount((prev)=>{
                    return prev-1
                })

            }}>Previous</button>

        </div>

            </div>
     

    </section>}

    {insightsphase&&finalist&&
    <div>
        <div className="p-10 ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Step 3 </h3>
          <p className="mt-1 text-sm text-gray-500">
            insights
          </p>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          <a
          href='/version'
            
            onClick={()=>{

            }}
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Analyse again
          </a>
        </div>
      </div>
  
        {finalist.map((insight)=>{

            return<div key={JSON.stringify(insight)}>
                <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      
    </div>
                <Box list={insight}></Box>

                </div>
        })}
        
        </div>}
        
    
       
        


    </div>
  )
}

export default Analyser