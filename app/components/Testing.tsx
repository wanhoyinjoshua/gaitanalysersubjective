import React from 'react'
import {useState,useEffect} from "react"
import { testing_props,impairment } from '../interface/interface';
import ButtonPanel from './ButtonPanel';
import Concentric_ButtonPanel from "./Concentric_ButtonPanel"
import { Josefin_Sans } from 'next/font/google';
const Testing = (props:testing_props) => {
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
    const [selectedimpairment,setSelectedImpairment]=useState([...getpotentialimpairments()])
    const [skippedImpairments,setSkippedimpairments]=useState([])
    const [impairmentcount,setimpairmentcount]=useState(0)
    const [buttonstates,setButtonstates]=useState({
        default:true,
        basic_muscle_testing:false,
        eccentric_muscle_testing:false



    })
   useEffect(()=>{


    console.log(isconcentrictest())
    console.log(iseccentrictest())
    console.log(isdefaulttest())
    console.log(skippedImpairments)
        if(isconcentrictest()){
            setButtonstates(prevState => ({
                ...prevState,
                default: false,
                basic_muscle_testing:true,
                eccentric_muscle_testing:false
              }))

        }
        else if(iseccentrictest()){
            setButtonstates(prevState => ({
                ...prevState,
                default: false,
                basic_muscle_testing:false,
                eccentric_muscle_testing:true
              }))


        }
        else if(isdefaulttest()){
       
            setButtonstates(prevState => ({
              ...prevState,
              default: true,
              basic_muscle_testing:false,
              eccentric_muscle_testing:false
            }))
         
          }
        


      
      

   },[isdefaulttest(),isconcentrictest(),iseccentrictest(),impairmentcount])

    function getpotentialimpairments(){
        
          var selectedimpairment:any[]=[]
          var concentric_list=props.impairmentlist.filter(element=>element["class"].includes("concentric_str"))
          var eccentric_list=props.impairmentlist.filter(element=>element["class"].includes("eccentric_str"))
          var coord_list=props.impairmentlist.filter(element=>element["class"].includes("coor"))
          var sortedlist=[...concentric_list,...eccentric_list,...coord_list]
          var others_list=props.impairmentlist.filter((element) => !sortedlist.includes(element));
          var newlist=sortedlist.concat(others_list)
          
          newlist.forEach((element,index) =>{
              const values = element["kinematic_deviations"];
              console.log(values)
              if (values){
                  const filteredValues = values.filter(value => props.selected_deviations.includes(value));
                  const strLevel = element["str_lvl"] ?? -1;
                  if (filteredValues.length > 0) {
                    selectedimpairment.push({"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"],"class":element["class"],"physio_movements":element["physio_movements"],"str_lvl":strLevel})
  
                      
                  }
              }
          }
          
          );
          //arrange impairments here
          console.log(selectedimpairment)
          
  
          return selectedimpairment
         
  
  
          //need to filter the impairment list
         
  
  
      }
    
    
    
    function next(){
        var newstage={
            "1":false,
            "2":false,
            "3":true
        }
        props.setObservationinparent({...newstage})
    }
    function isdefaulttest(){
        if (iseccentrictest() || isconcentrictest()){
            return false

        } 
        else{
            return true
        }

    }
    function iseccentrictest(){
       return selectedimpairment[impairmentcount]["class"].includes("eccentric_str")

    }
    function isconcentrictest(){
        return selectedimpairment[impairmentcount]["class"].includes("concentric_str")

    }
    

   
  return (
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

<br></br>
<br>
</br>


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
                    {console.log(props)}

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
                {buttonstates.default==true&&
                 <ButtonPanel
                 isEccentric={false}
                 isConcentric={false}
                 isDefault={true}
                 impairmentcount={impairmentcount}
                 length_impairments={selectedimpairment.length}
                 selectedimpairment={selectedimpairment}
                 skippedimpairments={skippedImpairments}
                 setObservationinparent={next}
                 setSelectedImpairment={setSelectedImpairment}
                 setimpairmentcount={setimpairmentcount}
                 exportselectedimpairments={props.setSelected_impairment}
                 exportskippedimpairments={props.setSkipped}
                 
                 ></ButtonPanel>
                
                
                }
                {
                  buttonstates.eccentric_muscle_testing==true&&
                  <ButtonPanel
                  isEccentric={true}
                  isConcentric={false}
                  isDefault={false}
                  impairmentcount={impairmentcount}
                  length_impairments={selectedimpairment.length}
                  selectedimpairment={selectedimpairment}
                  skippedimpairments={skippedImpairments}
                  setObservationinparent={next}
                  setSelectedImpairment={setSelectedImpairment}
                  setimpairmentcount={setimpairmentcount}
                  exportselectedimpairments={props.setSelected_impairment}
                  exportskippedimpairments={props.setSkipped}
                 
                  
                  ></ButtonPanel>
                 
                  
                }

                { buttonstates.basic_muscle_testing==true&&
                   <Concentric_ButtonPanel
                   setSkippedimpairments={setSkippedimpairments}
                   skippedimpairments={skippedImpairments}
                   isEccentric={false}
                   isConcentric={true}
                   isDefault={false}
                   impairmentcount={impairmentcount}
                   length_impairments={selectedimpairment.length}
                   selectedimpairment={selectedimpairment}
                   setObservationinparent={next}
                   setSelectedImpairment={setSelectedImpairment}
                   setimpairmentcount={setimpairmentcount}
                   treatmentlist={props.treatmentlist}
                   exportselectedimpairments={props.setSelected_impairment}
                   exportskippedimpairments={props.setSkipped}
                  
                   
                   ></Concentric_ButtonPanel>
                  
              
                
                }
               
               
                
                
                </div>
            </div>



</div>
<div>
   
   
   
  {/** 
   * <button onClick={()=>{
      setImpairmentlist([...previmpairmentlist])
      setSkippedimpairments([...skiplist])
        Setimpairmentcount((prev)=>{
            return prev-1
        })

    }}>Previous</button>
  */}
     

</div>

    </div>


</section>
  )
}

export default Testing