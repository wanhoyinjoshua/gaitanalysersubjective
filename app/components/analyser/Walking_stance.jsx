
import React, { useState, useEffect } from 'react';
import Box from '../Box'

const Walking_stance = () => {

    //ankle =0
    //genere = 0 is strength 1 is coordination, 2 is part task , 3 is whole task 

    const treatmentsoptions=[
        {"des":"Ankle dorsiflexion eccentrically in sitting with/without electrical stimulation ",
        "body":0,
        "level":0,
        "strength":2,
        "coordination":false,
        "part":false,
        "whole":false,
        "id":0
       
    
    }
    ,
    {"des":"Swing phase ensuring heel strike maintaining dorsiflexion then lowering forefoot to the floor",
    "body":0,
    "level":0,
    "strength":0,
    "coordination":true,
    "part":true,
    "whole":false,
    "id":1
   
       
    
    }//0,
    ,
    {"des":"Use of footprints/small circles for heel contact overground or markers on treadmill",
    "body":0,
    "level":0,
    "strength":0,
    "coordination":true,
    "part":false,
    "whole":true,
    "id":2
   

},
{"des":"Soleus: Sitting - pushing heel off the ground (make sure not compensating with hip flexors to lift their thigh)",
"body":0,
"level":0,
"strength":2,
"coordination":false,
"part":false,
"whole":false,
"id":3


},
{"des":"Gastrocs in standing on a reverse wedge with back against wall and lower heels down to floor to fatigue",
"body":0,
"level":1,
"strength":2,
"coordination":false,
"part":false,
"whole":false,
"id":4


},
{"des":"Back against wall, move body forwards away from wall by dorsiflexing at ankles – increase body weight on affected leg (eg scales to monitor)",
"body":0,
"level":1,
"strength":0,
"coordination":true,
"part":true,
"whole":false,
"id":5


},

{"des":"Step intact leg forward systematically increasing step lengths (again can use back against wall to promote forward translation)– make sure that weight moves forward on affected leg while stepping (can use scales under forefoot only to give feedback on weight translation onto forefoot)",
"body":0,
"level":2,
"strength":0,
"coordination":true,
"part":true,
"whole":false,
"id":6


},
{"des":"Walking with visual/auditory cues to increase step length",
"body":0,
"level":2,
"strength":0,
"coordination":true,
"part":false,
"whole":true,
"id":7


},
{"des":"Walking on treadmill with visual/auditory cues",
"body":0,
"level":2,
"strength":0,
"coordination":true,
"part":false,
"whole":true,
"id":8


},
{"des":"Plantarflex in lying against resistance (wall, end of bed, tilt-table preferably with feedback eg scales, pressure monitor)",
"body":0,
"level":1,
"strength":1,
"coordination":false,
"part":false,
"whole":false,
"id":9


},
{"des":"Standing with back to the wall, affected leg on a dorsiflexion wedge and intact leg on a block. Person instructed to raise heel rapidly. Remember to ask person to keep back on wall and avoid unloading affected leg. ",
"body":0,
"level":1,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":10


},

{"des":"Standing with back to the wall, affected leg on a dorsiflexion wedge and intact leg on a block. Person instructed to raise heel rapidly. Remember to ask person to keep back on wall and avoid unloading affected leg.verbal cueing to emphasise eccentric control and to switch rapidly between eccentric and concentric activity. ",
"body":0,
"level":2,
"strength":2,
"coordination":true,
"part":true,
"whole":false,
"id":11


},
{"des":"Step intact foot forward, use scales under affected fore-foot (to make sure weight is translated into forefoot and pushing into plantar flexion)",
"body":0,
"level":2,
"strength":2,
"coordination":true,
"part":true,
"whole":false,
"id":12


},
{"des":"Step intact leg forward and up onto block to ensure need to plantarflex in SLS on affected leg)",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":13


},

{"des":"Increased speed of walking to demand increased plantarflexor activity for push off",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":false,
"whole":true,
"id":14


},

{"des":"Verbal cues regarding the timing of push-off (e.g. the affected heel should be off the ground before the other foot touches the ground",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":false,
"whole":true,
"id":15


},
{"des":"Person standing with back to wall with intact leg on block. Person instructed to flex affected knee and extend back to wall",
"body":0,
"level":1,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":16


},
{"des":"Stepping affected leg forward and flexing knee to target",
"body":0,
"level":1,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":17


},
{"des":"Step off block with affected leg to increase amount of ground reaction force on landing, flex knee to target after landing",
"body":0,
"level":1,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":18


},
{"des":"Person standing with back to wall with intact leg on block. Person instructed to flex affected knee and extend back to wall ,adding wedge to put ankle into PF in order to make it more difficult for knee to maintain extension",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":19


},
{"des":"Stepping intact leg forward (or onto a block) while maintaining knee extension on affected leg",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":20


},
{"des":"Walking practice with verbal cues to keep affected knee in flexion (avoid hyperextension)",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":false,
"whole":true,
"id":21


},

{"des":"Stepping intact leg forward from behind affected leg, ensuring that hip on affected leg moves into extension, use target if necessary, this forces hip extensors to work from a flexed position",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":22


},
{"des":"Stepping intact leg forward from behind affected leg and up into a block, ensuring that hip on affected leg moves into extension, use target if necessary, this forces hip extensors to work from a flexed position",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":23


},

{"des":"Stepping intact leg in different directions e.g. out vs. across midline to increase abduction and adduction",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":24


},

{"des":"Person standing with back to wall and stepping intact leg on/off block with target for amount of lateral pelvic shift over stance leg ( narrow BOS to progress)",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":true,
"whole":false,
"id":25


},
{"des":"Walking with visual cues for base of support (BOS)",
"body":0,
"level":2,
"strength":1,
"coordination":true,
"part":false,
"whole":true,
"id":26


},
{"des":"Walking emphasising walking with heel strike at Initial Contact",
"body":0,
"level":2,
"strength":0,
"coordination":true,
"part":false,
"whole":true,
"id":27


},
{"des":"Stretching, prolonegd positioing, rom related treatment , AFO",
"body":0,
"level":0,
"strength":0,
"coordination":false,
"part":false,
"whole":false,
"rom":true,
"id":28


},




    ]

    
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
            console.log(currentimpairment)
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
                    var convertedtreatment=item[key]["treatment"].map((e)=>{
                        return treatmentsoptions[e]
                    })
                    queryimpairment.push({"impairment":item[key]["key"],"status":item[key]["status"],"treatment":convertedtreatment,"body":item[key]["body"]})  
                    
                });
                console.log(observation)
                console.log(queryimpairment)
                finalmaster[observation]={"impairments":queryimpairment}


            })
            setfinal(finalmaster)
            
        }

    },[impairment,selected_observations])

    const bodydict={
        "ankle":0
    }

   
const dict={

    "Decreased eccentric strength in ankle dorsiflexors":{"kinematic_deviations":[0],"testing":"MMT ankle dorsiflexors eccentrically, sitting, knee flexed – extended","category":0,"treatment":[0],"body":bodydict["ankle"]},
    "Decreased eccentric strength in ankle plantarflexors (Soleus andgastrocs)":{"kinematic_deviations":[1,5,6],"testing":"MMT ankle plantarflexors eccentrically: Soleus: sitting Gastrocnemius: with knee extended sitting/standing","category":0,"treatment":[3,4],"body":bodydict["ankle"]},
    "Decreased concentric strength ankle plantarflexors:Soleus,Gastrocnemius":{"kinematic_deviations":[2],"testing":"MMT ankle plantarflexors eccentrically: Soleus: sitting Gastrocnemius: with knee extended sitting/standing","category":0,"treatment":[3,9],"body":bodydict["ankle"]},
    "Decreased strength knee flexors concentrically prior to and at heel strike":{"kinematic_deviations":[3],"testing":"MMT – Knee flexors concentrically with knee in almost full extension (consider closed vs open chain)","category":0,"treatment":[],"body":bodydict["ankle"]},
    "Decreased concentric strength knee extensors":{"kinematic_deviations":[4],"testing":"MMT – check inner range strength of knee extensors","category":0,"treatment":[20,22,23],"body":bodydict["ankle"]},
    "Decreased concentric strength knee flexors":{"kinematic_deviations":[],"testing":"","category":""},
    "Decreased concentric strength hip extensors at inital contact":{"kinematic_deviations":[6],"testing":"MMT of hip extensors concentrically","category":0,"treatment":[20,22,23],"body":bodydict["ankle"]},
    "Decreased strength hip flexors working eccentrically during the second half of stance":{"kinematic_deviations":[6],"testing":"MMT of hip flexors eccentrically","category":0,"treatment":[20,22,23],"body":bodydict["ankle"]},
    "Decreased strength knee extensors working concentrically at mid stance":{"kinematic_deviations":[6],"testing":"MMT of knee extensors concentrically at end range (emulating mid stance)","category":0,"treatment":[],"body":bodydict["ankle"]},
    "Decreased strength hip abductors":{"kinematic_deviations":[7,8],"testing":"• MMT of hip abductors sidelying/supine","category":0,"treatment":[],"body":bodydict["ankle"]},

    "Impaired Coordination/?endurance to maintain dorsiflexion as knee is extended":{"kinematic_deviations":[0],"testing":"Test ability to dorsiflex,dorsiflex slowly and maintain dorsiflexion as knee moves into extension","category":1,"treatment":[1,2,26],"body":bodydict["ankle"]},

    "Decreased ability to coordinate eccentric ankle plantarflexors, with other Lower Limb extensors and hip abductors through stance phase":{"kinematic_deviations":[1],"testing":"Test ability to move body forward over foot in single leg stance (SLS)","category":1,"treatment":[5,6,7,8],"body":bodydict["ankle"]},
    "Impaired Ability to prevent knee hyperextension in mid stance as LL moves over foot":{"kinematic_deviations":[1],"testing":"Screen co-ordination with heel taps or alternate heel/toe taps","category":1,"treatment":[5,6,7,8],"body":bodydict["ankle"]},
    "Decreased ability to rapidly plantarflex ankle in single leg stance":{"kinematic_deviations":[2],"testing":"Test ability to rapidly plantarflex ankle in Single leg stance","category":1,"treatment":[10,11],"body":bodydict["ankle"]},
    "Decreased ability to coordinate ankle plantarflexors, with other lower limb extensors and hip abductors":{"kinematic_deviations":[2],"testing":"Screen ability to rapidly plantarflex ankle e.g. heel taps in sitting","category":1,"treatment":[12,13,7,15,14],"body":bodydict["ankle"]},
    "Decreased ability to coordinate knee flexors with ankle plantarflexors eccentrically at heel strike":{"kinematic_deviations":[3],"testing":"Ability to control knee flexion/extension in almost full knee extension ","category":1,"treatment":[16,17,18],"body":bodydict["ankle"]},
    "Decreased ability to coordinate knee extensors,knee flexors and ankle plantarflexors":{"kinematic_deviations":[4,5],"testing":"Test ability to extend knee in SLS","category":1,"treatment":[16,19,20],"body":bodydict["ankle"]},
    "Decreased ability to coordinate all LL extensors and hip abductors":{"kinematic_deviations":[6],"testing":"Test ability to maintain SLS with knee and hip extended, Test ability to move body forward over foot in SLS, Speed and endurance of hip extensor activity","category":1,"treatment":[20,22,23,7,8],"body":bodydict["ankle"]},
    "Decreased ability to coordinate hip extensors and hip abductors":{"kinematic_deviations":[7],"testing":"Test ability to stand in SLS and control pelvic shift over stance leg","category":1,"treatment":[24,25,26],"body":bodydict["ankle"]},
    "Decreased ability to change from eccentric to concentric hip abductor activity":{"kinematic_deviations":[8],"testing":"Test ability to stand in SLS and control pelvic shift over stance leg","category":1,"treatment":[24,25,26],"body":bodydict["ankle"]},
    "Decreased ankle ( dorsiflexor/ plantarflexor) sensation":{"kinematic_deviations":[0,1,2,5],"testing":"Cotton wool comapre both sides","category":1,"treatment":[],"body":bodydict["ankle"]},
    "Decreased knee proprioception":{"kinematic_deviations":[3,4,5],"testing":"Knee proprioception tests, reproduce specified knee flexion without visual input","category":1,"treatment":[],"body":bodydict["ankle"]},
    "Decreased passive ankle dorsiflexion":{"kinematic_deviations":[0,1,4,5,6],"testing":"ROM Tests","category":2,"treatment":[28],"body":bodydict["ankle"]},
    "Decreased passive ankle plantarflexion":{"kinematic_deviations":[2],"testing":"ROM Tests","category":"ROM","treatment":[28],"body":bodydict["ankle"]},
    "Decreased passive knee flexion (unlikely unless very severe)":{"kinematic_deviations":[3],"testing":"ROM Tests","category":2,"treatment":[28],"body":bodydict["ankle"]},
    "Decreased passive hip extension":{"kinematic_deviations":[6],"testing":"ROM Tests","category":2,"treatment":[28],"body":bodydict["ankle"]},


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
                filteredDict[key] = {"key":key,"kinematic_deviations":filteredValues,"testing":my_dict[key]["testing"],"category":my_dict[key]["category"],"treatment":my_dict[key]["treatment"],"body":my_dict[key]["body"]};
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
                filteredDict[key] = {"status":my_dict[key]["status"],"key":my_dict[key]["key"],"kinematic_deviations":filteredValues,"testing":my_dict[key]["testing"],"category":my_dict[key]["category"],"treatment":my_dict[key]["treatment"],"body":my_dict[key]["body"]};
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
    
        //thats when you set the impairment 
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
        //cherck this one first
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