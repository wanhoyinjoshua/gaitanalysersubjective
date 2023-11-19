
import React, { useState, useEffect } from 'react';
import Box from '../Box'

const Walking_stance = () => {

    
    const total_observations=
    ["Decreased ankle dorsiflexion at initial contact (heel strike)",//0
    "Decreased ankle dorsiflexion from foot flat to heel off",//1
    "Decreased ankle plantarflexion from heel off to toe off",//2
    "Decreased knee flexion at initial contact to foot flat",//3
    "Decreased knee ext at foot flat to mid stance",//4
    "Knee hyperextension at foot flat to mid stance",//5
    "Decreased hip extension from initial contact to late stance phase",//6
    "Decreased or increased hip adduction at initial contact to mid stance",//7
    "Increased or decreased hip abduction from mid stance to toe-off",//8
    
]
    const [selected_observations,setObservations]=useState([])
    const [currentquestion,setQuestion]=useState(total_observations[0])
    const [currentimpairment,setCurrentimpairment]=useState()
    const [index,setIndex]=useState(0)
    const [impairment,setImpairment]=useState()
    const [finalfinal,setfinal]=useState()
    const [impairmentcount,setCountimpairment]=useState(0)
    const [deleteimpairment,setDeleteimpairment]=useState([])
    const [testingphase,setTesting]=useState(false)
    useEffect(() => {

        var master=[]
        console.log(selected_observations)
        if(selected_observations&&impairment){
            setCurrentimpairment(Object.entries(impairment).map(([key, value]) => ({ key, ...value })))

        }

        if(testingphase && selected_observations&&impairment){
            //need to eliminate impairments first
            //need to convert the impairment list back to obejcts
            //setCurrentimpairment(Object.entries(impairment).map(([key, value]) => ({ key, ...value })))
            console.log("display")
            console.log(impairment)
            selected_observations.forEach(item=>{
              master.push(filterdict_mod(impairment,[item]))




            })
            console.log(master)
            var finalmaster={}
            master.forEach((item)=>{

                const keys = Object.keys(item);
                var observation
                var queryimpairment=[]
                keys.forEach(key => {
                    
                    observation=total_observations[item[key]["kinematic_deviations"][0]]
                    queryimpairment.push({"impairment":item[key]["key"],"status":item[key]["status"]})  
                    
                });
                console.log(observation)
                console.log(queryimpairment)
                finalmaster[observation]={"impairments":queryimpairment}


            })
            setfinal(finalmaster)
            
        }

    },[impairment,selected_observations])
   
const dict={

    "Decreased eccentric strength in ankle dorsiflexors":{"kinematic_deviations":[0],"testing":"MMT ankle dorsiflexors eccentrically, sitting, knee flexed – extended","category":"strength"},
    "Decreased eccentric strength in ankle plantarflexors (Soleus andgastrocs)":{"kinematic_deviations":[1,5,6],"testing":"MMT ankle plantarflexors eccentrically: Soleus: sitting Gastrocnemius: with knee extended sitting/standing","category":"strength"},
    "Decreased concentric strength ankle plantarflexors:Soleus,Gastrocnemius":{"kinematic_deviations":[2],"testing":"MMT ankle plantarflexors eccentrically: Soleus: sitting Gastrocnemius: with knee extended sitting/standing","category":"strength"},
    "Decreased strength knee flexors concentrically prior to and at heel strike":{"kinematic_deviations":[3],"testing":"MMT – Knee flexors concentrically with knee in almost full extension (consider closed vs open chain)","category":"strength"},
    "Decreased concentric strength knee extensors":{"kinematic_deviations":[4],"testing":"MMT – check inner range strength of knee extensors","category":"strength"},
    "Decreased concentric strength knee flexors":{"kinematic_deviations":[],"testing":"","category":""},
    "Decreased concentric strength hip extensors at inital contact":{"kinematic_deviations":[6],"testing":"MMT of hip extensors concentrically","category":"strength"},
    "Decreased strength hip flexors working eccentrically during the second half of stance":{"kinematic_deviations":[6],"testing":"MMT of hip flexors eccentrically","category":"strength"},
    "Decreased strength knee extensors working concentrically at mid stance":{"kinematic_deviations":[6],"testing":"MMT of knee extensors concentrically at end range (emulating mid stance)","category":"strength"},
    "Decreased strength hip abductors":{"kinematic_deviations":[7,8],"testing":"• MMT of hip abductors sidelying/supine","category":"strength"},

    "Impaired Coordination/?endurance to maintain dorsiflexion as knee is extended":{"kinematic_deviations":[0],"testing":"Test ability to dorsiflex,dorsiflex slowly and maintain dorsiflexion as knee moves into extension","category":"coordination"},

    "Decreased ability to coordinate eccentric ankle plantarflexors, with other Lower Limb extensors and hip abductors through stance phase":{"kinematic_deviations":[1],"testing":"Test ability to move body forward over foot in single leg stance (SLS)","category":"coordination"},
    "Impaired Ability to prevent knee hyperextension in mid stance as LL moves over foot":{"kinematic_deviations":[1],"testing":"Screen co-ordination with heel taps or alternate heel/toe taps","category":"coordination"},
    "Decreased ability to rapidly plantarflex ankle in single leg stance":{"kinematic_deviations":[2],"testing":"Test ability to rapidly plantarflex ankle in Single leg stance","category":"coordination"},
    "Decreased ability to coordinate ankle plantarflexors, with other lower limb extensors and hip abductors":{"kinematic_deviations":[2],"testing":"Screen ability to rapidly plantarflex ankle e.g. heel taps in sitting","category":"coordination"},
    "Decreased ability to coordinate knee flexors with ankle plantarflexors eccentrically at heel strike":{"kinematic_deviations":[3],"testing":"Ability to control knee flexion/extension in almost full knee extension ","category":"coordination"},
    "Decreased ability to coordinate knee extensors,knee flexors and ankle plantarflexors":{"kinematic_deviations":[4,5],"testing":"Test ability to extend knee in SLS","category":"coordination"},
    "Decreased ability to coordinate all LL extensors and hip abductors":{"kinematic_deviations":[6],"testing":"Test ability to maintain SLS with knee and hip extended, Test ability to move body forward over foot in SLS, Speed and endurance of hip extensor activity","category":"coordination"},
    "Decreased ability to coordinate hip extensors and hip abductors":{"kinematic_deviations":[7],"testing":"Test ability to stand in SLS and control pelvic shift over stance leg","category":"coordination"},
    "Decreased ability to change from eccentric to concentric hip abductor activity":{"kinematic_deviations":[8],"testing":"Test ability to stand in SLS and control pelvic shift over stance leg","category":"coordination"},
    "Decreased ankle ( dorsiflexor/ plantarflexor) sensation":{"kinematic_deviations":[0,1,2,5],"testing":"Cotton wool comapre both sides","category":"coordination"},
    "Decreased knee proprioception":{"kinematic_deviations":[3,4,5],"testing":"Knee proprioception tests, reproduce specified knee flexion without visual input","category":"coordination"},
    "Decreased passive ankle dorsiflexion":{"kinematic_deviations":[0,1,4,5,6],"testing":"ROM Tests","category":"ROM"},
    "Decreased passive ankle plantarflexion":{"kinematic_deviations":[2],"testing":"ROM Tests","category":"ROM"},
    "Decreased passive knee flexion (unlikely unless very severe)":{"kinematic_deviations":[3],"testing":"ROM Tests","category":"ROM"},
    "Decreased passive hip extension":{"kinematic_deviations":[6],"testing":"ROM Tests","category":"ROM"},


}
function filterdict(my_dict,my_list){
    var filteredDict = {};
    console.log(my_dict)
    for (const key in my_dict) {
        const values = my_dict[key]["kinematic_deviations"];
        console.log(values)
        if (values){
            const filteredValues = values.filter(value => my_list.includes(value));
    
            if (filteredValues.length > 0) {
                filteredDict[key] = {"key":key,"kinematic_deviations":filteredValues,"testing":my_dict[key]["testing"],"category":my_dict[key]["category"]};
            }
        }
        
    }

    return filteredDict
}



function filterdict_mod(my_dict,my_list){
    var filteredDict = {};
    console.log(my_dict)
    for (const key in my_dict) {
        const values = my_dict[key]["kinematic_deviations"];
        console.log(values)
        if (values){
            const filteredValues = values.filter(value => my_list.includes(value));
    
            if (filteredValues.length > 0) {
                filteredDict[key] = {"status":my_dict[key]["status"],"key":my_dict[key]["key"],"kinematic_deviations":filteredValues,"testing":my_dict[key]["testing"],"category":my_dict[key]["category"]};
            }
        }
        
    }

    return filteredDict
}


function yes(){

   if(impairment){
    if(impairment&&currentimpairment&&impairmentcount==currentimpairment.length-1){
        setTesting(true)
        console.log(currentimpairment)
        var imp=[...currentimpairment]
        var newimpairment=[]

        for (let i = 0; i < currentimpairment.length; i++) {
            if(deleteimpairment.includes(i)){
                var updateimpairment=currentimpairment[i]
                updateimpairment["status"]=false
                newimpairment.push(updateimpairment)

            }
            else{
                var updateimpairment=currentimpairment[i]
                updateimpairment["status"]=true
                newimpairment.push(updateimpairment)
            }
        }
    
    
        setImpairment([...newimpairment])
        return
    }
    if (impairmentcount==0){

        setCountimpairment((prev)=>{
            return prev+1
        })

        
    }
    else{
        console.log("hih")
        setCountimpairment((prev)=>{
            return prev+1
        })

    }
    
   }

    else if(impairment==null && index==total_observations.length-1){
        var gg= [...selected_observations]
        gg.push(index)
        console.log("finsh")
        
        setObservations(gg)
        
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

    if(impairment&&currentimpairment&&impairmentcount==currentimpairment.length-1){
        setTesting(true)
       
        
        var newimpairment=[]

        for (let i = 0; i < currentimpairment.length; i++) {
            if(deleteimpairment.includes(i)){
                var updateimpairment=currentimpairment[i]
                updateimpairment["status"]=false
                newimpairment.push(updateimpairment)

            }
            else{
                var updateimpairment=currentimpairment[i]
                updateimpairment["status"]=true
                newimpairment.push(updateimpairment)
            }
        }
         setImpairment([...newimpairment])
        return
    }
    
    if(impairment){

        //I need to remove it fromt the impaurment list somehow
        
        var newnew=[...deleteimpairment]
        newnew.push(impairmentcount)
        
       
        setDeleteimpairment([...newnew])

        setCountimpairment((prev)=>{
            return prev+1
        })
    
    }
 
     else if(impairment==null && index==total_observations.length-1){
        
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
    
        {testingphase?null:
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
       
      {impairment&&currentimpairment&&currentimpairment[impairmentcount]?<div>{JSON.stringify(currentimpairment[impairmentcount]["key"])}
      <br>
      </br>
      Testing Strageties:
      {currentimpairment&&JSON.stringify(currentimpairment[impairmentcount]["testing"])}

      
      </div>:<div>{total_observations[index]}</div>}
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
{JSON.stringify(finalfinal)}
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

export default Walking_stance