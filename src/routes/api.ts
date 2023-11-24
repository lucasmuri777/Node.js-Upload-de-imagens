import { Router } from 'express';
import multer from 'multer';

import * as ApiController from '../controllers/apiController';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './tmp');
    },
    filename: (req, file, cb) =>{
        let letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '&', '*', '(', ')'];
        let nome = '';
        for(let i = 0; i < 21; i++){
            let random = Math.floor(Math.random() * 2);
            if(random == 0){
                nome += letras[Math.floor(Math.random() * letras.length)];
            }else{
                nome += letras[Math.floor(Math.random() * letras.length)].toUpperCase();
            }
        }
        let randomName = Math.floor(Math.random() * 999999999999999) + Date.now() + nome;

        cb(null, `${randomName}`);
    },
    
})

const upload = multer({
    storage: storageConfig, // OU dest: './tmp',
    fileFilter: (req, file, cb) =>{
        const allowed: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
        cb(null, allowed.includes(file.mimetype));
    },
    limits: {
        fileSize: 1000000 * 10
    }
})

const router = Router();

router.post('/upload', upload.single('avatar'), ApiController.uploadFile);


//com mais de um campo de envio de arquivo = upload.fields([{ name: nome do campo, maxCount: quantdade de arquivo }, { name: 'banner', maxCount: 1 }])
// mais de um arquivo = upload.array('avatats', 2)
//um arquivo so = upload.single('avatar')


export default router;