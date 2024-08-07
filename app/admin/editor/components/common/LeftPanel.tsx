import React, { useState } from 'react'
import { useContext } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { findIndexfromId } from '../../utils/findIndexfromid'

const LeftPanel = (props:{
    newItem:string,
    //value of text of new item
    setNewItem:any,
    //function to set the text of new item
    dispatchItemadd:any,
    //function to add item to context 
    addLabeltext:string,
    itemList:any,
    //list of major items , KD//IMP//TX
    itemLabelName:string,
    //name  of field that contains the text
    setViewItem:any,
    //chnange state do when you click , left panels shows accoridngly 
    dispatchdeleteItem:any,
    purge:any,
    reorderFunction?:any,
    activeIndex:any


    
}) => {






function swap(templist:any, fromid:number,targetid:number){
  var templist = templist
  var fromindex=findIndexfromId(templist,fromid)
  var targetindex=findIndexfromId(templist,targetid)
  var fromitem=templist[fromindex]
  var targetitem=templist[targetindex]
  console.log(fromitem)
  console.log(targetitem)
  templist[fromindex]=targetitem
  templist[targetindex]=fromitem
  props.reorderFunction({
    type:'set',
    entirelist: templist

  })

}
  function onDragOver(e:any){


   
     
      if(e.target.id!=undefined &&e.target.id!=null&&e.target.id!=""&&Number(e.target.id)!=startid){
        var templist=props.itemList
        var fromid=startid
        var targetid= e.target.id
        console.log("swap")
        console.log(targetid)
        swap(templist,fromid,targetid)

      }
      //swap(templist,fromid,targetid)
  
    else{
      return
    }

  }
  const context=useContext(editorJsonfileContext)

  const [startid,setStartid]=useState(0)
  const [ activeitem,setActive]=useState()
    
  return (
    <div className='w-1/2 '>
    <section className='bg-orange-100 p-5'>
    <input placeholder={`Type in your new ${props.addLabeltext}`} type='text' value={props.newItem} onChange={(e)=>{props.setNewItem(e.target.value)}}></input>
    <button 
     className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    onClick={()=>{
   props.dispatchItemadd({
    type:"add",
    text:props.newItem
    
    

  })

    }}>
      Add {props.addLabeltext}
    </button>
    </section>

    {props.itemList.length>0&&props.itemList.map((item:any)=>{
      return (
        <section className='mt-10' draggable={true} key={item.id} 
        id={item.id}

        onDragOver={(e)=>onDragOver(e)}
        onDragStart={(e)=>{
          setStartid(item.id)

        }}
        >
      <div 
      
      id={item.id}
        >

<li className={`flex items-center justify-between gap-x-6 py-5 ${props.activeIndex==item.id?"bg-green-100":""}`}>
            <div className="flex min-w-0 gap-x-4">
              
              <div className="min-w-0 flex-auto">
                <p  id={item.id} className="text-sm font-semibold leading-6 text-gray-900">{item[`${props.itemLabelName}`]}</p>
               
              </div>
            </div>

            <section className='flex'>
            <button
            className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
             onClick={()=>{
          
          props.dispatchdeleteItem({
              type:"delete",
              id:item.id
              
              
      
            })
            {props.purge!=null&& props.purge({
              type:"purge",
              id:item.id
              
              
      
            })
    }
           
  
  
          }}>
            Delete
          </button>
            <button
            onClick={()=>{
              props.setViewItem(item.id)}}
              
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Edit
            </button>
            </section>
          </li>
          
         
        
        
        </div>
       
        </section>)
    })}
    </div>
  )
}

export default LeftPanel