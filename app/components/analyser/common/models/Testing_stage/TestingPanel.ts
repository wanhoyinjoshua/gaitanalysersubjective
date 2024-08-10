
import { selectedImpairment } from "../../models/selectedimpairment";
export interface TestingButtonprops{
    buttontext:string,
    button_function:any
}
export interface TestPanelProps{
    impairment:selectedImpairment,
    
    reverse:any,
    reverse_boolean:boolean,
    selectedImpairment:selectedImpairment[]
    setSelectedImpairment:any,
    impairmentcount:number[],
    setimpairmentcount:any,
    backDisabled:boolean


}

export class button_text{
    impairment: selectedImpairment;
    
    constructor(props:selectedImpairment) {
        this.impairment = props;
        
    }
    transform(){
        return this.impairment.class[0]
        
       
    }

    isConcentric(){
        if(this.transform().includes("concentric_str")){
            return true
        }else{
            return false
        }
    }

    get_eccentric_text_negative(){
        //I can even use the class to display different messgaes based on physiological movements 

        return "Able to control eccentric movements"

    }
    get_eccentric_text_positive(){

        return "Unable to control eccentric movements"

    }

    get_sensation_negative(){
        return"Sensation is intact"
    }

    get_sensation_positive(){
        return"Has altered sensation"
    }

    get_rom_positive(){
        return"Range of motion is restricted"
    }

    get_rom_negative(){
        return"No restriction"
    }

    get_muscle_act_negative(){
        return"Does not have excessive muscle activity"
    }

    get_muscle_act_positive(){
        return"Has excessive muscle activity/ spasticity"
    }


    get_coor_negative(){
        return"No measurable coordination deficits"
    }

    get_coor_positive(){
        return"Has measurable coordination deficits"
    }

    get_concentric_text_1(){

        return "Paralysed-MMT 0"

    }
    get_concentric_text_2(){

        return "Very weak-MMT 1-2"

    }

    get_concentric_text_3(){

        return "Weak-MMT 3-4"

    }

    get_concentric_text_4(){

        return "Strong-MMT 5"

    }
    
    
}

