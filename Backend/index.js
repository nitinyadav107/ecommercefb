import express from 'express'
import cors from 'cors'
import 'dotenv/config'


//App Config

const app=express();
const port=process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//api endpoint
app.get('/',(req,res)=>{
    res.status(200).send('Hello World')
})

//listen
app.listen(port,()=>console.log(`listening on localhost:${port}`))