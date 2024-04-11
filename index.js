const express = require('express');
const path = require('path')
const {router1, router2, router3} = require('./routers/router1')
const app = express();

// app.use('/static', express.static('assets'))
app.use(express.static(path.join(__dirname, 'assets')))
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/home', router1); 
app.use('/country', router2); 
app.use('/place', router3); 

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server running on port: " + PORT))