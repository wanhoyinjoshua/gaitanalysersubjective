import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { Disclosure,Transition  } from '@headlessui/react'
import { Insights } from '../utils/Insights'
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import Graph from './Graph/Graph'
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




const Insights_renderer = (props:any) => {
  var outputobject=new Insights(props)
  const [body,setBody]=useState(-1)
  const [strength,setStrength]=useState(-1)
  const [coordination,setCoordination]=useState(-1)
  const [impairmentstr,setcountstr]=useState(0)
  const [impairmentcoor,setcountcoor]=useState(0)
  const [imglink,setImagelink]=useState()
  const [impairmentother,setcountother]=useState(0)
  const [rom,setROM]=useState(-1)
  const [part,setPart]=useState(-1)
  const [whole,setWhole]=useState(-1)
  const [nil,setNil]=useState(true)
  const [graphdata,setGraphData]=useState<any>()
  const dict:any={
    "1":"Paralysed",
    "2":"Very Weak",
    "3":"Weak",
    "4":"Strong"

  }

  function countimpairmenttype(){
    var validcount=0
    var strengthcount=0

    var coorcount=0

    var othercount=0

    props.list['impairments'].forEach((e:any)=>{
    
      if(e.status==true){
        validcount+=1

      }
      if(e.status==true && (e["class"].includes("concentric_str")||e["class"].includes("eccentric_str"))){
        strengthcount+=1
      }
      if(e.status==true && e["class"].includes("coor")){
        coorcount+=1
      }
      

    })
    const finalother= validcount-strengthcount-coorcount
  


    return [strengthcount,coorcount,finalother]

  }
 
 
  useEffect(()=>{
    //maybe on effect
    
    console.log(categories)

    props.list['impairments'].forEach((e:any)=>{
      if(e.status==true){
        setNil(false)
      for (let i = 0; i <= e.treatmentideas.length-1; i++) {
       
        if(e.treatmentideas[i]&&e.treatmentideas[i].strength!=0){
          
          setStrength((prev)=>{
            return prev+1
        })


        }
        if(e.treatmentideas[i]&&e.treatmentideas[i].coordination==true){
         
          setCoordination((prev)=>{
            return prev+1
        })


        }

        if(e.treatmentideas[i]&&e.treatmentideas[i]['rom']==true){
        
          setROM((prev)=>{
            return prev+1
        })


        }
        
        if(e.treatmentideas[i]&&e.treatmentideas[i].part==true){

          setPart((prev)=>{
            return prev+1
        })


        }
        if(e.treatmentideas[i]&&e.treatmentideas[i].whole==true){
   
          setWhole((prev)=>{
            return prev+1
        })


        }
        
      }
    }
     


    })

   

    
    

  },[])
  function strengthimpairment(){
    return(
      props.list['impairments'].map((e:any)=>{
        
        if(e&&e["class"]&&(e["class"].includes("eccentric_str")||e["class"].includes("concentric_str"))){
          //need to somehow store the treatment ideas to this shit and then geenrate
          if(e.status==true||e["skip_status"]==true){
            return (
              <div key={e[0]}>
                
                
            <dd key={e[0]}className="font-medium text-gray-900"><strong>{e["key"]}</strong>-{dict[`${e["str_lvl"].toString()}`]}</dd>
            
            <div>Potential treatment ideas</div>
            {e.treatmentideas.length==0?<div>There are no strageties for this impairment</div>:null}
            <ol className='list-decimal grid grid-cols-1 divide-y'>
          
            {e.treatmentideas.map((e:any)=>{
              
                return <li key={e.label}>{e.label}</li>

              
              
            })}
            </ol>
            </div>
            
            
            )

          }
          else{
            return <dd key={e[0]}className="font-medium text-red-500 line-through ">
            {e["key"]}</dd>
          }

        


        }else{
          return

        }
       
      })
    )
  }
  function coorimpairment(){
    return(
      props.list['impairments'].map((e:any)=>{
        
        if(e&&e["class"]&&e["class"].includes("coor")){
          if(e.status==true){
            return (
              <div key={e[0]}>
                
                
            <dd key={e[0]}className="font-medium text-gray-900"><strong>{e["key"]}</strong></dd>
            <div>Potential treatment ideas</div>
            
            {e.treatmentideas.length==0?<div>There are no strageties for this impairment</div>:null}
            <ol className='list-decimal grid grid-cols-1 divide-y'>
            {e.treatmentideas.map((e:any)=>{
              return <li key={e.label}>{e.label}</li>
            })}
            </ol>
            </div>
            
            
            )

          }
          else{
            return <dd key={e[0]}className="font-medium text-red-500 line-through ">
            {e["key"]}</dd>
          }

        


        }else{
          return

        }
       
      })
    )
  }
  function musclelengthimpairment(){
    return(
      props.list['impairments'].map((e:any)=>{
       
        if(e&&e["class"]&&(e["class"].includes("concentric_str")||e["class"].includes("eccentric_str") || e["class"].includes("coor"))){
         return
  
       
  
  
       }else{
         if(e.status==true){
           return (
             <div key={e[0]}>
               
               
           <dd key={e[0]}className="font-medium text-gray-900"><strong>{e["key"]}</strong></dd>
           <div>Potential treatment ideas</div>
           {e.treatmentideas.length==0?<div>There are no strageties for this impairment</div>:null}
           <ol className='list-decimal grid grid-cols-1 divide-y'>
            {e.treatmentideas.map((e:any)=>{
              return <li key={e.label}>{e.label}</li>
            })}
            </ol>
           </div>
           
           
           )
  
         }
         else{
           return <dd key={e[0]}className="font-medium text-red-500 line-through ">
           {e["key"]}</dd>
         }
  
       }
        
       })
      
    )
   
  }

  let [categories] = useState<any>(outputobject.ProduceFinalState())

  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }




  
  return (
<Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-red-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <section>
         
    
                  <article
                  className=" p-4 shadow-sm transition  sm:p-6"
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

                  {props.list["kinematic"]["label"]}


                  </h3>
                  </a>

                  <p className="mt-2  text-sm/relaxed text-gray-500">
                  <div>

                  {nil==true?<div>It appears no impairments can sufficiently explain this kinematic deviation, please focus on whole task activity as much as possible!</div>:<div></div>}

                  {nil ==true?null: categories["Strength"]["number"]==0&&categories["Coordination"]["number"]==0?<div>It appears that neither strength / coordination based exercise will target this impairment, please consider other subtle impairments, eg proprioception, sensation</div>:
                  <div>
                  It appears that {categories["Strength"]["number"]>=categories["Coordination"]["number"]?"a strength based exercise program":"coordination based"}
                  / {part>=whole?"part task":"whole task"} training
                  will be most beneficial for this kinematic deviation.
                  </div>}
                  {rom>=0&&<div>
                  please consider the effect of muscle stiffness in your treatment and see if any equipment will be of utlity.
                  </div>}
                  {/*
                  <div className='h-48 w-full'>
                  <Graph data={props.list['impairments']}></Graph>

                  </div>
                  */}



                  </div>
                  </p>


                  </article>
                </section>
                
                <div className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
</svg>

                </div>
                
              </Disclosure.Button>
              <Transition
        enter="transition duration-500 ease-out"
        enterFrom="transform scale-100 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-100 opacity-0"
      >
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
              <div

className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
>



<div className="w-full sm:flex sm:justify-between sm:gap-4 ">
  <div className='w-full'>
    

    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm w-full">
<dl className="-my-3 divide-y divide-gray-100 text-lg w-full">
<div className="w-full  px-2 py-16 sm:px-0">

  
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-grey/100 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-grey-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            <div>
            {category} &#40;{JSON.stringify(categories[category]["number"])}&#41;

            </div>
            
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">

        {Object.values(categories).map((e:any) => (
          <Tab.Panel
            key={"1"}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
             
            {e.component}
            <br></br>
             {/* 

              {e.componentnil&&
            <div>
               <strong>
              Eliminated impairments
            </strong>
            {e.componentnil}

            </div>
            }
             
             */}
           
           

          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  </div>
 
  </dl>
  </div>

  <section>
 
  </section>

    
  </div>

  
</div>







</div>
              </Disclosure.Panel>
              </Transition>
            </>
          )}

     
        </Disclosure>
    
    
  )
}

export default Insights_renderer