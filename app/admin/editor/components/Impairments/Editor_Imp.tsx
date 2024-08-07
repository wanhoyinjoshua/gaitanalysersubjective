import React from 'react'
import LeftPanel from '../common/LeftPanel'
import { useContext,useState } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { findIndexfromId } from '../../utils/findIndexfromid'
import { physio_movements , classes} from '../../models/constants'

import { text } from 'stream/consumers'
import { customSearch } from '../../utils/customSearch'
const Editor_Imp = (props:any) => {
  const context=useContext(editorJsonfileContext)
  const [ImpIndex,setImpindex]=useState<any|number>(null)
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
    {context.impairments.length>0&&findIndexfromId(context.impairments,ImpIndex)!=-1&&
    <div className='w-1/2 '>

    <input type='text' value={current().impairment} onChange={(e)=>{
      context.dispatchImp({
        type:"change",
        id:ImpIndex,
        text:e.target.value

      })
    }}></input>

<input type='text' value={current().testing} onChange={(e)=>{
      context.dispatchImp({
        type:"testingchange",
        id:ImpIndex,
        text:e.target.value

      })
    }}></input>

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
        {movement}

      </div>

    })}
<br></br>
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
        {classes}

      </div>

    })}

<input placeholder='Type in your search words' onChange={(e)=>setUserword(e.target.value)}></input>

    {context.treatments.map((tx)=>{

     if(current().treatment.includes(tx.id)){
      return(
      
      
        <div
      className={"bg-green-100"}
      
      onClick={()=>{
        
          context.dispatchImp({
            id:ImpIndex,
            tx_index:tx.id,
            type:"removeTx"
            

          })

       
      }}>

        {tx.label}


      



      </div>


        
      )
     }else{
      return
     }

    })}

    {context.treatments.map((tx)=>{
      if(current().treatment.includes(tx.id)==false&&customSearch(userWord,tx.label)){

      
      return<div
      className={""}
      
      onClick={()=>{
       

          context.dispatchImp({
            id:ImpIndex,
            tx_index:tx.id,
            type:"addTx"
            

          })
        
      }}>

        {tx.label}


      </div>
      }

    })}


    





    
    
    
    
    
    
    </div>
    
    
    
    }
      

      {JSON.stringify(context.impairments)}
    </div>
  )
}

export default Editor_Imp