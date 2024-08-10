import { displaySelectedImpairment, selectedImpairment } from "../../common/models/selectedimpairment"
import { context_props } from "../../interface"
interface props{
    context:context_props
    kd:number
}
export class Kin_Imp{
    kd: number
    context:context_props
    constructor(props:props){
        this.kd = props.kd
        this.context=props.context
    }
    

     current_full_impairment(){
        return this.context.json.kinematic_deviations.filter((kd:any)=>kd.id==this.kd)[0]
    }


    

    all_impForKd_id(){
        return this.current_full_impairment().possible_impairments
    }

    allPositiveImp(){
        return this.context.selectedimpairment
    }

    getPositivefromAll(){
        var allPositive=this.allPositiveImp().filter((imp)=>{
            if(imp.status==true){
                return this.all_impForKd_id().includes(imp.id)

            }
          

        })
        return allPositive
    }

    convertId2Treatment(id_List:number[]){
        if(id_List.length>0){
            var temp= id_List.map((id)=>{
            
                return this.context.json.treatments.filter((tx:any)=>tx.id==id)[0]
    
            })
            return temp

        }else{
            return []
        }
        

    }

    filterEx(){
       console.log(this.allPositiveImp())
      var temp=  this.getPositivefromAll().map((imp)=>{
        
        var treatmentlist=this.convertId2Treatment(imp.treatment)
        var filtered:any
        if(imp.str_lvl==-1){
            filtered=treatmentlist

        }else{
            filtered=treatmentlist.filter((tx)=>tx.strength>0&&tx.level<=imp.str_lvl)
        

        }
       
        
        var temp:any=imp
        
        //temp.treatment=treatmentlist
        var displayImp:displaySelectedImpairment=temp
        //displayImp.treatment=treatmentlist
        displayImp.displayTreatment=filtered

        return displayImp
        

      })
      return temp 
    }





}