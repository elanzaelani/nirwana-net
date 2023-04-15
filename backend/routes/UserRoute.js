import express from 'express'
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    totalCount
} from '../controllers/Users.js';

import {verifyUser , adminOnly} from '../middleware/AuthUser.js'

const router= express.Router();

router.get('/users',verifyUser, adminOnly,getUsers)
router.get('/userRows/', verifyUser, totalCount)
router.get('/user/:id',verifyUser,adminOnly, getUserById)
router.post('/user',createUser)
router.patch('/user/:id', verifyUser,adminOnly,updateUser)
router.delete('/user/:id', verifyUser,adminOnly,deleteUser)

export default router
