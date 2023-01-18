import express from 'express';
import {createPelanggan, deletePelanggan, getPelangganByIid, getPelanggans, updatePelanggan} from '../controllers/Pelanggan.js'
import { verifyUser } from '../middleware/AuthUser.js';

const router=express.Router();

router.get('/pelanggans/',verifyUser, getPelanggans);
router.get('/pelanggan/:id',verifyUser, getPelangganByIid);
router.post('/pelanggan/',verifyUser, createPelanggan);
router.patch('/pelanggan/:id',verifyUser, updatePelanggan);
router.delete('/pelanggan/:id',verifyUser, deletePelanggan);


export default router;