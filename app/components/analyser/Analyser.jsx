
import React, { useState, useEffect ,useRef} from 'react';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import axios from "axios"
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';


import Box from '../Box'

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
    const [muscletestingbutton,setMuscletestingbutton]=useState(false)
    const [subgroup,setSubgroup]=useState()
    const [skippedImpairments,setSkippedimpairments]=useState([])
    const [treatmentpdf,setTreatmentpdf]= useState([])
    //ankle =0
    //genere = 0 is strength 1 is coordination, 2 is part task , 3 is whole task 
    const MyDoc = () => (
      <Document>
        <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
        ~ exercises selected from www.physiotherapyexercises.com ~
      </Text>

        <View > 
       
        {treatmentpdf.map(e=>(<View key={e["deviation_pdf"]} style={styles.section}> 
              <View key={e["deviation_pdf"]}>

                <Text>{JSON.stringify(e["deviation_pdf"])}</Text>
                <View style={styles.table}>
                {e.treatment_pdf.map(e=>(

                  <View key={JSON.stringify(e)}style={styles.tableRow}>
                    <View style={styles.tableCol}> 
                <Image style={styles.image} src={`/assets/Ex${e["img_id"]}.jpeg`}></Image> 
              </View> 
              <View style={styles.tableCol}> 
                
                <Text style={styles.tableCell}>{JSON.stringify(e.label)}</Text> 
              </View> 
                  </View>


                ))}
                </View>
              


              </View>
         
              
            
               </View>))}
      </View>
         
         
          
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
            
          
          
        </Page>
      </Document>
    );
    const handleConvert = async () => {
      
      try {
        const response = await axios.get("/api/word");
        console.log(response.data.message)
        return response.data.message
      } catch (error) {
        console.error('Error converting WebP image:', error);
        alert('Error converting WebP image. Check console for details.');
      }
    };
    useEffect(()=>{
        setKinematic(props.json["kinematic_deviations"])
        setImpairmentlist(props.json["impairments"])
        setTreatmentlist(props.json["treatments"])
        
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
        if(selectedimpairment&&selectedimpairment[impairmentcount]&&selectedimpairment[impairmentcount]["class"]&&selectedimpairment[impairmentcount]["class"].includes("str")){
          //then display
          
          console.log("hihih")
          setMuscletestingbutton(true)


        }
        else{
          setMuscletestingbutton(false)

        }

       

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
    function isGroup1(){
      //need to delete the all coor impairments from the impairment count onwards
      //and then from the current impairment dig into the treatment and set all difficulty to beginner  
      var newlist=[...selectedimpairment]
      var skipped=[...skippedImpairments]
      newlist[impairmentcount]["status"]=true
      console.log(newlist)
     
      
      for (let i = impairmentcount+1; i < newlist.length; i++) {
        if(newlist[i]["class"].includes("coor")&&newlist[i]["physio_movements"].includes(newlist[impairmentcount]["physio_movements"][0])){

          //then set as false
          skipped.push(newlist[i])
          newlist.splice(i,1)
          
        }
        
      }
      setSkippedimpairments([...skipped])

      //loop through the treatment stage:
      for(let i = 0; i < newlist[impairmentcount]["treatment"].length; i++){
        var treatmenttagret=treatmentlist[newlist[impairmentcount]["treatment"][i]]
        if(treatmenttagret["level"]==0 && treatmenttagret["strength"]!=0){
          //now delete the treatment?
          


        }else{
          newlist[impairmentcount]["treatment"].splice(i,1)

        }

      }

      setSelectedImpairment([...newlist])

    }

    function isGroup2(){
      //need to delete the
      var newlist=[...selectedimpairment]
      var skipped=[...skippedImpairments]
      newlist[impairmentcount]["status"]=true
     
      
      for (let i = impairmentcount+1; i < newlist.length; i++) {
        if(newlist[i]["class"].includes("coor")&&newlist[i]["physio_movements"].includes(newlist[impairmentcount]["physio_movements"][0])){

          //then set as false
          skipped.push(newlist[i])
          newlist.splice(i,1)
        }
        
      }

      //loop through the treatment stage:
      for(let i = 0; i < newlist[impairmentcount]["treatment"].length; i++){
        var treatmenttagret=treatmentlist[newlist[impairmentcount]["treatment"][i]]
        if(treatmenttagret["level"]==1 && treatmenttagret["strength"]!=0 ){
          //now delete the treatment?
          


        }else{
          newlist[impairmentcount]["treatment"].splice(i,1)

        }
        

      }

      setSelectedImpairment([...newlist]) 

    }

    function isGroup3(){
      var newlist=[...selectedimpairment]
      var skipped=[...skippedImpairments]
      newlist[impairmentcount]["status"]=true
     
     
      
      

      //loop through the treatment stage:
      for(let i = 0; i < newlist[impairmentcount]["treatment"].length; i++){
        var treatmenttagret=treatmentlist[newlist[impairmentcount]["treatment"][i]]
        if(treatmenttagret["level"]==2 && treatmenttagret["strength"]!=0){
          //now delete the treatment?
          


        }else{
          newlist[impairmentcount]["treatment"].splice(i,1)

        }
        

      }

      setSelectedImpairment([...newlist]) 

    }

    function isGroup4(){
      var newlist=[...selectedimpairment]
      var skipped=[...skippedImpairments]
      newlist[impairmentcount]["status"]=true
     
      skipped.push(newlist[impairmentcount])
      newlist.splice(impairmentcount,1)
      /*
      for (let i = impairmentcount+1; i < newlist.length; i++) {
        if(newlist[i]["class"]=="str"&&newlist[i]["physio_movement"][0]==newlist[impairmentcount]["physio_movement"][0]){

          //then set as false
          newlist[i]["status"]=false
        }
        
      }
      */

      //loop through the treatment stage:

      /*
      for(let i = 0; i < newlist[impairmentcount]["treatment"].length; i++){
        var treatmenttagret=treatmentlist[newlist[impairmentcount]["treatment"][i]]
        if(treatmenttagret["strength"]!=0){
          //now delete the treatment?
          newlist[impairmentcount]["treatment"].splice(i,1)
          


        }
        

      }
      */

      setSelectedImpairment([...newlist]) 

    }

 

    function getpotentialimpairments(){
        var selectedimpairment=[]
        impairmentlist.forEach((element,index) =>{
            const values = element["kinematic_deviations"];
            console.log(values)
            if (values){
                const filteredValues = values.filter(value => selected_observations.includes(value));
        
                if (filteredValues.length > 0) {
                  if(element["class"].includes("str")){
                    selectedimpairment.unshift({"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"],"class":element["class"],"physio_movements":element["physio_movements"]})

                  }else{
                    selectedimpairment.push({"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"],"class":element["class"],"physio_movements":element["physio_movements"]})

                  }
                    
                }
            }
        }
        
        );
        //arrange impairments here


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
            var newselectedimpairment= selectedimpairment.concat(skippedImpairments)
            newselectedimpairment.forEach((impairment)=>{
                if(impairment["kinematic_deviations"].includes(element)){
                    console.log(impairment["treatment"])
                    var treatmentideas=[]
                    impairment['treatment'].forEach((e,index)=>{
                        
                        console.log(treatmentlist[e])
                        treatmentideas.push(treatmentlist[e])

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
                        {muscletestingbutton==false&&
                         <section>
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
 
                         </section>
                        
                        
                        }

                        {muscletestingbutton&&
                        <section className='flex flex-col'>
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
                 isGroup1()
                 Setimpairmentcount((prev)=>{
                     return prev+1
                 })
                 
 
             }}>Paralysed-MMT 0</button>
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
                 isGroup2()
                 Setimpairmentcount((prev)=>{
                     return prev+1
                 })
 
             }}>Very weak-MMT 1-2</button>

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
                 isGroup3()
                 Setimpairmentcount((prev)=>{
                     return prev+1
                 })
 
             }}>Weak-MMT 3-4</button>

<button  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>{
                 if(impairmentcount+1==selectedimpairment.length){
                     //return
                     //convert selectedimpairment to a list of kinematic deviations with imapirments
                   
                     setTestingPhase(false)
                     console.log(getfinalist())
                     setInsightsPhase(true)
                     setFinalist([...getfinalist()])
 
                     
                     return
                 }
                 isGroup4()
                 
                 Setimpairmentcount((prev)=>{
                     return prev+1
                 })
 
             }}>Strong-MMT 5</button>
                        </section>
                        
                        }
                       
                       
                        
                        
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
          <PDFDownloadLink document={<MyDoc  />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
     
    </PDFDownloadLink>
        </div>
      </div>
  
        {finalist.map((insight)=>{

            return<div key={JSON.stringify(insight)}>
                <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      
    </div>
                <Box list={insight} setter={addpdf} current={addpdf}></Box>

                </div>
        })}
        
        </div>}
        
    
       
        


    </div>
  )
}

export default Analyser