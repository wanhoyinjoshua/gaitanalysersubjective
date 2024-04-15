import React from 'react'
import {useState,useEffect,useContext} from "react"
import { testing_props,impairment } from '../interface/interface';
import ButtonPanel from './ButtonPanel';
import Concentric_ButtonPanel from "./Concentric_ButtonPanel"
import { Josefin_Sans } from 'next/font/google';
import {importedJsonfileContext} from './analyser/Context'
import Breadcrumbs from './Breadcrumbs';
import { PlusIcon,BackwardIcon } from '@heroicons/react/20/solid'
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
    //context.setSelectedImpairment([...getpotentialimpairments()])
    console.log(context.selectedimpairment)
    const [selectedimpairment,setSelectedImpairment]=useState([...getpotentialimpairments()])
    const [skippedImpairments,setSkippedimpairments]=useState(context.skippedimpairments)
    const [impairmentcount,setimpairmentcount]=useState(0)
    const [backupimpairmentcount,setBackupcount]=useState([0])
    const [buttonstates,setButtonstates]=useState({
        default:true,
        basic_muscle_testing:false,
        eccentric_muscle_testing:false



    })
    //another idea is to create a copy of the impairmentlist and only display the filter?
    function reverse(){
       
        //the array represents the current state, last index is current...
        //need to shave off the last index and go the the last one by default 
        
     
            var backup:any= backupimpairmentcount
            setimpairmentcount(backup[backup.length-1])
            backup.pop()
           if(backup.length==0){
            setBackupcount([0])

           }
           else{
            setBackupcount([...backup])

           }
           //to reset the status so folks can go backwards
           for(let i=backup[backup.length-1];i<selectedimpairment.length;i++){
            selectedimpairment[i].skip_status=false
           }
          
           
           

        
       
       
    }
   useEffect(()=>{
    
    console.log(context.selected_observations.values)
    console.log(context.selectedimpairment.value)
    
    console.log(context.skippedimpairments.value)
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
        


      
      

   },[isdefaulttest(),isconcentrictest(),iseccentrictest()])
   
    function getpotentialimpairments(){
        function filterdeviation(){

            var kinematic_deviations = context.json.kinematic_deviations
            var filtered_deviations = kinematic_deviations.filter((deviation:any)=>
            
            
            context.selected_observations.includes(deviation["id"])
            
            )

            return filtered_deviations 

        }
        function getallimpairments(deviation:any){
            var allimpairments:any=[]
            deviation.forEach((element:any) => {
                allimpairments=[...allimpairments,...element["possible_impairments"]]
               
            });
            var unique= new Set(allimpairments)
            var vvv:any= Array.from(unique)
           

            
           

            return vvv

        }

        var filtered_kin_deviation=filterdeviation()
        console.log(filtered_kin_deviation)
        var all_filteredimpairments=getallimpairments(filtered_kin_deviation)
        console.log(all_filteredimpairments)
        var actualfiltered=all_filteredimpairments.map((imp:any)=>{
            var cc=context.json.impairments.filter((element:any)=>element['id']==imp)
            console.log(cc)
            if(cc.length>0){
                return context.json.impairments.filter((element:any)=>element['id']==imp)[0]

            }else{return}
            

        })
        console.log(actualfiltered)
          var selectedimpairment:any[]=[]
          
          var concentric_list=actualfiltered.length>0&&actualfiltered.filter((element:any)=>element["class"].includes("concentric_str"))
          var eccentric_list=actualfiltered.length>0&&actualfiltered.filter((element:any)=>element["class"].includes("eccentric_str"))
          var coord_list =actualfiltered.length>0&&actualfiltered.filter((element:any)=>element["class"].includes("coor"))
          var sortedlist=[...concentric_list,...eccentric_list,...coord_list]
          var others_list=actualfiltered.length>0&&actualfiltered.filter((element:any) => !sortedlist.includes(element));
          var newlist=sortedlist.concat(others_list)
          console.log(newlist)

          //I need a function to for each impairment, get its associated kinematic list 
          //loop thru each in the kinmeatic deviations, ( after filtering from the selected obs)
          //then in possible impairments--find the id for the impairment, if present then include the deviation id
        // then repeat 
        //new list is a list of all impairments 

        function getdeviations(element:any){
            //first of all filter the object
            var impairment_to_deviation:any=[]
            var kinematic_deviations = context.json.kinematic_deviations
            var filtered_deviations = kinematic_deviations.filter((deviation:any)=>
            
            
            context.selected_observations.includes(deviation["id"])
            
            )

            var impairmentid=element['id']
            console.log(filtered_deviations)
            console.log("endfiltereded deviation")
            if(filtered_deviations.length>0){
                filtered_deviations.forEach((element:any) => {
                    console.log(element["possible_impairments"])
                    if(element["possible_impairments"].includes(Number(impairmentid))){
                     impairment_to_deviation.push(element["id"])
     
     
                    }
                    else{
     
                    }
                     
                 });
                console.log(impairment_to_deviation)
     
                 return impairment_to_deviation

            }
            else{
                return impairment_to_deviation


            }
           

        }

          console.log("newlsit")
          console.log(newlist)
          newlist.forEach((element,index) =>{
             
              if (element){
                  //const filteredValues = values.filter((value:any) => context.selected_observations.includes(value));
                  const strLevel = element["str_lvl"] ?? -1;
            
                    selectedimpairment.push({"id":element["id"],"status":false,"key":element["impairment"],"testing":element["testing"],"treatment":element["treatment"],"class":element["class"],"physio_movements":element["physio_movements"],"str_lvl":strLevel,"skip_status":false})
  
                      
                  
              }
          }
          
          );
          //arrange impairments here
          
          
  
          return selectedimpairment
         
  
  
          //need to filter the impairment list
         
  
  
      }
    

      
    
    
    function next(){
        var newstage={
            "1":false,
            "2":false,
            "3":true
        }
        context.setStage({...newstage})
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
        {backupimpairmentcount}

        <br></br>
        {impairmentcount}
    
    <div>
    <div className="-space-y-px rounded-md bg-mq-rice">


<div className="border-b border-gray-200 bg-mq-rice ">
<div className="border-b border-gray-200   py-5 ">
  <div className=" mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap bg-mq-lightgrey p-3 ">
    <div className="mt-4">
      <Breadcrumbs stageController={props.stageController}></Breadcrumbs>
      <h3 className="text-base font-semibold leading-6 text-white">Step 2 </h3>
      <p className="mt-1 text-sm text-white">
        Testing
        <br></br>
        Please select the most appropriate option for each impairment according to your testing results.
        
      </p>
    </div>


   

  </div>
</div>


</div>
<div className=''>
<div className="overflow-hidden rounded-full bg-gray-200">

  <div className="h-2 rounded-full bg-mq-lightred transition-width duration-300 ease-in-out" style={{ width: `${Math.round((impairmentcount/selectedimpairment.length)*100)}%` }} />
</div>
</div>
<div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">

</div>

<div className='flex justify-center '>
<div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                
                >
                    <span className="sr-only">Close</span>
                   
                </button>
                </div>
                
                <button
                onClick={reverse}
                    type="button"
                    disabled={backupimpairmentcount.length==1&&backupimpairmentcount[0]==impairmentcount}
                    className={`${backupimpairmentcount.length==1&&backupimpairmentcount[0]==impairmentcount?"opacity-10":""} rounded-full bg-mq-lightred p-2 text-white shadow-sm hover:bg-mq-darkred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                    <BackwardIcon className="h-5 w-5" aria-hidden="true" />
                </button>
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
                
                
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row">
                
                {(buttonstates.default==true||buttonstates.eccentric_muscle_testing==true)&&
                 <ButtonPanel
                 buttonstate={buttonstates}
                 impairmentcount={impairmentcount}
                 length_impairments={selectedimpairment.length}
                 selectedimpairment={selectedimpairment}
                 skippedimpairments={skippedImpairments}
                 setObservationinparent={next}
                 setSelectedImpairment={setSelectedImpairment}
                 setimpairmentcount={setimpairmentcount}
                 setBackupcount={setBackupcount}
                 backupcount={backupimpairmentcount}
                
                 
                 ></ButtonPanel>
                
                
                }
               
                { buttonstates.basic_muscle_testing==true&&
                   <Concentric_ButtonPanel
                   buttonstate={buttonstates}
                   setSkippedimpairments={setSkippedimpairments}
                   skippedimpairments={skippedImpairments}
                   impairmentcount={impairmentcount}
                   length_impairments={selectedimpairment.length}
                   selectedimpairment={selectedimpairment}
                   setObservationinparent={next}
                   setSelectedImpairment={setSelectedImpairment}
                   setimpairmentcount={setimpairmentcount}
                   treatmentlist={context.json.treatments}
                   setBackupcount={setBackupcount}
                   backupcount={backupimpairmentcount}
                   
                  
                   
                   ></Concentric_ButtonPanel>
                  
              
                
                }
               
               
                
                
                </div>
            </div>

</div>




</div>
<div>

    Skipped impairments:
    <ol>

   
    {selectedimpairment.map((e)=>{
        if(e.skip_status==true)
            {
                return <li key={JSON.stringify(e.key)}>{e.key}</li>

            }
      

    })}
     </ol>
   
   
   
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