import express from 'express';
import {createPaket,deletePaket,getPaketById,getPakets, updatePaket} from '../controllers/Paket.js';

import {verifyUser} from '../middleware/AuthUser.js'
    

const router=express.Router();

router.get('/pakets',verifyUser,getPakets)
router.get('/paket/:id', verifyUser,getPaketById)
router.post('/paket/',verifyUser, createPaket)
router.patch('/paket/:id', verifyUser,updatePaket)
router.delete('/paket/:id',verifyUser,deletePaket)


export default router;