import React from 'react'
import { useState,useEffect } from 'react'

const Box = (props:any) => {
  const [body,setBody]=useState(-1)
  const [strength,setStrength]=useState(-1)
  const [coordination,setCoordination]=useState(-1)
  const [rom,setROM]=useState(-1)
  const [part,setPart]=useState(-1)
  const [whole,setWhole]=useState(-1)
  const [nil,setNil]=useState(true)
  useEffect(()=>{
console.log(props.list)
    props.list['impairments'].map((e:any)=>{
      if(e.status==true){
        setNil(false)
      for (let i = 0; i <= e.treatmentideas.length-1; i++) {
        if(e.treatmentideas[i]&&e.treatmentideas[i].strength!=0){
          console.log("shishi")
          setStrength((prev)=>{
            return prev+1
        })


        }
        if(e.treatmentideas[i]&&e.treatmentideas[i].coordination==true){
          console.log("shishi")
          setCoordination((prev)=>{
            return prev+1
        })


        }

        if(e.treatmentideas[i]&&e.treatmentideas[i]['rom']==true){
          console.log("shishi")
          setROM((prev)=>{
            return prev+1
        })


        }
        
        if(e.treatmentideas[i]&&e.treatmentideas[i].part==true){
          console.log("shishi")
          setPart((prev)=>{
            return prev+1
        })


        }
        if(e.treatmentideas[i]&&e.treatmentideas[i].whole==true){
          console.log("shishi")
          setWhole((prev)=>{
            return prev+1
        })


        }
        
      }
    }
     


    })

  },[props])

  
  return (
    <div

  className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

  <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
        {props.list["kinematic"]["label"]}
      </h3>
      
<article
  className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
>
  <span className="inline-block rounded bg-blue-600 p-2 text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      />
    </svg>
  </span>

  <a href="#">
    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
      Insights
    </h3>
  </a>

  <p className="mt-2  text-sm/relaxed text-gray-500">
  <div>
   
   {nil==true?<div>It appears no impairments can sufficiently explain this kinematic deviation, please focus on whole task activity as much as possible!</div>:<div></div>}
 {nil ==true?null: <div>
     It appears that {strength>=coordination?"a strength based exercise program":"coordination based"}
     / {part>=whole?"part task":"whole task"} training
     will be most beneficial for this kinematic deviation.
     </div>}
     {rom>=0&&<div>
       please consider the effect of muscle stiffness in your treatment and see if any equipment will be of utlity.
       </div>}
      
 
   </div>
  </p>


</article>

      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
  <dl className="-my-3 divide-y divide-gray-100 text-sm">
    <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-1 sm:gap-4"
    >
      <dt className="font-medium text-gray-900">Potential Impairments</dt>
      {props.list['impairments'].map((e:any)=>{
        if(e.status==true){
          return (
            <div key={e[0]}>
          <dd key={e[0]}className="font-medium text-gray-900"><strong>{e["key"]}</strong></dd>
          <div>Potential treatment ideas</div>
          {e.treatmentideas.length==0?<div>There are no strageties for this impairment</div>:null}
          {e.treatmentideas.map((e:any)=>{
            return <div key={e.label}>{e.label}</div>
          })}
          </div>
          
          
          )


        }else{
          return <dd key={e[0]}className="font-medium text-red-500 line-through ">
            {e["key"]}</dd>

        }
       
      })}
     
    </div>
   
    </dl>
    </div>

      
    </div>

    
  </div>




  

  
</div>
  )
}

export default Box