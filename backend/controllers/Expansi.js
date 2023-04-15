import Expansi from '../models/ExpansiModel.js';
import User from '../models/UserModel.js';
import {Op} from 'sequelize';
import Pelanggan from '../models/PelangganModel.js';
import ExpansiType from '../models/ExpansiTypeModel.js';


export const getExpansis=async(req,res)=>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Expansi.findAll({
                attributes:['id','uuid','tgl_expan','nominal','keterangan','status'],
                include:[{
                    model:ExpansiType,
                    attributes:['nama_expansi']
                    
                },{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Expansi.findAll({
                attributes:['id','uuid','tgl_expan','nominal','keterangan','status'],
                where:{
                    userId:req.userId
                },
                include:[
                    {
                        model:ExpansiType,
                        attributes:[nama_expansi]
                    },
                    {
                    model:Pelanggan,
                    attributes:['nama']
                },{
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

export const getExpansiById= async(req,res)=>{
    try {
        const Expansi = await Expansi.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!Expansi)return res.status(404).json({msg:"Data Expansi tidak ditemukan.."})
        let response;
        if(req.role === "admin"){
            response = await Expansi.findOne({
                attributes:['id','uuid','nama_Expansi','tgl_Expansi','uraian','status_Expansi','tgl_selesai'],
                where:{
                    id:Expansi.id
                },
                include:[
                    {
                        model:Pelanggan,
                        attributes:['nama']
                    },
                {
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Expansi.findOne({
                attributes:['uuid','nama_jab'],
                where:{
                    [Op.and]:[{id:Expansi.id},
                        {userId:req.userId}]
                    
                },
                include:[{
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
export const createExpansi= async(req,res)=>{
    const {tgl_expansi,nominal,keterangan,status,texpanId}=req.body;
    try {
        await Expansi.create({
            tgl_expansi,nominal,keterangan,status,texpanId
        });
        res.status(201).json({msg: "Expansi Created Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

}
export const updateExpansi=async(req,res)=>{
    try {
        const Expansi= await Expansi.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!Expansi)return res.status(404).json({msg:"data tidak ditemukan"});
        const {tgl_expansi,nominal,keterangan,status,texpanId}=req.body;
        if(req.role === "admin"){
            await Expansi.update({tgl_expansi,nominal,keterangan,status,texpanId},{
                where: {
                    id:Expansi.id
                }
            })
        }else{
            if(req.userId !== Expansi.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Expansi.update({tgl_expansi,nominal,keterangan,status,texpanId},{
                    where:{
                        [Op.and]:[{id:Expansi.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Expansi berhasil di update yeaahh..."})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
export const deleteExpansi=async(req,res)=>{
    try {
        const Expansi= await Expansi.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!Expansi)return res.status(404).json({msg:"data tidak ditemukan"});
        const {nama_Expansi,tgl_Expansi,pelangganId,uraian,status_Expansi,tgl_selesai}=req.body;
        if(req.role === "admin"){
            await Expansi.destroy({
                where: {
                    id:Expansi.id
                }
            })
        }else{
            if(req.userId !== Expansi.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Expansi.destroy({
                    where:{
                        [Op.and]:[{id:Expansi.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Expansi telah berhasil dihapus"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
