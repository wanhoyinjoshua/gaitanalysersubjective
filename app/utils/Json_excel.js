import * as XLSX from 'xlsx';
export function JSONToExcel ({ data, fileName }) {
    // Create a workbook with a default sheet name 'Sheet 1'
    var newdata={...data}
    newdata["impairments"].forEach((impairment)=>{
        const newKinematic = JSON.stringify(impairment["kinematic_deviations"]);
        const newClass = JSON.stringify(impairment["class"]);
        const newMove = JSON.stringify(impairment["physio_movements"]);
        const newTreatment = JSON.stringify(impairment["treatment"]);
        impairment["class"] = newClass;
        impairment["kinematic_deviations"] = newKinematic;
        
        impairment["physio_movements"] = newMove;
        impairment["treatment"] = newTreatment;
        



    })
    
    const workbook = XLSX.utils.book_new();
    
    // Iterate over each key in the data object to create a new worksheet
    Object.keys(newdata).forEach(sheetName => {
      var sheetData = newdata[sheetName];
     
      // Convert the data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(sheetData);
      
      // Add the worksheet to the workbook with the sheetName
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });
  
    // Create the Excel file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };





  export function ExcelToJSON({ file }) {
    // Read the Excel file
    const workbook = XLSX.readFile(file);
    
    // Initialize an object to store the parsed data
    const jsonData = {};
  
    // Iterate over each sheet in the workbook
    workbook.SheetNames.forEach(sheetName => {
      // Convert the sheet data to JSON
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      // Add the JSON data to the object with the sheetName as the key
      jsonData[sheetName] = sheetData;
    });
  
    return jsonData;
  }