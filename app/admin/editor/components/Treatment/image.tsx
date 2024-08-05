import React from 'react'
import { useState } from 'react'
import AWS from 'aws-sdk';


const UploadImage = (props:any) => {
    AWS.config.update( {
        region: 'ap-southeast-2',            // or whatever your bucket region is
        maxRetries: 3,
        httpOptions: { timeout: 30000, connectTimeout: 5000 },
        
       } );
    const [file, setFile] = useState<File | undefined>(undefined)
    const [imgName,setName]=useState(`https://masttx.s3.ap-southeast-2.amazonaws.com/${props.name}`)

    const [uploading, setUploading] = useState(false)
   
   
    const handleSubmit = async () => {
  

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

         }

        
       
       
    

  return (
   <div>
     <h1>Upload a File to S6</h1>
     
     <img src={imgName}></img>
   <div>hi</div>
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
          Upload
        </button>
      
   </div>
  )
}

export default UploadImage