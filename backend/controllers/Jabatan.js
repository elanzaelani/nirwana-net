import Jabatan from '../models/JabatanModel.js';
import User from '../models/UserModel.js';
import {Op} from 'sequelize';


export const getJabatan=async(req,res)=>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Jabatan.findAll({
                attributes:['id','uuid','nama_jab'],
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Jabatan.findAll({
                attributes:['id','uuid','nama_jab'],
                where:{
                    userId:req.userId
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

export const getJabatanById= async(req,res)=>{
    try {
        const jabatan = await Jabatan.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!jabatan)return res.status(404).json({msg:"Data Jabatan tidak ditemukan.."})
        let response;
        if(req.role === "admin"){
            response = await Jabatan.findOne({
                attributes:['uuid','nama_jab'],
                where:{
                    id:jabatan.id
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Jabatan.findOne({
                attributes:['uuid','nama_jab'],
                where:{
                    [Op.and]:[{id:jabatan.id},
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
export const createJabatan= async(req,res)=>{
    const {nama_jab}=req.body;
    try {
        await Jabatan.create({
            nama_jab: nama_jab,
            userId:req.userId
        });
        res.status(201).json({msg: "Jabatan Created Succesfully"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

}
export const updateJabatan=async(req,res)=>{
    try {
        const jabatan= await Jabatan.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!jabatan)return res.status(404).json({msg:"data tidak ditemukan"});
        const {nama_jab}=req.body;
        if(req.role === "admin"){
            await Jabatan.update({nama_jab},{
                where: {
                    id:jabatan.id
                }
            })
        }else{
            if(req.userId !== jabatan.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Jabatan.update({nama_jab},{
                    where:{
                        [Op.and]:[{id:jabatan.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Jabatan berhasil di update yeaahh..."})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
export const deleteJabatan=async(req,res)=>{
    try {
        const jabatan= await Jabatan.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!jabatan)return res.status(404).json({msg:"data tidak ditemukan"});
        const {nama_jab}=req.body;
        if(req.role === "admin"){
            await Jabatan.destroy({
                where: {
                    id:jabatan.id
                }
            })
        }else{
            if(req.userId !== jabatan.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Jabatan.destroy({
                    where:{
                        [Op.and]:[{id:jabatan.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Jabatan telah berhasil dihapus"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
