import { unlink } from 'fs/promises'

import { Request, Response } from 'express'

import sharp from 'sharp';

import { constrainedMemory } from 'process';
import { json } from 'sequelize';

export const uploadFile = async (req: Request, res: Response) => {
    if(!req.file){
        res.status(400)
        res.json({ error: 'Arquivo invalido'})
        return;
    }
    const  filename = req.file.filename + '.jpg';
    //biblioteca sharp para a manipulção de imagens
    await sharp(req.file.path)
        .resize(500, 500, {
            fit: sharp.fit.cover,
            position: 'center'
        })
        .toFormat('jpeg')
        .toFile(`./public/media/${req.file.filename}.jpg`); 

    
    await unlink(req.file.path);
   
    res.json({image : filename});
}

/* Envio do field
 type UploadTypes = {
        avatar?: Express.Multer.File[],
        banner?: Express.Multer.File[]
    }

   Enviando mais um capo de arquivo e pegando os dois separadamente
    const files = req.files as UploadTypes;
    console.log(files.avatar)
    console.log(files.banner)
*/