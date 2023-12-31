
import React, { useState, useEffect ,useRef} from 'react';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Observation from "../Observation"
import Testing from '../Testing';
import axios from "axios"
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';


import Box from '../Box'
import Insights from '../Insights';


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


const Analyser2 = (props) => {
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

    const [skippedImpairments,setSkippedimpairments]=useState([])
    const [treatmentpdf,setTreatmentpdf]= useState([])

    const [previmpairmentlist,setPrev]=useState()
    const [skiplist,setPrevSkipList]=useState()
    //ankle =0
    //genere = 0 is strength 1 is coordination, 2 is part task , 3 is whole task 

   
    useEffect(()=>{
       
        var hhh=[]
        console.log(finalist)
        {finalist&& finalist.forEach((e)=>{
          var treatment_pdf={"deviation_pdf":e["kinematic"]["label"],"treatment_pdf":[]}
         
            
          e['impairments'].forEach(async (e)=>{
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
       

       

    },[props,impairmentcount,selectedimpairment,,finalist])
   
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


  

    

    function getfinalist(){
        //have list of objects like this 
        //[{"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"]}]
        //I need to find per kinematic deviation, what is the impairment list...
        //this time creating an object might make sense
        // use selected observation and then loop through it, then include the impairments 
        var finallist=[]
        selected_observations.forEach((element)=>{
            //element is the index of the original observation list 
            var finalised_kinematic_deviation={"kinematic":kinematic_deviation.filter(x=>x.id==element)}
            var identifiedimpairments=[]
            var newselectedimpairment= selectedimpairment.concat(skippedImpairments)
            newselectedimpairment.forEach((impairment)=>{
                if(impairment["kinematic_deviations"].includes(element)){
                    console.log(impairment["treatment"])
                    var treatmentideas=[]
                    impairment['treatment'].forEach((e,index)=>{
                        
                        console.log(treatmentlist[e])
                        treatmentideas.push(treatmentlist.filter(x=>x.id==element))

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
        
        setTestingPhase(false)
        setInsightsPhase(true)
        return finallist
        }
    
    
    
       
          

  return (
    <div>
      
         {stagesController["1"]&&
       <Observation 
       kinematic_deviation={props.json["kinematic_deviations"]} 
       setSelectedDeviation_id={setObservations}
       setObservationinparent={setStage}

       ></Observation>
}
       
        
       
        {stagesController["2"]&&
        <Testing
        impairmentlist={props.json["impairments"]}
        selected_deviations={selected_observations}
        setObservationinparent={setStage}
        treatmentlist={props.json["treatments"]}
        
        ></Testing>
       
       }

    {stagesController["3"]&&finalist&&
    <Insights
    selected_observations={selected_observations}
    kinematic_deviation:any,
    selectedimpairment:any,
    skippedImpairments:any,
    treatmentlist:any
    ></Insights>}
        
    
       
        


    </div>
  )
}

export default Analyser2