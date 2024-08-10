import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { importedJsonfileContext } from '../../Context';
import { KinDeviation } from '../../common/models/kinematic_deviation';
import { Kin_Imp } from '../utils/Kin_Imp';
import { InsightList } from '../../common/models/Insights/InsightList';
export function useGetInsight() {
    const context = useContext(importedJsonfileContext);

    function getfinalist(){
        //have list of objects like this 
        //[{"id":.,"status":false,"key":element["impairment"],"kinematic_deviations":filteredValues,"testing":element["testing"],"category":element["category"],"treatment":element["treatment"],"body":element["body"]}]
        //I need to find per kinematic deviation, what is the impairment list...
        //this time creating an object might make sense
        // use selected observation and then loop through it, then include the impairments 
        

        var finallist:InsightList[]=[]
        //console.log(context.selected_observations)
        //so per selected observation
        
        context.selected_observations.forEach((element)=>{
            //element is the index of the original observation list 
            // need to find the json obejct from the json object instead of just the index
            var finalised_kinematic_deviation:any={"kinematic":context.json.kinematic_deviations.filter((x:any)=>x.id==element)[0]}
            const props={kd:element,context:context}
            console.log(context.selectedimpairment)
            var kin_imp= new Kin_Imp(props)
           
    

            
            finalised_kinematic_deviation["impairments"]=kin_imp.filterEx()
            
            
            finallist.push(finalised_kinematic_deviation)
        })
        
       
        return finallist
        }
    
   var bb=getfinalist()

   





   
    
    return bb
  }