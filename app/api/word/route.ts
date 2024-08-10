const axios = require('axios');

const base64Img = require('base64-img');
import { NextResponse } from 'next/server';
type ResponseData = {
  message: string
}

export async function GET(
    req: Request
   
  ) {

    const response = await axios.get(`https://www.physiotherapyexercises.com/ExerciseImages/Drawings/Ex6131.jpg`, { responseType: 'arraybuffer' });
    
    let base64Image = `data:${response.headers['content-type']};base64,` + Buffer.from(response.data).toString('base64');
    
    
 
     // Download the WebP image
     /*
     
     // Convert to JPEG
     const jpegBuffer = await sharp(webpBuffer).toFormat('jpeg').toBuffer();
 
     // Convert to Base64 URL
     
     return base64Url;
     */
     return NextResponse.json({ message: `${base64Image}` })
  }
   
