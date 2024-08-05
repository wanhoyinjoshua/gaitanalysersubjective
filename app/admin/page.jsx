'use client'
import React, { useState, useEffect } from 'react';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import {JSONToExcel,ExcelToJSON} from "../utils/Json_excel"
import Modal from "../components/modal/Modal"

import {  read, writeFile,utils } from 'xlsx';

const Page = () => {
  const [modalopen,setModalopen]=useState(false)
  const [confirm,setConfirm]=useState(false)
  const [link,setLink]=useState('#')

  const data ={
    // We will make a Workbook contains 2 Worksheets
    'animals': [
                {"name": "cat", "category": "animal"}
                ,{"name": "dog", "category": "animal"}
                ,{"name": "pig", "category": "animal"}
              ],
    'pokemons': [
                {"name": "pikachu", "category": "pokemon"}
                ,{"name": "Arbok", "category": "pokemon"}
                ,{"name": "Eevee", "category": "pokemon"}
              ]
  }
  function handleClick(href){
    //if yes 
    console.log("hihih")
    setModalopen(true)
    setLink(href)
    

    
  }
  function download(){
    var wb = utils.book_new()
    var animalWS = utils.json_to_sheet(data.animals) 
      var pokemonWS = utils.json_to_sheet(data.pokemons) 
      utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet
      utils.book_append_sheet(wb, pokemonWS, 'pokemons')
      writeFile(wb, 'book.xlsx')
  }

  const actions = [
    {
      title: 'Walking',
      href: '/walking',
      icon:icon.cilMediaStop,
      des:"Analysis and insights for swing phase and stance phase of walking",
      
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50',
    },
    {
      title: 'Standing up',
      href: '#',
      icon:icon.cilMediaRecord,
     
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50',
    },
    {
      title: 'Standing',
      href: '#',
      icon:icon.cilMediaStop,
    
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50',
    },
    {
      title: 'Sitting',
      href: '#',
      icon:icon.cilMediaRecord,
     
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50',
    }
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const importFromExcel = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    ExcelToJSON({
      file,
    }).then(parsedData => {
      console.log(parsedData);
      // Handle the parsed data as needed
    });
  };

  function jsonifydata(data){

    var newdata=data
    newdata['kinematic_deviations'].forEach((deviation)=>{
      console.log(deviation['possible_impairments'])
      deviation['possible_impairments']=JSON.parse(deviation['possible_impairments'])

    })

    newdata['impairments'].forEach((imp)=>{
      imp['treatment']=JSON.parse(imp['treatment'])
      imp['physio_movements']=JSON.parse(imp['physio_movements'])
      imp['class']=JSON.parse(imp['class'])

    }
    )
    
    return newdata


  }

  const exportData = (data) => {
    
    var newdata= jsonifydata(data)
    console.log(newdata)
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(newdata)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  const handlefile=async (e)=>{
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
  exportData(exitobject)

  }

  const handlefile2=async (e)=>{
    const file=e.target.files[0];
    const data=await file.arrayBuffer()
    
    const workbook=read(data)
    console.log(workbook)
    
    const treatment_ws= workbook.Sheets[workbook.SheetNames[0]]
    
    
    const treatment_final_data=utils.sheet_to_json(treatment_ws);


  const exitobject={
    "data":treatment_final_data
  }
  exportData(exitobject)

  }





  return(
    <div>
      <button >fuck me </button>
      
      <input type="file" onChange={(e)=>{handlefile(e)}} />
       <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                'inline-flex rounded-lg p-3 ring-4 ring-white'
              )}
            >
                <CIcon icon={action.icon} size="xxl" className="h-6 w-6"/>
            
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              <button onClick={()=>{handleClick(action.href)}} href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </button>
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {action.des}
            </p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>

    <Modal open={modalopen} link={link} setOpen={setModalopen}></Modal>
    {JSON.stringify(modalopen)}

  
    </div>

  )

  
}

export default Page