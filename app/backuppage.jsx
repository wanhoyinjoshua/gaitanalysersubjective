'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function Home() {
  const [csvData, setCSVData] = useState([]);
  const [paData, setpaData] = useState([]);
  const [pbData, setpbData] = useState([]);
  const [calData, setcalData] = useState([]);
  function trim (word){
    return word.replace(/\s/g, '');

  }
  function yes(key){
    var rownumber= getrownumwithpba(key,csvData)
    console.log(rownumber)
    
    var copied=[]
 
   
    var columnname= calData.map((item)=>{return item["P(A)"]})
    console.log(columnname)
    columnname.forEach((element,index) => {
      if (element==null){
        return -1
      }
      else{
        
        var newvalue =csvData[rownumber][element]
        //newdata[index]["prob"]=newvalue
        var copied= [...calData]
        calData[index]["prob"]=newvalue
        setcalData((prevCalData) => {
          return prevCalData.map((item) => {
            if (item["P(A)"] === null) {
              return item;
            } else {
              const newvalue = csvData[rownumber][item["P(A)"]];
              return { ...item, prob: newvalue };
            }
          });})

        
        
        
      }
    });
    

    
    console.log(calData)
    console.log(paData)

  }
  function no(key){
    


  }
  function getrownumwithpba(pba,dataarray){
   
 
      const index = dataarray.findIndex((item) => trim(item['PB|A']) == trim(pba));
      console.log(index)
    return index

    
   


    

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/pb_a.csv');
        const pa= await fetch ('/pa.csv')
        const pb= await fetch ('/pb.csv')
        const text = await response.text();
        const patext= await pa.text();
        const pbtext= await pb.text()


        // Use PapaParse to parse the CSV data
        Papa.parse(text, {
          complete: (result) => {
            // The parsed CSV data is available in result.data
            setCSVData(result.data);
            
          },
          header: true,
          dynamicTyping: true, // Set this to true if your CSV file has a header row
        });
        Papa.parse(patext, {
          complete: (result) => {
            // The parsed CSV data is available in result.data
            setpaData(result.data);
            setcalData(result.data)
            console.log(result.data)
          },
          header: true,
          dynamicTyping: true, // Set this to true if your CSV file has a header row
        });

        Papa.parse(pbtext, {
          complete: (result) => {
            // The parsed CSV data is available in result.data
            setpbData(result.data);
            console.log(result.data)
          },
          header: true,
          dynamicTyping: true, // Set this to true if your CSV file has a header row
        });
      } catch (error) {
        console.error('Error fetching or parsing CSV file:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="flex min-h-screen   justify-between p-24">
    
    <div className="flex-1 p-4"> {paData&&
      paData.map((item)=>{
        return <section key={item["prob"]}className='flex'>
          <div className='flex-1 p-4'>{item["P(A)"]}</div>
          <div className='flex-1 p-4'>
          {item["prob"]}

          </div>
          
          </section>
      })
      }</div>

    <div className='flex-1 p-4'>
      
      {pbData&&
      pbData.map((item)=>{
        return <section key={item["P(B)"]}>
          <div>{item["P(B)"]}</div>
          <button  onClick={()=>{yes(item["P(B)"])}}>yes</button>
          <button  onClick={()=>{no(item["P(B)"])}}>no</button>
          </section>
      })
      }
      
    
    </div>
    <div class="flex-1 p-4">
    {calData&&
      calData.map((item)=>{
        return <section key={item["prob"]}className='flex'>
          <div className='flex-1 p-4'>{item["P(A)"]}</div>
          <div className='flex-1 p-4'>
          {item["prob"]}

          </div>
          
          </section>
      })
      }

    </div>
    </main>
  )
}
