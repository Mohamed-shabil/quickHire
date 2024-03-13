import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    credentials:{
        secretAccessKey: process.env.AWS_S3_SECRETKEY!,
        accessKeyId:process.env.AWS_S3_ACCESSKEY!,
    },
    region:process.env.AWS_BUCKET_REGION!
});
