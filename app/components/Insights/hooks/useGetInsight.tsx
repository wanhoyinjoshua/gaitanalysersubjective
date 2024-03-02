import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { importedJsonfileContext } from '../../analyser/Context';
export function useGetInsight() {
    const context = useContext(importedJsonfileContext);

    function getfinalist(){
        //have list of objects like this 
        //[{"id":.,"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"]}]
        //I need to find per kinematic deviation, what is the impairment list...
        //this time creating an object might make sense
        // use selected observation and then loop through it, then include the impairments 
        

        var finallist:any=[]
        //console.log(context.selected_observations)
        //so per selected observation
        context.selected_observations.forEach((element:any)=>{
            //element is the index of the original observation list 
            // need to find the json obejct from the json object instead of just the index
            var finalised_kinematic_deviation:any={"kinematic":context.json.kinematic_deviations.filter((x:any)=>x.id==element)[0]}
            
            var allpossibleimpairments=finalised_kinematic_deviation["kinematic"]["possible_impairments"]
            
            //those with status=true and skip=true
            var newselectedimpairment= context.selectedimpairment
            
     
            var deviation_impaairment:any=[]
            //have all possible impairments for one knematic deviatiom
            //however the selected impairment list contained mroe impairments as it 
            //mnay contain imp from another deviations
            //so need to filter it out 
            allpossibleimpairments.forEach((impairment_id:any)=>{
              var filtered= newselectedimpairment.filter((e:any)=>{
               
                
                return e["id"]==impairment_id


              })
              //this deviation object conatains impairments for this deviation
              //that has the updated status 
              deviation_impaairment.push(filtered[0])
              

            })



            var identifiedimpairments:any=[]

           
            //then now the al impairments, the treatments are all ids, 
            //so need to enrich it 
            //window.alert(JSON.stringify(deviation_impaairment))
            deviation_impaairment.forEach((impairment:any)=>{
               
                   
                    var treatmentideas:any=[]
                    if(impairment['treatment']){
                      impairment['treatment'].forEach((e:any)=>{
                        
                       
                        treatmentideas.push(context.json.treatments.filter((x:any)=>x.id==e)[0])

                    })
                      

                    }
                   
                    impairment["treatmentideas"]=treatmentideas

                    //impairment["treatment"]=impairment["treatment"].map((e)=>{return treatmentlist[e]})
                    //now is establishing the new order 
                    if(impairment["status"]==true||impairment["skip_status"]==true){
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
    
   var bb=getfinalist()

   
    
    return bb
  }