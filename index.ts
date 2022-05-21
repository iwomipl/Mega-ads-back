import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from './utils/errors';
import rateLimit from 'express-rate-limit';
import {adRouter} from "./routers/ad.router";

const app = express();

app.use(cors({
    origin: 'http://localhost/3000'
}));
app.use(json());
app.use(rateLimit({
    windowMs: 15*60*1000,
    max: 100,
}))

//Routers
app.use('/ad', adRouter)


//Handle Errors
app.use(handleError);


app.listen(3001, '0.0.0.0', ()=>{
    console.log('Listening on http://localhost/3001');
})
