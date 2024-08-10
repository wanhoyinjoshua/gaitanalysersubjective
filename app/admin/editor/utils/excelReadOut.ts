import { read, utils, writeFile } from 'xlsx';
import { jsonprops } from '@/app/components/analyser/interface';

//need to just download json file...
//so I need to upload json and then 

export async function consumelocalExcel(){

}

export async function downloadJson(kddata:any,impdata:any,txdata:any,settingdata:any,name:string){
 if(name==null ||name =="" ||name ==undefined){
  window.alert("please fill in the id of the task in settings page")
  return
 }else{
  var data={"treatments":txdata,
    "kinematic_deviations":kddata,
    "impairments":impdata,
    "setting":settingdata}
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;

  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${name}.json`;

  link.click();
}
 
}

export async function consumeExcel(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files!=null){
    const file=e.target.files[0];
    const data=await file.arrayBuffer()
    
    const workbook=read(data)
    
   
    var unparseddata={
      "kinematic_deviations":utils.sheet_to_json(workbook.Sheets["KD"]),
      "impairments":utils.sheet_to_json(workbook.Sheets["impairments"]),
      "treatment":utils.sheet_to_json(workbook.Sheets["treatments"]),
      "settings":utils.sheet_to_json(workbook.Sheets["settings"])
  
  
  
  
    }
    console.log(unparseddata)
    const parsed=parseData(unparseddata)
    console.log(parsed)
    const tx_data = parsed.treatment; // get the first worksheet
    const kd_data= parsed.kinematic_deviations
    const imp_data= parsed.impairments
    const setting_data= parsed.settings[0]
    
 



  const exitobject:any={
    "treatments":tx_data,
    "kinematic_deviations":kd_data,
    "impairments":imp_data,
    "setting":setting_data

  }

  console.log(exitobject)
  return exitobject
        
    }
    

    

}

export async function consumeJson(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files!=null){
      if(e.target.files[0]==null){
        window.alert("No data file selected")
        return 
      }
        console.log(e.target.files[0])
        const jsonfile=e.target.files[0]
        const text=await jsonfile.text()
        return JSON.parse(text)
        
        
    }
}

export function downloadExcelWorkbook(kddata:any,impdata:any,txdata:any,settingdata:any,name:string){
  var unparseddata={
    "kinematic_deviations":kddata,
    "impairments":impdata,
    "treatment":txdata,
    "setting":[settingdata]




  }
  const parseddata=jsonifydata(unparseddata)
    var wb = utils.book_new()
    var kdWS = utils.json_to_sheet(parseddata.kinematic_deviations) 
      var impWS = utils.json_to_sheet(parseddata.impairments) 
      var txWS = utils.json_to_sheet(parseddata.treatment) 
      var settingWS = utils.json_to_sheet(parseddata.settings) 
      utils.book_append_sheet(wb, kdWS, 'KD') // sheetAName is name of Worksheet
      utils.book_append_sheet(wb, impWS, 'impairments')
      utils.book_append_sheet(wb, txWS, 'treatments')
      utils.book_append_sheet(wb, settingWS, 'setting')
      writeFile(wb, `${name}.xlsx`)
  

}
function clean(jsonString:string){
  let cleanedString = JSON.parse(jsonString)
  return cleanedString
}

function parseData(data:any){
  var newdata=data
  
  newdata['kinematic_deviations'].forEach((deviation:any)=>{
    console.log(JSON.parse(deviation['possible_impairments']))
    deviation['possible_impairments']=JSON.parse(clean(deviation['possible_impairments']))

  })

  newdata['impairments'].forEach((imp:any)=>{
    imp['treatment']=JSON.parse(clean(imp['treatment']))
    imp['physio_movements']=JSON.parse(clean(imp['physio_movements']))
    imp['class']=JSON.parse(clean(imp['class']))

  }
  )
  
  return newdata  


}



export function jsonifydata(data:any){

  var newdata=data
  
  newdata['kinematic_deviations'].forEach((deviation:any)=>{
    console.log(deviation['possible_impairments'])
    deviation['possible_impairments']=JSON.stringify(deviation['possible_impairments'])

  })

  newdata['impairments'].forEach((imp:any)=>{
    imp['treatment']=JSON.stringify(imp['treatment'])
    imp['physio_movements']=JSON.stringify(imp['physio_movements'])
    imp['class']=JSON.stringify(imp['class'])

  }
  )
  
  return newdata  


}