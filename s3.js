const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
require('dotenv').config();

const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const uploadFile = async (filePath, fileName) => {
    try {
        const fileStream = fs.createReadStream(filePath);

        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileStream,
            ContentType: 'image/jpeg'
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        console.log(`File uploaded successfully: ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`Error uploading file: ${filePath} - ${error.message}`);
        return false;
    }
};

module.exports = { uploadFile };
