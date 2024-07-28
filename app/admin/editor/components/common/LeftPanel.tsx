import React from 'react'


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
    dispatchdeleteItem:any


    
}) => {
    
  return (
    <div className='w-1/2 '>
    <input type='text' value={props.newItem} onChange={(e)=>{props.setNewItem(e.target.value)}}></input>
    <button onClick={()=>{
   props.dispatchItemadd({
    type:"add",
    text:props.newItem
    
    

  })

    }}>
      Add {props.addLabeltext}
    </button>
    {props.itemList.length>0&&props.itemList.map((item:any)=>{
      return (
        <section key={item.id}>
      <div 
        >
          
          {item[`${props.itemLabelName}`]}
        
        
        </div>
        <button onClick={()=>{props.setViewItem(item.id)}}>
          Edit
        </button>
        <button onClick={()=>{
          
        props.dispatchdeleteItem({
            type:"delete",
            id:item.id
            
            
    
          })
  


        }}>
          Delete
        </button>
        </section>)
    })}
    </div>
  )
}

export default LeftPanel