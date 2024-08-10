import { impairment } from "../../common/models/impairments"
import { KinDeviation } from "../../common/models/kinematic_deviation"

export function id2deviation(id:number[],deviationlist:KinDeviation[]){
   
    var result = deviationlist.filter((deviation:KinDeviation)=>id.includes(deviation.id))

    return result

}

export function id2impairment(id:number[],impairmentlist:impairment[]){
    var result = impairmentlist.filter((impairment:impairment)=>id.includes(impairment.id))

    return result

}