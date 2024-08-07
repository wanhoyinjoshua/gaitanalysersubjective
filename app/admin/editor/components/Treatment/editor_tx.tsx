import React from 'react'
import LeftPanel from '../common/LeftPanel'
import { useContext,useState } from 'react'
import { editorJsonfileContext } from '@/app/admin/Context'
import { findIndexfromId } from '../../utils/findIndexfromid'
import { physio_movements , classes} from '../../models/constants'
import UploadImage from './image'
const  Editor_Tx = (props:any) => {
  const context=useContext(editorJsonfileContext)
  const [TxIndex,setTxindex]=useState<any|number>(context.treatments[0].id)
  const [newTx,setNewTx]=useState("")
  const [file, setFile] = useState<File | null>(null)
  function current(){
    return context.treatments[findIndexfromId(context.treatments,TxIndex)]
   }


   function handleclass(subtype:string,classes:any){
    context.dispatchImp({
      type:"setClasses",
      id:TxIndex,
      text:classes,
      payload:classes,
      subtype:subtype
    })

   }
  return (
    <div className='flex'>
            <LeftPanel 
          activeIndex={TxIndex}
      newItem={newTx} 
      setNewItem={setNewTx} 
      dispatchItemadd={ context.dispatchTx} 
      addLabeltext={'Treatment'} 
      itemList={context.treatments} 
      itemLabelName={'label'} 
      setViewItem={setTxindex} 
      dispatchdeleteItem={context.dispatchTx}

      purge={context.dispatchImp}
      reorderFunction={context.dispatchTx}
      >
        
      </LeftPanel>
      <section className='w-1/2 '>
      <div className='w-1/2'>
      {TxIndex!=null&&current()&&current().id!=null&& 
      <UploadImage name={`${context.setting.label}_${current().id}`} id={TxIndex}></UploadImage>}
     </div>
    {context.treatments.length>0&&findIndexfromId(context.treatments,TxIndex)!=-1&&
    <div  >
      <div className='bg-cyan-100 p-5'><strong>You can edit the words of your treatment below</strong>
      <input className='w-full' type='text' value={current().label} onChange={(e)=>{
      context.dispatchImp({
        type:"change",
        id:TxIndex,
        text:e.target.value

      })
    }}></input>
      
      
      </div>


    <br></br>
<div>
    <label htmlFor="cars">Is this tagreting strength:</label>

<select name="cars" id="strength" 
value={current().strength}
onChange={(e)=>{
    context.dispatchTx({
        type:"setClasses",
        subtype:"strength",
        payload:Number(e.target.value),
        id:TxIndex
    })

}}>
  <option value="1">Yes</option>
  <option value="0">No </option>
  
</select>
</div>
    <div>
    <label htmlFor="cars">Exercise level , for  str based exercises:</label>

<select name="cars" id="level"
value={current().level}

 onChange={(e)=>{
    context.dispatchTx({
        type:"setClasses",
        subtype:"level",
        payload:Number(e.target.value),
        id:TxIndex
    })

}}
>
  
  <option value="1">Suitable for paralysed muscle groups</option>
  <option value="2">Suitable for muscle groups thaat can achieve full rom with gravity elimnated </option>
  <option value="3">Suitable for muscle groups that can achieve full rom with gravity</option>
  <option value="4">Suitable for eccentric movements</option>
</select>
</div>


<div>
<label htmlFor="coor">is this coordination based?</label>

<select name="coor" id="=coor"
value={current().coordination}
 onChange={(e)=>{
    context.dispatchTx({
        type:"setClasses",
        subtype:"coordination",
        payload:JSON.parse(e.target.value),
        id:TxIndex
    })

}}
>
  <option value="true">YES</option>
  <option value="false">NO </option>
 
</select>

</div>

<div>
<label htmlFor="coor">is this part task or whole task?</label>

<select name="coor" id="=part"
value={JSON.stringify(current().part)}
onChange={(e)=>{

    context.dispatchTx({
        type:"setClasses",
        subtype:"part",
        payload:JSON.parse(e.target.value),
        id:TxIndex
    })

}}
>
  <option value="true">Part task</option>
  <option value="false">Whole task</option>
 
</select>
</div>
<div>
<label htmlFor="coor">is this rom related?</label>

<select name="rom" id="=rom"
value={JSON.stringify(current().rom)}
onChange={(e)=>{
    context.dispatchTx({
        type:"setClasses",
        subtype:"rom",
        payload:JSON.parse(e.target.value),
        id:TxIndex
    })

}}
>
  <option value="true">YES</option>
  <option value="false">NO</option>
 
</select>
</div>




 

    





    
    
    
    
    
    
    </div>

    }
     {JSON.stringify(context.treatments)}
    </section>
      

     
    </div>
  )
}

export default Editor_Tx