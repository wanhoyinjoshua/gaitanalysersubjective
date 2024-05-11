import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { Disclosure,Transition  } from '@headlessui/react'
import { Insights } from '../utils/Insights'
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import {Radar_Plot} from "../components/Graph/radarplot"
import Sideoverlay from './SideOverlay/Sideoverlay'
import InsightsPanel from './InsightsPanel'
import LightbulbPanel from './LightbulbPanel'
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});




const Insights_renderer = (props:any) => {
  var outputobject=new Insights(props)
  const strpercentage=outputobject.getImpPercentage("str")
  const coorpercentage=outputobject.getImpPercentage("coor")
  const otherspercentage=outputobject.getImpPercentage("others")
  const [body,setBody]=useState(-1)
  const [strength,setStrength]=useState(-1)
  const [coordination,setCoordination]=useState(-1)
  const [impairmentstr,setcountstr]=useState(0)
  const [impairmentcoor,setcountcoor]=useState(0)
  const [imglink,setImagelink]=useState()
  const [impairmentother,setcountother]=useState(0)
  const [rom,setROM]=useState(-1)
  const [part,setPart]=useState(-1)
  const [whole,setWhole]=useState(-1)
  const [nil,setNil]=useState(true)
  const [graphdata,setGraphData]=useState<any>()
  const [toggleopen,setToggleopen]=useState(false)
  const dict:any={
    "1":"Paralysed",
    "2":"Very Weak",
    "3":"Weak",
    "4":"Strong"

  }

  function countimpairmenttype(){
    var validcount=0
    var strengthcount=0

    var coorcount=0

    var othercount=0

    props.list['impairments'].forEach((e:any)=>{
    
      if(e.status==true){
        validcount+=1

      }
      if(e.status==true && (e["class"].includes("concentric_str")||e["class"].includes("eccentric_str"))){
        strengthcount+=1
      }
      if(e.status==true && e["class"].includes("coor")){
        coorcount+=1
      }
      

    })
    const finalother= validcount-strengthcount-coorcount
  


    return [strengthcount,coorcount,finalother]

  }
 
 
  useEffect(()=>{
    //maybe on effect
    
    console.log(categories)

    props.list['impairments'].forEach((e:any)=>{
      if(e.status==true){
        setNil(false)
      for (let i = 0; i <= e.treatmentideas.length-1; i++) {
       
        if(e.treatmentideas[i]&&e.treatmentideas[i].strength!=0){
          
          setStrength((prev)=>{
            return prev+1
        })


        }
        if(e.treatmentideas[i]&&e.treatmentideas[i].coordination==true){
         
          setCoordination((prev)=>{
            return prev+1
        })


        }

        if(e.treatmentideas[i]&&e.treatmentideas[i]['rom']==true){
        
          setROM((prev)=>{
            return prev+1
        })


        }
        
        if(e.treatmentideas[i]&&e.treatmentideas[i].part==true){

          setPart((prev)=>{
            return prev+1
        })


        }
        if(e.treatmentideas[i]&&e.treatmentideas[i].whole==true){
   
          setWhole((prev)=>{
            return prev+1
        })


        }
        
      }
    }
     


    })

   

    
    

  },[])
  function strengthimpairment(){
    return(
      props.list['impairments'].map((e:any)=>{
        
        if(e&&e["class"]&&(e["class"].includes("eccentric_str")||e["class"].includes("concentric_str"))){
          //need to somehow store the treatment ideas to this shit and then geenrate
          if(e.status==true||e["skip_status"]==true){
            return (
              <div key={e[0]}>
                
                
            <dd key={e[0]}className="font-medium text-gray-900"><strong>{e["key"]}</strong>-{dict[`${e["str_lvl"].toString()}`]}</dd>
            
            <div>Potential treatment ideas</div>
            {e.treatmentideas.length==0?<div>There are no strageties for this impairment</div>:null}
            <ol className='list-decimal grid grid-cols-1 divide-y'>
          
            {e.treatmentideas.map((e:any)=>{
              
                return <li key={e.label}>{e.label}</li>

              
              
            })}
            </ol>
            </div>
            
            
            )

          }
          else{
            return <dd key={e[0]}className="font-medium text-red-500 line-through ">
            {e["key"]}</dd>
          }

        


        }else{
          return

        }
       
      })
    )
  }
  function coorimpairment(){
    return(
      props.list['impairments'].map((e:any)=>{
        
        if(e&&e["class"]&&e["class"].includes("coor")){
          if(e.status==true){
            return (
              <div key={e[0]}>
                
                
            <dd key={e[0]}className="font-medium text-gray-900"><strong>{e["key"]}</strong></dd>
            <div>Potential treatment ideas</div>
            
            {e.treatmentideas.length==0?<div>There are no strageties for this impairment</div>:null}
            <ol className='list-decimal grid grid-cols-1 divide-y'>
            {e.treatmentideas.map((e:any)=>{
              return <li key={e.label}>{e.label}</li>
            })}
            </ol>
            </div>
            
            
            )

          }
          else{
            return <dd key={e[0]}className="font-medium text-red-500 line-through ">
            {e["key"]}</dd>
          }

        


        }else{
          return

        }
       
      })
    )
  }
  function musclelengthimpairment(){
    return(
      props.list['impairments'].map((e:any)=>{
       
        if(e&&e["class"]&&(e["class"].includes("concentric_str")||e["class"].includes("eccentric_str") || e["class"].includes("coor"))){
         return
  
       
  
  
       }else{
         if(e.status==true){
           return (
             <div key={e[0]}>
               
               
           <dd key={e[0]}className="font-medium text-gray-900"><strong>{e["key"]}</strong></dd>
           <div>Potential treatment ideas</div>
           {e.treatmentideas.length==0?<div>There are no strageties for this impairment</div>:null}
           <ol className='list-decimal grid grid-cols-1 divide-y'>
            {e.treatmentideas.map((e:any)=>{
              return <li key={e.label}>{e.label}</li>
            })}
            </ol>
           </div>
           
           
           )
  
         }
         else{
           return <dd key={e[0]}className="font-medium text-red-500 line-through ">
           {e["key"]}</dd>
         }
  
       }
        
       })
      
    )
   
  }

  let [categories] = useState<any>(outputobject.ProduceFinalState())

  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }




  
  return (
    <div className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6  gap-y-0.5">
      <Sideoverlay kinematic_label={props.list["kinematic"]["label"]} toggleopen={toggleopen} setToggleopen={setToggleopen} content={outputobject.ProduceFinalState()} ></Sideoverlay>
   
    <div className='text-l font-extrabold'>
      {props.list["kinematic"]["label"]}
    </div>
    <LightbulbPanel setToggleopen={setToggleopen} content={outputobject.getImpstatement()}></LightbulbPanel>
    
<InsightsPanel str={strpercentage} coor={coorpercentage} others={otherspercentage}></InsightsPanel>

        </div>
    
    
  )
}

export default Insights_renderer