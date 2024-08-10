import React, { useState } from 'react'
import { useContext } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { findIndexfromId } from '../../utils/findIndexfromid'
import { customSearch } from '../../utils/customSearch'
import ToolTip from '@/app/components/ui/ToolTip'
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
  const [userword,setUserword]=useState("")
  return (
    <div className='w-1/2 h-[90vh] overflow-y-scroll '>
    <section className='bg-orange-100 p-5'>
    <input className="  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  placeholder={`Type in your new ${props.addLabeltext}`} type='text' value={props.newItem} onChange={(e)=>{props.setNewItem(e.target.value)}}></input>
    <button 
     className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    onClick={()=>{
   props.dispatchItemadd({
    type:"add",
    text:props.newItem
    
    

  })
  props.setNewItem("")
  //need to switch focus 
  window.alert("item created, please select new item if you want to edit it")

    }}>
      Add {props.addLabeltext}
    </button>
    </section>

    <section >
      <input 
      className="sticky top-0 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder='Search items, please clear this before you reorder' type='text' onChange={(e)=>{setUserword(e.target.value)}}></input>
      <div className='w-1/2'>
      <ToolTip text={'You can drag to reorder, and if you click edit, you can edit on the right panel.'} label={`Below is the list of ${props.addLabeltext}, hover for more`} ></ToolTip>
      </div>
    {props.itemList.length>0&&props.itemList.map((item:any)=>{
      if(customSearch(userword,item[`${props.itemLabelName}`])){
      return (
        <section className='cursor-move mt-10' draggable={true} key={item.id} 
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
            className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-50"
             onClick={()=>{
          if(window.confirm("Do you want to delete, it cannot be undone")){
            props.dispatchdeleteItem({
              type:"delete",
              id:item.id
              
              
      
            })
            {props.purge!=null&& props.purge({
              type:"purge",
              id:item.id
              
              
      
            })
    }

          }
          else{
            return 
            
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
      }
    })}
    </section>
    </div>
  )
}

export default LeftPanel