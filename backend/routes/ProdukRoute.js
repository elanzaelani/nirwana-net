import express from 'express'
import { createProduk, getProduks, getProdukById, updateProduk, deleteProduk, totalCount } from '../controllers/Produk.js';

import { verifyUser } from '../middleware/AuthUser.js'


const router = express.Router();

router.get('/produks/', verifyUser, getProduks)
router.get('/produkRows/', verifyUser, totalCount)
router.get('/produk/:id', verifyUser, getProdukById)
router.post('/produk/', verifyUser, createProduk)
router.patch('/produk/:id', verifyUser, updateProduk)
router.delete('/produk/:id', verifyUser, deleteProduk)


export default router;