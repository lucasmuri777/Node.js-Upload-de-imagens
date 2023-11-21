import { Router } from 'express';

import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', ApiController.ping);

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.listPhrases);
router.get('/frase/:id', ApiController.getPhrase);
router.put('/frase/:id', ApiController.updatePhrase);
router.delete('/frase/:id', ApiController.deletePhrase);

export default router;