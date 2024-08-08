import { KinDeviation } from "../components/analyser/common/models/kinematic_deviation";
import { treatment } from "../components/analyser/common/models/treatment";

import { impairment } from "../components/analyser/common/models/impairments";
import { settings } from "../interface/interface";
export interface adminjson{
    
    view?:number,
    setView?:any,
    treatments:treatment[];
    kinematic_deviations:KinDeviation[];
    impairments:impairment[];
    dispatchKd?:any;
    dispatchImp?:any;
    dispatchTx?:any;
    setting:settings;
    setSetting:any
  
  

}