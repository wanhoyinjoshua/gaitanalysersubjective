
import { treatment } from "./treatment"
export interface selectedImpairment  {
    id:number,
    status:boolean,
    key:string,
    testing:string,
    treatment:number[],
    class:string[],
    physio_movements:string[],
    str_lvl:number,
    skip_status:boolean,
    skipped_element:number[]



}


export interface displaySelectedImpairment  {
    id:number,
    status:boolean,
    key:string,
    testing:string,
    treatment:number[],
    class:string[],
    physio_movements:string[],
    str_lvl:number,
    skip_status:boolean,
    skipped_element:number[],
    displayTreatment:treatment[]



}