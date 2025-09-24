const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/file', (req, res) => {
    const fileName = req.query.filename;
    // Only allow safe filenames (alphanumeric, dash, underscore, dot, and extension)
    if (!fileName || !/^([\w\-.]+)\.(txt|csv|json|pdf|jpg|png)$/.test(fileName)) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    // Prevent path traversal
    const safeFileName = path.basename(fileName);
    const filePath = path.join(__dirname, '../uploads/', safeFileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ content: data });
    });
});

router.get('/download', (req, res) => {
    const fileName = req.query.file;
    // Only allow safe filenames (alphanumeric, dash, underscore, dot, and extension)
    if (!fileName || !/^([\w\-.]+)\.(txt|csv|json|pdf|jpg|png)$/.test(fileName)) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    // Prevent path traversal
    const safeFileName = path.basename(fileName);
    const filePath = path.join(__dirname, '../uploads/', safeFileName);
    res.sendFile(filePath);
});

module.exports = router;