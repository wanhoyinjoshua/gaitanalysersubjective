import { selectedImpairment } from "../../common/models/selectedimpairment"

export function changestr_lvl(impairment:selectedImpairment,group:number){
    var changed=impairment
    changed.str_lvl=group
    return changed

  }