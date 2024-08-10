import React from 'react'
import { useContext } from 'react'
import { importedJsonfileContext } from '../../Context'
import { TestPanelProps,TestingButtonprops } from '../../common/models/Testing_stage/TestingPanel'
import { button_text } from '../../common/models/Testing_stage/TestingPanel'
import { BackwardIcon } from '@heroicons/react/20/solid'
import { switchStages } from '../../services/switch_stages' 
import { ButtonTesting } from '../utils/ButtonTesting'
import { selectedImpairment } from '../../common/models/selectedimpairment'
import TopTip from './TopTip'
const TestPanel = (props:TestPanelProps) => {
    const context=useContext(importedJsonfileContext)
    
    const buttontest=new ButtonTesting()
    const texts=new button_text(props.impairment)
    const lasttest=props.impairmentcount[props.impairmentcount.length-1]+1==props.selectedImpairment.length
    //will have to use imp to identify what to draw it from 
    interface MyInterface {
        [key: string]: any;
      }

    function lastItem(list:any[]){
        return list[list.length-1]

    }
    function newCount(newItem:number){
        var oldcount=props.impairmentcount
        oldcount.push(newItem)
        return oldcount

    }
    function findnext(newlist:selectedImpairment[]){
   
        var targetcount= buttontest.Find_display_index(newlist,lastItem(props.impairmentcount))
       
        //if target count is -1, hyou need to go 
        if(targetcount==-1){
        context.setSelectedImpairment([...newlist])
        context.setStage2Hx([...props.impairmentcount])
        context.setStage(switchStages(3))
        return
        }
        console.log(targetcount)
        props.setimpairmentcount([...newCount(targetcount)])
        //perhpas do the setting here. q

    
    }

    function isLast(){
        
        return props.impairmentcount.length==1?true:false
    }
    
    function updateImpairment_status(index:number, impairmentList:selectedImpairment[]){
        var newlist=setImpairmentStatus(impairmentList,index,true)
        if(lasttest){
         
        context.setSelectedImpairment([...newlist])
        context.setStage2Hx([...props.impairmentcount])
        context.setStage(switchStages(3))

        }else{
            //go to next button
            context.setSelectedImpairment([...newlist])
            findnext(newlist)
          

        }
       


    }

      function handlepositive(){
        //in the yes function I need to take in the impairment list and change the status
        updateImpairment_status(lastItem(props.impairmentcount),props.selectedImpairment)
        //context.setStage(switchStages(3))

      }

      function handlenegative(){
        if(lasttest){
            context.setSelectedImpairment([...props.selectedImpairment])
            context.setStage2Hx([...props.impairmentcount])
            context.setStage(switchStages(3))
 
         }else{
             //go to next button
            
             findnext(props.selectedImpairment)
           
 
         }
      }
      function setImpairmentStatus(impairmentlist:selectedImpairment[],index:number,settrue:boolean){
        var newlist=impairmentlist
        var targetImpairment=newlist[index]
            targetImpairment.status=settrue?true:false
            props.setSelectedImpairment([...newlist])
        return newlist

      }
     
      function setskipp(impairmentlist:selectedImpairment[],target_index:number,skippedElelist:number[]){
        var newlist=impairmentlist
        var targetImpairment=newlist[target_index]
            targetImpairment.skipped_element=skippedElelist
            props.setSelectedImpairment([...newlist])
        return newlist

      }
      function util_same_physiomovement(newlist:any,oldlist:any){
        //need to loop this for however many items in newlist[impairmentcount]["physio_movements"]
        //keep a var to keep track 
        var same_movement=false
        //for an input of size 5 , it will run the for loop 5 times and in the loop only one operation.
        //so it will be proportioanl to input size O(n)linear complexity
        newlist.forEach((physio_movement:any)=>{
          if(oldlist.includes(physio_movement)){
            same_movement=true
        
          }
          else{
        
          }
        })
        
            return same_movement
        
        }

      function isSkip(impairment:selectedImpairment,group:number){

        
        
        const isSamePhysioMovement=util_same_physiomovement(impairment.physio_movements,props.impairment.physio_movements)
        
        if(isSamePhysioMovement){
           
            //skip coor and eccentric 
            if(impairment.class[0].includes("coor")){
                //if < group 3 then need to skip
                //otherwise >3 or = 3 will still display
              
                const isTooWeakForCoor=group<=2?true:false
               
                const skip= isTooWeakForCoor?true:false
              
                return skip

            }
            if(impairment.class[0].includes("eccentric")){
                //if group is only 1 and 2 then need to skip
              
                const isTooWeakForEcc=group<=2?true:false
                const skip= isTooWeakForEcc?true:false
          
                return skip
                

            }



        }else{
            return false
        }


      }
      function changestr_lvl(impairment:selectedImpairment,group:number){
        var changed=impairment
        changed.str_lvl=group
        return changed

      }

      function group(number:number){
        //first of all whether to set current impaitment true or false
        const hasStrImp=number<=3?true:false
     
        
       
        var newImpList= setImpairmentStatus(props.selectedImpairment,lastItem(props.impairmentcount),hasStrImp)
        //now I will have to consider processing the newImplist
        //now have to loop through the new list and then depending on what type of impairment it is 
        // to set skip stautus true.
        //can run a foreach loop and only starts at current index +1, and then 
        var skippedelement:number[]=[]
        var newshit =newImpList.map((impairment:selectedImpairment,index:number)=>{
            //need to find whwther to skip or not
            if (index < lastItem(props.impairmentcount)) return impairment
            if (index == lastItem(props.impairmentcount))return changestr_lvl(impairment,number)

            if (isSkip(impairment,number)){
                //need to set skip[status as true ]
               
                var modified=impairment
                modified.skip_status=true
                skippedelement.push(index)
               
                return modified
            }else{
                return impairment
            }



        })
        //need to use aove t update state 
        //the error is essentially when the last item of the list is eccentric impaiment 
        // and when it skip status is true , this will proviude an error.


        var final=setskipp(newshit,lastItem(props.impairmentcount),skippedelement)
    
        context.setSelectedImpairment([...final])


        //then need to either go to next stage or go to next impairment
        if(lasttest){
            context.setStage2Hx([...props.impairmentcount])
            context.setStage(switchStages(3))
 
         }else{
             //go to next button
            //the error is in here. 
            //when it gp to find next , it cant find anything
             findnext(newshit)
           
 
         }




      }
    
    const dict:MyInterface={
        
        concentric_str:[
            {button_text:texts.get_concentric_text_1(),button_function:()=>group(1)},
            {button_text:texts.get_concentric_text_2(),button_function:()=>group(2)},
            {button_text:texts.get_concentric_text_3(),button_function:()=>group(3)},
            {button_text:texts.get_concentric_text_4(),button_function:()=>group(4)}
        
        ],
        coor:[
            {button_text:texts.get_coor_negative(),button_function:handlenegative},
            {button_text:texts.get_coor_positive(),button_function:handlepositive}
           


        ],
        eccentric_str:[
            {button_text:texts.get_eccentric_text_negative(),button_function:handlenegative},
            {button_text:texts.get_eccentric_text_positive(),button_function:handlepositive}
           
        
        ],
        sensation:[
            {button_text:texts.get_sensation_negative(),button_function:handlenegative},
            {button_text:texts.get_sensation_positive(),button_function:handlepositive}
           
        
        ],
        rom:[
            {button_text:texts.get_rom_negative(),button_function:handlenegative},
            {button_text:texts.get_rom_positive(),button_function:handlepositive}
           
        
        ],
        ex_mus_ac:[
            {button_text:texts.get_muscle_act_negative(),button_function:handlenegative},
            {button_text:texts.get_muscle_act_positive(),button_function:handlepositive}
           
        ],

        others:[
            {button_text:texts.get_rom_negative(),button_function:handlenegative},
            {button_text:texts.get_rom_positive(),button_function:handlepositive}
           
        
        ]
    }

    
  return (
    <div className='flex justify-center '>
<div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-lg sm:p-6">
                
                
                <button
                onClick={()=>{props.reverse()}}
                    type="button"
                    disabled={isLast()}
                    className={`${isLast()?"opacity-10":""} rounded-full bg-mq-lightred p-2 text-white shadow-sm hover:bg-mq-darkred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                    <BackwardIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="sm:flex sm:items-start">
                
              
                
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">

                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                    

                    {props.impairment.key}
                    </h3>
                    <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Testing strategy:<br></br>
                        <TopTip text={props.impairment.testing}></TopTip>
                
                    <br></br>
                    {texts.isConcentric()?<span>Please classify strength level as below based on your assessment.</span>:""}
                    </p>
                    </div>
                </div>
                </div>
                
                
                <div className="flex flex-col">
                
                {dict[`${texts.transform()}`].map((button_function:any)=>{
                    return <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"  
                        onClick={()=>{button_function.button_function()}}>
                            {button_function.button_text}

                        </button>


            
                })}
               
                
               
               
                
                
                </div>
            </div>

</div>
  )
}

export default TestPanel