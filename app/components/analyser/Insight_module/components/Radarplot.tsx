import React from 'react'
import { useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import {Radar,Bar} from 'react-chartjs-2';
import { ChartData } from 'chart.js';
Chart.register(CategoryScale);
import {Radardata} from "./radardata"

const Radarplot = (props:Radardata) => {

  const graphdata:ChartData<"bar", number[], string>= {
    labels: [
        'Strength',
        'Coordination',
         'Power',
        'Range of motion',
         'Sensation/Proprioception',
        'Excessive mucular activity '
        
      ],
    
      datasets: [{
        indexAxis:"y",
        label: 'Distribution of Potential impairments',
        data: [props.strength, props.coor,props.power,props.rom,props.sensation,props.ex_mus_ac],
       
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
         
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)'
         
        ],
        borderWidth: 1
        
        
      }],
      
    
  };

 
    return (
    <Bar  data={graphdata}  />
  )
}

export default Radarplot