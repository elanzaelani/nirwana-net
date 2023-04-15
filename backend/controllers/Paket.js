import Paket from '../models/PaketModel.js';
import User from '../models/UserModel.js';
import {json, Op} from 'sequelize';
import Karyawan from '../models/KaryawanModel.js';
import Produk from '../models/ProdukModel.js';

export const createPaket=async(req,res)=>{
    const {nama_paket,speed,harga,hrg_prorata,produkId}=req.body;
    try {
        await Paket.create({
            nama_paket:nama_paket,
            speed:speed,
            harga:harga,
            hrg_prorata:hrg_prorata,
            produkId:produkId,
            userId:req.userId

        });
        res.status(201).json({msg:"Data Paket Berhasil ditambahkan"});
    } catch (error) {
        res.status(500).json({msg:error.message});
        
    }
}

export const getPakets =async(req,res)=>{
   try {
    let response;
    if(req.role === "admin"&&"user"){
        response = await Paket.findAll({
            attributes:['id','uuid','nama_paket','speed','harga','hrg_prorata'],
            include:[
                {
                    model:Produk,
                    attributes:['nama_produk']
                },
                {
                model:User,
                attributes:['name','email']
            }]
            
        });
    }else{
        response= await Paket.findAll({
            attributes:['id','uuid','nama_paket','speed','harga','hrg_prorata'],
            include:[
                {
                    model:Produk,
                    attributes:['nama_produk']
                },
                {
                model:User,
                attributes:['name','email']
            }]
        })
    }
    res.status(200).json(response);
} catch (error) {
       res.status(500).json({msg:error.message});
    
   }
}

export const getPaketById= async(req,res)=>{
    try {
        const paket = await Paket.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!paket)return res.status(404).json({msg:"Data Paket tidak ditemukan.."})
        let response;
        if(req.role === "admin"){
            response = await Paket.findOne({
                attributes:['uuid','nama_paket','speed','harga','hrg_prorata'],
                where:{
                    id:paket.id
                },
                include:[
                    {
                        model:Produk,
                        attributes:['nama_produk']
                    },
                    {
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Paket.findOne({
                attributes:['uuid','nama_paket','speed','harga','hrg_prorata'],
                where:{
                    [Op.and]:[{id:paket.id},
                        {userId:req.userId}]
                    
                },
                include:[
                    {
                        model:Produk,
                        attributes:['nama_produk']
                    },
                    {
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }
        res.status(200).json(response)
    } catch (e) {
        res.status(500).json({msg:e.message})
    } 
}
export const updatePaket=async(req,res)=>{
    try {
        const paket= await Paket.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!paket)return res.status(404).json({msg:"data tidak ditemukan"});
        const {nama_paket,speed,harga,hrg_prorata,produkId}=req.body;
        if(req.role === "admin"){
            await Paket.update({nama_paket,speed,harga,hrg_prorata,produkId},{
                where: {
                    id:paket.id
                }
            })
        }else{
            if(req.userId !== paket.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Paket.update({nama_paket,speed,harga,hrg_prorata,produkId},{
                    where:{
                        [Op.and]:[{id:paket.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"siip...Data Paket berhasil di update "})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}

export const deletePaket=async(req,res)=>{
    try {
        const paket= await Paket.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!paket)return res.status(404).json({msg:"Data paket tidak ditemukan"});
        if(req.role === "admin"){
            await Paket.destroy({
                where: {
                    id:paket.id
                }
            })
        }else{
            if(req.userId !== paket.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Paket.destroy({
                    where:{
                        [Op.and]:[{id:paket.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Data Paket telah berhasil dihapus"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}