const express = require('express');
const app = express();
const PORT = 3000;
const connect=require("./Config/Connection")
const itemroute=require('./Routes/ItemsRoute.js')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

connect()

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api',itemroute)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
