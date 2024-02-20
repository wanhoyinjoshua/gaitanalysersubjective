import { createContext } from 'react';
interface jsonprops{
    treatments:any;
    kinematic_deviations:any;
    impairments:any
  
  
  }
interface props{
    json:jsonprops
    selected_observations:number[]
    selectedimpairment:any
    skippedimpairments:any
  }
export const importedJsonfileContext = createContext<props>({
  json:{treatments:[],
    kinematic_deviations:[],
    impairments:[]},
    selected_observations:[],
    selectedimpairment:[],
    skippedimpairments:[]


});