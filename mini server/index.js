import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route: read any JSX file from /src/components/
app.get('/api/component/:name', (req, res) => {
    const componentName = req.params.name.toLowerCase();
    const baseDir = path.join(__dirname, '../src/improvedWbsiteBuilder');
    const findComponentFile = (dir) => {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                const found = findComponentFile(fullPath);
                if (found) return found;
            } else if (
                file.toLowerCase().includes(componentName) &&
                file.endsWith('.jsx')
            ) {
                return fullPath;
            }
        }

        return null;
    };

    const filePath = findComponentFile(baseDir);

    if (!filePath) {
        return res.status(404).json({ error: 'Component not found' });
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`❌ Error reading file:`, err);
            return res.status(500).json({ error: 'Could not read the file' });
        }

        console.log(`📥 Found and sent: ${filePath}`);
        res.json({ content: data });
    });
});


// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
