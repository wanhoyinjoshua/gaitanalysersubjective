import { impairment } from "@/app/components/analyser/common/models/impairments";
import { treatment } from "@/app/components/analyser/common/models/treatment";
import { KinDeviation } from "@/app/components/analyser/common/models/kinematic_deviation";
import { findIndexfromId } from "./findIndexfromid";
function wrap(content:string,tag:string){

    return `<${tag}>${content}</${tag}>`

}

function id2item<T extends impairment | treatment | KinDeviation>(id: number, array: T[]): T{
    var item = array[findIndexfromId(array,id)]
    return item
}

function kdprocess(kd:KinDeviation,imparray:impairment[],txarray:treatment[]){
    const impitem=kd.possible_impairments
    var first=0
    const imp=impitem.map((imp)=>{
        return id2item(imp,imparray)
      
    })
    console.log(imp)

    var imptdlist=[]

    for (let i=0;i<imp.length;i++){

        //need to produce array of td 
        
        for (let j=0;j<imp[i].treatment.length;j++){
            //produce tds 
            var tdarray=[]
            var treatmenttext=id2item(imp[i].treatment[j],txarray).label
           
            var testingtext=j==0?imp[i].testing:""

           
           
            var impairmenttext=j==0?imp[i].impairment:""
            var kdtext=first==0?kd.label:""

            tdarray.push(wrap(kdtext,"td"))
            tdarray.push(wrap(impairmenttext,"td"))
            tdarray.push(wrap(testingtext,"td"))
            tdarray.push(wrap(treatmenttext,"td"))

            imptdlist.push(wrap(tdarray.join(""),"tr"))
            first=1




        }


    }
    //so now I know how many treatment I have 

    return imptdlist.join("")


}


export function tableGenerator(kdarray:KinDeviation[],imparray:impairment[],txarray:treatment[]){
    const fullarray=[]
    for (let i=0;i<kdarray.length;i++){

        fullarray.push(kdprocess(kdarray[i],imparray,txarray))

    }
    console.log(fullarray)
    //so for each kinematic deviation 
    // I need to figure out how many rows I need ? 
    // so it will be a series of <tr>
    //for each kd, count how many  impairments there are //and count how many treatments there will be in total 
    // and that is the amount of rows I will need for one KD 


return (
    `
   <table>
  <tr>
  <th>Kinematic Deviation</th>
  <th>Impairments</th>
  <th>Testing</th>
  <th>Treatments</th>  
</tr>
</thead>
<tbody>
${fullarray.join("")}
</table>`)
}