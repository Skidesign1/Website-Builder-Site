import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Registry with URLs and types (categories)
const registryTemplate = [
    {
        type: "navbar",
        id: "navbar-001",
        componentUrl: "https://cdn.filestackcontent.com/sFsbERTfTI2otDO85jvg",
        label: "Navbar001",
    },
    {
        type: "navbar",
        id: "navbar-002",
        componentUrl: "https://cdn.filestackcontent.com/Gdqs4CpRXO1fueLAEKUQ",
        configFile: 'navConfig.json', // changed from NavbarConfig to configFile
        label: "Navbar002",
    },
    // Add more components here if needed
];

// Categories metadata
const categories = [
    { id: "navbar", label: "Navbar", icon: null }, // You can add icon info here if you want
    // Add other categories if you have them
];

// Helper to fetch component code from URL
async function fetchComponentCode(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    return await res.text();
}

// Endpoint to get registry with embedded components and categories
app.get('/api/components', async (req, res) => {
    try {
        const componentsWithCode = [];

        for (const item of registryTemplate) {
            let configData = {};
            if (item.configFile) {
                try {
                    const configRaw = await fs.readFile(path.join(__dirname, 'config', item.configFile), 'utf-8');
                    configData = JSON.parse(configRaw); // assign as parsed JSON
                } catch (err) {
                    console.error(`Failed to read config file ${item.configFile}:`, err);
                    // configData remains as empty object
                }
            }
            if (item.componentUrl) {
                try {
                    const componentCode = await fetchComponentCode(item.componentUrl);
                    componentsWithCode.push({
                        ...item,
                        component: componentCode, // Return HTML code as-is
                        config: configData,
                        componentUrl: undefined,
                        configFile: undefined,
                        category: item.type, // category key for frontend grouping
                    });
                } catch (err) {
                    console.error(err);
                    // Fallback: send item without component code
                    componentsWithCode.push({ ...item, config: configData, category: item.type });
                }
            } else {
                componentsWithCode.push({ ...item, config: configData, category: item.type });
            }
        }

        res.json({
            categories,
            components: componentsWithCode,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to build component registry' });
    }
});

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});