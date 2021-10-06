// Core Modules
const express = require('express');
const app = express();

// Server Settings
const host = "localhost"
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Host Settings
app.listen(port, host, () => {
    console.log(`FinCheck listening at http://${host}:${port}`)
});