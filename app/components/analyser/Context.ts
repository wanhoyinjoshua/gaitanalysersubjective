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
    setSelectedImpairment:any
  setSkippedimpairments:any,
  setObservations:any,
  setStage:any,
  testingeliminatedhx:any,
  setSkipperq:any,
  
  }
export const importedJsonfileContext = createContext<props>({
  json:{treatments:[],
    kinematic_deviations:[],
    impairments:[]},
    selected_observations:[],
    selectedimpairment:[],
    skippedimpairments:[],
    setSelectedImpairment:null,
  setSkippedimpairments:null,
  setObservations:null,
  setStage:null,
  testingeliminatedhx:{},
  setSkipperq:null




});