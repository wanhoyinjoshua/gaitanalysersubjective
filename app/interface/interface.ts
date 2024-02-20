import React from "react";
export interface kinematic_deviation{
    label:String,
    id:number
}
export interface impairment{
    "impairment":string,
    "kinematic_deviations":number[],
    "testing":string,
    "category":number,
    "treatment":number[],
    "body":number,
    "physio_movements":string[],
    "class":string[],
    "str_lvl"?:any,
    
    "status"?:boolean,
    "id":number
}
export interface StageController{
    "1":boolean,
    "2":boolean,
    "3":boolean
}

export interface obervation_props{
    
    setSelectedDeviation_id:any;
    setObservationinparent:React.Dispatch<React.SetStateAction<StageController>>

}

export interface testing_props{
    impairmentlist:impairment[],
    setSkipped:any,
    setSelected_impairment:any,
    selectedimpairment:any,
    skippedimpairments:any,
    treatmentlist:any,
    selected_deviations:number[],
    setObservationinparent:any


}

export interface buttonpanel_props{
    buttonstate:any,
   
    impairmentcount:number,
    length_impairments:number,
    selectedimpairment:any,
    setObservationinparent:any,
    setimpairmentcount:any,
    setSelectedImpairment:any,
    setSkippedimpairments?:any,
    skippedimpairments?:any,
    treatmentlist?:any,
    exportselectedimpairments?:any
    exportskippedimpairments?:any,
    
}

export interface insights_props{
    selected_observations:any,
    kinematic_deviation:any,
    selectedimpairment:any,
    
    skippedImpairments:any,
    treatmentlist:any
    



}