const express = require('express')
const app = express()

const { uploadFile } = require('./s3')
const upload = require('./upload')

app.post('/upload', upload.single("image"), async (req, res) => {
    const file = req.file;
    if (!file) {
        // early return save your code, don't forget this
        return res.status(400).send('No file uploaded.');
    }

    try {
        const filePath = file.path;
        const fileName = file.filename;        

        // upload the file to s3 bucket
        const uploadSuccess = await uploadFile(filePath, fileName);

        if (uploadSuccess) {
            res.status(200).send(`File uploaded to S3 successfully: ${fileName}`);
        } else {
            res.status(500).send('Error uploading file to S3.');
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
})


const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))