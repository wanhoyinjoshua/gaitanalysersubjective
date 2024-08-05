import { read, utils, writeFile } from 'xlsx';
import { jsonprops } from '@/app/components/analyser/interface';
//need to just download json file...
//so I need to upload json and then 

export async function consumeExcel(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files!=null){
        const file=e.target.files[0];
    const data=await file.arrayBuffer()
    
    const workbook=read(data)
    console.log(workbook)
    const ws = workbook.Sheets[workbook.SheetNames[2]]; // get the first worksheet
    const treatment_ws= workbook.Sheets[workbook.SheetNames[0]]
    const kinematic_deviation_ws= workbook.Sheets[workbook.SheetNames[1]]
    const final_data = utils.sheet_to_json(ws);
    const treatment_final_data=utils.sheet_to_json(treatment_ws);
    const kinematic_deviation_final_data=utils.sheet_to_json(kinematic_deviation_ws);
  console.log(final_data)



  const exitobject={
    "treatments":treatment_final_data,
    "kinematic_deviations":kinematic_deviation_final_data,
    "impairments":final_data

  }

  return exitobject
        
    }
    

    

}

export async function consumeJson(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files!=null){
        console.log(e.target.files[0])
        const jsonfile=e.target.files[0]
        const text=await jsonfile.text()
        return JSON.parse(text)
        
        
    }
   
}