const app = require('./app');
const dotenv = require('dotenv');

const mongoose = require('mongoose');




dotenv.config({path:'./.env'});
const data = process.env.DATABASE_URL
mongoose.connect(data, {
    useUnifiedTopology:false,
    useFindAndModify:false,
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Connected to database')
}).catch((err)=>{
    console.log('Failed to connect to Database', err.message)
})





const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('Listening on port ' + port)
})