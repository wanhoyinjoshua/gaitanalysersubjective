
import React, { useState, useEffect ,useRef} from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { importedJsonfileContext} from './Context';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Observation from "../Observation"
import Testing from '../Testing';
import axios from "axios"
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';


import Box from '../Box'
import Insights from '../Insights';

/*
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  image:{
    height:"200",
    width:"140"
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "none", 
    borderWidth: 0, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 ,
    
  }, 
  section:{marginBottom: 30,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'},

  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "45%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10 ,
    height:"20%",
  }
  , pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
*/
export interface jsonprops{
  treatments:any;
  kinematic_deviations:any;
  impairments:any


}
export interface props{
  json:jsonprops
}

const Analyser2 = (props:props) => {
  //creating the context i need with the props.
  const json:jsonprops=props.json
  
  

    const [kinematic_deviation,setKinematic]=useState([])
    const [stagesController,setStage]=useState({
      "1":true,
      "2":false,
      "3":false
    })

    const [selectedimpairment,setSelectedImpairment]=useState([])
    const [impairmentcount,Setimpairmentcount]=useState(0)
    const [treatmentlist,setTreatmentlist]=useState([])
    const [selected_observations,setObservations]=useState([])
  
    const [testingphase,setTestingPhase]=useState(false)
    const [insightsphase,setInsightsPhase]=useState(false)
    const[finalist,setFinalist]=useState([])

    const [skippedImpairments,setSkippedimpairments]=useState<any>([])
    const [treatmentpdf,setTreatmentpdf]= useState<any>([])

    const [previmpairmentlist,setPrev]=useState()
    const [skiplist,setPrevSkipList]=useState()
    //ankle =0
    //genere = 0 is strength 1 is coordination, 2 is part task , 3 is whole task 

   
    useEffect(()=>{
       
        var hhh:any=[]
        console.log(finalist)
        console.log(context.selectedimpairment)
        console.log(context.skippedimpairments)
        {finalist&& finalist.forEach((e:any)=>{
          var treatment_pdf:any={"deviation_pdf":e["kinematic"]["label"],"treatment_pdf":[]}
         
            
          e['impairments'].forEach(async (e:any)=>{
            if(e.status==true){
              
            for (let i = 0; i <= e.treatmentideas.length-1; i++) {
              console.log("hi")
              
              treatment_pdf["treatment_pdf"].push(e.treatmentideas[i])
              
             
            
              
          
            }
          }
           
      
      
          })
          hhh.push(treatment_pdf)

          
          
        })
        }
        console.log(hhh)
        

        setTreatmentpdf([...hhh])
      
        
        console.log('page is relaoding')
       

       

    },[props,impairmentcount,selectedimpairment,finalist])
   /*
    function addpdf(event){
      console.log("hihsihsihsihsihishyeehahahahahh")
      if(treatmentpdf.length==1){

      }
      else{
        setTreatmentpdf((prevArray) => 
        [...prevArray, event]
      
      );
        
      }
     
    }
    function savebackup(implist,skiplist){
      setPrev([...implist])
      setPrevSkipList([...skiplist])
    }
    */

    

  

    
var context={
  
  json:props.json,
  selected_observations:selected_observations,
  selectedimpairment:selectedimpairment,
  skippedimpairments:skippedImpairments,
  setSelectedImpairment:setSelectedImpairment,
  setSkippedimpairments:setSkippedimpairments,
  setObservations:setObservations,
  setStage:setStage


  




}
    
    
    
       
          

  return (
    <div className='mt-6 px-28 '>
     
    {props.json&&
        <importedJsonfileContext.Provider value={context}>
          
        {stagesController["1"]&&
           <Observation 
          
           setSelectedDeviation_id={setObservations}
           setObservationinparent={setStage}
           stageController={stagesController}
    
           ></Observation>
    }
           
            
           
            {stagesController["2"]&&
            <Testing
           
           
            setSelected_impairment={setSelectedImpairment}
           
            setObservationinparent={setStage}
            setSkipped={setSkippedimpairments}
            stageController={stagesController}
           
            
        
            
            ></Testing>
           
           }
    
        {stagesController["3"]&&finalist&&
        <Insights
        stageController={stagesController}
        
        ></Insights>}
    
        </importedJsonfileContext.Provider>}

      
      
        
    
       
        


    </div>
  )
}

export default Analyser2