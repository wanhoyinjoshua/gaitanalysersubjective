import React from 'react'
import { useState,useEffect } from 'react'
import AWS from 'aws-sdk';
import { imgString } from '@/app/utils/getImage';
import { useContext } from 'react';
import { editorJsonfileContext } from '@/app/admin/Context'

const UploadImage = (props:any,id:any) => {
  const context= useContext(editorJsonfileContext)
  useEffect(()=>{
    setName(imgString(props.name))
  },[props.name])


    AWS.config.update( {
        region: 'ap-southeast-2',            // or whatever your bucket region is
        maxRetries: 3,
        httpOptions: { timeout: 30000, connectTimeout: 5000 },
        accessKeyId: process.env.NEXT_PUBLIC_S3ID,
        secretAccessKey: process.env.NEXT_PUBLIC_S3KEY,
       } );
    const [file, setFile] = useState<File | undefined>(undefined)
    const [imgName,setName]=useState(`https://masttx.s3.ap-southeast-2.amazonaws.com/${props.name}`)

    const [uploading, setUploading] = useState(false)
   
   
    const handleSubmit = async () => {

      if(context.setting.label==""||context.setting.label==null){
        window.alert("need to provide id before you upload")
        return
      }
      else{

      

  

         const s3Bucket = new AWS.S3();
         if(file!=undefined){

            s3Bucket.upload( {
                Body: file,
                Bucket: 'masttx',
                Key: props.name,
                ContentType: 'image',
                Metadata: { }              // define pretty much any metadata you want here
              } )
              .on('httpUploadProgress',(progress)=>{} )
              .send( (error:any,data:any) => { 
                if ( error ){
                console.error( error )
            
            }else{
              
                
                window.alert("successfull")
            }
        
        } );

        
              
            };

         }}

        
       
       
    

  return (
   <div>
  
     
     <img src={imgName}></img>
  
        <input
          id="file"
          type="file"
          onChange={(e) => {
            const files = e.target.files
          
            if (files) {
              setFile(files[0])
              setName(URL.createObjectURL(files[0]))
            }
          }}
          accept="image/png, image/jpeg"
        />
        <button onClick={()=>{handleSubmit()}} >
          Upload Photo
        </button>
      
   </div>
  )
}

export default UploadImage