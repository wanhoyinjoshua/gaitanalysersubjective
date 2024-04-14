export class Insights{


    props: any
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
    const isStr=e&&e["class"]&&(e["class"].includes("eccentric_str")||e["class"].includes("concentric_str"))
    const isCoor=e&&e["class"]&&e["class"].includes("coor")
    if(isStr==false&&isCoor==false){
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
    var validimp=this.props.list['impairments'].filter((e:any)=>e["status"]==true).length
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
           
            return <div>
              
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
    return(
        this.props.list['impairments'].map((e:any)=>{
          
          if(this.newdict[`${type}`](e)){
            //need to somehow store the treatment ideas to this shit and then geenrate
            if(e.status==true){
              return (
                <div key={e[0]}>
                  
                  
              <dd key={e[0]}className="font-medium text-gray-900"><strong>{e["key"]}</strong>-{this.dict[`${e["str_lvl"].toString()}`]}</dd>
              
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
              return 
            }
  
          
  
  
          }else{
            return
  
          }
         
        })
      )
  }
  getStrImpCount(){

    return this.props.list['impairments'].filter((e:any)=>this.isStr(e)&&e.status==true).length

  }

  getCoorImpCount(){
    return this.props.list['impairments'].filter((e:any)=>this.isCoor(e)&&e.status==true).length


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