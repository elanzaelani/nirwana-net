import Jadwal from '../models/JadwalModel.js';
import User from '../models/UserModel.js';
import {Op} from 'sequelize';
import Pelanggan from '../models/PelangganModel.js';


export const getJadwal=async(req,res)=>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Jadwal.findAll({
                attributes:['id','uuid','nama_jadwal','tgl_jadwal','uraian','status_jadwal','tgl_selesai'],
                include:[{
                    model:Pelanggan,
                    attributes:['nama']
                    
                },{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Jadwal.findAll({
                attributes:['id','uuid','nama_jadwal','tgl_jadwal','uraian','status_jadwal','tgl_selesai'],
                where:{
                    userId:req.userId
                },
                include:[{
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

export const getJadwalById= async(req,res)=>{
    try {
        const Jadwal = await Jadwal.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!Jadwal)return res.status(404).json({msg:"Data Jadwal tidak ditemukan.."})
        let response;
        if(req.role === "admin"){
            response = await Jadwal.findOne({
                attributes:['id','uuid','nama_jadwal','tgl_jadwal','uraian','status_jadwal','tgl_selesai'],
                where:{
                    id:Jadwal.id
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
            response = await Jadwal.findOne({
                attributes:['uuid','nama_jab'],
                where:{
                    [Op.and]:[{id:Jadwal.id},
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
export const createJadwal= async(req,res)=>{
    const {nama_jadwal,tgl_jadwal,pelangganId,uraian,status_jadwal,tgl_selesai}=req.body;
    try {
        await Jadwal.create({
            nama_jadwal: nama_jadwal,
            tgl_jadwal:tgl_jadwal,
            pelangganId:pelangganId,
            uraian:uraian,
            status_jadwal:status_jadwal,
            tgl_selesai:tgl_selesai,
            userId:req.userId
        });
        res.status(201).json({msg: "Jadwal Created Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

}
export const updateJadwal=async(req,res)=>{
    try {
        const Jadwal= await Jadwal.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!Jadwal)return res.status(404).json({msg:"data tidak ditemukan"});
        const {nama_jadwal,tgl_jadwal,pelangganId,uraian,status_jadwal,tgl_selesai}=req.body;
        if(req.role === "admin"){
            await Jadwal.update({nama_jadwal,tgl_jadwal,pelangganId,uraian,status_jadwal,tgl_selesai},{
                where: {
                    id:Jadwal.id
                }
            })
        }else{
            if(req.userId !== Jadwal.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Jadwal.update({nama_jadwal,tgl_jadwal,pelangganId,uraian,status_jadwal,tgl_selesai},{
                    where:{
                        [Op.and]:[{id:Jadwal.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Jadwal berhasil di update yeaahh..."})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
export const deleteJadwal=async(req,res)=>{
    try {
        const Jadwal= await Jadwal.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!Jadwal)return res.status(404).json({msg:"data tidak ditemukan"});
        const {nama_jadwal,tgl_jadwal,pelangganId,uraian,status_jadwal,tgl_selesai}=req.body;
        if(req.role === "admin"){
            await Jadwal.destroy({
                where: {
                    id:Jadwal.id
                }
            })
        }else{
            if(req.userId !== Jadwal.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Jadwal.destroy({
                    where:{
                        [Op.and]:[{id:Jadwal.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Jadwal telah berhasil dihapus"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
