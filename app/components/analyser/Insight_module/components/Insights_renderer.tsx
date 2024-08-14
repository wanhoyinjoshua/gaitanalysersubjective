import React from 'react'
import { useState,useEffect } from 'react'

import { Insights } from '../utils/Insights'
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

import Sideoverlay from '@/app/components/SideOverlay/Sideoverlay';
import InsightsPanel from './InsightsPanel';
import LightbulbPanel from './LightbulbPanel';
import { InsightList } from '../../common/models/Insights/InsightList';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});




const Insights_renderer = (props:{list:InsightList,name:any}) => {
  var outputobject=new Insights(props)
  const strpercentage=outputobject.getImpPercentage("str")
  const coorpercentage=outputobject.getImpPercentage("coor")
  const otherspercentage=outputobject.getImpPercentage("others")
 
  const [toggleopen,setToggleopen]=useState(false)
 

  
 

  let [categories] = useState<any>(outputobject.ProduceFinalState())

 




  
  return (
    <div className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6  gap-y-0.5">
      <Sideoverlay kinematic_label={props.list["kinematic"]["label"]} toggleopen={toggleopen} setToggleopen={setToggleopen} content={outputobject.ProduceFinalState()} ></Sideoverlay>
   
    <div className='text-l font-extrabold'>
      {props.list["kinematic"]["label"]}
    </div>
    <div className='grid lg:grid-cols-2  md:grid-cols-1  sm:grid-cols-1'>
    <div>

 
    <LightbulbPanel setToggleopen={setToggleopen} content={outputobject.getImpstatement()}></LightbulbPanel>
    </div>
    <InsightsPanel 
    strength={outputobject.getStrImpCount()} 
    coor={outputobject.getCoorImpCount()} 
    power={outputobject.getPowerImpCount()} 
    rom={outputobject.getRomImpCount()} 
    sensation={outputobject.getSensationImpCount()} 
    ex_mus_ac={outputobject.getMusAcImpCount()}></InsightsPanel>

    </div>
  

        </div>
    
    
  )
}

export default Insights_renderer