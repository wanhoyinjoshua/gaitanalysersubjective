import React from 'react'
import { id2deviation,id2impairment } from '../utils/id_2_deviation_label'
import { getallImpairments,sort_impairmentlist } from '../utils/helpers'
import { impairment } from '../../common/models/impairments'
import { selectedImpairment } from '../../common/models/selectedimpairment'
import { importedJsonfileContext } from '../../Context'
import { useContext,useState } from 'react'
const useImpairmentList = () => {
    const context= useContext(importedJsonfileContext)
    


    function getpotentialimpairments(){

        var filtered_kin_deviation=id2deviation(context.selected_observations,context.json.kinematic_deviations)
       
        var all_filteredimpairments=getallImpairments(filtered_kin_deviation)

        //this is all of the impauirments that is associated with the KD (with all details)
        var actualfiltered:impairment[]=id2impairment(all_filteredimpairments,context.json.impairments)
       
        //selectedimpairment is the subset of original impairments that is associated with KDs
        //and is transoformed for app use--adding str level that is not origianlly in the data definitions.

        var selectedimpairment:selectedImpairment[]=[]
          
        //need a function to take in all impairments and then spit out
          var newlist=sort_impairmentlist(actualfiltered)
          console.log(newlist)
          newlist.forEach((element,index) =>{
             
              if (element){
                  //const filteredValues = values.filter((value:any) => context.selected_observations.includes(value));
                  
                  const strLevel = -1;
            
                    selectedimpairment.push(
                        {
                            "id": element["id"], 
                            "status": false, 
                            "key": element["impairment"], 
                            "testing": element["testing"], 
                            "treatment": element["treatment"], 
                            "class": element["class"], 
                            "physio_movements": element["physio_movements"], 
                            "str_lvl": strLevel, 
                            "skip_status": false,
                            "skipped_element": []
                        })
  
                      
                  
              }
          }
          
          );
          //arrange impairments here
          
          
  
          return selectedimpairment
         
  
  
          //need to filter the impairment list
         
  
  
      }

      const [selectedimpairment,setSelectedImpairment]=useState([...getpotentialimpairments()])
      

  return [selectedimpairment,setSelectedImpairment]
}

export default useImpairmentList