'use client'
import React, { useState, useEffect } from 'react';
import Box from '../components/Box';
const Page = () => {

    
    const total_observations=
    ["early stance decreased df on heelstrike",//0
    "early stance decreased knee flexion",//1
    "mid stance decreased df",//2
    "mid stance knee hyperextension",//3
    "mid stance increased knee flexion",//4
    "mid stance decreased hip extension",//5
    "mid stance decreased lateral horizontal shift",//6
    "mid stance increased lateral horizontal shift",//7
    "early swing decreased DF",//8
    "early swing decreased knee flexion",//9
    "early swing decreased hip flexion",//10
    "early swing hip circumduction",//11
    "late swing decreased DF",//12
    "late swing decreased knee extension",//13
    "late swing decreased hip flexion",//14
]
    const [selected_observations,setObservations]=useState([])
    const [currentquestion,setQuestion]=useState(total_observations[0])
    const [index,setIndex]=useState(0)
    const [impairment,setImpairment]=useState()
    const [finalfinal,setfinal]=useState()
    useEffect(() => {

        var master=[]
        console.log(selected_observations)

        if(impairment && selected_observations){
            selected_observations.forEach(item=>{
              master.push(filterdict(impairment,[item]))




            })
            console.log(master)
            var finalmaster={}
            master.forEach((item)=>{

                const keys = Object.keys(item);
                var observation
                var queryimpairment=[]
                keys.forEach(key => {
                    
                    observation=total_observations[item[key][0]]
                    queryimpairment.push(key)
                });
                console.log(observation)
                console.log(queryimpairment)
                finalmaster[observation]=queryimpairment


            })
            setfinal(finalmaster)
            
        }

    },[impairment,selected_observations])
   
const dict={

    "hip flexor weakness":[9,11],
    "hip extensors weakness":[6,7,5],
    "hip abductors weakness":[6,7],
    "hip adductor weakness":[6,10,11],
    "knee extensor weakness":[1,13],
    "knee flexor weakness":[9,11,1],
    "ankle dorsiflexion weakness":[0,8,11,12],
    "ankle plantarflexion weakness":[10,11,3,2],
    "hamstring spasticity / rom":[13,14,9,10,11,4,5],
    "gastroc spasticity / rom":[8,12,13,0,1,2,3,5]
}
function filterdict(my_dict,my_list){
    var filteredDict = {};
    for (const key in my_dict) {
        const values = my_dict[key];
        const filteredValues = values.filter(value => my_list.includes(value));
    
        if (filteredValues.length > 0) {
            filteredDict[key] = filteredValues;
        }
    }

    return filteredDict
}
function yes(){

   if(impairment){
    
   }

    else if(impairment==null && index==14){
        var gg= [...selected_observations]
        gg.push(index)
        
        setObservations(gg)
        console.log(filterdict(dict,selected_observations))
        setImpairment(filterdict(dict,gg))

    }else{
        var gg= [...selected_observations]
        gg.push(index)
        
        setObservations(gg)
        setIndex((prev)=>{
            return prev+1
        })

    }

    


}
function no(){
    if(impairment){
    
    }
 
     else if(impairment==null && index==14){
        
        console.log(filterdict(dict,selected_observations))
        setImpairment(filterdict(dict,selected_observations))

    }else{
        setIndex((prev)=>{
            return prev+1
        })

    }
}
function tryagain(){

    setObservations([])
    setQuestion(total_observations[0])
    setIndex(0)
    setImpairment()
    setfinal()
}

  return (
    <div>
        {finalfinal?null:
     <div>
        {/*
  Heads up! 👋

  Custom CSS:
    - animate-background https://github.com/markmead/hyperui/blob/main/tailwind.preset.js
*/}

<article
  className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
  <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
    <time datetime="2022-10-10" className="block text-xl text-gray-500">
    Is the following observation true?
    </time>

    <a href="#">
      <h3 className="mt-0.5 text-lg font-medium text-gray-900">
      {total_observations[index]}
      </h3>
    </a>

    <div className="mt-4 flex flex-wrap gap-1">
      <span
        className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xl text-purple-600"
      >
          <button onClick={yes}>
            Yes
        </button>

       
      </span>

      <span
        className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xl text-purple-600"
      >
         <button onClick={no}>
            No
        </button>
      </span>
    </div>
  </div>
</article>
      

        </div>   
}

<br>
</br>
{finalfinal&&Object.keys(finalfinal).map((key) => (
    <div key={key}>

          
         
          <Box title={key} list={finalfinal[key]}></Box>
          </div>
          
        ))
        
        
        }
        {finalfinal&&<button className='class="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"' onClick={tryagain}>Try again</button>}


        


    </div>
  )
}

export default Page