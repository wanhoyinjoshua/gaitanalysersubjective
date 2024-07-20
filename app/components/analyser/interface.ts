export interface jsonprops{
    treatments:any;
    kinematic_deviations:any;
    impairments:any
  
  
  }
  export interface props{
    json:jsonprops
  }

  export interface context_props{
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
  stageController:any
  
  }

  export interface StageDescriptionprops{
    stageno:string,
    header:string,
    description:string,
    buttonFunction:()=>void|undefined,
    buttonText:string,
    buttonMode:boolean





  }

  export interface KdItemprops{
    index:any,deviation:any,selected_observations:any,setObservations:any
  }
  