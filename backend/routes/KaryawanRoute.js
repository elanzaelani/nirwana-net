import express from 'express';
import {createKaryawan,getAllKaryawan,getKaryawanById,updateKaryawan,deleteKaryawan} from '../controllers/Karyawan.js';

import {verifyUser} from '../middleware/AuthUser.js'
    

const router=express.Router();

router.get('/karyawans',verifyUser,getAllKaryawan)
router.get('/karyawan/:id', verifyUser,getKaryawanById)
router.post('/karyawan/',verifyUser, createKaryawan)
router.patch('/karyawan/:id', verifyUser,updateKaryawan)
router.delete('/karyawan/:id',verifyUser,deleteKaryawan)


export default router;