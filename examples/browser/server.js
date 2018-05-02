const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './../../dist')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'browser.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'browser.html'));
});

app.get('/test_endpoint', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ body : 'hello, how are you?' }));
});

app.listen(8081, () => {
    // eslint-disable-next-line no-console
    console.log('Server listening on port 8081');
});
