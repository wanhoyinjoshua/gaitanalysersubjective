import { treatment } from "./common/models/treatment";

import { KinDeviation } from "./common/models/kinematic_deviation"
import { impairment } from "./common/models/impairments";
import { selectedImpairment } from "./common/models/selectedimpairment";


export interface jsonprops{
    view?:number,
    setView?:any,
    treatments:any;
    kinematic_deviations:KinDeviation[];
    impairments:impairment[];
    setting?:any;
    dispatchKd?:any;
    dispatchImp?:any
  
  
  }
  export interface props{
    json:jsonprops
  }

  export interface context_props{
    json:jsonprops
    selected_observations:number[]
    selectedimpairment:selectedImpairment[]
    skippedimpairments:any
    setSelectedImpairment:any
  setSkippedimpairments:any,
  setObservations:any,
  setStage:any,
  testingeliminatedhx:any,
  setSkipperq:any,
  stageController:any,
  
  stage2history:number[],
    setStage2Hx:any
    
  
  
  }

  export interface StageDescriptionprops{
    stageno:string,
    header:string,
    description:string,
    buttonFunction?:()=>void|undefined,
    buttonText?:string,
    buttonMode:boolean





  }

  export interface KdItemprops{
    index:any,deviation:any,selected_observations:any,setObservations:any
  }
  