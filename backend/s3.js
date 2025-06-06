import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { promisify } from 'util';

// kind of encrypt our image file name.. not necessary
const randomBytes = promisify(crypto.randomBytes);
dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN;

// connection details to the S3 bucket we made
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    sessionToken,
    signatureVersion: "v4"
})


export async function generateUploadURL() {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString("hex");

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    });

    // get that s3 upload url w/ our connection details
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;

}