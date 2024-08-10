import React from 'react'
import {useState,useContext} from "react"
import {importedJsonfileContext} from '../../analyser/Context'
import { id2deviation,id2impairment } from './utils/id_2_deviation_label';
import StageDescription from '../common/components/StageDescription';
import { Disclosure } from '@headlessui/react'
import { selectedImpairment } from '../common/models/selectedimpairment';
import useImpairmentList from './hooks/useImpairmentList';
import TestPanel from './components/TestPanel';
const Testing = (props:any) => {
    /*
    This component is responsible for 
    1,computing the selected impairments from selected kinematic deviations
    2,render the tests for each impairment
    3,keep track of the impairment counts
    4,keep track of status / progress
    5,inform the parent component when to proceed to stage 3

    @Input is the selected kinematic deviations
    @Input is the impairment list
    need to compute selected impairments


    

    */
   
    const context = useContext(importedJsonfileContext);
    const [selectedimpairment,setSelectedImpairment]=useImpairmentList()
    const [backDisabled,setBackDisabled]=useState(false)
    

   //I need to keep track of the number, and everytime I go back 
   //I need to keep an index...
    
   
    const [impairmentcount,setimpairmentcount]=useState(context.stage2history)
    console.log(impairmentcount)

    
    //another idea is to create a copy of the impairmentlist and only display the filter?
    function resetImpairment(resetList:number[]){
       
        var oldlist=selectedimpairment as selectedImpairment[]
        oldlist[impairmentcount[impairmentcount.length-2]].skipped_element=[]
        
        resetList.forEach((index:number)=>{
           
            oldlist[index].skipped_element=[]
            oldlist[index].skip_status=false

        })
        const setFunction:any=setSelectedImpairment
        setFunction([...oldlist])


    }
    function reverse(){
        var currentIndex=impairmentcount[impairmentcount.length-1]
        var temp_selectedimp =selectedimpairment as selectedImpairment[]
        if(currentIndex==0){
            //at starting position
            //set disabled style 
            setBackDisabled(true)
        }else{

            resetImpairment(temp_selectedimp[impairmentcount[impairmentcount.length-2]].skipped_element)
            var newcount=impairmentcount
            newcount.pop()
            setBackDisabled(false)

            setimpairmentcount([...newcount])


        }
       
      
       
    }

    function currentImp(){
        return (selectedimpairment as selectedImpairment[])[impairmentcount[impairmentcount.length-1]]
    }

    function ProgressValue(){
        var item=impairmentcount[impairmentcount.length-1]
        return Math.round((item/selectedimpairment.length)*100)

    }
    
    
if(currentImp()){
    return (
        <section className=' '>
           
            
        <div>
        <div className="-space-y-px rounded-md bg-mq-rice">
    
    
    <div className="border-b border-gray-200 bg-mq-rice ">
    <StageDescription 
      stageno={'2'} 
      header={'Testing'} 
      description={'Please select the most appropriate option for each impairment according to your testing results.'} 
      
      
      buttonMode={false}
      
      
      />
    
    
    
    </div>
    <div className=''>
    <div className="overflow-hidden rounded-full bg-gray-200">
    
      <div className="h-2 rounded-full bg-mq-lightred transition-width duration-300 ease-in-out" style={{ width: `${ProgressValue()}%` }} />
    </div>
    <Disclosure>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
          Selected Kinematic Deviations, click to toggle
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
           
        {id2deviation(context.selected_observations,context.json.kinematic_deviations).map((e:any)=>{
            
            return <li className="flex w-full justify-between  bg-purple-50 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
             key={JSON.stringify(e)}>{e.label}</li>
    
        
    
    
    })}
         
        
          </Disclosure.Panel>
        </Disclosure>
    </div>
    
  
    
    {currentImp()&&
    <TestPanel 
    impairment={currentImp()} 
    selectedImpairment={selectedimpairment as selectedImpairment[]}
    setSelectedImpairment={setSelectedImpairment}
    impairmentcount={impairmentcount}
    
    setimpairmentcount={setimpairmentcount}
    reverse={reverse} 
    backDisabled={backDisabled}
    reverse_boolean={false}/>
    }

    
    
    
    
    
    
    
    </div>
    <div>
    
    
        
        <ol>
    
       
       
         </ol>
       
       
       
    
         
    
    </div>
    
        </div>
    
    
    </section>
      )

}

else{
    return<div>Error page</div>
}
   
  
}

export default Testing