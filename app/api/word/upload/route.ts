import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'


export async function POST(request: Request) {
  const { filename, contentType } = await request.json()
    console.log(filename)
  try {
    const client = new S3Client({ region: "ap-southeast-2" })
    const { url, fields } = await createPresignedPost(client, {
      Bucket: "masttx",
      Key: filename,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    return Response.json({ url, fields })
  } catch (error) {
    return Response.json({ error: "unable to upload" })
  }
}