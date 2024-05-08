const express= require('express');

const app = express();

app.get('/', (req, res)=> res.send('hello world'))

app.listen(3000, (err)=> err ? console.log('error starting server'): console.log('server up success'))