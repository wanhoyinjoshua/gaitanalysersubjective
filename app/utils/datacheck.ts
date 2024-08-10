export function jsondatacheck(data:any){
    const hassetting =Object.hasOwn(data, 'setting')
    const haskd= Object.hasOwn(data,"kinematic_deviations")
    const hasimp =Object.hasOwn(data,"impairments")
    const hastx =Object.hasOwn(data,"treatments")
    

    if (hassetting==false||haskd==false||hasimp==false||hastx==false){
        return false
    }
    else{
        return true
    }




}