import { impairment } from "../../common/models/impairments";
import { KinDeviation } from "../../common/models/kinematic_deviation";

export function getallImpairments(deviation:KinDeviation[]){

    
        var allimpairments:number[]=[]
        deviation.forEach((element:KinDeviation) => {
            allimpairments=[...allimpairments,...element["possible_impairments"]]
           
        });
        var unique= new Set(allimpairments)
        var vvv= Array.from(unique)
       

        
       

        return vvv

    

}



export function sort_impairmentlist(impairmentlist:impairment[]){
    var concentric_list=impairmentlist.filter((element:any)=>element["class"].includes("concentric_str"))
          var eccentric_list=impairmentlist.filter((element:any)=>element["class"].includes("eccentric_str"))
          var coord_list =impairmentlist.filter((element:any)=>element["class"].includes("coor"))
          var sortedlist=[...concentric_list,...eccentric_list,...coord_list]
          var others_list=impairmentlist.filter((element:any) => !sortedlist.includes(element));
          var newlist=sortedlist.concat(others_list)
          return newlist

}