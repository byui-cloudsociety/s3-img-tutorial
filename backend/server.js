import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateUploadURL } from './s3.js';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the frontend directory (one level up)
app.use(express.static(path.join(__dirname, '../frontend')));

// route for getting an upload url from S3
app.get("/s3Url", async (req, res) => {
    const url = await generateUploadURL();
    res.send({ url });
})

app.listen(8080, () => console.log("listening on port 8080. Visit the app -> localhost:8080"));