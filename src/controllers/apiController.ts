import { Request, Response } from 'express'

import { Phrase } from '../models/Phrase'
import { constrainedMemory } from 'process';
import { json } from 'sequelize';

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}


export const createPhrase = async (req: Request, res: Response) => {
    let { author, txt } = req.body; 

    try{
        let newPhrase = await Phrase.create({ author, txt })
        res.status(201)
        res.json({ id: newPhrase.id, envio: 'Deu tudo certo!' });
        return;
    }catch(err){
        res.status(500);
        res.json({ error: 'Erro ao criar frase' });
        return;
    }
    
}

export const listPhrases = async (req: Request, res: Response) => {
    try{
        let phrases = await Phrase.findAll();
        res.json({ phrases });
        return;
    }catch(err){
        res.status(500);
        res.json({ error: 'Erro ao buscar frases' });
        return;
    }
}

export const getPhrase = async (req: Request, res: Response) => {
        let { id } = req.params;
        let phrase;
    
        try{
            phrase = await Phrase.findByPk(id);
        }catch(err){
            res.status(500);
            res.json({ error: err });
            return;
        }

        if(!phrase){
            res.status(404);
            res.json({ error: 'Frase não encontrada' });
            return;
        }

        res.json({ phrase });
}

export const updatePhrase = async (req: Request, res: Response) => {
    let { id } = req.params;
    let {author, txt} = req.body;
    console.log(req.body);
    if(!author || !txt){
        res.status(400);
        res.json({ error: 'Parametros invalidos' });
        return;
    }
    try{
        let phrase1 = await Phrase.findByPk(id);
        let phrase = await Phrase.update({ author, txt }, {
            where: {
                id
            }
        });
        res.json({ phrase1 ,status: 'Sucesso' });
       
    }catch(err){
        res.status(500);
        res.json({ error: err });
        return;
    }
}

export const deletePhrase = async (req: Request, res: Response) => {
    let {id} = req.params;

    try{
        await Phrase.destroy({ where: {id} })
    }catch(err){
        res.status(500);
        res.json({ error: err });
        return;
    }

    res.json({deletado: true});
}