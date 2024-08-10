import React from 'react'
import LeftPanel from '../common/LeftPanel'
import { useContext,useState } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { findIndexfromId } from '../../utils/findIndexfromid'
import { physio_movements , classes} from '../../models/constants'

import { text } from 'stream/consumers'
import { customSearch } from '../../utils/customSearch'
import CheckBox from '@/app/components/ui/CheckBox'
const Editor_Imp = (props:any) => {
  const context=useContext(editorJsonfileContext)
  const [ImpIndex,setImpindex]=useState<any|number>(context.impairments[0].id)
  const [newIMP,setNewImp]=useState("")
  const [userWord,setUserword]=useState("")

  function current(){
    return context.impairments[findIndexfromId(context.impairments,ImpIndex)]
   }
   function handlePhysioMovement(movement:string){
    if(current().physio_movements.includes(movement)
    ){
      context.dispatchImp({
        type:"physiomovementremove",
        id:ImpIndex,
        text:movement

      })

    }else{
      context.dispatchImp({
        type:"physiomovementadd",
        id:ImpIndex,
        text:movement

      })

    }

   }

   function handleclass(classes:string){
    context.dispatchImp({
      type:"setClasses",
      id:ImpIndex,
      text:classes
    })

   }
  return (
    <div className='flex'>
            <LeftPanel 
            activeIndex={ImpIndex}
      newItem={newIMP} 
      setNewItem={setNewImp} 
      dispatchItemadd={ context.dispatchImp} 
      addLabeltext={'Imp'} 
      itemList={context.impairments}
      itemLabelName={'impairment'} 
      setViewItem={setImpindex} 
      dispatchdeleteItem={context.dispatchImp}
      purge={context.dispatchKd}
      reorderFunction={context.dispatchImp}
     
      >
        
      </LeftPanel>
      <section className='w-1/2 max-h-screen overflow-y-scroll'>
    {context.impairments.length>0&&current()&&current().id!=null&&findIndexfromId(context.impairments,ImpIndex)!=-1&&
    <div  >
      <section className='bg-cyan-100 p-5'>

        <div>You can edit the words of your selected impairment below</div>
        
    <input className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type='text' value={current().impairment} onChange={(e)=>{
      context.dispatchImp({
        type:"change",
        id:ImpIndex,
        text:e.target.value

      })
    }}></input>
<div>You can edit the testing strageties here</div>
<input className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
placeholder='Testing stragety'
type='text' value={current().testing} onChange={(e)=>{
      context.dispatchImp({
        type:"testingchange",
        id:ImpIndex,
        text:e.target.value

      })
    }}></input>
      
      
      </section> 




    <div><strong>Select the physiological movement for the impairment.</strong></div>

    {Object.values(physio_movements).map((movement)=>{
      
      return <div
      id={movement}
      className={current().physio_movements.includes(movement)==true?
        "bg-green-100":""
      }

      onClick={()=>{
        handlePhysioMovement(movement)
       
      }}
      >
        <CheckBox text={movement} booleanval={current().physio_movements.includes(movement)}></CheckBox>

       
      </div>

    })}
<br></br>
<div><strong>Select the category for the impairment.</strong></div>

{Object.values(classes).map((classes)=>{
      
      return <div
      id={classes}
      className={current().class.includes(classes)==true?
        "bg-green-100":""
      }

      onClick={()=>{
        
        handleclass(classes)
       
      }}
      >
        <CheckBox text={classes} booleanval={current().class.includes(classes)}></CheckBox>


      </div>

    })}

<div><strong> Select the treatments for the impairment.</strong></div>
<input  className='sticky top-0  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Type in your search words' onChange={(e)=>setUserword(e.target.value)}></input>

    {context.treatments.map((tx)=>{

     if(current().treatment.includes(tx.id)){
      return(
      
      
        <div
      className={"bg-green-100 mt-5 cursor-pointer"}
      
      onClick={()=>{
        
          context.dispatchImp({
            id:ImpIndex,
            tx_index:tx.id,
            type:"removeTx"
            

          })

       
      }}>
        <CheckBox text={tx.label} booleanval={true} ></CheckBox>
        


      



      </div>


        
      )
     }else{
      return
     }

    })}

    {context.treatments.map((tx)=>{
      if(current().treatment.includes(tx.id)==false&&customSearch(userWord,tx.label)){

      
      return<div
      className={"mt-5 cursor-pointer"}
      
      onClick={()=>{
       

          context.dispatchImp({
            id:ImpIndex,
            tx_index:tx.id,
            type:"addTx"
            

          })
        
      }}>

<CheckBox text={tx.label} booleanval={false} ></CheckBox>
        



      </div>
      }

    })}


    





    
    
    
    
    
    
    </div>
    
    
    
    }
      {JSON.stringify(context.impairments)}
    </section>
      

    
    </div>
  )
}

export default Editor_Imp