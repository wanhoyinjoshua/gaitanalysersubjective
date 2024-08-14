import Image from 'next/image'
import { InsightList } from '../../common/models/Insights/InsightList'
import Reference from '../components/Reference'
export class Insights{


    props: {list:InsightList,name:any}
    
    dict:any={
        "1":"Paralysed",
        "2":"Very Weak",
        "3":"Weak",
        "4":"Strong"
    
      }

    newdict:any={
        "str":this.isStr,
        "coor":this.isCoor,
        "others":this.isOthers
    }

    
 
  constructor(props: any) {
    this.props = props
    
  }

  

  isOthers(e:any){
    const isStr=e["class"].includes("concentric_str")||e["class"].includes("eccentric_str")
    const isCoor=e["class"].includes("coor")
    if(isStr==false &&isCoor==false){
        return true
    }
    else{
        return false
    }
   
  }
  isStr(e:any){
    return e&&e["class"]&&(e["class"].includes("eccentric_str")||e["class"].includes("concentric_str"))

  }
  isCoor(e:any){
    return e&&e["class"]&&e["class"].includes("coor")

  }

  isEmpty(){
    var validimp=this.props.list.impairments.filter((e:any)=>e["status"]==true).length
    if (validimp==0){
        return true
    }
    else{
        return false
    }
  }

  getNilImp(type:string){
    return(
      this.props.list['impairments'].map((e:any)=>{
        
        if(this.newdict[`${type}`](e)){
          //need to somehow store the treatment ideas to this shit and then geenrate
          if(e.status!=true){
           
            return <div key={e[0]}>
              
                <dd key={e[0]}className="font-medium text-red-500 line-through ">
                {e["key"]}</dd>
              
            </div>
          
          }

        


        }
       
      })
    )

  }


  getImp(type:string){
    //return a list of element to display 
    var refCount=0
    var refarr: any[]=[]
    return(

       

        <section>
          { this.props.list.impairments.map((e)=>{
          
          if(this.newdict[`${type}`](e)){
            //need to somehow store the treatment ideas to this shit and then geenrate
        
              return (
                <div key={e.id}>
                  
                  
              <dd key={e.id}className="font-medium text-gray-900"><strong>{e["key"]}</strong>-{this.dict[`${e["str_lvl"].toString()}`]}</dd>
              
              <div key={e.id}>Potential treatment ideas</div>
              {e.displayTreatment.length==0?<div>There are no strageties for this impairment</div>:null}
              <ol key={e.id}className='list-decimal  divide-y'>
               
              {e.displayTreatment.map((treatment:any,exindex)=>{
                
                  
                    return <div key={treatment.label} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                      

                      <li className=""key={treatment.label}>{treatment.label} 
                     {treatment.reference.map((ref:any,index:any)=>{
                      refCount+=1
                      refarr.push(ref)
                      
            return <span key={index} className='ml-1 underline' style={{ verticalAlign: 'super', fontSize: 'small' }} id="sub"><a target='_blank' href={ref}>{refCount}</a></span>
     
        })}



                      </li>
                      <Image
      src={`https://masttx.s3.ap-southeast-2.amazonaws.com/${this.props.name}_${treatment.id}`}
      
      alt="No image available for this exercise."
      width={250} 
      height={250} 
    
    />

                      </div>

                  

               
                
                  
  
                
                
              })}
              </ol>
              </div>
              
              
              )
  
           
  
          
  
  
          }else{
            return
  
          }
         
        })}


        <div>
          References:
          {refarr.map((e,index)=>{

            return <div key={index}>
              <span style={{ verticalAlign: 'super', fontSize: 'small' }}>{index+1}</span>
              <span><a  style={{ verticalAlign: 'sub', fontSize: 'small' }} target='_blank' className='underline' href={e}>{e}</a></span>

                

              </div>

          })}
        </div>



        </section>



      )
  }
  getStrImpCount(){

    return this.props.list['impairments'].filter((e:any)=>this.isStr(e)&&e.status==true).length

  }
  getImpPercentage(type:any){
    const dict={
      "str":this.isStr,
      "coor":this.isCoor,
      "others":this.isOthers
    }
    var target=dict[type as keyof typeof dict]
    const allimpcount_positive=this.props.list['impairments'].filter((e:any)=>e.status==true).length
    const target_count=this.props.list['impairments'].filter((e:any)=>target(e)&&e.status==true).length
    const percentage=target_count==0?0:Math.floor((target_count/allimpcount_positive)*100)
    return percentage
  }

  getImpstatement(){
    const strper=this.getImpPercentage("str")
    const coorper=this.getImpPercentage("coor")
    const otherper=this.getImpPercentage("others")

    if(strper>coorper && strper>otherper){
      return "It appears addressing strength impairments might be most beneficial for this kinematic deviation"
    }
    else if(coorper>strper && coorper>otherper){
      return "It appears addressing coordination impairments might be most beneficial for this kinematic deviation"

    }
    else if(otherper>strper && otherper>coorper){
      return "It appears addressing subtle impairments such as sensation, range of movement etc might be most beneficial for this kinematic deviation"

    }
    else if(strper==coorper && strper>otherper){
      return "It appears addressing both strength and coordination impairments might be beneficial for this kinematic deviation"

    }
    else if(strper==otherper && strper>coorper){
      return "It appears addressing both strength and subtle impairments might be beneficial for this kinematic deviation"

    }
    else if(coorper==otherper && coorper>strper){
      return "It appears addressing both strength and subtle impairments might be beneficial for this kinematic deviation"

    }
    else{
      return "It appears addressing all impairments identified might be beneficial for this kinmeatic deviation"
    }
    

  }

  getCoorImpCount(){
    return this.props.list['impairments'].filter((e:any)=>this.isCoor(e)&&e.status==true).length


  }
  getSensationImpCount(){
    return this.props.list['impairments'].filter((e)=>e.class.includes("sensation")&&e.status==true).length



  }
  getRomImpCount(){
    return this.props.list['impairments'].filter((e)=>e.class.includes("rom")&&e.status==true).length


  }
  getMusAcImpCount(){
    return this.props.list['impairments'].filter((e)=>e.class.includes("ex_mus_ac")&&e.status==true).length


  }
  getPowerImpCount(){
    return this.props.list['impairments'].filter((e)=>e.class.includes("power")&&e.status==true).length


  }
 

  getOthersImpCount(){
    
    return this.props.list['impairments'].filter((e:any)=>this.isOthers(e)&&e.status==true).length


  }

  getEliminated(){

  }

  getTaskCount(type:string){
    var count=0
    this.props.list['impairments'].forEach((e:any)=>{
        if(e.status==true){
          
        for (let i = 0; i <= e.treatmentideas.length-1; i++) {
         
          if(type=="part"){
            if(e.treatmentideas[i]&&e.treatmentideas[i].part==true){
  
                count+=1
        
        
                }

          }else if (type=="whole"){
            if(e.treatmentideas[i]&&e.treatmentideas[i].whole==true){
     
               count+=1

          }
          
         
  
  
          }
          
        }
      }
       
  
  
      })

      return count

  }

 

  getDisplayMessage(){
    return"hihi"
  }

  ProduceFinalState(){
    return {
        Strength: {component:this.getImp("str"),componentnil:this.getNilImp("str"),number:this.getStrImpCount()},
        Coordination: {component:this.getImp("coor"),number:this.getCoorImpCount()},
        Others: {component:this.getImp("others"),number:this.getOthersImpCount()}
      }
  }






}