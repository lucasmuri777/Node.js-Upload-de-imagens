import express, {Request, Response, ErrorRequestHandler} from 'express';
import cors from 'cors';
import path from 'path';
import {MulterError} from 'multer';
import dotenv from 'dotenv';

import apiRoutes from './routes/api';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: true }));
server.use(apiRoutes)

server.use((req: Request, res: Response)=>{
    res.status(404);
    res.json({error: 'Endpoint not found'});
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{
    res.status(400); //BAD REQUEST

    if(err instanceof MulterError){
        res.json({error: err.code});
        return
    }

    console.log(err);
    res.json({error: 'Ocorreu algum erro'});

}
server.use(errorHandler)

server.listen(process.env.PORT);