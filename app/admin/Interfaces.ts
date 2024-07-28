import { KinDeviation } from "../components/analyser/common/models/kinematic_deviation";
import { treatment } from "../components/analyser/common/models/treatment";
import { impairment } from "../interface/interface";
export interface adminjson{
    
    view?:number,
    setView?:any,
    treatments:treatment[];
    kinematic_deviations:KinDeviation[];
    impairments:impairment[];
    dispatchKd?:any;
    dispatchImp?:any
  
  

}